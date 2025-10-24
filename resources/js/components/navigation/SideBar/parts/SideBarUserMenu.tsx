import UserController from '@/actions/App/Http/Controllers/UserController'
import { cn } from '@/lib/utils'
import { SharedData } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { MdManageAccounts } from 'react-icons/md'

const SideBarUserMenu = ({ isShowUserMenu, onHandleLogout }: { isShowUserMenu: boolean, onHandleLogout: () => void }) => {
    const { auth } = usePage<SharedData>().props

    return (
        <div className={cn([isShowUserMenu ? 'absolute' : 'hidden', '-top-20 -right-35 z-index-10 space-y-2 px-5 py-2 w-[200px] bg-background rounded-md border-1 border-border'])}>
            <div className='border-b-1 border-border'>
                <ul className='mb-2'>
                    <li className='flex items-center gap-1 hover:bg-input/50 rounded-md p-2'>
                        <MdManageAccounts size={20} />
                        {auth.user && (
                            <Link href={UserController.user.url({ id: auth.user?.id })} className='block  text-foreground text-md '>Account</Link>
                        )}
                    </li>
                </ul>
            </div>
            <div>
                <button onClick={onHandleLogout} className='flex items-center gap-2 p-2 text-md rounded-md hover:bg-input w-full'>
                    <IoIosLogOut size={18} className='text-destructive' />
                    <span className='text-foreground'>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default SideBarUserMenu
