export interface PosRequestItem {
  reqId: string,
  status: string, 
  added: string,
  qtyRequested: number,
  qtyAssigned: number,
  deliveryAddress: string
}

export interface GetPosRequestsRes {
  _metadata: {
    page: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  requests: PosRequestItem[]
}

export interface PosDeployedItem {
  status: string, 
  deviceType: string,
  terminalId: string,
  merchantCode: string,
  terminalSerial: string,
  bankName: string,
  added: string,
  txnVolume: string,
  txnValue: string
}

export interface GetPosDeployedRes {
  _metadata: {
    page: number,
    pagecount: number,
    totalcount: number,
    links: []
  },
  deployed: PosDeployedItem[]
}
