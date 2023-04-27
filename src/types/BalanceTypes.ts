export interface WalletItem {
  currency: string;
  ledgerbalance: string;
  availablebalance: string;
}

export interface BalanceHistoryItem {
  init: string;
  amt: string;
  after: string;
  details: string;
  added: string;
  id: string;
}

export interface GetBalanceHistoryRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  history: BalanceHistoryItem[];
}

export interface GetWalletsRes {
  _metadata: {
    pagecount: number;
    totalcount: number;
    links: [];
  };
  wallets: WalletItem[];
  code: string;
  message: string;
}

export interface SettlementItem {
  amt: string;
  status: string;
  destination: string;
  added: string;
  id: string;
}

export interface GetSettlementsRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  settlements: SettlementItem[];
}

export interface RollingReserveItem {
  monthlyamt: string;
  month: string;
  // added: string;
  settlementDate: string;
  settlementAmt: string;
  rollingReserve: string;
  dueDate: string;
  id?: string;
}

export interface GetRollingReservesRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  reserves: RollingReserveItem[];
}


export interface Balance {
  availablebalance: number;
  currency: string;
  id: number;
  ledgerbalance: number;
  merchantaccountid: number;
  reservebalance: number;
  status: string;
}

export interface BalanceHistory {
  id: number
  merchantaccountid: number
  balanceid: number
  transactiontype: string
  currency: string
  amount: number
  balancebefore: number
  balanceafter: number
  source: string
  sourceid: string
  status: string
  createdat: string
  updatedat?: string
}

export interface BalanceHistoryRes {
  _metadata: {
    page: number;
    pagecount: number;
    totalcount: number;
    links: [];
  };
  balancehistory: BalanceHistory[];
}
