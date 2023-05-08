import { Grid, Stack, TextField, InputLabel, Box, styled } from '@mui/material';
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { State } from '../../../helpers/State';
import { ErrorMessage, Field, Formik, Form, useFormik } from 'formik';

import styles from "../style.module.scss"
import { ValidateAdditionalInfo, ValidateContactInfo } from '../../validation/setup/Businesssetup';
import SelectWrapper from '../../formUI/Select';
import { saveAdditionalInfo } from '../../../redux/actions/setup';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputField from '../../customs/CustomInputField';
import CustomPhoneNumber from '../../customs/CustomPhoneInput';
import CustomUploadBtn from '../../customs/CustomUploadBtn';
// import SelectWrapper from '../../formUI/Select';
import useCustomUpload from '../../hooks/CustomUpload';
import { saveContactform } from '../../../redux/actions/setup';

interface Props {
    handleNext: () => void;
    handleBack: () => void;

}

interface IdProps {
    id: number;
    name: string;
}

interface priceProps {
    id: number,
    name: string
}
const ContactForm = ({ handleBack, handleNext }: Props) => {
    const [state, setState] = React.useState('');
    const dispatch = useDispatch()

    const splitImgUrl = (string:string) => {
        const breakstring = string.split('.')
        const filename = breakstring[0].substring(6, 14)
        return `${filename}.${breakstring[1]}`
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
    const { contactInfo } = useSelector(state => state?.setupReducer)


    let { firstname, lastname, phonenumber, bvn, address, docType, docNumber, docUrl, } = contactInfo




    const idTypes: IdProps[] = [
        {
            id: 1,
            name: "intpassport"
        },
        {
            id: 2,
            name: "driverlicense"
        },


    ]


    const { handleUpload, imgUrl, loading } = useCustomUpload()

    const handlegoBack = () => {
        dispatch(saveContactform({ firstname, lastname, phonenumber, bvn, address, docType, docNumber, }))
        handleBack()
    }

    return (
        <>


            <Formik
                initialValues={{
                    firstname,
                    lastname,
                    phonenumber,
                    bvn,
                    address,
                    docType,
                    docNumber,
                    // docUrl: imgUrl

                }}
                validationSchema={ValidateContactInfo}

                onSubmit={(values, { setFieldValue }) => {
                    dispatch(saveContactform({ ...values, docUrl: imgUrl }));
                    // console.log({ firstname, lastname, phonenumber, bvn, address, docType, docNumber, docUrl })
                    handleNext();
                }}
            >






                {({ touched, errors, values }) => (
                    <Box sx={{ marginTop: "-1.8rem", }} >
                        <h2 className={styles.headerTitle}>Business Owner’s Information</h2>
                        <Form method="post">

                            <Grid container columnSpacing={"55px"} justifyContent="space-between">
                                <Grid item xs={12} sm={6} md={6} >
                                    <CustomInputField label={"Owner’s First Name"} name='firstname' placeholder='Owner’s First Name' as={TextField} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="14px">
                                    <CustomInputField label={"Owner’s Last Name"} name='lastname' placeholder='Owner’s Last Name' as={TextField} />


                                </Grid>



                                <Grid item xs={12} sm={6} md={6} mb="14px">
                                    <CustomInputField label={"Owner’s BVN"} name='bvn' placeholder='Owner’s BVN' as={TextField} />

                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="14px">
                                    <CustomPhoneNumber as={TextField} label={"Owner’s phone number"} placeholder="09069003426" name="phonenumber" />

                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="14px">

                                    <CustomInputField label={"Owner’s address"} name='address' placeholder="Owner’s address" as={TextField} />


                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="14px">
                                    <InputLabel className={styles.label}>Select an ID type</InputLabel>

                                    <Field
                                        as={SelectWrapper}
                                        helperText={
                                            <ErrorMessage name="idTypes">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        fullWidth

                                        name="docType"
                                        options={idTypes}

                                    />


                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="14px">

                                    <CustomInputField label={"ID Document number"} name='docNumber' placeholder='ID Document number' as={TextField} />


                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>

                                    <CustomUploadBtn helperText='A valid NIN Slip, National ID Card, Permanent Voters Card, International Passport or Drivers License.' label='Upload an ID Document' onChange={handleUpload} />
                                    {splitImgUrl(imgUrl ?? "")}

                                </Grid>



                                <br />
                                <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 6 }}>
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        color: '#333',
                                        border: '1px solid green',
                                        height: "44px",
                                        width: '146px',
                                        fontSize: "16px",
                                        fontWeight: 800,
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontFamily: 'Avenir',

                                    }} onClick={handlegoBack}>Previous</button>
                                    <button
                                        style={{
                                            backgroundColor: '#27AE60',
                                            height: "44px",
                                            width: '146px',
                                            color: '#fff',
                                            border: 'none',
                                            fontSize: "16px",
                                            fontWeight: 800,
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontFamily: 'Avenir',
                                        }}

                                        type="submit">Continue</button>
                                </Stack>
                            </Grid>
                        </Form>
                    </Box >

                )}
            </Formik >
        </>


    )
}

export default ContactForm