export interface TransactionItem {
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

export interface GetTransactionRes {
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
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
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  transactions: RefundItem[];
}
