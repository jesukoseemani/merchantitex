export interface RollingReserveRes {
    _metadata: Metadata
    rollingreserves: RollingReserveType[]
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

export interface RollingReserveType {
    id: number
    merchantaccountid: number
    settlementid: string
    currency: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    status: string
    duedate: string
    createdat: string
}
