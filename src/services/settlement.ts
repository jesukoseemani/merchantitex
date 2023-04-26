import axios from "axios";
import { Settlement, SettlementQuery, SettlementResponse, SettlementTransactionResponse } from "../types/Settlement";
import { stringify } from "../utils/stringify";

export const getSettlementsService = async (query?: Partial<SettlementQuery>): Promise<SettlementResponse> => {
    const { data } = await axios.get(`/v1/settlement${stringify(query!)}`);
    return data as SettlementResponse;
}

export const getDownloadedSettlements = async (query?: Partial<SettlementQuery>) => {
    const { data } = await axios.get(`/v1/settlement/download${stringify(query!)}`);
    return data
}

export const getSettlementTransactions = async (settlementId: string): Promise<SettlementTransactionResponse> => {
    const { data } = await axios.get(`/v1/settlement/${settlementId}/transactions`);
    return data as SettlementTransactionResponse
}

export const getSettlementTransactionsDownload = async (settlementId: string) => {
    const { data } = await axios.get(`/v1/settlement/${settlementId}/transactions/download`);
    return data
}

export const getSingleSettlement = async (settlementId: string): Promise<{ settlement: Settlement }> => {
    const { data } = await axios.get(`/v1/settlement/${settlementId}`);
    return data as { settlement: Settlement }
}

export const getSettlementAccounts = async (): Promise<{ accounts: any }> => {
    const { data } = await axios.get('/v1/setting/settlement/account');
    return data as any
}


