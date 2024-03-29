import React from 'react'
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import CustomInputField from '../../customs/CustomInputField';
import CustomPhoneNumber from '../../customs/CustomPhoneInput';
import CustomSelect from '../../customs/CustomSelect';
import { addcustomerSchema, DisableSchema } from '../../validation/payment/paymentValidation';
import useCountry from '../../hooks/useCountry';
import Styles from "./style.module.scss"
import { Box, Grid, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomNameSelect from '../../customs/CustomNameSelect';
import { useParams } from 'react-router-dom';

interface Props {
    code: string;
    message: string;
}

interface Actionprops {
    id: number;
    name: string;
}
const DisableInvoice = ({ id }: any) => {
    const dispatch = useDispatch()



    const actions: Actionprops[] = [{
        id: 1,
        name: "invoice"
    }, {
        id: 2,
        name: "paymentlink"
    }]
    return (
        <Formik
            initialValues={{

                action: '',







            }}
            validationSchema={DisableSchema}
            onSubmit={async (values, { resetForm }) => {
                dispatch(openLoader());
                console.log(values);


                try {
                    const { data } = await axios.post<Props>('/v1/payment/disable', { ...values, id })
                    if (data?.code === "success") {
                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                msgType: "success"
                            })
                        )

                        resetForm()
                        dispatch(closeLoader());
                        dispatch(closeModal())

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
                    <Grid container px={"40px"} spacing={3} height="250px">



                        <Grid item xs={12} sm={12}>
                            <InputLabel className={Styles.label}>Actions</InputLabel>

                            <Field
                                as={CustomNameSelect}
                                helperText={
                                    <ErrorMessage name='action'>
                                        {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                    </ErrorMessage>
                                }
                                name='action'

                                options={actions}


                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "-1rem" }}>
                                <button
                                    style={{
                                        width: "100%",
                                        marginBottom: "2rem"
                                    }}


                                    type='submit' className={Styles.btn}>Disable </button>

                            </Box>
                        </Grid>

                    </Grid>

                </Form>

            )}
        </Formik>
    )
}

export default DisableInvoice