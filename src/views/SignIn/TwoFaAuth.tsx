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
import { styled } from '@mui/material';
import { saveMe } from '../../redux/actions/me/meActions';
import { CustomToast } from '../../components/customs/CustomToast';





interface Props {
    otp: string;
}


interface RequestProp {
    code: string;
    message: string
}
const TwoFaAuth = () => {

    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44,
            // marginBottom: "18px",
        }
    });

    const validate = Yup.object({
        otp: Yup.string()
            .required('OTP is required'),

    });
    const dispatch = useDispatch()
    const history = useHistory()
    const token = history?.location?.state


    const fetchUserDetails = async () => {
        await axios
            .get(`/v1/profile/me`)
            .then((res: any) => {
                console.log(res, "res")
                dispatch(saveMe(res.data));
            })
            .catch((err) => console.log(err));
    };



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
                        fetchUserDetails()
                        // < CustomToast text = { data?.message } />

                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                msgType: "success"
                            })
                        )
                        // window.location.href = "/"

                        history.push("/")



                    }

                } catch (err: any) {
                    dispatch(closeLoader());
                    dispatch(saveLoading(false));

                    dispatch(
                        openToastAndSetContent({
                            toastContent: err?.response?.data?.message,
                            msgType: "error"
                        })
                    );
                }

            }}
        >
            {(props) => (
                <div className={styles.signinContainer}>
                    <div className={styles.logo}>

                        <ReactSVG src={Logo} />
                    </div>
                    <div className={styles.mt1}>
                        <div className={styles.signinTwoFaDiv}>
                            <h5 className={styles.signinHeader}>Enter otp to continue</h5>
                            <div className={styles.formBody}>
                                <Form>
                                    <Box py={3}>




                                        <InputLabel style={{ marginTop: "17px" }}>
                                            {/* <span className={styles.formTitle}>Password</span> */}
                                        </InputLabel>
                                        <Field
                                            as={TextField}
                                            helperText={
                                                <ErrorMessage name='otp'>
                                                    {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            name='otp'
                                            variant='outlined'

                                            type='number'

                                            size='small'
                                            fullWidth

                                        />

                                    </Box>

                                    <button
                                        style={{
                                            backgroundColor: '#27AE60',
                                            // padding: '1rem',
                                            fontFamily: "Avenir Bold",
                                            width: '100%',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontSize: "16px",
                                            height: "44px",
                                            fontWeight: "bold"
                                        }}
                                        type='submit'
                                        color='primary'>
                                        Continue
                                    </button>

                                </Form>
                            </div>
                        </div>
                    </div>


                </div>

            )}
        </Formik>
    )
}

export default TwoFaAuth