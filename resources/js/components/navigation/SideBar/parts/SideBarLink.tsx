import { allowedRoles } from "@/lib/allowedRoles"
import { cn } from "@/lib/utils"
import { Role } from "@/pages/User/Users/types"
import { SharedData } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import React from "react"

const SideBarLink = ({
    label,
    to,
    icon,
    isHideLabel = false,
    roles
}: {
    to: string,
    label: string,
    icon?: React.ReactNode,
    isHideLabel?: boolean
    roles: Role[]
}) => {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage<SharedData>()
    return (
        <>
            {allowedRoles({ roles, role: auth.user?.role }) &&
                (<li>
                    <Link href={to}
                        className={cn([
                            "flex items-center gap-2 hover:bg-input/25 rounded-md p-2 ",
                            isHideLabel && 'justify-center',
                            to.startsWith(url) && url.toLowerCase().includes(to.toLowerCase()) && 'text-primary'
                        ])}
                    >
                        {icon}
                        <span className={cn(["text-md", isHideLabel ? 'hidden' : 'block'])}>{label}</span>
                    </Link>
                </li>)

            }
        </>
    )
}

export default SideBarLink
