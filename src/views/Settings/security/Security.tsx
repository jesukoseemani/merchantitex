import { Checkbox, FormControlLabel, FormHelperText, Grid, InputLabel, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { CustomToast } from '../../../components/customs/CustomToast';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openModalAndSetContent, closeModal } from '../../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import styles from "./style.module.scss"
import QRCode from 'react-qr-code';

const Security = ({ fetchUserDetails, me }: any) => {
    const dispatch = useDispatch()


    // handle password change

    interface passwordProp {
        code: string;
        message: string;
    }
    interface QrProps {
        code: string;
        message: string;
        qrcodeUrl: string

    }

    const [passInput, setPassInput] = useState({
        currentPassword: "",
        password: ""
    })

    const handleChangePass = (e: any) => {
        setPassInput({ ...passInput, [e.target.name]: e.target.value })
    }
    console.log(passInput)
    const handlePassWordChange = async () => {
        try {
            const { data } = await axios.post<passwordProp>("/v1/profile/password/change", passInput)
            console.log(data)
            if (data?.code === "success") {
                setPassInput({
                    currentPassword: "",
                    password: ""
                })
                dispatch(
                    openToastAndSetContent({
                        toastContent: data?.message,
                        msgType: "success"
                    })
                )
            }
        } catch (error: any) {
            dispatch(closeLoader());
            const { message } = error.response.data;
            dispatch(
                openToastAndSetContent({
                    toastContent: message,
                    msgType: "error"
                })
            )
        }
        setPassInput({
            currentPassword: "",
            password: ""
        })
    }



    // 2fa

    const [twoFa, setTwoFa] = useState(false)
    const [TwoFaStatus, setTwoFaStatus] = useState(me?.user?.twofaSetup)
    const handleChange = (e: any) => {
        setTwoFa(true)
    }




    // show 2fa box

    if (twoFa) {

        const showQr = async () => {
            dispatch(openLoader());
            try {
                const { data } = await axios.get<QrProps>(`/v1/profile/2fa/qrcode`);


                if (data?.qrcodeUrl) {
                    dispatch(
                        openModalAndSetContent({
                            modalStyles: {
                                padding: "10px",
                                width: "350px !important",
                                borderRadius: "20px"

                            },
                            modalContent: (
                                <div className={styles.modalDiv}>
                                    {/* <BoxComponent data={data?.qrcodeUrl} /> */}

                                    <div className={styles.outerbox}>
                                        <div
                                            style={{
                                                width: '100%',
                                                // height: '400px',
                                                border: '1px solid black',
                                            }}>
                                            {data ? (
                                                <QRCode
                                                    style={{ height: 'auto', width: '100%' }}
                                                    value={data?.qrcodeUrl}
                                                />
                                            ) : (
                                                'Something went wrong'
                                            )}
                                        </div>
                                        <button
                                            onClick={enabledHandler}
                                            style={{
                                                fontFamily: "Avenir",
                                                textTransform: "inherit",
                                                fontSize: "20px",
                                                textAlign: 'center',
                                                border: 'none',
                                                height: "44px",
                                                outline: 'none',
                                                width: '100%',
                                                color: '#FFFFFF',
                                                padding: '13.39px 0',
                                                borderRadius: '20px',
                                                marginTop: '30px',
                                                cursor: 'pointer',
                                            }}>
                                            Enable
                                        </button>
                                    </div>
                                </div>
                            ),
                        })
                    );
                }

                // setQr(data.qrcodeUrl);
                // console.log(data.qrcodeUrl, "PropsPropsPropsProps")
                // editConfigHandler();
                dispatch(closeLoader());
            } catch (error: any) {
                dispatch(closeLoader());
                const { message } = error.response.data;
                dispatch(
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            msgType: "error"
                        })
                    )
                );
            }

        }

        showQr()
    }



    const enabledHandler = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<any>(`/v1/profile/2fa/enable`);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: data?.message,
                    msgType: "success"
                })
            );
            fetchUserDetails();
            dispatch(closeModal());
        } catch (error: any) {
            dispatch(closeLoader());
            const { message } = error.response.data;
            dispatch(
                dispatch(
                    openToastAndSetContent({
                        toastContent: message,
                        msgType: "error"
                    })
                )
            );
        }
    };

    console.log(me?.user?.twofaSetup);


    return (
        <div className={styles.security__container}>
            {/* <form> */}
            {/* <CustomToast type='error' text={"message"} /> */}

            <div className={styles.security_header}>
                <div>
                    <h2>Password</h2>
                    <p>You can change your password here</p>
                </div>
                <div>
                    <button onClick={handlePassWordChange}>Save Changes</button>
                </div>
            </div>


            <div className={styles.password_input}>
                <Grid container columnSpacing={"40px"}>
                    <Grid item xs={12} md={6}>
                        <InputLabel>Password</InputLabel>
                        <TextField fullWidth type={"password"} onChange={handleChangePass} value={passInput?.currentPassword} name="currentPassword" placeholder="currentPassword" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel>New password</InputLabel>
                        <TextField fullWidth type={"password"} onChange={handleChangePass} value={passInput?.password} name="password" placeholder="Enter new password" />

                    </Grid>
                </Grid>
            </div>
            {/* </form> */}


            <div className={styles.twoFa__box}>
                <div>
                    <h2>Two Factor Authentication</h2>
                    <p>Enable two factor authentication</p>
                </div>
                <div>
                    <FormControlLabel onChange={handleChange} control={<Checkbox defaultChecked={me?.user?.twofaSetup} />} label="Enable Two Factor Authentication for login" />
                    <FormHelperText className={styles.helperText}>  Two Factor Authentication, also known as 2FA, is an extra layer of security that requires not only a password but also something that only that user has on them. In this case, your phone number and email address.</FormHelperText>

                </div>
            </div>

        </div>
    )
}

export default Security