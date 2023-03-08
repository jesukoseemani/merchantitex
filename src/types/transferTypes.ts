export interface TransHistory {
  amount: number;
  naration: string;
  acctnum: string;
  bankname: string;
  acctname: string;
  status: string;
  id: string;
}
export interface GetTransHistoryRes {
  _metadata: {
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: TransHistory[];
}
