<?php


namespace App\Http\Service;

use App\Http\Enum\NotificationStatus;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationService {


    public function all() {
        $user = Auth::user();
        if(!$user){
            return null;
        }

        return Notification::with(['user', 'track'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }

    public function create(int $user_id, int $track_id, string $description){

        Notification::create([
            'user_id' => $user_id,
            'track_id' => $track_id,
            'description' => $description,
        ]);
    }

    public function findById(int $id){
        return Notification::with(['track.document'])->find($id);
    }
}
?>
