<?php

namespace App\Http\Controllers;

use App\Http\Enum\TrackStatus;
use App\Http\Requests\StoreTrackRequest;
use App\Http\Service\DocumentService;
use App\Http\Service\TrackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackController extends Controller
{
    protected TrackService $trackService;

    public function __construct() {
        $this->trackService = app(TrackService::class);
    }

    public function index(Request $request) {
        $documentService = app(DocumentService::class);
        $search  = $request->get("search");

        $ids = explode(',', $search);

        $documents = $documentService->findMany($ids);

        $foundIds = $documents->pluck('id')->toArray();
        $notFoundsIds = array_values(array_diff(array_filter($ids), $foundIds));
        $allIds =  array_merge($foundIds, $notFoundsIds);

        return Inertia::render("User/Tracks/Tracks", [
            "documents" => $documents,
            "allIds" => $allIds,
            "search" => $search,
            "notFoundsIds" => $notFoundsIds
        ]);
    }

    public function store(StoreTrackRequest $request, string $id) {
        $validated = $request->validated();

        $this->trackService->create([
            "user" => Auth::user()->id,
            "document" => $id,
            "status" => $validated["status"],
            "remarks" => $validated["remarks"],
        ]);


        return redirect()->route("documents.tracks", ["id" => $id])->with("success","Document Updated Successfully");
    }
}
