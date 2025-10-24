import SideBar from '@/components/navigation/SideBar/SideBar'
import React from 'react'
import { ToastContainer } from 'react-toastify';
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SideBar>
                {children}
            </SideBar>
            <ToastContainer />
        </>
    )
}
