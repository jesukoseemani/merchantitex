export interface pendingApprovalRequestItem {
  id: string;
  receipient: string;
  status: string;
  network: string;
  date?: string;
  amount: number;
}

export interface GetPendingApprovalRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: pendingApprovalRequestItem[];
  //   requests: AirtimeRequestItem[];
}
