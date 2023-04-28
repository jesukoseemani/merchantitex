import { SAVE_ADDITIONAL_INFO, SAVE_BUSINESS_INFO, SAVE_CONTACT_FORM, SAVE_DIRECTOR_INFO, SAVE_UPLOAD_DOC } from "../../actions/constants";

const intialstate = {

    businessInfo:
    {
        email: "",
        city: "",
        businessAddress: "",
        businessDescription: "",
        stateRegion: "",
        phonenumber: "",
    },


    directors: [
        {
            firstname: "",
            lastname: "",
            phonenumber: "",
            bvn: "",
            email: "",
            address: "",
            docNumber: "",
            docUrl: ""
        }

    ],
    additionalDetails: {
        websiteUrl: "",
        supportPhone: "",
        chargebackEmail: "",
        supportEmail: "",
        contactemail: "",
        businessIncome: "",
    },
    documents: [{
        docType: "",
        docNumber: "",
        docUrl: ""
    }],

    contactInfo: {
        firstname: "",
        lastname: "",
        phonenumber: "",
        bvn: "",
        address: "",
        docType: "",
        docNumber: "",
        docUrl: "",
    }

}

export const setupReducer = (state = intialstate, action: any) => {
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
        case SAVE_CONTACT_FORM: {
            return {
                ...state,

                contactInfo: { ...action.contactInfo },
            };
        }
        case SAVE_DIRECTOR_INFO: {
            return {
                ...state,

                directors: [...action.directorDetails],
            };
        }
        case SAVE_UPLOAD_DOC: {
            return {
                ...state,

                documents: [...action.uploadDOc],
            };
        }

        default: {
            return state;
        }
    }
};

export default setupReducer;
