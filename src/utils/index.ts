import { banks } from "../helpers/bankslists";

export const stripEmpty = (obj: Record<string, any>) => {
    for (const key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }

    return obj;
}

export const getBankName = (code: string) => {
    if (!code) return ''
    return (banks.find(b => b.code === code)?.name) || ''
}

export const stripSearch = (str: string) => {
    if (!str) return '';
    return str.substring(1)
}