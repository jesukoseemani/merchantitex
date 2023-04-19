import { SAVE_ADDITIONAL_INFO, SAVE_BUSINESS_INFO, SAVE_DIRECTOR_INFO } from "../constants";
import { ReactNode } from "react";

export const saveBusinessInfo = (businessDetails: any) => {

    return {
        type: SAVE_BUSINESS_INFO,
        businessDetails,
    };
};
export const saveAdditionalInfo = (additionalDetails: any) => {

    return {
        type: SAVE_ADDITIONAL_INFO,
        additionalDetails,
    };
};
export const saveDirector = (directorDetails: any) => {

    return {
        type: SAVE_DIRECTOR_INFO,
        directorDetails,
    };
};
