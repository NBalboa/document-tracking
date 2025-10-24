<?php


namespace App\Http\Service;

use App\Http\Enum\IsDeleted;
use App\Http\Enum\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UserService {

    public function all(?string $search) {
       return User::with('department')
       ->when($search, function ($query) use ($search) {
        $query->whereAny([
                'first_name',
                'last_name',
                'email',
                'phone'
        ], 'LIKE', "%{$search}%");
        $query->orWhereHas('department', function ($query) use ($search) {
            $query->where('name','LIKE', "%{$search}%");
        });
       })
       ->isNotDeleted()
       ->paginate(10)
       ->withQueryString();
    }

    public function create(array $user) {

        User::create([
            'first_name' => $user['first_name'],
            'last_name'=> $user['last_name'],
            'email'=> $user['email'],
            'password'=> Hash::make($user['password']),
            'department_id' => $user['department'],
            'phone' => $user['phone'],
            'role' => $user['role'],
            'remember_token' => Str::random(10),
        ]);
    }


    public function findById(int $id) {
        return User::with('department')->findOrFail($id);
    }


    public function update(int $id, array $data) {

        $user = User::findOrFail($id);

        $user->fill([
            'first_name' => $data['first_name'],
            'last_name'=> $data['last_name'],
            'email'=> $data['email'],
            'phone' => $data['phone'],
            'role' => $data['role'],
        ]);

        $updated = $user->getDirty();

        if (array_key_exists('email', $updated)) {
            $exists = User::where('email', $data['email'])
            ->where('id', '!=', $user->id)
            ->exists();

            if ($exists) {
                throw ValidationException::withMessages([
                    'email' => 'This email address is already in use.',
                ]);
            }
        }

        if (array_key_exists('phone', $updated)) {
            $exists = User::where('phone', $data['phone'])
            ->where('id', '!=', $user->id)
            ->exists();

            if ($exists) {
                throw ValidationException::withMessages([
                    'phone' => 'This phone address is already in use.',
                ]);
            }
        }

        if (!empty($updated)) {
            $user->save();
        }
    }

    public function updatePassword($id, string $newPassword) {
        $user = User::findOrFail($id);

        $user->update([
            'password'=> Hash::make($newPassword),
        ]);
    }

    public function delete($id) {

        $user = User::findOrFail($id);

        $user->update([
            'is_deleted' => IsDeleted::YES->value
        ]);
    }
}
