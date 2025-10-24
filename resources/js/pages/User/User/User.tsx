import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Department, Role, User as UserType } from '../Users/types'
import { useUser } from './hooks/useUser'
import { useChangePassword } from './hooks/useChangePassword'
import { useUserChangePassword } from './hooks/useUserChangePassword'
import { usePage } from '@inertiajs/react'
import { SharedData } from '@/types'
import SecureText from '@/components/SecureText'
import { allowedRoles } from '@/lib/allowedRoles'

const User = ({
    departments,
    roles,
    user
}: {
    departments: Department[],
    roles: Role[],
    user: UserType
}) => {


    const {
        data,
        handleSelectDeparment,
        handleSelectRole,
        handleShowDepartment,
        handleShowRoles,
        isShowDeparment,
        isShowRoles,
        errors,
        handleChange,
        handleSubmit
    } = useUser(user)

    const {
        data: dataChangePassword,
        errors: errorsChangePassword,
        handleChange: handleChangeChangePassword,
        handleSubmit: handleSubmitChangePassword,
        handleToggleIsShowPassword,
        isShowPassword
    } = useChangePassword(user.id)

    const {
        data: dataUserChangePassword,
        errors: errorsUserChangePassword,
        handleChange: handleChangeUserChangePassword,
        handleSubmit: handleSubmitUserChangePassword,
        handleToggleIsShowPassword: handleToggleIsShowPasswordUserChangePassword,
        isShowPassword: isShowPasswordUserChangePassword

    } = useUserChangePassword(user.id)

    const { auth } = usePage<SharedData>().props;

    return (
        <>
            {auth.user && (
                <AuthLayout>
                    <div className='flex flex-col gap-4 items-center md:flex-row md:items-start  justify-center'>
                        <div className='space-y-2 w-sm rounded-md border-1 border-border p-4'>
                            <h2 className='text-2xl font-bold'>Profile</h2>
                            <form onSubmit={handleSubmit}>
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
                                            value={data.middle_name ?? ""}
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
                                    {allowedRoles({ roles: ['admin'], role: auth.user.role }) &&
                                        (
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
                                                                : "Select Role"}
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
                                    <Field>
                                        <Button type='submit'>Save Changes</Button>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </div>
                        {user.role === 'admin' || user.role === 'staff' ?
                            (
                                <div>
                                    <div className='space-y-2 w-sm rounded-md border-1 border-border p-4'>
                                        <h2 className='text-2xl font-bold'>Change Password</h2>
                                        <form onSubmit={handleSubmitChangePassword}>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel  >Password</FieldLabel>
                                                    {errorsChangePassword.password && (<FieldError>{errorsChangePassword.password}</FieldError>)}
                                                    <SecureText
                                                        isShowPassword={isShowPassword}
                                                        onHandleClick={handleToggleIsShowPassword}
                                                        value={dataChangePassword.password}
                                                        onHandleChange={(event) => handleChangeChangePassword({ data: 'password', event })} />

                                                </Field>
                                                <Field>
                                                    <FieldLabel>Confirm Password</FieldLabel>
                                                    {errorsChangePassword.confirm_password && (<FieldError>{errorsChangePassword.confirm_password}</FieldError>)}

                                                    <SecureText
                                                        isShowPassword={isShowPassword}
                                                        onHandleClick={handleToggleIsShowPassword}
                                                        value={dataChangePassword.confirm_password}
                                                        onHandleChange={(event) => handleChangeChangePassword({ data: 'confirm_password', event })}
                                                    />
                                                </Field>
                                                <Field>
                                                    <Button type='submit'>Save</Button>
                                                </Field>
                                            </FieldGroup>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div>

                                    <div className='space-y-2 w-sm rounded-md border-1 border-border p-4'>
                                        <h2 className='text-2xl font-bold'>Change Password</h2>
                                        <form onSubmit={handleSubmitUserChangePassword}>
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel>Old Password</FieldLabel>
                                                    {errorsUserChangePassword.old_password && (<FieldError>{errorsUserChangePassword.old_password}</FieldError>)}
                                                    <SecureText
                                                        isShowPassword={isShowPasswordUserChangePassword}
                                                        onHandleClick={handleToggleIsShowPasswordUserChangePassword}
                                                        value={dataUserChangePassword.old_password}
                                                        onHandleChange={(event) => handleChangeUserChangePassword({ data: 'old_password', event })}
                                                    />

                                                </Field>
                                                <Field>
                                                    <FieldLabel>New Password</FieldLabel>
                                                    {errorsUserChangePassword.new_password && (<FieldError>{errorsUserChangePassword.new_password}</FieldError>)}
                                                    <SecureText
                                                        isShowPassword={isShowPasswordUserChangePassword}
                                                        onHandleClick={handleToggleIsShowPasswordUserChangePassword}
                                                        value={dataUserChangePassword.new_password}
                                                        onHandleChange={(event) => handleChangeUserChangePassword({ data: 'new_password', event })}
                                                    />
                                                </Field>
                                                <Field>
                                                    <FieldLabel>Confirm Password</FieldLabel>
                                                    {errorsUserChangePassword.confirm_password && (<FieldError>{errorsUserChangePassword.confirm_password}</FieldError>)}
                                                    <SecureText
                                                        isShowPassword={isShowPasswordUserChangePassword}
                                                        onHandleClick={handleToggleIsShowPasswordUserChangePassword}
                                                        value={dataUserChangePassword.confirm_password}
                                                        onHandleChange={(event) => handleChangeUserChangePassword({ data: 'confirm_password', event })}
                                                    />
                                                </Field>
                                                <Field>
                                                    <Button type='submit'>Save</Button>
                                                </Field>
                                            </FieldGroup>
                                        </form>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </AuthLayout>
            )
            }
        </>
    )
}

export default User
