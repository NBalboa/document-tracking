import { useEffect, useMemo, useState } from 'react'
import { useForm } from '@inertiajs/react';
import { FormData } from './useDocuments';
import { Document, DocumentType } from '../types';
import DocumentController from '@/actions/App/Http/Controllers/DocumentController';



const useEditDocument = () => {
    const [editDocument, setEditDocument] = useState<Document & { document_type: DocumentType } | undefined>(undefined);
    const [isShowList, setIsShowList] = useState(false);
    const { data, setData, errors, processing, put, reset } = useForm<FormData>({
        description: "",
        name: "",
        type: ""
    });

    const toggleIsShowModal = (document?: Document & { document_type: DocumentType }) => {
        setEditDocument(document);
    }

    const handleToggleList = () => setIsShowList(prev => !prev)

    const isShowModal = useMemo(() => {
        return editDocument ? true : false
    }, [editDocument])


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
    const handleSelect = (value: string) => {
        setData('type', value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!processing && editDocument) {
            put(DocumentController.update.url({ id: editDocument.id }), {
                onSuccess: () => {
                    reset()
                    toggleIsShowModal()
                },
                replace: true
            })
        }
    }

    useEffect(() => {
        if (!editDocument) return;
        setData("description", editDocument.description ?? "")
        setData("name", editDocument.name)
        setData("type", editDocument.document_type.name)
    }, [editDocument, setData])


    return {
        isShowModal,
        toggleIsShowModal,
        editDocument,
        isShowList,
        handleToggleList,
        errors,
        processing,
        handleChange,
        handleSelect,
        handleSubmit,
        data
    }

}

export default useEditDocument
