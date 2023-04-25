import axios from "axios";
import queryString from 'query-string';
import { RefundPayload, RefundQuery, RefundsRes } from "../types/RefundTypes";

export const getRefundsService = async (query: Partial<RefundQuery>): Promise<RefundsRes> => {
    const querystring = queryString.stringify(query)
    const { data } = await axios.get(`/v1/refund?${querystring}`);
    console.log(data, 'data')
    return data as RefundsRes;
}

export const getDownloadedRefunds = async (query: Partial<RefundQuery>) => {
    const querystring = queryString.stringify(query)
    const { data } = await axios.get(`/v1/refund/download?${querystring}`);
    console.log(data, 'data')
    return data
}

export const getRefundByPaymentId = async (paymentId: string) => {
    const { data } = await axios.get(`/v1/refund/${paymentId}`);
    console.log(data, 'data')
    return data
}

export const initiateRefund = async (paymentId: string, payload: RefundPayload) => {
    const { data } = await axios.post(`/v1/refund/initiate/${paymentId}`, payload);
    console.log(data, 'data')
    return data
}

