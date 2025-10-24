import React from 'react'

const TableBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <tbody className='divide-y-1 divide-border'>
            {children}
        </tbody>
    )
}

export default TableBody
