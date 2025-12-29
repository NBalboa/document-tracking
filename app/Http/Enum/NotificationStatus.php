<?php

namespace App\Http\Enum;

enum NotificationStatus:int {
    case READ = 1;
    case UNREAD = 0;
}

?>
