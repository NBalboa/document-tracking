import { buttonVariants } from './ui/button'
import { Link } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import TrackController from '@/actions/App/Http/Controllers/TrackController'

const Hero = () => {
    return (
        <div className='flex flex-col p-4 gap-5 justify-center md:items-center h-svh bg-back bg-background md:flex-row'>
            <div className='space-y-2'>
                <h2 className='text-3xl'>Streamlined Document Tracking for JH</h2>
                <p className='text-lg'>Empowering students, teachers, and staff with a transparent and efficient way to manage academic document requests and approvals</p>
                <Link href={TrackController.index.url()} className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>Track Document</Link>
            </div>
            <div>
                <img src='/hero.jpg' className='border-none rounded-md' />
            </div>
        </div>
    )
}

export default Hero
