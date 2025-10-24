import DocumentController from '@/actions/App/Http/Controllers/DocumentController';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from './parts/SideBarIcon';
import UserController from '@/actions/App/Http/Controllers/UserController';
import DepartmentController from '@/actions/App/Http/Controllers/DepartmentController';
import { Role } from '@/pages/User/Users/types';
import TrackController from '@/actions/App/Http/Controllers/TrackController';

export const useSideBar = () => {
    const [isBigScreen, setIsBigScreen] = useState(window.innerWidth >= 768 ? true : false);
    const [isShowSideBar, setIsShowSideBar] = useState(window.innerWidth >= 768 ? true : false);
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage<SharedData>().props;
    const { user } = auth

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) {
            setIsShowSideBar(true);
            setIsBigScreen(true);
        }
        else {
            setIsShowSideBar(false);
            setIsBigScreen(false);
            setIsShowUserMenu(false)
        }
    }, [])

    const links: { name: string, to: string, icon: Icon, roles: Role[] }[] = [
        {
            name: "Dashboard",
            to: "/dashboard",
            icon: 'dashboard',
            roles: ['admin', 'staff']
        },
        {
            name: "Document",
            to: DocumentController.index.url(),
            icon: 'document',
            roles: ['admin', 'staff', 'user']
        },
        {
            name: "User",
            to: UserController.index.url(),
            icon: 'user',
            roles: ['admin', 'staff']
        },
        {
            name: "Department",
            to: DepartmentController.index.url(),
            icon: 'department',
            roles: ['admin', 'staff']
        },
        {
            name: "Tracks",
            to: TrackController.index.url(),
            icon: 'track',
            roles: ['admin', 'staff', 'user']
        },
    ]

    const isHideLabel = useMemo(() => isBigScreen && !isShowSideBar, [isBigScreen, isShowSideBar])

    const handleToggleSideBar = () => setIsShowSideBar(prev => !prev)
    const handleToggleShowUserMenu = () => setIsShowUserMenu(prev => !prev)

    const handleLogout = () => {
        router.post('/logout')
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsShowUserMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])



    return {
        handleToggleSideBar,
        isBigScreen,
        isShowSideBar,
        isShowUserMenu,
        handleToggleShowUserMenu,
        menuRef,
        isHideLabel,
        user,
        handleLogout,
        links
    }
}


