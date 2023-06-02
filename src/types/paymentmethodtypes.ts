export interface PaymentMethodRes {
    methods?: PaymentMethod[];
    code?: string;
    message?: string;
}

export interface PaymentMethod {
    merchantaccountmethodid?: number;
    merchantaccountid?: number;
    paymentmethod?: string;
    status?: boolean;
    iseditable?: boolean;
    currency?: string;
}
