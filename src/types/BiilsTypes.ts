export interface AirtimeRequestItem {
  id: string;
  country: string;
  recipient: string;
  amount: number;
  network: string;
  date?: string;
  providerRef?: string;
  transactionRef?: string;
  commission?: number;
}

export interface GetAirtimeRequestsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: AirtimeRequestItem[];
  //   requests: AirtimeRequestItem[];
}

// bill
export interface BillRequestItem {
  id: string;
  country: string;
  bill: string;
  amount: number;
  packages: string;
  date?: string;
  providerRef?: string;
  transactionRef?: string;
  billId?: number;
  commission?: number;
}

export interface GetBillRequestsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: BillRequestItem[];
  //   requests: AirtimeRequestItem[];
}
