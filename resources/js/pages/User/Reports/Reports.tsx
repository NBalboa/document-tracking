import Search from '@/components/Search'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Document as AppDocument, DocumentType } from '../Documents/types'
import { router } from '@inertiajs/react'
import ReportController from '@/actions/App/Http/Controllers/ReportController'
import { Track } from '../Track/types'
import { Department, User } from '../Users/types'
import Report from './parts/Report'


const Reports = ({
    statuses,
    documentTypes,
    filters,
    documents,
    departments
}: {
    documents: (AppDocument & {
        document_type: DocumentType
        latest_track: Track
        user: User
        tracks: (Track & { user: User })[]
    })[],
    statuses: string[],
    documentTypes: DocumentType[],
    filters: {
        type: string,
        date: string,
        status: string,
        search: string,
        department: string,
    }
    departments: Department[]
}) => {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<string>(filters.date ?? "")
    const [status, setStatus] = useState<string>(filters.status ?? "");
    const [type, setType] = useState<string>(filters.type ?? "");
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [department, setDepartment] = useState<string>(filters.department ?? "");
    const [debounceSearch, setDebounceSearch] = useState(search);


    useEffect(() => {
        if (filters.date === date &&
            filters.search === debounceSearch &&
            filters.type === type &&
            filters.status === status &&
            filters.department === department
        ) return;


        router.get(ReportController.index.url({
            query: {
                status,
                type,
                date,
                search: debounceSearch,
                department
            }
        }), {}, {
            replace: true,
            preserveState: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, status, type, debounceSearch, department])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceSearch(search)
        }, 500)

        return () => clearTimeout(timeout)
    }, [search])



    return (
        <AuthLayout>
            <div className='space-y-2'>
                <div>
                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-2   md:grid-cols-5'>
                        <Search value={search} onHandleChange={(e) => setSearch(e.target.value)} />
                        <div className='w-full sm:max-w-xs'>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Document Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>All</SelectItem>
                                    {documentTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-full sm:max-w-xs'>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>All</SelectItem>
                                    {departments.map((department) => (
                                        <SelectItem key={department.id} value={department.name}>{department.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-full sm:max-w-xs'>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-full capitalize">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>All</SelectItem>
                                    {statuses.map((status) => (
                                        <SelectItem key={status} value={status} className='capitalize'>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-full sm:max-w-xs'>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-full justify-between font-normal"
                                    >
                                        {date ? date : "Select date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={new Date(date)}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date?.toLocaleDateString() ?? "")
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                {documents.length > 0 && (
                    <div>
                        <div className="tracking-tight @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">Result: {documents.length}</div>
                    </div>
                )}
                <div>
                </div>
                <div className='space-y-2'>
                    {documents.map((document) => (
                        <Report document={document} key={document.id} />
                    ))}
                </div>
            </div>
        </AuthLayout>
    )
}

export default Reports
