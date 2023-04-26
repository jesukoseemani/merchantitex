import { FETCH_BANK_ACCT } from "../constants";
import { ReactNode } from "react";

export const fetchBankAcct = (banklists: any) => {

    return {
        type: FETCH_BANK_ACCT,
        banklists,
    };
};


