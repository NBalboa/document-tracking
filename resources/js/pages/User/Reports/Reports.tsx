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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/formatDate'
import { Badge } from '@/components/ui/badge'


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
                        <Card key={document.id}>
                            <CardHeader>
                                <div className='flex justify-between items-center'>
                                    <div className='space-y-1'>
                                        <p className='text-muted-foreground'>ID: {document.id}</p>
                                        <CardTitle>{document.name} -
                                            <Badge className='ms-2 capitalize'>{document.latest_track.status}</Badge>
                                        </CardTitle>
                                    </div>
                                    <CardTitle>{formatDate({ date: document.created_at })}</CardTitle>
                                </div>
                                <CardDescription>Author: {document.user.first_name} {document.user.last_name}</CardDescription>
                                <CardDescription>Deparment: {document.user.department.name}</CardDescription>
                                <CardDescription>Type: {document.document_type.name}</CardDescription>
                                <CardDescription>Description: {document.description}</CardDescription>
                                <CardDescription>Others: {document.others}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    {document.tracks.map((track) => (
                                        <div className="space-y-8" key={track.id}>
                                            <div className="flex relative">
                                                <div className="space-y-1 text-right w-48 pe-5">
                                                    <h3 className="font-medium text-sm">{track.created_at.date}</h3>
                                                    <span className="text-sm text-gray-500">{track.created_at.time}</span>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l border-gray-300"></div>
                                                    <div
                                                        className="w-3 h-3 bg-background border-2 border-primary rounded-full absolute left-1/2 top-0 -translate-x-1/2 z-10">
                                                    </div>
                                                </div>
                                                <div className="space-y-1 ps-5 pb-5">
                                                    <h4 className="font-semibold text-text-foreground capitalize text-sm">{track.status}</h4>
                                                    <p className="text-foreground text-sm">{track.user.first_name} {track.user.last_name}</p>
                                                    <h2 className="text-muted-foreground text-sm">{track.user.department.name}</h2>
                                                    {track.remarks && (
                                                        <p className='text-muted-foreground text-sm'>{track.remarks}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthLayout>
    )
}

export default Reports
