export interface GetLinksRes {
  _metadata: {
    page: number;
    perpage: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  paymentlinks: LinkItem[];
}

export interface LinkItem {

  linkName: string;
  amount: string;
  linkType: string;
  paymentUrl: string;
  added: string;
  id: string;
  desc: string;
  frequency?: string;
  website?: string;
  donationWebsite?: string;
  donationContact?: string;
  description?: string;
  subInterval?: number;
  subChargeCount?: number;

  chargeCount?: number;
  phone?: string;
  status?: string;
  pageImage?: string;
  redirectUrl?: string;

  user?: {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string
  },
  transactions: [];
}
