import { SAVE_ADDITIONAL_INFO, SAVE_BUSINESS_INFO, SAVE_DIRECTOR_INFO } from "../../actions/constants";


export const setupReducer = (state = {}, action: any) => {
    switch (action.type) {
        case SAVE_BUSINESS_INFO: {
            return {
                ...state,

                businessInfo: { ...action.businessDetails },
            };
        }
        case SAVE_ADDITIONAL_INFO: {
            return {
                ...state,

                additionalDetails: { ...action.additionalDetails },
            };
        }
        case SAVE_DIRECTOR_INFO: {
            return {
                ...state,

                directorDetails: { ...action.directorDetails },
            };
        }

        default: {
            return state;
        }
    }
};

export default setupReducer;
