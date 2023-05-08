import { SAVE_ADDITIONAL_INFO, SAVE_BUSINESS_INFO, SAVE_CONTACT_FORM, SAVE_DIRECTOR_INFO, SAVE_UPLOAD_DOC } from "../constants";
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
    console.log(directorDetails, "actions");


    return {
        type: SAVE_DIRECTOR_INFO,
        directorDetails,
    };
};
export const saveUploadDoc = (uploadDOc: any) => {
    console.log(uploadDOc, "actions");


    return {
        type: SAVE_UPLOAD_DOC,
        uploadDOc,
    };
};
export const saveContactform = (contactInfo: any) => {
    console.log(contactInfo, "actions");


    return {
        type: SAVE_CONTACT_FORM,
        contactInfo,
    };
};
