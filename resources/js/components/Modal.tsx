import { cn } from '@/lib/utils'
import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'

const Modal = ({
    isOpen,
    children,
    onHandleClose,
    title,
    width = 700
}: {
    isOpen?: boolean,
    children: React.ReactNode,
    onHandleClose: () => void,
    title?: string
    height?: number
    width?: number
}) => {
    return (
        <div
            onClick={onHandleClose}
            className={cn([
                'flex items-center justify-center absolute bg-input/90 z-10 left-0 right-0  px-2 h-full transition-all duration-300 ease-in-out',
                isOpen ? 'top-0' : '-top-300'
            ])}>
            <Card
                onClick={(e) => e.stopPropagation()}
                style={{ width: `${width}px` }}
                className='overflow-y-auto max-h-[600px]'>
                <CardContent className='space-y-2'>
                    <CardTitle className='text-xl'>{title}</CardTitle>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}

export default Modal
