import React from 'react'
import Styles from "./resetpassword.module.scss";
import Logo from "../../../assets/images/white_bg_logo.svg"
import { ReactSVG } from "react-svg";
import CustomInput from '../../../components/customs/CustomInput';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputLabel, Typography, Button, TextField } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { closeLoader } from '../../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';



interface Props {
    code: string;
    message: string;
    email: string;
}

const ResetPassword = () => {
    const validate = Yup.object({
        email: Yup.string()
            .email("Email is invalid")
            .required('Email Address is required')
    });


    const history = useHistory()
    const dispatch = useDispatch()
    return (


        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
                try {
                    dispatch(closeLoader());
                    const { data } = await axios.post<Props>("/auth/password/reset", values)


                    if (data?.code === "success") {
                        dispatch(
                            openToastAndSetContent({
                                toastContent: data.message,
                                toastStyles: {
                                    backgroundColor: 'green',
                                },
                            })
                        );
                        console.log(data, "data");
                    }


                } catch (error: any) {
                    dispatch(closeLoader());

                    dispatch(
                        openToastAndSetContent({
                            toastContent: error.message,
                            toastStyles: {
                                backgroundColor: 'red',
                            },
                        })
                    );
                }
                // console.log(values, "values")



            }}
        >
            {(props) => (

                <div className={Styles.container}>
                    <div className={Styles.logo}>
                        <ReactSVG src={Logo} />
                    </div>
                    <div className={Styles.form_container}>
                        <div className={Styles.middle}>
                            <h2>Password resetsss</h2>
                            <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                            <Form>
                                <Field
                                    as={TextField}
                                    helperText={
                                        <ErrorMessage name="email">
                                            {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    name="email"
                                    placeholder="email@email.com"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    style={{ height: "20px !important" }}

                                />
                                <button type='submit'>Continue</button>
                            </Form>
                        </div>

                    </div>
                    <Link to={"/signin"}>
                        <p className={Styles.footer}>Remember your password? <span> Back to Login</span></p>
                    </Link>
                </div>
            )}
        </Formik>
    )
}

export default ResetPassword