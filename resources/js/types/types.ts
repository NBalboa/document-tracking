export type Paginate<T> = {
    current_page: number,
    data: T[],
    first_page_url: string
    from: number,
    last_page: number,
    last_page_url: string,
    links: Link[]
    next_page_url?: string,
    path: string,
    per_page: number,
    prev_page_url?: string
    total: number,
}


export type Link = {
    url?: string,
    label: string,
    page?: number,
    active: boolean,
}

export enum IsRead {
    READ = 1,
    UNREAD = 0
}
