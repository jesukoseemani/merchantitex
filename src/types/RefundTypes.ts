export interface RefundItem {
  transaction: {
      merchantreference: string,
      reference: string,
      linkingreference: string,
      added: string,
  },
  order: {
      amount: string,
      description: string,
      currency: string,
      fee: { [key: string]: string }
  },
  source: {
      customer: {
          email: string
      }
  },
  code: string,
  message: string
}

export interface GetRefundsRes {
  _metadata: {
    page: number,
    perpage: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  transactions: RefundItem[]
}

export interface DownloadRefundsRes {
  code: string,
  message: string,
  transaction: {
    redirecturl: string
  }
}