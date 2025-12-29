<?php

namespace App\Http\Controllers;

use App\Http\Enum\TrackStatus;
use App\Http\Service\DepartmentService;
use App\Http\Service\DocumentService;
use App\Http\Service\DocumentTypeService;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ReportController extends Controller
{

    protected $documentTypeService;
    protected $documentsService;
    protected $departmentService;
    public function __construct(){
        $this->documentTypeService = app(DocumentTypeService::class);
        $this->documentsService = app(DocumentService::class);
        $this->departmentService = app(DepartmentService::class);
    }

    public function index (Request $request) {
        $type = $request->get('type');
        $status = $request->get('status');
        $date = $request->get('date');
        $search = $request->get('search');
        $department = $request->get('department');

        $statuses = TrackStatus::values();
        $documentTypes = $this->documentTypeService->all();
        $departments = $this->departmentService->all();
        $documents = $this->documentsService->all($search, $this->isAll($type), $this->isAll($status), $date, $this->isAll($department), true, false);

        return Inertia::render("User/Reports/Reports", [
            "documents" => $documents,
            "statuses" => $statuses,
            "documentTypes" => $documentTypes,
            "departments" => $departments,
            "filters" => [
                "type" => $type,
                "status" => $status,
                "date" => $date,
                "search" => $search
            ]
        ]);
    }
    private function isAll(?string $value) {

        if(Str::lower($value) === 'all'){
            return null;
        }
        return $value;
    }

}
