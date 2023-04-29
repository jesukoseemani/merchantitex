import React from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from "yup"
import Styles from "./style.module.scss"
import { Box, Grid, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import CustomInputField from '../../components/customs/CustomInputField';
import CustomUploadBtn from '../../components/customs/CustomUploadBtn';

interface Props {
    code: string;
    message: string;
}

interface Actionprops {
    id: number;
    name: string;
}
const AcceptChargeback = () => {
    const dispatch = useDispatch()

    const validate = Yup.object({})

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
            validationSchema={validate}
            onSubmit={async (values, { resetForm }) => {
            }}
        // validationSchema={}
        // onSubmit={async (values, { resetForm }) => {
        //     dispatch(openLoader());
        //     console.log(values);


        //     try {
        //         const { data } = await axios.post<Props>('/v1/payment/disable', { ...values, id })
        //         if (data?.code === "success") {
        //             dispatch(
        //                 openToastAndSetContent({
        //                     toastContent: data?.message,
        //                     toastStyles: {
        //                         backgroundColor: "green",
        //                     },
        //                 })
        //             )

        //             resetForm()
        //             dispatch(closeLoader());
        //             dispatch(closeModal())

        //         }
        //     } catch (error: any) {
        //         dispatch(closeLoader());
        //         const { message } = error?.response.data;
        //         dispatch(
        //             dispatch(
        //                 openToastAndSetContent({
        //                     toastContent: message,
        //                     toastStyles: {
        //                         backgroundColor: "red",
        //                     },
        //                 })
        //             )
        //         );
        //     } finally {
        //         dispatch(closeLoader());
        //     }

        // }}

        >



            {(props) => (
                <Form>
                    <Grid container spacing={3}>




                        <Grid item xs={12} sm={12}>
                            <p className={Styles.acceptChargeback}>You are about to accept a chargeback of <br />
                                <span> NGN 23,000.00. </span> This amount will be deducted from your next settlement. Do you want to proceed?</p>
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <CustomInputField as={TextField} multiline rows={3} name="comment" label={"Comment"} placeholder="Items are out of stock" />
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <div className={Styles.acceptBtn}>
                                <button>Accept chargeback</button>
                                <button>Cancel</button>
                            </div>
                        </Grid>




                    </Grid>

                </Form>

            )
            }
        </Formik >
    )
}

export default AcceptChargeback

