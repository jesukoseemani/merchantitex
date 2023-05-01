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
  chargebackResponses: ResEvent[]
  chargebackDebit: Event[]
  code: string
  message: string
}

export interface chargeback {
  id: number
  merchantaccountid: number
  linkingreference: string
  paymentid: string
  amount: number
  currency: string
  customerid: number
  customeremail: string
  chargebackreason: string
  status: string
  duedate: string
  createdat: string
  updatedat: null | string
  responsestatus: string
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
  id: number;
  merchantaccountid: number;
  merchantchargebackid: number;
  amount: number;
  currency: string;
  source: string;
  createdat: string;
  updatedat: null | string | number;
  status: string
}

export interface ResEvent {
  id: number;
  chargebackid: number;
  responsefrom: string;
  response: string;
  proof1: null | string;
  proof2: null | string;
  createdat: string;
  updatedat: null | string;
}

