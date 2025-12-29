import { cn } from '@/lib/utils'
import React from 'react'
import { TfiBell, TfiLayoutSliderAlt } from 'react-icons/tfi'
import SideBarLinks from './parts/SideBarLinks'
import SideBarLink from './parts/SideBarLink'
import { useSideBar } from './useSideBar'
import SideBarUserMenu from './parts/SideBarUserMenu'
import SideBarUser from './parts/SideBarUser'
import SideBarIcon from './parts/SideBarIcon'
import { Link, usePage } from '@inertiajs/react'
import { urlToString } from '@/lib/urlToString'
import { Role } from '@/pages/User/Users/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { IsRead } from '@/types/types'
import { formatDate } from '@/lib/formatDate'
import NotificationController from '@/actions/App/Http/Controllers/NotificationController'




const SideBar = ({ children }: { children: React.ReactNode }) => {
    const {
        handleToggleSideBar,
        isBigScreen,
        isShowSideBar,
        handleToggleShowUserMenu,
        isShowUserMenu,
        menuRef,
        isHideLabel,
        user,
        handleLogout,
        links,
        notifications,
        isShowNotifications,
        toggleNotifications,
        totalUnreads
    } = useSideBar()

    const { url } = usePage()
    return (
        <div className='bg-input/25 relative'>
            <div onClick={handleToggleSideBar} className={cn(['z-1', !isBigScreen && isShowSideBar ? 'absolute' : '-left-[250px]', "left-[250px] right-0 bg-foreground/45 h-full transition-all duration-300 ease-in-out"])}></div>
            <div className={cn(['z-2 fixed bg-input/25', !isBigScreen && isShowSideBar ? 'left-0 bg-background' : '-left-[280px]', 'md:bg-transparent h-svh rounded-r-md pt-5 px-2 transition-all duration-300 ease-in-out md:left-0', isBigScreen && isShowSideBar ? ' w-[250px]' : 'md:w-[75px]'])}>
                <div className='h-[91%]'>
                    <div>
                        <div className="flex gap-2 items-center hover:bg-input/25 p-2 rounded-md cursor-pointer">
                            <img src="/logo.png " className="w-[40px] h-[40px]" />
                            <h3 className={cn(["text-md text-foreground", isHideLabel ? 'hidden' : 'block'])}>Document Tracking System</h3>
                        </div>
                        <SideBarLinks>
                            {links.map((link) => (
                                <SideBarLink roles={link.roles} key={link.icon} to={link.to}
                                    label={link.name}
                                    icon={<SideBarIcon name={link.icon} isHideLabel={isHideLabel} />}
                                    isHideLabel={isHideLabel} />
                            ))}
                        </SideBarLinks>
                    </div>
                </div>
                <div className='h-[4%] relative' ref={menuRef}>
                    <SideBarUser
                        isHideUser={isHideLabel}
                        isShowUserMenu={isShowUserMenu}
                        name={`${user?.first_name || ""} ${user?.last_name || ""}`} role={user?.role || "" as Role}
                        onHandleToggle={handleToggleShowUserMenu}
                    />
                    <SideBarUserMenu onHandleLogout={handleLogout} isShowUserMenu={isShowUserMenu} />
                </div>
            </div>
            <div className={cn([' ml-0 p-3 h-svh transition-all duration-300 ease-in-out', isBigScreen && isShowSideBar ? 'md:ml-[250px]' : 'md:ml-[75px]'])}>
                <div className='h-full border-1 border-border bg-background rounded-xl p-5 overflow-y-auto'>
                    <div className='mb-5 flex justify-between items-center'>
                        <div className="flex items-center space-x-2 divide-border divide-x-1 ">
                            <div>
                                <button onClick={handleToggleSideBar} className="mr-1 p-2 rounded-md hover:bg-input/25">
                                    <TfiLayoutSliderAlt />
                                </button>
                            </div>
                            <h3 className="text-md text-foreground capitalize">{urlToString(url)}</h3>
                        </div>
                        <div className='relative'>
                            <button onClick={toggleNotifications} className={cn(['relative flex justify-between items-center rounded-md  p-2', isShowNotifications ? 'bg-primary text-white hover:opacity-75' : 'hover:bg-input/25'])}>
                                <TfiBell size={20} />
                                {totalUnreads > 0 && (
                                    <div className='absolute  bg-red-500 text-[9px] rounded-full h-5 w-5 font-bold -right-2 -top-[7px] flex items-center justify-center text-white p-1'>{totalUnreads > 10 ? "10+" : totalUnreads}</div>
                                )}
                            </button>
                            {
                                isShowNotifications && (
                                    <div className='absolute -right-2 top-[40px] z-500'>
                                        <Card className='w-sm max-h-[600px] overflow-y-auto'>
                                            <CardHeader>
                                                <CardTitle className='text-lg'>Notifications</CardTitle>
                                            </CardHeader>
                                            <CardContent className='space-y-2'>
                                                {notifications.map((notification) => (
                                                    <div key={notification.id} className='shadow-sm space-y-2 p-2 rounded-md'>
                                                        <p className='font-bold'>{formatDate({ date: notification.created_at })}</p>
                                                        <Link
                                                            href={NotificationController.index.url({ id: notification.id })}
                                                            className={cn(
                                                                buttonVariants({ variant: 'ghost' }),
                                                                'text-md block h-auto whitespace-normal break-words text-left items-start ',
                                                                notification.is_read === IsRead.UNREAD ? "text-black" : "text-gray-500"
                                                            )}
                                                        >
                                                            {notification.description}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
