import React from 'react'

const TableHeadCell = ({ children }: { children: React.ReactNode }) => {
    return (
        <th className='px-6 py-3 font-bolder text-primary-foreground'>{children}</th>
    )
}

export default TableHeadCell
