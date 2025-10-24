import { cn } from '@/lib/utils'
import React from 'react'
import { TfiLayoutSliderAlt } from 'react-icons/tfi'
import SideBarLinks from './parts/SideBarLinks'
import SideBarLink from './parts/SideBarLink'
import { useSideBar } from './useSideBar'
import SideBarUserMenu from './parts/SideBarUserMenu'
import SideBarUser from './parts/SideBarUser'
import SideBarIcon from './parts/SideBarIcon'
import { usePage } from '@inertiajs/react'
import { urlToString } from '@/lib/urlToString'
import { Role } from '@/pages/User/Users/types'

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
        links
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
                    <div className="flex items-center space-x-2 divide-border divide-x-1 mb-5">
                        <div>
                            <button onClick={handleToggleSideBar} className="mr-1 p-2 rounded-md hover:bg-input/25">
                                <TfiLayoutSliderAlt />
                            </button>
                        </div>
                        <h3 className="text-md text-foreground capitalize">{urlToString(url)}</h3>
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
