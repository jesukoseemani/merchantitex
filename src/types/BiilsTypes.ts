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

  invoiceName: string;
  totalAmount: number;
  currency: string;
  status: string;
  createdAt?: string;
  phone?: string;
  url?: string;
  providerRef?: string;
  transRef?: string;
  billId?: number;
  commission?: number;
  customer: {
    email: string;
    firstname: string;
    lastname: string;

  }
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
