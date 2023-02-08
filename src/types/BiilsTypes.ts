export interface AirtimeRequestItem {
  id: string;
  country: string;
  recipient: string;
  amount: number;
  network: string;
  date?: string;
  providerRef?: string;
  transactionRef?: string;
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
