import Modal from '@/components/Modal'
import React, { useMemo } from 'react'
import { Document, DocumentType } from '../types'
import { FormData } from '../hooks/useDocuments'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const EditDocumentModal = ({
    isOpen,
    onHandleClose,
    document,
    data,
    documentTypes,
    errors,
    isShowList,
    onHandleChangeDescription,
    onHandleChangeName,
    onHandleChangeType,
    onHandleSelect,
    onHandleSubmit,
    onHandleToggleList,
    processing
}: {
    isOpen: boolean,
    onHandleClose: () => void,
    document?: Document,
    onHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    errors: Partial<Record<keyof FormData, string>>
    data: FormData,
    isShowList: boolean,
    onHandleToggleList: () => void,
    documentTypes: DocumentType[],
    processing: boolean,
    onHandleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onHandleChangeType: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onHandleSelect: (value: string) => void,
    onHandleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}) => {

    const filtered = useMemo(() => {
        if (!data.type) return documentTypes;

        return documentTypes.filter((item) => item.name.includes(data.type))

    }, [data, documentTypes])

    return (
        <Modal
            title='Edit Document'
            isOpen={isOpen} onHandleClose={onHandleClose}>
            <h2 className='text-md text-muted-foreground'>{document?.name}</h2>
            <form className='space-y-6' onSubmit={onHandleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                        <Input
                            type='text'
                            value={data.name}
                            onChange={onHandleChangeName}
                        />
                    </Field>
                    <Field className='relative'>
                        <FieldLabel htmlFor="department" >Type</FieldLabel>
                        {errors.type && <FieldError>{errors.type}</FieldError>}
                        <Input type='text'
                            onFocus={onHandleToggleList}
                            onBlur={() =>
                                setTimeout(() => {
                                    onHandleToggleList()
                                }, 100)}
                            value={data.type}
                            onChange={onHandleChangeType}
                        />
                        <Command className={cn(['overflow-y-auto', isShowList ? 'absolute top-full  max-h-[105px] translate-y-2 ' : 'hidden', 'bg-popover text-popover-foreground  rounded-md border p-4 shadow-md outline-hidden', !filtered.length && 'hidden'])}>
                            <CommandList>
                                <CommandGroup>
                                    {filtered
                                        .map((item) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.name}
                                                onSelect={onHandleSelect}
                                            >
                                                {item.name}
                                            </CommandItem>
                                        ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </Field>
                    <Field>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea
                            value={data.description}
                            onChange={onHandleChangeDescription}
                        />
                    </Field>
                    <Field>
                        <Button disabled={processing} type='submit'>Save Changes</Button>
                    </Field>
                </FieldGroup>
            </form>
        </Modal>
    )
}

export default EditDocumentModal
