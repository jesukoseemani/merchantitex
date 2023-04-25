import { Transaction } from "./Transaction";

export interface SettlementQuery {
    perpage: number;
    page: number;
    fromdate: string;
    todate: string;
    reference: string;
    status: string;
    search: string;
}


export interface SettlementResponse {
    _metadata: Metadata
    settlements: Settlement[]
    code: string
    message: string
}

export interface Metadata {
    pagecount: number
    totalcount: number
    page: number
    links: any[]
}

export interface Settlement {
    merchantaccountid: number
    id: number
    recordcount: number
    amount: number
    chargeamount: number
    fee: number
    currency: string
    settlementtype: any
    settlementbankcode: string
    settlementaccountname: string
    settlementaccountnumber: string
    settlementaccounttype: string
    settlementcountry: string
    settlementdate: string
    settlementid: string
    responsecode: string
    responsemessage: string
}


export interface SettlementTransactionResponse {
    _metadata: Metadata
    transactions: Transaction[]
    code: string
    message: string
}