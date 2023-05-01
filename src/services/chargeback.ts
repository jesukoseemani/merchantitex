import axios from "axios";
import { chargebackQuery, chargebackRes, chargebackResponse } from "../types/Chargeback";
import { stringify } from "../utils/stringify";
 
export const getChargebackService = async (query?: Partial<chargebackQuery>): Promise<chargebackRes> => {
    const { data } = await axios.get(`/v1/chargeback${stringify(query!)}`);
    return data as chargebackRes;
}

// export const getDownloadedChargeback = async (query?: Partial<Omit<chargebackQuery, 'perpage' | 'page'>>) => {
//     const { data } = await axios.get(`/v1/chargeback/download${stringify(query!)}`);
//     console.log(data, 'data')
//     return data
// }

export const getChargebackById = async (chargebackId: string): Promise<chargebackResponse> => {
    const { data } = await axios.get(`/v1/chargeback/${chargebackId}`);
    return data as chargebackResponse
}

// export const getTransactionByLinkingRef = async (linkingRef: string) => {
//     const { data } = await axios.get(`/v1/transaction/linking/${linkingRef}`);
//     return data
// }

