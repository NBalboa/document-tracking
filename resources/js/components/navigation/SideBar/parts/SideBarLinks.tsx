import React from 'react'

const SideBarLinks = ({ children }: { children: React.ReactNode }) => {
    return (
        <nav className="mt-2  border-t-1 border-border">
            <ul className="space-y-2 mt-2">
                {children}
            </ul>
        </nav>
    )
}

export default SideBarLinks
