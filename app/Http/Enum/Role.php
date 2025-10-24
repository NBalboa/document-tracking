<?php

namespace App\Http\Enum;


enum Role: string {
    case ADMIN = "admin";
    case STAFF = "staff";
    case USER  = "user";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
