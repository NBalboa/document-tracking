import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Command } from 'cmdk'
import { DocumentType } from '../types'
import { useMemo } from 'react'
import { FormData } from '../hooks/useDocuments'

const CreateDocumentModal = ({
    isShowModal = false,
    onHandleToggleModal,
    onHandleSubmit,
    errors,
    data,
    isShowList,
    onHandleToggleList,
    documentTypes,
    onHandleChangeName,
    onHandleChangeType,
    onHandleSelect,
    onHandleChangeDescription,
    processing
}: {
    isShowModal?: boolean,
    onHandleToggleModal: () => void
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
        <Modal title='Create Document' isOpen={isShowModal} onHandleClose={onHandleToggleModal}>
            <form className='space-y-6' onSubmit={onHandleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Document Name</FieldLabel>
                        {errors.name && <FieldError>{errors.name}</FieldError>}
                        <Input
                            type='text'
                            value={data.name}
                            onChange={onHandleChangeName}
                        />
                    </Field>
                    <Field className='relative'>
                        <FieldLabel htmlFor="department">Document Type</FieldLabel>
                        {errors.type && <FieldError>{errors.type}</FieldError>}
                        <Input type='text'
                            onFocus={onHandleToggleList}
                            onBlur={() =>
                                setTimeout(() => {
                                    onHandleToggleList()
                                }, 300)}
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
                        <FieldLabel>Other Specify</FieldLabel>
                        <Textarea
                            value={data.description}
                            onChange={onHandleChangeDescription}
                        />
                    </Field>
                    <Field>
                        <Button disabled={processing} type='submit'>Save</Button>
                    </Field>
                </FieldGroup>
            </form>
        </Modal>
    )
}

export default CreateDocumentModal
