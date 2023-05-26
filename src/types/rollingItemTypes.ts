export interface RollingRes {
    rollingreserve?: Rollingreserve;
    code?: string;
    message?: string;
}

export interface Rollingreserve {
    id?: number;
    merchantaccountid?: number;
    rollingreserveid?: string;
    settlementid?: string;
    currency?: string;
    amount?: number;
    balanceBefore?: number;
    balanceAfter?: number;
    status?: string;
    duedate?: string;
    createdat?: string;
    updatedat?: string;
}
