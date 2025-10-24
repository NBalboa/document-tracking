<?php


namespace App\Http\Service;

use App\Models\Track;
use Illuminate\Validation\ValidationException;

class TrackService {
    protected DocumentService $documentService;

    public function __construct(DocumentService $documentService) {
        $this->documentService = $documentService;
    }

    public function create(array $data)  {

        $document = $this->documentService->find($data["document"]);

        if($document) {
            $lastestTrack = $document->tracks()->with('user')->latest()->first();

            if($lastestTrack && $lastestTrack->user->id === $data['user'] && $lastestTrack->status === $data["status"]) {
                throw ValidationException::withMessages([
                    'status' => sprintf('Document is already  %s', ucfirst($data['status'])),
                ]);

            }

            Track::create([
                "user_id" => $data["user"],
                "document_id" => $data["document"],
                "status" => $data["status"],
                "remarks" => $data["remarks"] ?? "",
            ]);

            return;
        }

        throw ValidationException::withMessages([
            'status' => "Document doesn't exist",
        ]);
    }
}
