<?php


namespace App\Http\Service;

use App\Http\Enum\IsDeleted;
use App\Models\Department;

class DepartmentService {

    public function all(?bool $isPaginated = false, ?string $search = null) {

        if($isPaginated){
            return Department::when($search, function ($query) use ($search) {
                $query->where("name", 'LIKE', "%{$search}%");
            })
            ->isNotDeleted()
            ->paginate(10)
            ->withQueryString();
        }

        return Department::all();
    }


    public function create(array $department) {

        Department::create([
            'name' => $department['name'],
        ]);
    }

    public function update(int $id, string $name) {
        $department = Department::findOrFail($id);

        $department->update([
            'name' => $name,
        ]);
    }

    public function delete(int $id) {
        $department = Department::findOrFail($id);

        $department->update([
            'is_deleted' => IsDeleted::YES->value
        ]);
    }
}
