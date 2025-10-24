import { AuthLayout } from '@/layouts/AuthLayout'
import { Department, Role, User } from './types'
import { Button, buttonVariants } from '@/components/ui/button'
import Table from '@/components/table/Table'
import TableHead from '@/components/table/TableHead'
import TableBody from '@/components/table/TableBody'
import TableHeadCell from '@/components/table/TableHeadCell'
import TableCell from '@/components/table/TableCell'
import TableRow from '@/components/table/TableRow'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import Modal from '@/components/Modal'
import { useUsers } from './useUsers'
import { Paginate } from '@/types/types'
import { Link, useForm, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import PaginateComponent from '@/components/Paginate'
import Search from '@/components/Search'
import UserController from '@/actions/App/Http/Controllers/UserController'
import { allowedRoles } from '@/lib/allowedRoles'
import { SharedData } from '@/types'
import { isOwner } from '@/lib/isOwner'

const Users = ({
    users,
    departments,
    filter: search,
    roles
}: {
    users: Paginate<User>,
    departments: Department[],
    filter: string,
    roles: Role[]
}) => {
    const {
        data,
        handleChange,
        handleSelectDeparment,
        isShowDeparment,
        handleShowRoles,
        toggleIsShowModal,
        isShowModal,
        handleSubmit,
        errors,
        processing,
        isShowRoles,
        handleSelectRole,
        handleShowDepartment,
        handleDelete
    } = useUsers()

    const { data: filter, setData: setFilter, get } = useForm<{ search: string }>({
        search: search
    })

    const { auth } = usePage<SharedData>().props

    useEffect(() => {
        if (search === filter.search) return;

        const timeout = setTimeout(() => {
            get('/users', {
                preserveState: true,
                replace: true
            })
        }, 400)

        return () => clearTimeout(timeout)
    }, [filter.search, get, search])

    return (
        <>
            <AuthLayout>
                <div className='space-y-2'>
                    <div className='flex justify-end'>
                        <Button className='shadow-md' onClick={toggleIsShowModal}>Create</Button>
                    </div>
                    <Search
                        value={filter.search || ""}
                        onHandleChange={(e) => setFilter('search', e.target.value)}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Name</TableHeadCell>
                                <TableHeadCell>Email</TableHeadCell>
                                <TableHeadCell>Phone</TableHeadCell>
                                <TableHeadCell>Department</TableHeadCell>
                                <TableHeadCell>Action</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    {!isOwner({ ownerId: auth.user?.id, id: user.id }) && (
                                        <>
                                            <TableCell>{user.first_name} {user.last_name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{user.department.name}</TableCell>
                                            <TableCell>
                                                <div className='flex flex-col gap-1 md:flex-row'>
                                                    <Link href={UserController.user.url({ id: user.id })} className={cn(buttonVariants({ variant: 'secondary' }))}>Edit</Link>
                                                    {
                                                        allowedRoles({ roles: ['admin'], role: auth.user?.role }) && (
                                                            <Button variant={'destructive'} onClick={() => handleDelete(user.id)}>Delete</Button>
                                                        )
                                                    }
                                                </div>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginateComponent links={users.links} />
                </div>
            </AuthLayout >
            <Modal height={600} width={600} isOpen={isShowModal} onHandleClose={toggleIsShowModal} title='Create User'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="first_name" >First Name</FieldLabel>
                            {errors.first_name && (<FieldError>{errors.first_name}</FieldError>)}
                            <Input
                                id="first_name"
                                type="text"
                                placeholder='First Name'
                                value={data.first_name}
                                onChange={(event) => handleChange({ data: 'first_name', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="middle_name" >Middle Name (Optional)</FieldLabel>
                            {errors.middle_name && (<FieldError>{errors.middle_name}</FieldError>)}
                            <Input
                                id="middle_name"
                                type="text"
                                placeholder='Middle Name'
                                value={data.middle_name}
                                onChange={(event) => handleChange({ data: 'middle_name', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="last_name" >Last Name</FieldLabel>
                            {errors.last_name && (<FieldError>{errors.last_name}</FieldError>)}
                            <Input
                                id="last_name"
                                type="text"
                                placeholder='Last Name'
                                value={data.last_name}
                                onChange={(event) => handleChange({ data: 'last_name', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email" >Email</FieldLabel>
                            {errors.email && (<FieldError>{errors.email}</FieldError>)}
                            <Input
                                id="email"
                                type="text"
                                placeholder='Email'
                                value={data.email}
                                onChange={(event) => handleChange({ data: 'email', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phone" >Phone</FieldLabel>
                            {errors.phone && (<FieldError>{errors.phone}</FieldError>)}
                            <Input
                                id="phone"
                                type="text"
                                placeholder='Phone'
                                value={data.phone}
                                onChange={(event) => handleChange({ data: 'phone', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            {errors.password && (<FieldError>{errors.password}</FieldError>)}
                            <Input
                                id="password"
                                type="password"
                                placeholder='Password'
                                value={data.password}
                                onChange={(event) => handleChange({ data: 'password', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
                            {errors.confirm_password && (<FieldError>{errors.confirm_password}</FieldError>)}
                            <Input
                                id="confirm_password"
                                type="password"
                                placeholder='Confirm Password'
                                value={data.confirm_password}
                                onChange={(event) => handleChange({ data: 'confirm_password', event })}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="department" >Department</FieldLabel>
                            {errors.department && (<FieldError>{errors.department}</FieldError>)}
                            <Popover open={isShowDeparment} onOpenChange={handleShowDepartment}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={isShowDeparment}
                                        className="w-[200px] justify-between"
                                    >
                                        {data.department
                                            ? departments.find((department) => department.id === data.department)?.name
                                            : "Select Deparment"}
                                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search department..." />
                                        <CommandList>
                                            <CommandEmpty>No Department found.</CommandEmpty>
                                            <CommandGroup>
                                                {departments.map((department) => (
                                                    <CommandItem
                                                        key={department.id}
                                                        value={String(department.id)}
                                                        onSelect={handleSelectDeparment}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                data.department === department.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {department.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </Field>

                        {
                            allowedRoles({ roles: ['admin'], role: auth.user?.role }) && (
                                <Field>
                                    <FieldLabel htmlFor="department" >Role</FieldLabel>
                                    {errors.role && (<FieldError>{errors.role}</FieldError>)}
                                    <Popover open={isShowRoles} onOpenChange={handleShowRoles}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={isShowRoles}
                                                className="w-[200px] justify-between capitalize "
                                            >
                                                {data.role
                                                    ? roles.find((role) => role === data.role)
                                                    : "Select Deparment"}
                                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search role..." />
                                                <CommandList>
                                                    <CommandEmpty>No Department found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {roles.map((role) => (
                                                            <CommandItem
                                                                key={role}
                                                                value={String(role)}
                                                                onSelect={handleSelectRole}
                                                                className='capitalize'
                                                            >
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        data.role === role ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {role}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </Field>
                            )
                        }

                    </FieldGroup>
                    <Field>
                        <Button disabled={processing} type='submit'>Save</Button>
                    </Field>
                </form>
            </Modal>
        </>
    )
}

export default Users
