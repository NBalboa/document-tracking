import React, { useState } from 'react'
import { Document as AppDocument, DocumentType } from '../../Documents/types'
import { Track } from '../../Track/types'
import { User } from '../../Users/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/formatDate'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Report = ({ document }: {
    document: (AppDocument & {
        document_type: DocumentType
        latest_track: Track
        user: User
        tracks: (Track & { user: User })[]
    })
}) => {

    const [isShowTracks, setIsShowTracks] = useState<boolean>(false);

    return (
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
                <CardDescription>
                    <Button className='cursor-pointer' type='button' variant={'link'} onClick={() => setIsShowTracks((prev) => !prev)}>{isShowTracks ? "Hide" : "Show"} Tracks</Button>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isShowTracks && (
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
                )}
            </CardContent>
        </Card>
    )
}

export default Report
