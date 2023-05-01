export interface chargebackItem {
  id: number;
  merchantaccountid: number;
  linkingreference: string;
  paymentid: string;
  amount: number;
  currency: number;
  customerid: null | number | string;
  customeremail: string;
  chargebackreason: string;
  status: string;
  duedate: string;
  createdat: string;
  updatedat: null | number | string;
  responsestatus: string
}

export interface Customer {
  customerid: number
  firstname: string
  lastname: string
  email: string
}

export interface chargebackRes {
  _metadata: Meta;
  chargebacks: chargebackItem[];
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

export interface chargebackQuery {
  perpage: number;
  page: number;
  fromdate: string;
  todate: string;
  status: string;
  search: string;
}


export interface chargebackResponse {
  chargeback: chargeback
  refund: any
  events: Event[]
  code: string
  message: string
}

export interface chargeback {
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
  chargebacktype: string
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
