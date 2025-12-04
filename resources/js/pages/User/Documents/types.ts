export type DocumentType = {
    id: number,
    name: string,
    created_at: string;
    updated_at: string;
}

export type TimeStamp = {
    created_at: string;
    updated_at: string;
}


export type Document = {
    id: string,
    name: string,
    description?: string
    others?: string
} & TimeStamp

