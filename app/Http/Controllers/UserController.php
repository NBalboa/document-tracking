<?php

namespace App\Http\Controllers;

use App\Http\Enum\Role;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateUserPasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Service\DepartmentService;
use App\Http\Service\UserService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;


class UserController extends Controller
{
    protected $userService;
    protected $departmentService;

    public function __construct() {
        $this->departmentService = app(DepartmentService::class);
        $this->userService = app(UserService::class);
    }

    public function index(Request $request) {

        $search = $request->get('search');

        $users = $this->userService->all($search);
        $departments = $this->departmentService->all(false, null);
        $roles = Role::values();

        return Inertia::render("User/Users/Users", [
            "users" => $users,
            "departments"  => $departments,
            "filter" => $search || "",
            "roles" => $roles,
        ]);
    }

    public function user(int $id) {

        $departments = $this->departmentService->all(false, null);
        $roles = Role::values();

        $user = $this->userService->findById($id);

        return Inertia::render("User/User/User", [
            "departments"  => $departments,
            "user" => $user,
            "roles" => $roles,
        ]);
    }

    public function store(StoreUserRequest $request) {
        $user = $request->validated();

        $this->userService->create($user);

        return redirect()->route("users.users")->with('success', 'User Created Sucessfully');
    }

    public function update(UpdateUserRequest $request, int $id,) {
        $user = $request->validated();

        $this->userService->update($id, $user);

        return redirect()->route('users.user', $id)->with('success','User Updated Successfully');
    }

    public function updatePassword(UpdatePasswordRequest $request, int $id) {
         $user = $request->validated();

         $this->userService->updatePassword($id, $user['password']);

         return redirect()->route('users.user', $id)->with('success', "User Password Updated Successfully");
    }


    public function updateUserPassword(UpdateUserPasswordRequest $request, int $id) {
        $data = $request->validated();

        $user = $this->userService->findById($id);

        if (!Hash::check($data['old_password'], $user->password)) {
             throw ValidationException::withMessages([
                    'old_password' => 'Old Password is incorrect.',
            ]);
        }

        $this->userService->updatePassword($id, $data['new_password']);

        return redirect()->route('users.user', $id)->with('success', "User Password Updated Successfully");
    }


    public function delete(int $id) {

        $this->userService->delete($id);

        return redirect()->route('users.users', $id)->with('success', "User Deleted Successfully");
    }
}
