export interface BusinessProfile {
    address?: Address | undefined;
    meta?: Meta[] | undefined;
    code?: string;
    message?: string;
}

export interface Address {
    merchantaccountaddressid?: number;
    merchantaccountid?: number;
    addresstype?: string;
    addressline1?: string;
    addressline2?: null;
    city?: null;
    state?: string;
    country?: string;
    createdat?: string;
    supportemail: string;
    supportphonenumber: number;
    chargebackemail: string;


}

export interface Meta {
    id?: number;
    name?: string;
    value?: string;
    other?: null;
}
