import axios from "axios";
import { BALANCE_HISTORY_FILTER_DATA } from "../constant";
import { Balance, BalanceHistoryRes } from "../types/BalanceTypes";
import { stringify } from "../utils/stringify";

export const getBalance = async (): Promise<{ balances: Balance[] }> => {
    const { data } = await axios.get('/v1/balance');
    return data as { balances: Balance[] };
}

export const getBalanceHistoryService = async (id: string, query: Record<string, any>): Promise<BalanceHistoryRes> => {
    const { data } = await axios.get(`/v1/balance/${id}/history${stringify(query)}`);
    return data as BalanceHistoryRes;
}