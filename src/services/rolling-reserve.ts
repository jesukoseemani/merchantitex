import axios from "axios";
import { RollingReserveRes } from "../types/RollingReserveTypes";

export const getRollingReserve = async (): Promise<RollingReserveRes> => {
    const { data } = await axios.get('/v1/rollingreserve');
    return data as RollingReserveRes;
}

export const getRollingReserveDownload = async (id: string) => {
    const { data } = await axios.get('/v1/rollingreserve/download');
    return data;
}