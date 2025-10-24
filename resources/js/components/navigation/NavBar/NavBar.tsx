import { IoMenu } from 'react-icons/io5'
import { useNavBar } from './useNavBar'
import { Button } from '@/components/ui/button'
import { NavLinks } from './parts/NavLinks'
import NavLink from './parts/NavLink'
import { Menu } from './parts/Menu'
import MenuItem from './parts/MenuItem'

export const NavBar = () => {
    const {
        handleShowMenu,
        isShowMenu,
        handleLogin,
        user,
        handleLogout
    } = useNavBar()

    return (
        <div className='sticky top-0 bg-background flex items-center justify-between px-4 py-2 border-b-1 border-border '>
            <div className='flex items-center gap-2 cursor-pointer'>
                <img src='/logo.png' className='h-[45px] w-[45px]' />
                <a href='/' className='text-foreground text-md'>Document Tracking System</a>
            </div>
            <NavLinks
                cta={<Button size={'sm'} onClick={user ? handleLogout : handleLogin} className='cursor-pointer'>{user ? "Logout" : "Login"}</Button>}
            >
                <NavLink to='/' label='Home' />
            </NavLinks>
            <Button size={'sm'} className='block md:hidden' onClick={handleShowMenu}>
                <IoMenu className='text-xl' />
            </Button>
            <Menu isShowMenu={isShowMenu}
                cta={<Button size={'sm'} onClick={user ? handleLogout : handleLogin} className='cursor-pointer'>{user ? "Logout" : "Login"}</Button>}
            >
                <MenuItem to='/' label='Home' />
            </Menu>
        </div>
    )
}
