import React from 'react'

export const NavLinks = ({ children, cta }: { children: React.ReactNode, cta: React.ReactNode }) => {
    return (
        <nav className='hidden items-center gap-2 md:flex'>
            <ul className='flex item-center gap-2'>
                {children}
            </ul>
            {cta}
        </nav>
    )
}
