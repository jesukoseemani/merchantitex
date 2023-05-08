import moment from "moment";
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



const dateNow = moment().format('YYYY-MM-DD');
const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

export const getDate = (key: string) => {
    let todate = '';
    let fromdate = '';

    if (key === 'today') {
        fromdate = dateNow;
        todate = dateNow;
    } else if (key === 'last7days') {
        fromdate = sevenDaysAgo;
        todate = dateNow;
    } else if (key === 'last30days') {
        fromdate = thirtyDaysAgo;
        todate = dateNow;
    } else if (key === 'oneyear') {
        fromdate = startOfYear;
        todate = endOfYear;
    } else {
        fromdate = '';
        todate = '';
    }


    return { fromdate, todate }
}