import { useForm } from "@inertiajs/react"
import React, { useState } from "react"

type FormDataLogin = {
    email: string,
    password: string
}

export const useLogin = () => {
    const { data, setData, post, errors } = useForm<FormDataLogin>({
        email: "",
        password: ""
    })

    const handleChange = ({ data, event }
        : {
            event: React.ChangeEvent<HTMLInputElement>,
            data: keyof FormDataLogin
        }) => {
        setData(data, event.target.value)
    }

    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleToggleIsShowPassword = () => setIsShowPassword(prev => !prev);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login', {
            replace: true
        });
    }

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
        isShowPassword,
        handleToggleIsShowPassword
    }
}

export default useLogin
