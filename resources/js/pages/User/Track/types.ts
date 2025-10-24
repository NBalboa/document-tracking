import { TimeStamp } from "../Documents/types"
import { User } from "../Users/types"

export type Track = Pick<TimeStamp, 'updated_at'> & {
    id: number,
    user_id: number,
    document_id: string,
    remarks?: string,
    user: User
    status: TrackStatus
    created_at: {
        date: string,
        time: string
    }
}


export type TrackStatus = "created" | "transferring" | "received" | "reviewed" | "approved" | "completed"
