import React from 'react'
import * as Yup from 'yup';
import "yup-phone-lite";
import { countryCode } from '../../helpers/CountryCode';

// validation

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const ValidateIndividual = Yup.object({
    firstname: Yup.string()
        // .max(30, 'Must be 30 characters or less')
        .required('Firstname is required'),
    lastname: Yup.string()
        // .max(30, 'Must be 30 characters or less')
        .required('Lastname  is required'),
    businessname: Yup.string()
        .required('Trading/Business name is required'),
    phonenumber: Yup.string().required("Phone Number is required").phone(countryCode, "Invalid phone no"),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email Address is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),

    businessCategoryId: Yup.string()
        .required('Business Category is required'),

    countryid: Yup.string()
        // .max(15, 'Must be 15 characters or less')
        .required('Country is required'),

});





export const ValidateNgo = Yup.object({
    firstname: Yup.string()
        .required('Firstname is required'),
    lastname: Yup.string()
        .required('Lastname  is required'),
    organizationName: Yup.string(),
    // .required('Trading/Business name is required'),
    phonenumber: Yup.string().required("phone Number is required").phone(countryCode, "Invalid phone no"),

    email: Yup.string()
        .email('Email is invalid'),
    // .required('Email Address is required'),
    password: Yup.string()
        // .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),


    countryid: Yup.string()
        // .max(15, 'Must be 15 characters or less')
        .required('Country is required'),

});
