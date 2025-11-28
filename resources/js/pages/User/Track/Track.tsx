import { AuthLayout } from '@/layouts/AuthLayout'
import { Track as TrackType } from './types';
import { Document, DocumentType } from '../Documents/types';

const Track = ({ document }: {
    document?: Document & {
        document_type: DocumentType
        tracks: TrackType[]
    }
}) => {


    return (
        <AuthLayout>
            {document ?
                <div className='border-1 border-border rounded-lg p-10 shadow-md space-y-5'>
                    <div className='space-y-2'>
                        <h3 className="text-lg font-bold">{document.name} <span className='font-normal text-muted-foreground'>({document.document_type.name})</span></h3>
                        <p className='text-muted-foreground'>{document.description}</p>
                    </div>
                    <div>
                        {document.tracks.map((track) => (
                            <div className="space-y-8" key={track.id}>
                                <div className="flex relative">
                                    <div className="space-y-1 text-right w-48 pe-5">
                                        <h3 className="font-medium">{track.created_at.date}</h3>
                                        <span className="text-sm text-gray-500">{track.created_at.time}</span>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l border-gray-300"></div>
                                        <div
                                            className="w-3 h-3 bg-background border-2 border-primary rounded-full absolute left-1/2 top-0 -translate-x-1/2 z-10">
                                        </div>
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
                : undefined}
        </AuthLayout>
    )
}

export default Track
