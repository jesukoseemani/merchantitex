
export interface GetLinksRes {
  _metadata: {
    page: number,
    perpage: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  paymentlinks: LinkItem[]
}

export interface LinkItem {
  name: string;
  amt: string;
  linkType: string;
  url: string;
  added: string;
  id: string;
  desc: string;
}