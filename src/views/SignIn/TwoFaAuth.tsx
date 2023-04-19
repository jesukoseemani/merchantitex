import react, { useEffect } from 'react';
import { InputLabel, Typography, Button, TextField } from '@material-ui/core';
import styles from './SignIn.module.scss';
import Logo from '../../assets/images/white_bg_logo.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import {
    openLoader,
    closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { Link, useHistory } from 'react-router-dom';
import { saveUserDetail } from '../../redux/actions/userDetail/userDetailActions';
import { saveCountry } from '../../redux/actions/country/countryActions';
// import { makeStyles } from '@material-ui/core';
import { ReactSVG } from "react-svg";
import { Box } from '@mui/material';





interface Props {
    otp: string;
}


interface RequestProp {
    code: string;
    message: string
}
const TwoFaAuth = ({ token }: any) => {



    const validate = Yup.object({
        otp: Yup.string()
            .required('OTP is required'),

    });
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <Formik
            initialValues={{

                otp: "",

            }}
            validationSchema={validate}
            onSubmit={async ({ otp }) => {
                try {
                    dispatch(openLoader());
                    const { data } = await axios.post<RequestProp>('/auth/authenticate/2fa', {

                        "twofa_token": token,
                        "otp": otp

                    })

                    dispatch(closeLoader());
                    if (data?.code === "success") {
                        console.log(data)

                        dispatch(saveAuth(data));

                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                toastStyles: {
                                    backgroundColor: 'green',
                                },
                            })
                        )
                        window.location.href = "/"
                    }

                } catch (err: any) {
                    dispatch(closeLoader());
                    dispatch(saveLoading(false));
                    dispatch(
                        openToastAndSetContent({
                            toastContent: err?.response?.data?.message,
                            toastStyles: {
                                backgroundColor: 'red',
                            },
                        })
                    );
                }

            }}
        >
            {(props) => (
                <Form>
                    <Box sx={{ width: "480px", height: "500px", background: "#475564" }}>
                        <Box className={styles.otp__container}>
                            <h5 className={styles.signinHeader}>Enter OTP to continue</h5>
                            <div className={styles.formBody} style={{ marginTop: "3rem" }}>
                                {/* <InputLabel> */}
                                {/* <span className={styles.formTitle}>Otp</span> */}
                                {/* </InputLabel> */}
                                <Field
                                    as={TextField}
                                    helperText={
                                        <ErrorMessage name='otp'>
                                            {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                        </ErrorMessage>
                                    }
                                    name='otp'
                                    variant='outlined'
                                    placeholder='otp'
                                    type='otp'

                                    fullWidth

                                />


                                <button
                                    style={{
                                        backgroundColor: '#27AE60',
                                        height: "44px",
                                        width: '100%',
                                        color: '#fff',
                                        border: 'none',
                                        fontSize: "16px",
                                        fontWeight: 800,
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        margin: "16px 0px ",
                                        fontFamily: 'Avenir',
                                        marginTop: "22px"
                                    }}
                                    type='submit'
                                    color='primary'>
                                    Sign in
                                </button>
                            </div>
                        </Box>

                    </Box>

                </Form>

            )}
        </Formik>
    )
}

export default TwoFaAuth