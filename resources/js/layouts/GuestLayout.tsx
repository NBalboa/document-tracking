import Footer from '@/components/Footer'
import { NavBar } from '@/components/navigation/NavBar/NavBar'
import React from 'react'

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}

export default GuestLayout
