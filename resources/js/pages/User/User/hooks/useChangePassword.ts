import UserController from "@/actions/App/Http/Controllers/UserController"
import { useForm } from "@inertiajs/react"
import { useState } from "react"

type FormData = {
    password: string,
    confirm_password: string
}

export const useChangePassword = (id: number) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const { data, setData, errors, processing, put, reset } = useForm<FormData>({
        confirm_password: "",
        password: ""
    })

    const handleToggleIsShowPassword = () => setIsShowPassword(prev => !prev);

    const handleChange = ({ data, event }: { data: keyof FormData, event: React.ChangeEvent<HTMLInputElement> }) => {

        setData(data, event.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!processing) {
            put(UserController.updatePassword.url({ id }), {
                onSuccess: () => {
                    reset()
                    setIsShowPassword(false)
                },
                replace: true
            })
        }

    }

    return {
        data,
        errors,
        handleChange,
        handleSubmit,
        isShowPassword,
        handleToggleIsShowPassword
    }
}

