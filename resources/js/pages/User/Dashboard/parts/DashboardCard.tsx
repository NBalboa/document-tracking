import { Card, CardTitle } from '@/components/ui/card'
import React from 'react'

const DashboardCard = ({ sub, title, icon }: { icon: React.ReactNode, title: string, sub: string | number }) => {
    return (
        <Card className="p-4 w-full">
            <div className="bg-primary rounded-md w-[50px] h-[50px] p-1 flex items-center justify-center">
                {icon}
            </div>
            <CardTitle className='text-muted-foreground'>{title}</CardTitle>
            <CardTitle className="text-5xl">{sub}</CardTitle>
        </Card>
    )
}

export default DashboardCard
