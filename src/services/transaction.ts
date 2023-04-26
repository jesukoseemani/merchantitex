import axios from "axios";
import { TransactionQuery, TransactionRes, TransactionResponse } from "../types/Transaction";
import { stringify } from "../utils/stringify";

export const getTransactionsService = async (query?: Partial<TransactionQuery>): Promise<TransactionRes> => {
    const { data } = await axios.get(`/v1/transaction${stringify(query!)}`);
    return data as TransactionRes;
}

export const getDownloadedTransactions = async (query?: Partial<Omit<TransactionQuery, 'perpage' | 'page'>>) => {
    const { data } = await axios.get(`/v1/transaction/download${stringify(query!)}`);
    console.log(data, 'data')
    return data
}

export const getTransactionByPaymentId = async (paymentId: string): Promise<TransactionResponse> => {
    const { data } = await axios.get(`/v1/transaction/${paymentId}`);
    return data as TransactionResponse
}

export const getTransactionByLinkingRef = async (linkingRef: string) => {
    const { data } = await axios.get(`/v1/transaction/linking/${linkingRef}`);
    return data
}

