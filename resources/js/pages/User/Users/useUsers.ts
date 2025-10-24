import UserController from "@/actions/App/Http/Controllers/UserController";
import { SharedData } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react"
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

type FormData = {
    first_name: string
    last_name: string,
    middle_name?: string,
    email: string,
    phone: string,
    password: string,
    confirm_password: string,
    department?: number,
    role: string,
}

export const useUsers = () => {

    const [isShowDeparment, setIshowDepartment] = useState(false);
    const [isShowRoles, setIsShowRoles] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const { flash } = usePage<SharedData>().props;

    const { data, setData, errors, post, processing, reset } = useForm<FormData>({
        confirm_password: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        phone: "",
        department: undefined,
        middle_name: "",
        role: "user"
    });


    const handleShowDepartment = (value: boolean) => setIshowDepartment(value)
    const handleShowRoles = (value: boolean) => setIsShowRoles(value);
    const toggleIsShowModal = () => setIsShowModal((prev) => !prev)


    const handleChange = ({ data, event }: { data: keyof FormData, event: React.ChangeEvent<HTMLInputElement> }) => {
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

    const handleSelectDeparment = (value: string) => {
        setData('department', Number(value))
        setIshowDepartment(false)
    }

    const handleSelectRole = (value: string) => {
        setData('role', value)
        setIsShowRoles(false)
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!processing) {
            post(UserController.store.url(), {
                onSuccess: () => {
                    reset()
                    toggleIsShowModal()
                },
                replace: true
            })
        }
    }


    const handleDelete = (id: number) => {
        router.delete(UserController.delete.url({ id }), {
            preserveState: false
        })
    }

    useEffect(() => {

        if (!flash.success) return;

        toast.success(flash.success)

    }, [flash.success])

    return {
        handleChange,
        handleSelectDeparment,
        isShowDeparment,
        handleShowDepartment,
        data,
        isShowModal,
        toggleIsShowModal,
        handleSubmit,
        errors,
        processing,
        isShowRoles,
        handleShowRoles,
        handleSelectRole,
        handleDelete
    }
}


