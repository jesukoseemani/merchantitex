import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from "yup"
import Styles from "./style.module.scss"
import { Box, Grid, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import CustomInputField from '../../components/customs/CustomInputField';
import CustomUploadBtn from '../../components/customs/CustomUploadBtn';
import useCustomUpload from '../../components/hooks/CustomUpload';
import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';

interface Props {
    code: string;
    message: string;
}

interface Actionprops {
    id: number;
    name: string;
}
const DisputeChargeback = ({ chargebackid, setOpenResponseChargebackModal }: any) => {
    const dispatch = useDispatch()

    const [img, setImg] = useState<any>()


    const validate = Yup.object({
        response: Yup.string().required("response is required"),
        proof1: Yup.string()
    })

    const splitImgUrl = (imgurl: string) => {
        const breakstring = imgurl.split('.')

        const filename = breakstring[0].substring(6, 14)
        console.log(`${filename}.${breakstring[1]}`, "break");
        return `${filename}.${breakstring[1]}`
    }

    const [proof1, setProof1] = useState("")



    // useEffect(() => {
    //     console.log(img, "imgtype");

    // }, [img])

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
                    const formdata = new FormData()
                    formdata.append("response", values.response)
                    formdata.append("proof1", img)
                    const { data } = await axios.post<Props>(`/v1/chargeback/${chargebackid}/respond`, formdata)

                    if (data?.code === "success") {
                        setOpenResponseChargebackModal(false)

                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                toastStyles: {
                                    backgroundColor: "green",
                                },
                            })
                        )

                        resetForm()
                        dispatch(closeLoader());

                    }
                } catch (error: any) {
                    dispatch(closeLoader());
                    setOpenResponseChargebackModal(false)
                    const { message } = error?.response.data;

                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            toastStyles: {
                                backgroundColor: "red",
                            },
                        })

                    );
                } finally {
                    dispatch(closeLoader());
                    setOpenResponseChargebackModal(false)
                }

            }}

        >



            {(props) => (
                <Form>
                    <Grid container spacing={3}>



                        <Grid item xs={12} sm={12}>

                            <CustomInputField as={TextField} multiline rows={4} name="response" label={"Reason for declining chargeback"} placeholder="Items are out of stock" />
                        </Grid>
                        <Grid item xs={12} sm={12}>

                            <CustomUploadBtn label='Attach proof' name='proof1' onChange={setImg} showIcon={false} />


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
                                        marginBottom: "2rem"
                                    }}


                                    type='submit' className={Styles.btn}>Submit </button>

                            </Box>
                        </Grid>

                    </Grid>

                </Form>

            )
            }
        </Formik >
    )
}

export default DisputeChargeback
