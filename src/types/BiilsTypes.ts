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

export interface ConfirmEntryRequestItemGetBillRequestsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: BillRequestItem[];
  //   requests: AirtimeRequestItem[];
}

// bill entry request table
export interface BillEntryRequestItem {
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

export interface GetBillEntryRequestsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: BillEntryRequestItem[];
  //   requests: AirtimeRequestItem[];
}
// confirm airtirm entry request table
export interface ConfirmEntryRequestItem {
  id: string;
  country: string;
  phone: string;
  amount: number;
  frequency: string;
  date?: string;
  providerRef?: string;
  transactionRef?: string;
  billId?: number;
  commission?: number;
}

export interface GetConfirmEntryRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: ConfirmEntryRequestItem[];
  //   requests: AirtimeRequestItem[];
}

// bill invoices  entry request table
export interface BillInvoiceRequestItem {
  id: string;
  title: string;
  name: string;
  amount: number;
  status: string;
  email: string;
  added?: string;
  providerRef?: string;
  transactionRef?: string;
  billId?: number;
  commission?: number;
}

export interface GetInvoiceRequestsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: BillInvoiceRequestItem[];
  //   requests: AirtimeRequestItem[];
}
