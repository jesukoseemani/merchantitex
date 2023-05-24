import { CustomerRes, GetCustomersRes } from './../types/CustomerTypes';
import axios from "axios";
import { RefundQuery, RefundsRes } from "../types/RefundTypes";
import { stringify } from "../utils/stringify";
interface Props {
    code?: string;
    message?: string

}
export const getCustomersService = async (query?: Partial<RefundQuery>): Promise<GetCustomersRes> => {
    const { data } = await axios.get(`/v1/customer${stringify(query!)}`);
    return data as GetCustomersRes;
}

export const getBlacklistedCustomers = async (query?: Partial<RefundQuery>): Promise<GetCustomersRes> => {
    const { data } = await axios.get(`/v1/customer/blacklisted${stringify(query!)}`);
    return data as GetCustomersRes;
}

export const getDownloadedCustomers = async (query?: Partial<RefundQuery>) => {
    const { data } = await axios.get(`/v1/customer/download${stringify(query!)}`);
    return data
}

export const getCustomerById = async (customerId: string): Promise<CustomerRes> => {
    const { data } = await axios.get(`/v1/customer/${customerId}`);
    return data as CustomerRes;
}

export const blacklistCustomer = async (payload: { customerid: string; reason: string, }) => {

    const { data } = await axios.post<Props>(`/v1/customer/blacklist`, { ...payload, action: "add" });
    return data
}

export const addCustomer = async (payload: { email: string; msisdn: string; firstname: string; lastname: string; countryid: number }) => {
    const { data } = await axios.post('/v1/customer/add', payload);
    return data
}

