import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react'

export const useNavBar = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const { auth } = usePage<SharedData>().props

    const handleShowMenu = () => {
        setIsShowMenu((prev) => !prev)
    }

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) {
            setIsShowMenu(false)
        }
    }, [])


    const handleLogin = () => {
        router.visit('/login')
    }

    const handleLogout = () => {
        router.post('/logout')
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize])


    return {
        isShowMenu,
        handleShowMenu,
        handleLogin,
        user: auth.user,
        handleLogout
    }
}

