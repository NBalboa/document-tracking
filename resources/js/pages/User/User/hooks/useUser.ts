import { useForm, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import UserController from '@/actions/App/Http/Controllers/UserController'
import { SharedData } from '@/types'
import { toast } from 'react-toastify'
import { User } from '../../Users/types'

type UserFormData = {
    first_name: string
    last_name: string,
    middle_name?: string,
    email: string,
    phone: string,
    department?: number,
    role: string,
}

export const useUser = (user: User) => {

    const [isShowDeparment, setIshowDepartment] = useState(false);
    const [isShowRoles, setIsShowRoles] = useState(false);
    const { flash } = usePage<SharedData>().props;


    const handleShowDepartment = (value: boolean) => setIshowDepartment(value)
    const handleShowRoles = (value: boolean) => setIsShowRoles(value);

    const { data, setData, errors, processing, put } = useForm<UserFormData>({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        role: "",
        department: undefined,
        middle_name: ""
    })

    const handleSelectDeparment = (value: string) => {
        setData('department', Number(value))
        setIshowDepartment(false)
    }

    const handleSelectRole = (value: string) => {
        setData('role', value)
        setIsShowRoles(false)
    }

    const handleChange = ({ data, event }: { data: keyof UserFormData, event: React.ChangeEvent<HTMLInputElement> }) => {
        if (data === 'phone') {
            const value = event.target.value

            if (!/[^0-9]/.test(value) && value.length <= 11) {
                setData(data, event.target.value);
            }
        }
        else {
            setData(data, event.target.value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!processing) {
            put(UserController.update.url({ id: user.id }), {
                replace: true
            })
        }
    }


    useEffect(() => {
        setData("department", user.department.id);
        setData("email", user.email);
        setData("first_name", user.first_name)
        setData("last_name", user.last_name)
        setData("middle_name", user.middle_name)
        setData("phone", user.phone)
        setData("role", user.role)
    }, [setData, user])


    useEffect(() => {

        if (!flash.success) return;

        toast.success(flash.success)

    }, [flash.success])

    return {
        isShowDeparment,
        isShowRoles,
        handleShowDepartment,
        handleShowRoles,
        data,
        handleSelectDeparment,
        handleSelectRole,
        errors,
        handleChange,
        processing,
        handleSubmit
    }

}


