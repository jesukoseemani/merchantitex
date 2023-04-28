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
import { ValidateAdditionalInfo } from '../../validation/setup/Businesssetup';
import SelectWrapper from '../../formUI/Select';
import { saveAdditionalInfo } from '../../../redux/actions/setup';
import { useDispatch, useSelector } from 'react-redux';
// import SelectWrapper from '../../formUI/Select';

interface Props {
    handleNext: () => void;
    handleBack: () => void;

}


interface priceProps {
    id: number,
    name: string
}
const AdditionalInfo = ({ handleBack, handleNext }: Props) => {
    const [state, setState] = React.useState('');
    const dispatch = useDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
    const { additionalDetails } = useSelector(state => state?.setupReducer)


    let { businessIncome, chargebackEmail, contactemail, supportEmail, supportPhone, websiteUrl } = additionalDetails





    const priceList: priceProps[] = [
        {
            id: 1,
            name: "NGN0 - NGN50,000"

        },
        {
            id: 2,
            name: "NGN51,000 - NGN100,000"

        },
        {
            id: 3,
            name: "NGN110,000 - NGN150,000"

        },
        {
            id: 4,
            name: "NGN151,000 - NGN200,000"

        },

    ]

    return (
        <>


            <Formik
                initialValues={{
                    websiteUrl,
                    supportPhone,
                    chargebackEmail,
                    supportEmail,
                    contactemail,
                    businessIncome,
                }}
                validationSchema={ValidateAdditionalInfo}

                onSubmit={(values, { setFieldValue }) => {
                    dispatch(saveAdditionalInfo(values));
                    // console.log({ businessIncome, chargebackEmail,contactemail,supportEmail,supportPhone, websiteUrl})
                    handleNext();
                }}
            >






                {({ touched, errors, values }) => (
                    <Box sx={{ marginTop: "-10px" }}>
                        <Form method="post">

                            <Grid container columnSpacing={4} justifyContent="space-between">
                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}> Website URL (optional)</InputLabel>
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="websiteUrl">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }

                                        name="websiteUrl"
                                        placeholder="https://example.com"

                                        type="text"
                                        size="small"
                                        fullWidth
                                    // error={touched?.businessAddress && errors?.businessAddress}



                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}>Support Email Address</InputLabel>
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="supportEmail">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name="supportEmail"
                                        placeholder="Support Email Address"

                                        type="text"
                                        size="small"
                                        fullWidth
                                    // error={touched?.businessAddress && errors?.businessAddress}



                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}>Support Phone Number</InputLabel>
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="supportPhone">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        fullWidth
                                        placeholder='+2349069003426'
                                        name="supportPhone"



                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}>Chargeback Email Address</InputLabel>
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="chargebackEmail">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        fullWidth
                                        placeholder='Chargeback Email Address'
                                        name="chargebackEmail"



                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}>Contact Email Address</InputLabel>
                                    <Field
                                        as={TextField}
                                        helperText={
                                            <ErrorMessage name="contactemail">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }

                                        name="contactemail"

                                        type="text"
                                        size="small"
                                        fullWidth
                                        // error={touched?.chargebackEmail && errors?.businessAddress}

                                        placeholder='Contact Email Address'

                                    />

                                </Grid>
                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}>What’s Your Estimated Monthly Income?</InputLabel>
                                    <Field
                                        as={SelectWrapper}
                                        helperText={
                                            <ErrorMessage name="businessIncome">
                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        fullWidth
                                        placeholder='Enter city'
                                        name="businessIncome"
                                        options={priceList}

                                    />



                                </Grid>


                                <Grid item xs={12} sm={6} md={6} mb="22px"></Grid>
                                <br />
                                <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 10 }}>
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
                                        margin: "9px 0px ",
                                        fontFamily: 'Avenir',

                                    }} onClick={handleBack}>Previous</button>
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
                                            margin: "9px 0px ",
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

export default AdditionalInfo