export interface TransactionItem {
  amt: string;
  status: string;
  acctId: string;
  card: string;
  PaymentType: string;
  added: string;
  id: string;
  txnType?: string;
  bankName?: string;
}

export interface GetTransactionsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  transactions: TransactionItem[];
}
export interface TransactionSettltementItem {
  amt: string;
  status: string;
  destination: string;
  added: string;
  id: string;
  earned?: string;
  paid?: number;
  value?: number;
}

export interface GetTransactionSettltementItemRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;

    links: [];
  };
  transactions: TransactionSettltementItem[];
}
