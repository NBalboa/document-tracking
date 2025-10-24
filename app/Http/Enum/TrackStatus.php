<?php

namespace App\Http\Enum;


enum TrackStatus: string {
    case CREATED = "created";
    case TRANSFERRING = "transferring";
    case RECEIVED = "received";
    case REVIEWED = "reviewed";
    case APPROVED = "approved";
    case COMPLETED = "completed";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
