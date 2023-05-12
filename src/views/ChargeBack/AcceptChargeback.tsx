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
import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal } from '../../redux/actions/modal/modalActions';

interface Props {
    code: string;
    message: string;
}

interface Actionprops {
    id: number;
    name: string;
}
const AcceptChargeback = ({ chargebackid, currency, setOpenAcceptChargebackModal, chargeAmt }: any) => {
    const dispatch = useDispatch()

    const validate = Yup.object({
        response: Yup.string().required("response is required")
    })


    return (
        <Formik
            initialValues={{

                response: '',







            }}
            validationSchema={validate}


            onSubmit={async (values, { resetForm }) => {
                dispatch(openLoader());
                console.log(values);


                try {
                    const { data } = await axios.post<Props>(`/v1/chargeback/${chargebackid}/accept`, values)
                    if (data?.code === "success") {
                        setOpenAcceptChargebackModal(false)

                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                msgType: "success"
                            })
                        )

                        resetForm()
                        dispatch(closeLoader());

                    }
                } catch (error: any) {
                    dispatch(closeLoader());
                    const { message } = error?.response.data;

                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            msgType: "error"
                        })

                    );
                } finally {
                    dispatch(closeLoader());
                    setOpenAcceptChargebackModal(false)
                }

            }}

        >



            {(props) => (
                <Form>
                    <Grid container spacing={3}>


                        <Grid item xs={12} sm={12}>
                            <p className={Styles.acceptChargeback}>You are about to accept a chargeback of <br />
                                <span>  {`${currency} ${chargeAmt}`} </span> This amount will be deducted from your next settlement. Do you want to proceed?</p>
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <CustomInputField as={TextField} multiline rows={3} name="response" label={"Comment"} placeholder="Items are out of stock" />
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <div className={Styles.acceptBtn}>
                                <button type='submit'>Accept chargeback</button>
                                <button onClick={() => setOpenAcceptChargebackModal(false)}>Cancel</button>
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

