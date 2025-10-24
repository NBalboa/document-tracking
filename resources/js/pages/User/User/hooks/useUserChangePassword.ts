import UserController from '@/actions/App/Http/Controllers/UserController'
import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

type FormData = {
    old_password: string
    new_password: string
    confirm_password: string
}

export const useUserChangePassword = (id: number) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const { data, setData, errors, put, processing, reset } = useForm<FormData>({
        confirm_password: "",
        new_password: "",
        old_password: ""
    })

    const handleToggleIsShowPassword = () => setIsShowPassword(prev => !prev);

    const handleChange = ({ data, event }: { data: keyof FormData, event: React.ChangeEvent<HTMLInputElement> }) => {

        setData(data, event.target.value);
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!processing) {
            put(UserController.updateUserPassword.url({ id }), {
                onSuccess: () => {
                    reset()
                    setIsShowPassword(false);
                },
                replace: true
            })
        }

    }

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
        processing,
        isShowPassword,
        handleToggleIsShowPassword
    }
}

