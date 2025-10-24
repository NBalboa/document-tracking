import { Role } from "@/pages/User/Users/types";

export interface Auth {
    user?: User;
}

export interface SharedData {
    name: string;
    auth: Auth;
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
