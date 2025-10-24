<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = [
        "user_id",
        "document_id",
        "remarks",
        "status"
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function document() {
        return $this->belongsTo(Document::class,'document_id');
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) => [
                'date' => Carbon::parse($attributes['created_at'])->format('F d, Y'),
                'time' => Carbon::parse($attributes['created_at'])->format('h:i A'),
            ]
        );
    }
}
