
import Modal from '@/components/Modal'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Textarea } from '@/components/ui/textarea'
import { UpdateFormData } from '../hooks/useDocuments'
import { Button } from '@/components/ui/button'
import { TrackStatus } from '../../Track/types'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'


const ScanDocumentModal = ({
    errors,
    isOpen,
    onHandleToggleQrScanner,
    videoRef,
    isShowStatus,
    data,
    onHandleToggleIsShowStatus,
    statuses,
    onHandleSelectStatus,
    onHandleChangeRemarks,
    handleToggleIsManual,
    isManual,
    documentId,
    onHandleChangeDocumnetId,
    onHandleSubmit
}: {
    isOpen: boolean,
    onHandleToggleQrScanner: () => void,
    videoRef: React.RefObject<HTMLVideoElement | null>,
    errors: Partial<Record<keyof UpdateFormData, string>>,
    isShowStatus: boolean
    data: UpdateFormData,
    onHandleToggleIsShowStatus: () => void,
    statuses: TrackStatus[],
    onHandleSelectStatus: (value: string) => void,
    onHandleChangeRemarks: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isManual: boolean
    handleToggleIsManual: () => void,
    onHandleChangeDocumnetId: (e: React.ChangeEvent<HTMLInputElement>) => void,
    documentId: string,
    onHandleSubmit: () => void

}) => {
    return (
        <Modal title='Scan QR Document' isOpen={isOpen} onHandleClose={onHandleToggleQrScanner}>
            <Button onClick={handleToggleIsManual}>{isManual ? "Scan" : "Manual"}</Button>
            <div className="flex flex-col items-center gap-3">
                {
                    isManual ? (<Field>
                        <FieldLabel>Document Id</FieldLabel>
                        <Input value={documentId} onChange={onHandleChangeDocumnetId} />
                    </Field>) : (
                        <Field className='relative'>
                            {
                                isOpen
                                && (<video ref={videoRef} className='rounded-md shadow-md border-1 border-border' />)
                            }
                        </Field>
                    )
                }

                <Field>
                    <FieldLabel htmlFor="status" >Status</FieldLabel>
                    {errors.status && (<FieldError>{errors.status}</FieldError>)}
                    <Popover open={isShowStatus} onOpenChange={onHandleToggleIsShowStatus}>
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
                                    <CommandEmpty>No Status found.</CommandEmpty>
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
                {isManual && (

                    <Field>
                        <Button onClick={onHandleSubmit}>Submit</Button>
                    </Field>
                )}
            </div>
        </Modal>
    )
}

export default ScanDocumentModal
