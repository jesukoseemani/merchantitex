export interface GetSubAcctsRes {
  _metadata: {
    pagecount: number;
    totalcount: number;
    links: [];
  };
  subaccounts: SubAcctItem[];
  code: string;
  message: string;
  earned: string;
  paid: string;
  value: string;
}

export interface SubAcctItem {
  name: string;
  details: string;
  acctId: string;
  txnShare: string;
  acctShare: string;
}
export interface GetSettSubAcctsRes {
  _metadata: {
    pagecount: number;
    totalcount: number;
    links: [];
  };
  transactions: SettlacctItem[];
  code: string;
  message: string;
  earned: string;
  paid: string;
  value: string;
}

export interface SettlacctItem {
  name: string;
  details: string;
  acctId: string;
  txnShare: string;
  acctShare: string;
}
