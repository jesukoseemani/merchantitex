import axios from "axios";

export const getRollingReserve = async () => {
    const { data } = await axios.get('/v1/rollingreserve');
    console.log(data, 'data')
    return data;
}

export const getRollingReserveDownload = async (id: string) => {
    const { data } = await axios.get('/v1/rollingreserve/download');
    return data;
}