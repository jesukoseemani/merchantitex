import axios from "axios";
import { RollingReserveRes } from "../types/RollingReserveTypes";
import { SettlementQuery } from "../types/Settlement";
import { stringify } from "../utils/stringify";

export const getRollingReserve = async (query?: Partial<SettlementQuery>): Promise<RollingReserveRes> => {
    const { data } = await axios.get(`/v1/rollingreserve${stringify(query!)}`);
    return data as RollingReserveRes;
}

export const getRollingReserveDownload = async (id: string) => {
    const { data } = await axios.get('/v1/rollingreserve/download');
    return data;
}