export interface Ticket {
    id?: number;
    created_at?: Date;
    title: string;
    description: string;
    status?: string;
    status_display?: string;
    author?: string;
}

export interface TicketPage {
    count: number;
    next: string;
    previous: string;
    results: Array<Ticket>;
}

export interface Page {
    size: number;
    totalElements: number;
    totalPages: number;
    pageNumber: number;
}