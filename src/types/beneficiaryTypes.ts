export interface beneficiaryRequestItem {
  id: string;
  bankName: string;
  acctNo: string;
  name: string;
  date?: string;
}

export interface getBeneficiaryRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: beneficiaryRequestItem[];
}
export interface beneficiaryRecentRequestItem {
  id: string;
  amount: string;
  status: string;
  bankName: string;
  acctNo: string;
  name: string;
  date?: string;
}

export interface getBeneficiartRecentRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: beneficiaryRecentRequestItem[];
}
