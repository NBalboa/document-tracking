import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AuthLayout } from '@/layouts/AuthLayout'
import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Document, DocumentType } from '../Documents/types'
import { Track } from '../Track/types'
import { Badge } from '@/components/ui/badge'
import { router } from '@inertiajs/react'
import TrackController from '@/actions/App/Http/Controllers/TrackController'

const Tracks = ({
    documents,
    allIds,
    search,
    notFoundsIds
}: {
    documents: (Document & { document_type: DocumentType, tracks: Track[] })[],
    allIds: string[]
    search: string,
    notFoundsIds: string[]
}) => {

    const [idsSearch, setIdsSearch] = useState(search || "");

    const handleSearch = () => {

        router.get(TrackController.index.url({
            query: {
                search: idsSearch
            }
        }
        ))
    }

    return (
        <AuthLayout>
            <div className='space-y-2'>

                <Field>
                    <FieldLabel>Search <span className='text-sm text-muted-foreground'>(separate multiple IDs with commas, e.g., abcd, efgh)</span></FieldLabel>
                    <div className='relative'>
                        <Input value={idsSearch} onChange={(e) => setIdsSearch(e.target.value)} />
                        <Button onClick={handleSearch} className='absolute top-0 bottom-0 right-0' size={'icon'}>
                            <FaMagnifyingGlass />
                        </Button>
                    </div>
                </Field>
                <div className='flex gap-5'>
                    <div className='hidden md:block'>
                        {allIds.length ? (
                            <ul className='flex flex-col items-end p-5 rounded-md shadow-md border-1 border-border'>
                                {allIds.map((id) => (
                                    <li key={id}>
                                        <Badge>{id}</Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : undefined}
                    </div>
                    <div className='w-[100%] space-y-2'>
                        {documents.map((document) => (
                            <div key={document.id} className='border-1 border-border rounded-lg p-10 shadow-md space-y-5'>
                                <div className='space-y-2'>
                                    <h3 className="text-lg font-bold">{document.name} <span className='font-normal text-muted-foreground'>({document.document_type.name})</span></h3>
                                    <p className='text-muted-foreground'>{document.description}</p>
                                </div>
                                <div>
                                    {document.tracks.map((track) => (
                                        <div className="space-y-8" key={track.id}>
                                            <div className="flex gap-5 relative">
                                                <div className="space-y-1 text-right">
                                                    <h3 className="font-medium">{track.created_at.date}</h3>
                                                    <span className="text-sm text-gray-500">{track.created_at.time}</span>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l border-gray-300"></div>
                                                    <div
                                                        className="w-3 h-3 bg-background border-2 border-primary rounded-full absolute left-1/2 top-0 -translate-x-1/2 z-10"></div>
                                                </div>
                                                <div className="space-y-1 ps-5 pb-5">
                                                    <h4 className="font-semibold text-text-foreground capitalize text-xl">{track.status}</h4>
                                                    <p className="text-foreground text-lg">{track.user.first_name} {track.user.last_name}</p>
                                                    <h2 className="text-muted-foreground text-md">{track.user.department.name}</h2>
                                                    {track.remarks && (
                                                        <p className='text-muted-foreground text-sm'>{track.remarks}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {notFoundsIds.map((id) => (
                            <div key={id} className='border-1 border-border rounded-lg p-5 shadow-md space-y-5'>
                                <h3 className="text-lg font-bold">Document not found with {id}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Tracks
