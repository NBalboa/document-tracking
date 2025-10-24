export type User = {
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
    department: Department
}

export type Department = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export type Role = "admin" | "staff" | "user"
