export interface TransactionItem {
  amt: string;
  status: string;
  txnType: string;
  card: string;
  bankName: string;
  added: string;
  id: string;
}

export interface GetTransactionsRes {
  _metadata: {
    page: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  transactions: TransactionItem[]
}