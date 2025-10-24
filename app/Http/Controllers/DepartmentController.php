<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Service\DepartmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{

    protected $departmentService;
    public function __construct() {
        $this->departmentService = app(DepartmentService::class);
    }

    public function index(Request $request) {

        $search = $request->get('search');

        $departments = $this->departmentService->all(true, $search);

        return Inertia::render("User/Departments/Departments", [
            "departments" => $departments,
            'filter' => $search ?? ""
        ]);
    }

    public function store(StoreDepartmentRequest $request) {
        $department = $request->validated();

        $this->departmentService->create($department);

        return redirect()->route('departments')->with('success', 'Department Created Successfully');
    }

    public function update(StoreDepartmentRequest $request, int $id) {


        $department = $request->validated();
        $this->departmentService->update($id,$department['name']);

        return redirect()->route('departments')->with('success', 'Department Updated Successfully');
    }

     public function delete( int $id) {


        $this->departmentService->delete($id);

        return redirect()->route('departments')->with('success', 'Department Deleted Successfully');
    }

}
