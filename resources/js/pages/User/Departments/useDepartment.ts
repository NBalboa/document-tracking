import DepartmentController from '@/actions/App/Http/Controllers/DepartmentController';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Department } from '../Users/types';

type FormData = {
    name: string
}

export const useDepartment = () => {
    const { data, setData, post, errors, reset, processing, put, delete: destroy, clearErrors } = useForm<FormData>({
        name: ""
    })


    const { flash } = usePage<SharedData>().props;

    const [isShowModal, setIsShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [department, setDepartment] = useState<Department | undefined>(undefined)

    const handleToggleModal = ({ department, isEdit = false }: { isEdit?: boolean, department?: Department }) => {
        if (isEdit && department) {
            setIsEdit(isEdit)
            clearErrors()
        }
        else {
            setIsEdit(false)
        }
        setIsShowModal((prev) => !prev);
        setDepartment(department)
    };
    const handleChange = ({ data, event }: { event: React.ChangeEvent<HTMLInputElement>, data: keyof FormData }) => {
        setData(data, event.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!processing) {
            if (isEdit && department) {
                put(DepartmentController.update.url({ id: department.id }), {
                    onSuccess: () => {
                        reset()
                        handleToggleModal({ isEdit: false })
                        setDepartment(undefined)
                    },
                    replace: true
                })
            }
            else {
                post(DepartmentController.store.url(), {
                    onSuccess: () => {
                        reset()
                        handleToggleModal({ isEdit: false })
                    },
                    replace: true
                })
            }
        }
    }

    const handleDelete = (id: number) => {
        destroy(DepartmentController.delete.url({ id }), {
            preserveState: false
        })
    }

    useEffect(() => {

        if (!flash.success) return;

        toast.success(flash.success)
    }, [flash.success])


    useEffect(() => {
        if (!isEdit || !department) {
            setData("name", "")
        }
        else {
            setData('name', department.name)
        }


    }, [isEdit, department, setData])

    return {
        isShowModal,
        handleToggleModal,
        handleChange,
        data,
        handleSubmit,
        errors,
        processing,
        isEdit,
        department,
        handleDelete
    }
}



