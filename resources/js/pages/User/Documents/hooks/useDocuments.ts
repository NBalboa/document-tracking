import DocumentController from '@/actions/App/Http/Controllers/DocumentController';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import TrackController from '@/actions/App/Http/Controllers/TrackController';
import { Document } from '../types';

export type FormData = {
    name: string,
    type: string,
    description: string,
    others: string
}

export type UpdateFormData = {
    remarks: string,
    status: string,
}

export const useDocuments = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowList, setIsShowList] = useState(false);
    const [activeDocument, setActiveDocument] = useState<Document | undefined>(undefined);
    const { flash } = usePage<SharedData>().props
    const [isShowStatus, setIsShowStatus] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);


    const { data, setData, post, errors, processing, reset } = useForm<FormData>({
        description: "",
        name: "",
        type: "",
        others: ""
    });

    const {
        data: updateData,
        setData: setUpdateSetData,
        errors: updateErrors,
        processing: updateProcessing,
        post: updatePost
    } = useForm<UpdateFormData>({
        remarks: "",
        status: ""
    })
    const handleToggleList = () => setIsShowList(prev => !prev)
    const handleToggleModal = () => setIsShowModal(prev => !prev)
    const handleToggleIsShowStatus = () => setIsShowStatus(prev => !prev)

    const handleToggleToggleDocument = (document?: Document) => {
        setActiveDocument(document)
    }

    const isShowEditDocument = useMemo(() => {
        return activeDocument ? true : false
    }, [activeDocument])

    const handleChange = ({
        e,
        data
    }: {
        e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
        data: keyof FormData
    }) => {
        setData(data, e.target.value)
    }


    const handleChangeUpdate = ({
        data,
        e
    }: {
        e: React.ChangeEvent<HTMLTextAreaElement>,
        data: keyof UpdateFormData
    }) => {
        setUpdateSetData(data, e.target.value)
    }

    const handleSelect = (value: string) => {
        setData('type', value)
    }

    const handleSelectStatus = (value: string) => {
        setUpdateSetData('status', value)
        handleToggleIsShowStatus()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!processing) {
            post(DocumentController.store.url(), {
                onSuccess: () => {
                    reset()
                    handleToggleModal()
                },
                replace: true,
                preserveState: false
            })
        }
    }
    const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!updateProcessing && activeDocument) {
            updatePost(TrackController.store.url({ id: activeDocument.id }), {
                onSuccess: () => {
                    reset()
                    handleToggleToggleDocument()
                },
                replace: true,
                preserveState: false
            })
        }
    }


    const handleDelete = (value: string) => {
        router.delete(DocumentController.delete.url(value))
    }

    const handlePrint = () => {
        const svg = wrapperRef.current?.querySelector("svg");
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgData = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        const doc = printWindow.document;

        doc.open();
        doc.write(`
        <html>
            <head>
                <title>Print QR</title>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <img id="qr-img" width="250" height="250" />
            </body>
        </html>
    `);
        doc.close();

        const img = doc.getElementById("qr-img");
        if (img) {
            img.onload = () => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
                URL.revokeObjectURL(url);
            };
            img.src = url;
        }
    };


    useEffect(() => {
        if (!flash.success) return

        toast.success(flash.success)
    }, [flash.success])

    return {
        data,
        handleChange,
        isShowModal,
        handleToggleModal,
        handleSubmit,
        handleSelect,
        isShowList,
        handleToggleList,
        errors,
        processing,
        activeDocument,
        handleToggleToggleDocument,
        isShowEditDocument,
        updateData,
        updateErrors,
        isShowStatus,
        handleToggleIsShowStatus,
        handleSelectStatus,
        handleSubmitUpdate,
        handleChangeUpdate,
        handleDelete,
        wrapperRef,
        handlePrint
    }
}

