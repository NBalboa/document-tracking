import Hero from '@/components/Hero';
import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';


export default function Welcome() {

    return (
        <>
            <Head title="Home" />
            <GuestLayout>
                <Hero />
            </GuestLayout>
        </>
    );
}
