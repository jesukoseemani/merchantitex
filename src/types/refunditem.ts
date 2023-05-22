export interface RefundSingle {
    refund: refundResponse;
    transaction: transRef,

    code: string,
    message: string
}





export interface transRef {
    cardtype?: string;
    chargeamount?: number;
    chargetype?: string;
    currency?: string;
    customer?: customerRes;
    linkingreference?: string;
    paymentid?: number;
    mask?: string;
    merchantreference?: string;
    paymentlinkreference?: string;
    reference?: string;
    responsecode: string;
    responsemessage: string;
    timein: string;

}

export interface customerRes {
    email: string;
    customerid: number;
    firstname: string;
    lastname: string;
}



export interface refundResponse {
    amount: number;
    createdat: string;
    createdby: number;
    currency: string;
    id: number;
    merchantid: number;
    merchantreference: string;
    paymentid: string;
    paymentlinkreference: string;
    reason: string;
    reference: string;
    refundtype: string;
    responsecode: string;
    responsemessage: string;
    route: string;
    status: string;
    timein: string;
    timeout: string;
}

export interface RefundSingleItem {

    refund: RefundSingle
}
