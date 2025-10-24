
import Modal from '@/components/Modal'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Textarea } from '@/components/ui/textarea'
import { Document } from '../types'
import { Button } from '@/components/ui/button'
import { TrackStatus } from '../../Track/types'
import { cn } from '@/lib/utils'
import { UpdateFormData } from '../hooks/useDocuments'

const UpdateDocumentModal = ({
    activeDocument,
    onHandleClose,
    isOpen,
    onHandleSubmit,
    errors,
    isShowStatus,
    data,
    statuses,
    onHandleToggleStatus,
    onHandleSelectStatus,
    onHandleChangeRemarks
}: {
    onHandleClose: () => void,
    isOpen: boolean,
    activeDocument?: Document,
    onHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    errors: Partial<Record<keyof UpdateFormData, string>>,
    isShowStatus: boolean,
    data: UpdateFormData,
    statuses: TrackStatus[],
    onHandleToggleStatus: () => void,
    onHandleSelectStatus: (value: string) => void,
    onHandleChangeRemarks: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
    return (
        <Modal
            isOpen={isOpen} title='Update Document'
            onHandleClose={onHandleClose}
        >
            <h2 className='text-md text-muted-foreground'>{activeDocument?.name}</h2>
            <form className='space-y-6' onSubmit={onHandleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="status" >Status</FieldLabel>
                        {errors.status && (<FieldError>{errors.status}</FieldError>)}
                        <Popover open={isShowStatus} onOpenChange={onHandleToggleStatus}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={isShowStatus}
                                    className="w-[200px] justify-between capitalize"
                                >
                                    {data.status
                                        ? statuses.find((status) => status === data.status)
                                        : "Select Status"}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search Status..." />
                                    <CommandList>
                                        <CommandEmpty>No Department found.</CommandEmpty>
                                        <CommandGroup>
                                            {statuses.map((status) => (
                                                <CommandItem
                                                    key={status}
                                                    value={status}
                                                    onSelect={onHandleSelectStatus}
                                                    className={cn('capitalize',
                                                        status === "created" && 'hidden'
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",

                                                            data.status === status ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {status}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </Field>
                    <Field>
                        <FieldLabel>Remarks</FieldLabel>
                        <Textarea
                            value={data.remarks}
                            onChange={onHandleChangeRemarks}
                        />
                    </Field>
                    <Field>
                        <Button type='submit'>Save</Button>
                    </Field>
                </FieldGroup>
            </form>
        </Modal>
    )
}

export default UpdateDocumentModal
