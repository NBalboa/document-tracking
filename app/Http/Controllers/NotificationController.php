<?php

namespace App\Http\Controllers;

use App\Http\Enum\NotificationStatus;
use App\Http\Service\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{

    protected NotificationService $notificationService;

    public function __construct() {

        $this->notificationService = app(NotificationService::class);

    }

    public function index(int $id) {

        $notification = $this->notificationService->findById($id);
        if($notification){
            $notification->is_read = NotificationStatus::READ->value;
            $notification->save();

            $documentId = $notification->track->document->id;

            return redirect()->route('documents.tracks', ['id' => $documentId]);
        }

        return back();
    }
}
