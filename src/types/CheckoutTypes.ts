export interface CheckoutTypes {
    custom?: Custom;
    code?: string;
    message?: string;
}

export interface Custom {
    merchantlogo?: string;
    colors?: Color[] | undefined;
}

export interface Color {
    id?: number;
    name?: string;
    value?: string;
    other?: null;
}
