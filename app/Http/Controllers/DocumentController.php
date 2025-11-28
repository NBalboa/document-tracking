<?php

namespace App\Http\Controllers;

use App\Http\Enum\TrackStatus;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Service\DocumentService;
use App\Http\Service\DocumentTypeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{

    protected $documentTypeService;
    protected $documentService;


    public function __construct(){
        $this->documentService = app(DocumentService::class);
        $this->documentTypeService = app(DocumentTypeService::class);
    }

    public function index(Request $request) {
        $search = $request->get('search');

        $documentTypes = $this->documentTypeService->all();
        $documents = $this->documentService->all($search);

        $statuses = TrackStatus::values();

        return Inertia::render("User/Documents/Documents", [
            "documentTypes" => $documentTypes,
            "documents" => $documents,
            "filter" => $search || "",
            "statuses" => $statuses
        ]);
    }

    public function tracks(string $id) {

        $document = $this->documentService->find($id);

        return Inertia::render('User/Track/Track', [
            'document' => $document,
        ]);
    }

    public function store(StoreDocumentRequest $request) {

        $data = $request->validated();

        $documentType = $this->documentTypeService->create($data['type']);

        $this->documentService->create([
            "type" => $documentType->id,
            "name" => $data["name"],
            "description" => $data["description"],
        ]);

        return redirect()->route("documents")->with("success","Created Documents Successfully.");
    }

    public function update(StoreDocumentRequest $request, string $id) {
        $data = $request->validated();

        $documentType = $this->documentTypeService->create($data['type']);

        $this->documentService->update($id, [
            "type" => $documentType->id,
            "name" => $data["name"],
            "description" => $data["description"],
         ]);

        return redirect()->route("documents")->with("success","Documents Updated Successfully.");
    }


    public function delete(string $id) {

        $this->documentService->delete($id);

        return redirect()->route("documents")->with("success","Documents Deleted Successfully.");
    }
}


