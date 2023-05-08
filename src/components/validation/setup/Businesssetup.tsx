import React from 'react'
import * as Yup from 'yup';
import "yup-phone-lite";
import { countryCode } from '../../../helpers/CountryCode';





export const ValidateBusinessInfo = Yup.object({
    businessAddress: Yup.string().required("business Address is Required"),
    // .required('firstname Name is required'),
    stateRegion: Yup.string().required("State is required"),
    // .max(30, 'Must be 30 characters or less')
    // .required('lastname Name is required'),
    businessDescription: Yup.string().required("business Description is Required"),
    // .required('Trading/Business name is required'),
    phonenumber: Yup.string().required("Required"),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email Address is required'),
    city: Yup.string()
        .required('City is required'),

})



export const ValidateAdditionalInfo = Yup.object({
    websiteUrl: Yup.string().required("websiteUrl is Required").url(),
    supportPhone: Yup.string().required("phone is required"),
    chargebackEmail: Yup.string().required("business Description is Required").email(),
    // .required('Trading/Business name is required'),
    supportEmail: Yup.string().required("support Email Required").email(),
    contactemail: Yup.string()
        .email('Email is invalid')
        .required('Email Address is required'),
    businessIncome: Yup.string()
        .required('business Income is required'),

})


export const ValidateContactInfo = Yup.object({
    firstname: Yup.string().required("owner's firstname is Required"),
    lastname: Yup.string().required("owner's lastname is Required"),
    bvn: Yup.number().required(" owner's bvn is Required"),
    docNumber: Yup.string().required(" owner's bvn is Required"),
    // .required('Trading/Business name is required'),
    address: Yup.string().required("owner's Address is Required"),
    docType: Yup.string().required("owner's id type is Required"),

    phonenumber: Yup.string().required("phone number is required").phone(countryCode, "Invalid phone no"),

})






export const ValidateUploads = Yup.object({
    directors: Yup.array().of(
        Yup.object().shape({
            firstname: Yup.string()
                .required("firstname is Required"),
            bvn: Yup.string()
                .required("bvn is Required"),
            phonenumber: Yup.string().required("phone is required"),
            lastname: Yup.string()
                .required("lastname is Required"),
            address: Yup.string()
                .required("address Required"),
            docType: Yup.string().required("docType Required"),
            docNumber: Yup.string()
                .required("docNumber Required"),
            docUrl: Yup.string()
            ,
            email: Yup.string()

                .email('Email is invalid')
                .required('Email Address is required'),
        })

    )


    // .compact((director) => !director.required),


})
