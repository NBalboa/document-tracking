import { Link } from '@inertiajs/react'
import React from 'react'

const MenuItem = ({ label, to }: { to: string, label: string }) => {
    return (
        <li>
            <Link href={to} className='text-foreground hover:text-primary text-md'>{label}</Link>
        </li>
    )
}

export default MenuItem
