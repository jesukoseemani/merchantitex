export interface InvoiceRes {
    _metadata?: Metadata | undefined;
    invoices?: Invoice[];
    code?: string;
    message?: string;
}

export interface Metadata {
    page?: number;
    perpage?: number;
    pagecount?: number;
    totalcount?: number;
    links?: any[];
}

export interface Invoice {
    id?: number;
    customer?: Customer;
    paymentreference?: string;
    invoiceName?: string;
    dueDate?: string;
    currency?: string;
    totalAmount?: number;
    status?: string;
    createdAt?: string;
    invoiceUrl?: string;
}

export interface Customer {
    id?: number;
    identifier?: null | string;
    email?: string;
    firstname?: string;
    lastname?: string;
}
