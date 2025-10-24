import React from 'react'

const TableCell = ({ children }: { children: React.ReactNode }) => {
    return (
        <td className='px-6 py-3 whitespace-nowrap'>{children}</td>
    )
}

export default TableCell
