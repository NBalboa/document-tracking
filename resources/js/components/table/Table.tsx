import React from 'react'

const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative overflow-x-auto rounded-md shadow-sm'>
            <table className='w-full text-sm text-left rtl:text-right '>
                {children}
            </table>
        </div>
    )
}

export default Table
