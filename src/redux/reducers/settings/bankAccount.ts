import { FETCH_BANK_ACCT } from "../../actions/constants";

const initialAuthState = {
    // Accounts: {},
};

export const bankAcctReducer = (state = {}, action: any) => {
    switch (action.type) {
        case FETCH_BANK_ACCT: {
            return {
                ...state,

                banklists: {
                    ...action.banklists,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default bankAcctReducer;
