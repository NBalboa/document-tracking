import { Role } from "@/pages/User/Users/types";

export const allowedRoles = ({ role, roles }: { roles: Role[], role?: Role }) => {

    return roles.some((r) => r === role)
}
