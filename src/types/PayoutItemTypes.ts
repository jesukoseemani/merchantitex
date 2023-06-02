export interface PayoutItemRes {
    payout?: Payout | undefined;
    user?: null;
    code?: string;
    message?: string;
}

export interface Payout {
    id?: number;
    merchantid?: number;
    userid?: number;
    balanceaccountid?: null;
    keyid?: number;
    linkingreference?: string;
    merchantreference?: string;
    reference?: string;
    processorreference?: null;
    timein?: string;
    amount?: number;
    currency?: string;
    country?: string;
    transfertype?: string;
    route?: string;
    network?: string;
    narration?: string;
    accounttype?: null;
    recipientbankcode?: string;
    recipientbranchcode?: null;
    recipientaccountnumber?: string;
    recipientname?: null;
    recipientcountry?: null;
    recipientidtype?: null;
    recipientaccountype?: null;
    timeout?: string;
    responsecode?: string;
    responsemessage?: string;
    recipientbank?: null;
    merchantbalancebefore?: null;
    merchantbalanceafter?: null;
    fee?: number;
}
