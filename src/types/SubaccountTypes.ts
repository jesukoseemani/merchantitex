export interface GetSubAcctsRes {
  _metadata: {
    pagecount: number,
    totalcount: number,
    links: []
  },
  subaccounts: SubAcctItem[],
  code: string,
  message: string,
  earned: string,
  paid: string,
  value: string,
}

export interface SubAcctItem {
  name: string;
  details: string;
  acctId: string;
  txnShare: string;
  acctShare: string;
}