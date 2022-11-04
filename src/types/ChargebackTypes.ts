export interface ChargebackItem {
  amt: string,
  status: string,
  txnRef: string,
  email: string,
  due: string,
  added: string,
  id: string,
  cardType: string,
  cardNum: string,
  txnFee: string,
  bank: string,
  country: string,
}

export interface GetChargebacksRes {
  _metadata: {
    page: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  chargebacks: ChargebackItem[],
  value: string,
  threshold: string,
  count: string,
  balances: ChargebackBalanceItem[]
}

export interface ChargebackBalanceItem {
  currency: string,
  sum: string
}

export interface AssessmentItem {
  amt: string,
  reason: string,
  wallet: string,
  added: string,
  id: string,
  refId: string,
}

export interface GetAssessmentsRes {
  _metadata: {
    page: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  assessments: AssessmentItem[],
  value: string,
  threshold: string,
  count: string,
  balances: ChargebackBalanceItem[]
}