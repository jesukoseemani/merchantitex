import axios from "axios"
import { ChargeTypeRes, FailureRes, PerformanceRes, SummaryRes, TopCustomerRes } from "../types/TrendTypes";
import { stringify } from "../utils/stringify";

export const getTopChargeType = async (query: { fromdate: string; todate: string }): Promise<ChargeTypeRes> => {
    const { data } = await axios.get(`/v1/trend/top/chargetype${stringify(query)}`);
    return data as ChargeTypeRes;
}

export const getTopCustomers = async (query: { fromdate: string; todate: string }): Promise<TopCustomerRes> => {
    const { data } = await axios.get(`/v1/trend/top/customers${stringify(query)}`);
    return data as TopCustomerRes;
}

export const getTransactionSummary = async (query: { fromdate: string; todate: string }): Promise<SummaryRes> => {
    const { data } = await axios.get(`/v1/trend/transaction/summary${stringify(query)}`);
    return data as SummaryRes;
}

export const getTransactionPerformance = async (query: { fromdate: string; todate: string }): Promise<PerformanceRes> => {
    const { data } = await axios.get(`/v1/trend/transaction/performance${stringify(query)}`);
    return data as PerformanceRes;
}

export const getTopFailure = async (query: { fromdate: string; todate: string }): Promise<FailureRes> => {
    const { data } = await axios.get(`/v1/trend/top/failure${stringify(query)}`);
    return data as FailureRes;
}