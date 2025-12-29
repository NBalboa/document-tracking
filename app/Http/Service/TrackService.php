<?php


namespace App\Http\Service;

use App\Models\Track;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TrackService {
    protected DocumentService $documentService;
    protected NotificationService $notificationService;
    public function __construct() {
        $this->documentService = app(DocumentService::class);
        $this->notificationService = app(NotificationService::class);
    }

    public function create(array $data)  {

        $document = $this->documentService->find($data["document"]);
        $currentUser = Auth::user();

        if($document) {
            $lastestTrack = $document->tracks()->with('user')->latest()->first();

            if($lastestTrack && $lastestTrack->user->id === $data['user'] && $lastestTrack->status === $data["status"]) {
                throw ValidationException::withMessages([
                    'status' => sprintf('Document is already  %s', ucfirst($data['status'])),
                ]);

            }


            $track_id = Track::create([
                "user_id" => $data["user"],
                "document_id" => $data["document"],
                "status" => $data["status"],
                "remarks" => $data["remarks"] ?? "",
            ]);


            if($document->user->id !== $currentUser->id){

                $description = "Your document " . $document->name . " has been " . $data['status'] . " by " . $currentUser->first_name . " " . $currentUser->last_name;

                $this->notificationService->create($document->user->id, $track_id['id'], $description);
            }

            return;
        }

        throw ValidationException::withMessages([
            'status' => "Document doesn't exist",
        ]);
    }
}
