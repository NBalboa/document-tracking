import { TimeStamp } from "@/pages/User/Documents/types";
import { Track } from "@/pages/User/Track/types";
import { Role } from "@/pages/User/Users/types";
import { IsRead } from "./types";

export interface Auth {
    user?: User;
}

export interface SharedData {
    name: string;
    auth: Auth;
    notifications: ({
        id: number,
        track_id: number,
        user_id: number,
        is_read: IsRead,
        track: Track,
        user: User,
        description: string,
    } & TimeStamp)[]
    flash: {
        success?: string,
        error?: string
    }
    [key: string]: unknown;
}

export interface User {
    id: number;
    department_id: string;
    first_name: string;
    last_name: string;
    middle_name?: string,
    email: string;
    phone: string,
    created_at: string;
    updated_at: string;
    role: Role;
    [key: string]: unknown; // This allows for additional properties...
}
