import axios from "axios";
import { Balance, BalanceHistoryRes } from "../types/BalanceTypes";

export const getBalance = async (): Promise<{ balances: Balance[] }> => {
    const { data } = await axios.get('/v1/balance');
    return data as { balances: Balance[] };
}

export const getBalanceHistoryService = async (id: string): Promise<BalanceHistoryRes> => {
    const { data } = await axios.get(`/v1/balance/${id}/history`);
    return data as BalanceHistoryRes; 
}