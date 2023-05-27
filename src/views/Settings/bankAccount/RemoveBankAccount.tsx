import { TextField } from '@mui/material'
import React from 'react'
import styles from "./bank.module.scss"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import axios from 'axios';
import { closeModal } from '../../../redux/actions/modal/modalActions';

interface Props {
    message: string;
    code: string;
}
const RemoveBankAccount = ({ id, getTransactions }: any) => {
    const dispatch = useDispatch()
    const validate = Yup.object({
        otp: Yup.string().required("Otp is required")
    })
    const { handleSubmit, values, handleChange, errors, touched } = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: validate,
        onSubmit: (async ({ otp }, { resetForm }) => {
            try {
                dispatch(openLoader())
                const { data } = await axios.post<Props>('/v1/setting/settlement/account/remove', {
                    otp,
                    accountid: id
                })
                if (data?.code === "success") {
                    dispatch(closeLoader())
                    dispatch(closeModal())
                    dispatch(
                        openToastAndSetContent({
                            toastContent: data?.message,
                            msgType: "success"
                        })
                    );
                }
                getTransactions()
            } catch (error: any) {
                resetForm()
                dispatch(closeLoader());
                dispatch(
                    openToastAndSetContent({
                        toastContent: error?.response?.data?.message,
                        msgType: "error"
                    })
                );
            }
            finally {
                dispatch(closeModal())
                getTransactions()


            }
        })
    })
    return (
        <div className={styles.removeAcct}>
            <form onSubmit={handleSubmit}>

                <div>
                    <TextField name="otp" fullWidth placeholder="Enter Otp" onChange={handleChange} helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.otp && errors?.otp}</span>} />

                </div>
                <div className={styles.btn__group}>
                    <button onClick={() => dispatch(closeModal())}>Cancel</button>
                    <button type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default RemoveBankAccount