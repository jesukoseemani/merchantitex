import axios from "axios";
import queryString from 'query-string';
import { RefundPayload, RefundQuery, RefundsRes } from "../types/RefundTypes";
import { stringify } from "../utils/stringify";

export const getRefundsService = async (query: Partial<RefundQuery>): Promise<RefundsRes> => {
    const { data } = await axios.get(`/v1/refund${stringify(query)}`);
    return data as RefundsRes;
}

export const getDownloadedRefunds = async (query?: Partial<RefundQuery>) => {
    const { data } = await axios.get(`/v1/refund/download${stringify(query!)}`);
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

