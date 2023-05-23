export interface TransactionItem {
  id: number
  customer: Customer
  paymentid: string
  paymentlinkreference?: string
  merchantreference: string
  reference?: string
  amount?: number
  currency: string
  chargetype?: string
  timein: string
  cardtype?: string
  mask?: string
  responsecode: string
  responsemessage: string
}

export interface Customer {
  customerid: number
  firstname: string
  lastname: string
  email: string
}

export interface TransactionRes {
  _metadata: Meta;
  transactions: TransactionItem[];
}
export interface RefundItem {
  amt: number;
  status: string;
  acctId: string;
  PaymentType: number;
  added?: string;
  id?: string;
  cardType?: string;
  cardNumber?: string;
  reference?: string;
  transfee: string;
}

export interface GetRefundRes {
  _metadata: Meta;
  refunds: RefundItem[];
}

export interface Meta {
  page: number;
  perpage: number;
  pagecount: number;
  totalcount: number;
  links: [];
}

export interface TransactionQuery {
  perpage: number;
  page: number;
  fromdate: string;
  todate: string;
  reference: string;
  channel: string;
  paymentmethod: string;
  status: string;
  customerid: string;
  search: string;
}


export interface TransactionResponse {
  transaction: Transaction
  refund: any
  chargeback: any
  events: Event[]
  code: string
  message: string
}

export interface Transaction {
  id: number
  customer: Customer
  merchantid: number
  merchantreference: string
  paymentlinkreference: string
  modalreference: string
  reference: string
  paymentid: string
  linkingreference: any
  authoption: string
  amount: number
  currency: string
  chargeamount: number
  country: string
  fee: number
  chargetype: string
  route: string
  network: any
  timein: string
  timeout: string
  msisdn: any
  narration: string
  cardtype: string
  issuer: string
  mask: string
  bankcode: any
  paylocationtype: string
  paylocationcountry: string
  devicefingerprint: string
  ipaddress: string
  validationstatus: any
  responsecode: string
  responsemessage: string
  rrn: any
  transactiontype: string
}

export interface Customer {
  customerid: number
  identifier: string
  email: string
  firstname: string
  lastname: string
  msisdn: string
  createdat: string
  country: any
  isblacklisted: boolean
  blacklistreason: any
}

export interface Event {
  id: number
  merchantid: number
  paymentlinkreference: string
  eventtype: string
  activity: string
  timein: string
}
