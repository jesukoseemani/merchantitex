import axios from "axios";
import { RefundQuery, RefundsRes } from "../types/RefundTypes";
import { stringify } from "../utils/stringify";

export const getPayoutService = async (query?: Partial<RefundQuery>): Promise<RefundsRes> => {
    const { data } = await axios.get(`/v1/payout${stringify(query!)}`);
    return data as RefundsRes;
}

export const getDownloadedPayout = async (query?: Partial<RefundQuery>) => {
    const { data } = await axios.get(`/v1/payout/download${stringify(query!)}`);
    return data
}

export const getPayoutByRef = async (ref: string) => {
    const { data } = await axios.get(`/v1/payout/${ref}`);
    return data
}


export const payoutTransfer = async (payload: { amount: number; accountid: number; recipientid: number; narration: string; otp: string }) => {
    const { data } = await axios.post('/v1/payout/transfer', payload);
    return data
}

