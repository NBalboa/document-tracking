import React from 'react'
import { Input } from './ui/input'
import { Search as SearchIcon } from 'lucide-react'

const Search = ({
    onHandleChange,
    value,
    placeholder = "Search..."

}: {
    value?: string
    onHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string
}) => {
    return (
        <div className='relative'>
            <SearchIcon size={20} className='absolute top-0 left-2 bottom-0 h-full' />
            <Input type='text' className='ps-10 max-w-xs'
                value={value}
                onChange={onHandleChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Search
