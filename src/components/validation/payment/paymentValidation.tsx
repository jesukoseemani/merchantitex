import * as Yup from 'yup';
import "yup-phone-lite"


export const paymentDonation = Yup.object({
    linkName: Yup.string().required("link name is Required"),
    currencyid: Yup.number().required("currency is Required"),
    otp: Yup.number().required("otp is required"),
    amount: Yup.number().required("Amount is required"),
    description: Yup.string().required("description is required"),
    donationWebsite: Yup.string().required("donationWebsite is required").url(),
    donationContact: Yup.string().required("donation Contact is required").phone("NG", "Invalid donationContact"),
    redirectUrl: Yup.string().required("donationWebsite is required").url(),


})
export const singleCharge = Yup.object({
    linkName: Yup.string().required("link name is Required"),
    currencyid: Yup.number().required("currency is Required"),
    otp: Yup.number().required("otp is required"),
    amount: Yup.number().required("Amount is required"),
    description: Yup.string().required("description is required"),
    redirectUrl: Yup.string().required("donationWebsite is required").url(),
    fieldname: Yup.string(),


})
export const subscriptionSchema = Yup.object({
    linkName: Yup.string().required("link name is Required"),
    currencyid: Yup.number().required("currency is Required"),
    otp: Yup.number().required("otp is required"),
    amount: Yup.number().required("Amount is required"),
    subChargeCount: Yup.number().required("Subcharge count is required"),
    description: Yup.string().required("description is required"),
    redirectUrl: Yup.string().required("donationWebsite is required").url(),
    fieldname: Yup.string(),


})
export const addcustomerSchema = Yup.object({
    firstname: Yup.string().required("first name is Required"),
    lastname: Yup.string().required("last name is Required"),
    countryid: Yup.number().required("country is Required"),
    msisdn: Yup.number().required("phone number is required"),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email Address is required'),

})



export const invoiceSchema = Yup.object({
    invoiceName: Yup.string().required("invoice title is Required"),
    currencyid: Yup.number().required("currency is Required"),
    customerid: Yup.number().required("customer is Required"),
    otp: Yup.number().required("otp is required"),
    dueDate: Yup.date().required("due date is required"),
    comment: Yup.string().required("comment is required"),

})
export const DisableSchema = Yup.object({

    action: Yup.string().required("otp is Required"),

})




