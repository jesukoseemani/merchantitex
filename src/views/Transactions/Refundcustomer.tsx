import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from "yup"
// import Styles from "./style.module.scss"
import { Box, Grid, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomInputField from '../../components/customs/CustomInputField';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomSelect from '../../components/customs/CustomSelect';
import CustomRefund from '../../components/customs/CustomRefund';
import { closeModal } from '../../redux/actions/modal/modalActions';

interface Props {
    code: string;
    message: string;
}

interface Actionprops {
    id: number;
    name: string;
}
const Refundcustomer = ({ id }: any) => {
    const dispatch = useDispatch()

    const actiontypes: Actionprops[] = [{
        id: 1,
        name: "partial"
    }, {
        id: 2,
        name: "full"
    }

    ]

    const validate = Yup.object({
        refundtype: Yup.string().required("Refundtype is required"),
        amount: Yup.number().required("Amount is required"),
        reason: Yup.string().required("Reason is required"),
    })



    // useEffect(() => {
    //     console.log(img, "imgtype");

    // }, [img])

    return (
        <Formik
            initialValues={{

                reason: '',
                amount: '',
                refundtype: '',

            }}
            validationSchema={validate}


            onSubmit={async (values, { resetForm }) => {
                dispatch(openLoader());
                console.log(values);


                try {

                    const { data } = await axios.post<Props>(`/v1/refund/initiate/${id}`, { ...values, id })

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
                        openToastAndSetContent({
                            toastContent: message,
                            msgType: "error",
                        })

                    );
                } finally {
                    dispatch(closeLoader());
                    dispatch(closeModal())
                }

            }}

        >



            {(props) => (
                <Form>
                    <Grid container spacing={3} px={"50px"}>



                        <Grid item xs={12} sm={12}>



                            <InputLabel>Reason for declining chargeback</InputLabel>

                            <Field
                                as={CustomRefund}
                                helperText={
                                    <ErrorMessage name="refundtype">
                                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                    </ErrorMessage>
                                }
                                fullWidth
                                placeholder='Enter city'
                                name="refundtype"

                                options={actiontypes}

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <CustomInputField as={TextField} name="amount" type='number' label={"Amount"} placeholder="Enter Amount" />
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <CustomInputField as={TextField} multiline rows={4} name="reason" label={"Reason for Refunding Customer"} placeholder="Reason for Refunding Customer" />
                        </Grid>
                        <Grid item xs={12} sm={12}>



                            {/* <button style={{
                                backgroundColor: "transparent",
                                color: "#234DDF",
                                marginLeft: "-1rem",
                            }}>+ Upload another file</button> */}
                        </Grid>


                        <Grid item xs={12} sm={12}>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", }}>
                                <button
                                    style={{
                                        width: "100%",
                                        marginBottom: "2rem",
                                        height: "44px",
                                    }}


                                    type='submit'>Submit </button>

                            </Box>
                        </Grid>

                    </Grid>

                </Form>

            )
            }
        </Formik >
    )
}

export default Refundcustomer

