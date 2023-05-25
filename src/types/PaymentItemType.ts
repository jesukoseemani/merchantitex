export interface PaymentLinkItem {
    paymentlink?: Paymentlink | undefined;
    transactions?: TransactionRes;
    formfields?: Formfield[];
    code?: string;
    message?: string;
}

export interface Formfield {
    id?: number;
    linkid?: number;
    label?: string;
    labelKey?: string;
    value?: null;
}

export interface Paymentlink {
    id?: null;
    user?: User;
    paymentreference?: string;
    linkName?: string;
    linkType?: string;
    amount?: number;
    currency?: string;
    description?: string;
    status?: string;
    redirectUrl?: string;
    paymenturl?: string;
    pageImage?: string;
    donationWebsite?: string;
    donationContact?: string;
    subInterval?: null;
    subChargeCount?: number;
    isDeleted?: null;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    role?: null;
}

export interface TransactionRes {
    _metadata?: Metadata;
    transactions?: Transaction[];
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

export interface Transaction {
    id?: number;
    customer?: Customer;
    paymentid?: string;
    paymentlinkreference?: string;
    merchantreference?: string;
    reference?: string;
    amount?: number;
    currency?: string;
    chargetype?: string;
    timein?: string;
    cardtype?: string;
    mask?: string;
    responsecode?: string;
    responsemessage?: string;
}

export interface Customer {
    customerid?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
}
