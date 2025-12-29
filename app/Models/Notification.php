<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $fillable = [
        "user_id",
        "track_id",
        "description",
        "is_read",
        "description"
    ];

    public function user() {
        return $this->hasOne(User::class, 'id');
    }

    public function track() {
        return $this->hasOne(Track::class,'id')->with('document');
    }
}
