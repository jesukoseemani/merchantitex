export interface FailureRes {
    data: Failure[]
    code: string
    message: string
}

export interface Failure {
    responsecode: string
    responsemessage: string
    count: number
}


export interface TopCustomerRes {
    data: TopCustomer[]
    code: string
    message: string
}

export interface TopCustomer {
    firstname: string
    lastname: string
    email: any
    identifier: string
    customerid: number
    currency: string
    transaction_count: number
    transaction_amount: number
}

export interface PerformanceRes {
    data: Performance
    code: string
    message: string
}

export interface Performance {
    total: number
    success: number
    failed: number
    pending: number
    abandoned: number
}


export interface SummaryRes {
    data: Summary[]
    code: string
    message: string
}

export interface Summary {
    currency: string
    data: Data[]
    balance: Balance
    settlement: any
}

export interface Data {
    date: string
    currency: string
    total: number
    success: number
    failed: number
    pending: number
}

export interface Balance {
    id: number
    merchantaccountid: number
    availablebalance: number
    ledgerbalance: number
    currency: string
    status: string
    reservebalance: number
}


export interface ChargeTypeRes {
    data: ChargeType[]
    total: number
    code: string
    message: string
}

export interface ChargeType {
    chargetype?: string
    count: number
}
