import React from 'react'

const TableHead = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className='text-md text-gray-700 uppercase bg-primary'>
            {children}
        </thead>
    )
}

export default TableHead
