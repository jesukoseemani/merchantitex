export interface CustomerItem {
  firstname: string,
  lastname: string,
  email: string,
  msisdn: string,
  dateofbirth: string,
  address: [{ [key: string]: string }],
  added: string
}

export interface GetCustomersRes {
  _metadata: {
    page: number,
    perpage: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  customers: CustomerItem[]
}

export interface TransactionItem {
  transaction: {
      merchantreference: string,
      linkingreference: string,
      reference: string,
      authoption: string,
      paymentmethod: string,
      added: string,
      authcode: string,
      acquirer: string
  },
  order: {
      amount: string,
      description: string,
      currency: string,
      country: string,
      fee: {
          merchantbearsfee: string
      }
  },
  source: {
      customer: {
          firstname: string,
          lastname: string,
          email: string,
          msisdn: string,
          card: {
              number: string,
              first6: string,
              last4: string,
              type: string
          },
          device: {
              fingerprint: string,
              ip: string
          },
          address: []
      }
  },
  code: string,
  message: string
}

export interface GetTransactionsRes {
  _metadata: {
    page: number,
    perpage: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  transactions: TransactionItem[]
}