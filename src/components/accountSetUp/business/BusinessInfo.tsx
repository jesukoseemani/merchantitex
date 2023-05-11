import { Grid, TextField, InputLabel, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { categoryList } from '../../../helpers/CategoryList';
import { styled } from '@mui/system'
import styles from "../style.module.scss"
import { OutlinedInput, FormHelperText } from '@mui/material'
import { ErrorMessage, Field, Formik, Form, useFormik } from 'formik';
import { ValidateBusinessInfo } from '../../validation/setup/Businesssetup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { closeLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { useDispatch } from 'react-redux';
import { SAVE_BUSINESS_INFO } from '../../../redux/actions/constants';
import { saveBusinessInfo } from '../../../redux/actions/setup/index';
import CustomState from '../../customs/CustomState';
import CustomPhoneNumber from '../../customs/CustomPhoneInput';



interface Props {
    handleNext: () => void
}

interface StateProps {


    id: String;
    stateName: string;
    countryIso: number



}
const BusinessInfo = ({ handleNext }: Props) => {
    const [age, setAge] = React.useState('');
    const [state, setState] = useState<StateProps[]>()
    const dispatch = useDispatch()

    const { auth } = useSelector(state => state?.authReducer)
    const { businessInfo } = useSelector(state => state?.setupReducer)


    let { email, city, businessAddress, businessDescription, stateRegion, phonenumber } = businessInfo


    // fetch state
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const { data } = await axios.get<any>(`/resource/states/${auth?.user?.country}`)
                console.log(data, "banks")
                setState(data?.states)

            } catch (err: any) {
                dispatch(closeLoader());

                dispatch(
                    openToastAndSetContent({
                        toastContent: err?.response?.data?.message,
                        msgType: "error"
                    })
                );
            }
        }

        fetchStates()
    }, [])


    useSelector(state => state?.onboardStateReducer)
    return (
        <Formik
            initialValues={{
                email,
                city,
                businessAddress,
                stateRegion,
                businessDescription,
                phonenumber
            }}
            validationSchema={ValidateBusinessInfo}

            onSubmit={({ email, city, businessAddress, businessDescription, stateRegion, phonenumber }, { setFieldValue }) => {
                dispatch(saveBusinessInfo({ email, city, businessAddress, businessDescription, stateRegion, phonenumber }));
                console.log({ email, city, businessAddress, businessDescription, stateRegion, phonenumber })
                handleNext();
            }}
        >









            {({ touched, errors, values }) => (
                <Box>
                    <Form method="post">

                        <Grid container columnSpacing={"55px"} justifyContent="space-between">
                            <Grid item xs={12} sm={6} md={6} mb="14px">
                                <InputLabel className={styles.label}>Business Description</InputLabel>
                                <Field
                                    as={TextField}
                                    helperText={
                                        <ErrorMessage name="businessDescription">
                                            {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    minRows={2} multiline
                                    name="businessDescription"
                                    placeholder="Enter your business description..."

                                    type="text"
                                    size="small"
                                    fullWidth
                                    error={touched?.businessAddress && errors?.businessAddress}



                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} mb="14px">
                                <InputLabel className={styles.label}>Business Address</InputLabel>
                                <Field
                                    as={TextField}
                                    helperText={
                                        <ErrorMessage name="businessAddress">
                                            {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    minRows={2} multiline
                                    name="businessAddress"

                                    type="text"
                                    size="small"
                                    fullWidth
                                    // error={touched?.businessAddress && errors?.businessAddress}

                                    placeholder='Enter your business address...'

                                />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} mb="14px">

                                <CustomPhoneNumber as={TextField} label={"Owner’s phone number"} placeholder="09069003426" name="phonenumber" />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6} mb="14px">
                                <InputLabel className={styles.label}>Business email Address</InputLabel>
                                <Field
                                    as={TextField}
                                    helperText={
                                        <ErrorMessage name="email">
                                            {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    fullWidth
                                    placeholder='Business email Address'
                                    name="email"



                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} mb="14px">
                                <InputLabel className={styles.label}>City</InputLabel>
                                <Field
                                    as={TextField}
                                    helperText={
                                        <ErrorMessage name="city">
                                            {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    fullWidth
                                    placeholder='Enter city'
                                    name="city"



                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} mb="14px">
                                <InputLabel className={styles.label}>State or Regions</InputLabel>

                                <Field
                                    as={CustomState}
                                    helperText={
                                        <ErrorMessage name="stateRegion">
                                            {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    fullWidth
                                    placeholder='Enter city'
                                    name="stateRegion"

                                    options={state}

                                />

                            </Grid>


                            <Grid item xs={12} sm={6} md={6} mb="14px"></Grid>
                            <br />
                            <div className="continueBtn" style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", marginBottom: "4rem", width: "100%" }}>
                                <button
                                    type='submit'
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
                                >Continue</button>

                            </div>

                        </Grid>
                    </Form>
                </Box >

            )}
        </Formik >
    )
}

export default BusinessInfo