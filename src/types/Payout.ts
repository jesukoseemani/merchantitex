export interface PayoutRes {
    _metadata: Metadata
    payouts: Payout[]
    code: string
    message: string
}

export interface Metadata {
    page: number
    perpage: number
    pagecount: number
    totalcount: number
    links: any[]
}

export interface Payout {
    id: number
    merchantaccountid: number
    merchantreference?: string
    linkingreference: string
    reference: string
    amount: number
    fee: number
    currency: string
    transfertype: any
    recipientbank: any
    recipientaccountnumber?: string
    recipientname?: string
    timein: string
    responsecode?: string
    responsemessage?: string
    merchantbalancebefore: any
    merchantbalanceafter: any
}
