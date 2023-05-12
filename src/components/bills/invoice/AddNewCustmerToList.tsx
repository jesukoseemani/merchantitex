import { Box, Grid, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import CustomInputField from '../../customs/CustomInputField';
import CustomPhoneNumber from '../../customs/CustomPhoneInput';
import CustomSelect from '../../customs/CustomSelect';
import { addcustomerSchema } from '../../validation/payment/paymentValidation';
import useCountry from '../../hooks/UseCountry';
import Styles from "./style.module.scss"




interface Props {
    code: string;
    message: string;
}
const AddNewCustmerToList = ({ fetchInvoice }: any) => {
    const dispatch = useDispatch()
    const [countryList, defaultCountry] = useCountry()
    return (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                countryid: '',
                msisdn: '',





            }}
            validationSchema={addcustomerSchema}
            onSubmit={async (values, { resetForm }) => {
                dispatch(openLoader());
                console.log(values);


                try {
                    const { data } = await axios.post<Props>('/v1/customer/add', values)
                    if (data?.code === "success") {
                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                msgType: "success",
                            })
                        )

                        resetForm()
                        dispatch(closeLoader());
                        dispatch(closeModal())
                        fetchInvoice()
                    }
                } catch (error: any) {
                    dispatch(closeLoader());
                    const { message } = error?.response.data;
                    dispatch(
                        dispatch(
                            openToastAndSetContent({
                                toastContent: message,
                                msgType: "error"
                            })
                        )
                    );
                } finally {
                    dispatch(closeLoader());
                }

            }}>



            {(props) => (
                <Form>
                    <Grid container px={"40px"} spacing={3}>

                        <Grid item xs={12} sm={12} >

                            <CustomInputField
                                as={TextField} label={"First Name"} placeholder='firstname' name='firstname' type='text' />

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <CustomInputField
                                as={TextField} label={"Last Name"} placeholder='lastname' name='lastname' type='text' />

                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <CustomInputField as={TextField} label={"Email Address"} placeholder='email' name='email' type='email' />


                        </Grid>

                        <Grid item xs={12} sm={12}>

                            <CustomPhoneNumber as={TextField} label={"Phone number"} placeholder="09069003426" name="msisdn" />

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel className={Styles.label}>Country</InputLabel>

                            <Field
                                as={CustomSelect}
                                helperText={
                                    <ErrorMessage name='countryid'>
                                        {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                    </ErrorMessage>
                                }
                                name='countryid'

                                options={countryList}


                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "20px" }}>
                                <button
                                    style={{
                                        width: "100%",
                                        marginBottom: "2rem"
                                    }}


                                    type='submit' className={Styles.btn}>Create Customer</button>

                            </Box>
                        </Grid>

                    </Grid>

                </Form>

            )}
        </Formik>
    )
}

export default AddNewCustmerToList