export interface RefundItem {
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

  customer: {
    email: string;
    customerid: number;
    firstname: string;
    lastname: string;
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