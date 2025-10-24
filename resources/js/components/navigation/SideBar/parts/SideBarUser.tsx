import { allowedRoles } from '@/lib/allowedRoles'
import { cn } from '@/lib/utils'
import { Role } from '@/pages/User/Users/types'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const SideBarUser = ({ isShowUserMenu, onHandleToggle, name, role, isHideUser = false }: {
    onHandleToggle: () => void,
    isShowUserMenu: boolean,
    name: string,
    role: Role,
    isHideUser?: boolean
}) => {
    return (
        <div onClick={onHandleToggle} className={cn(['flex items-center gap-2 rounded-md p-2 cursor-pointer', isHideUser && 'justify-center', isShowUserMenu ? 'bg-input/25' : 'hover:bg-input/25'])}>
            <FaUserCircle size={32} />
            <div className={cn([isHideUser ? 'hidden' : 'block'])}>
                <h2 className="text-md text-foreground">{name}</h2>
                {allowedRoles({ roles: ['admin', 'staff'], role: role }) && (
                    <p className="text-xs capitalize">{role}</p>
                )}
            </div>
        </div>
    )
}

export default SideBarUser
