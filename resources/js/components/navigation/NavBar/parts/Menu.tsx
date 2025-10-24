import { cn } from '@/lib/utils'
import React from 'react'

export const Menu = ({ children, cta, isShowMenu }: { isShowMenu: boolean, children: React.ReactNode, cta: React.ReactNode }) => {
    return (
        <nav className={cn(['absolute bg-background padding-2 right-0 left-0 bottom-0 border-y-1 p-4 border-border md:hidden transition-all duration-300 ease-in space-y-2',
            isShowMenu
                ? "  translate-y-23 visible"
                : " -translate-y-20 invisible"])}>

            <ul className='flex flex-col item-center gap-2 '>
                {children}
            </ul>
            {cta}
        </nav>
    )
}
