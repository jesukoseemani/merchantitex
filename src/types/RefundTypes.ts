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

export interface RefundsRes {
  _metadata: {
    page: number,
    perpage: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  refunds: RefundItem[]
}

export interface DownloadRefundsRes {
  code: string,
  message: string,
  transaction: {
    redirecturl: string
  }
}

export interface RefundPayload {
  refundtype: string,
  amount: number,
  reason: string,
  otp: string
}

export interface RefundQuery {
  perpage: number;
  page: number;
  fromdate: string;
  todate: string;
  reference: string;
  status: string;
  search: string;
}