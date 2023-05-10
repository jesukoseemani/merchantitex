export interface CustomerItem {
  firstname: string;
  lastname: string;
  email: string;
  msisdn: string;
  phone: number;
  transNum: number;
  total: number;
  isblacklisted: boolean;
  addressline1: string;
  createdat?: string;
  id?: string;
}

export interface GetCustomersRes {
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  customers: CustomerItem[];

  // recent customer
}
export interface RecentCustomerItem {
  amount: number;
  customerId: string;
  paymentType: string;
  added?: string;
  id?: string;
  status?: string;
}

export interface GetRecentCustomerRes {
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  transactions: RecentCustomerItem[];
}

export interface BlacklistCustomerItem {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  added?: string;
  id?: string;
}

export interface GetBlacklistCustomerRes {
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  transactions: BlacklistCustomerItem[];
}

export interface TransactionItem {
  transaction: {
    merchantreference: string;
    linkingreference: string;
    reference: string;
    authoption: string;
    paymentmethod: string;
    added: string;
    authcode: string;
    acquirer: string;
  };
  order: {
    amount: string;
    description: string;
    currency: string;
    country: string;
    fee: {
      merchantbearsfee: string;
    };
  };
  source: {
    customer: {
      firstname: string;
      lastname: string;
      email: string;
      msisdn: string;
      card: {
        number: string;
        first6: string;
        last4: string;
        type: string;
      };
      device: {
        fingerprint: string;
        ip: string;
      };
      address: [];
    };
  };
  code: string;
  message: string;
}

export interface GetTransactionsRes {
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  transactions: TransactionItem[];
}


export interface CustomerRes {
  customer: Customer
  transactions: any[]
  code: string
  message: string
}

export interface Customer {
  id: any
  merchantaccountid: number
  identifier: any
  email: string
  firstname: string
  lastname: string
  msisdn: string
  addressline1: any
  country: string
  isblacklisted: boolean
  blacklistreason: any
}
