import React from 'react'
import styles from "./businessinfo.module.scss"
import { Button, Grid, TextField, InputLabel, Stack } from '@mui/material';
import { Address } from '../../../../types/businessProfileTypes';
import { useDispatch } from 'react-redux';
import *  as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { openLoader, closeLoader } from '../../../../redux/actions/loader/loaderActions';
import { closeModal } from '../../../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../../redux/actions/toast/toastActions';


interface Props {
    message: string;
    code: string;
}

interface businessProps {
    me: any,
    business: Address,
    GetBusinessProfile: () => void
}

const EditBusiness = ({ me, GetBusinessProfile, business, meta }: any) => {
    const dispatch = useDispatch()
    const validate = Yup.object({
        businessAddress: Yup.string().required("Business Address is required"),
        city: Yup.string().required("City is required"),
        stateRegion: Yup.string().required("State Region is required"),
        supportEmail: Yup.string().required("Support Email is required"),
        supportPhone: Yup.string().required("Support Phone is required"),
        chargebackEmail: Yup.string().required("Chargeback Email is required")
    })
    const { handleSubmit, values, handleChange, errors, touched } = useFormik({
        initialValues: {
            businessAddress: business?.addressline1,
            city: business?.city,
            stateRegion: business?.state,
            supportEmail: meta[0].value,
            supportPhone: meta[1].value,
            chargebackEmail: meta[2].value
        },
        validationSchema: validate,
        onSubmit: (async ({ businessAddress, chargebackEmail, city, stateRegion, supportEmail, supportPhone }, { resetForm }) => {
            try {
                dispatch(openLoader())
                const { data } = await axios.post<Props>('/v1/setting/business/profile/edit', {
                    "address": {
                        businessAddress,
                        city,
                        stateRegion
                    },
                    supportEmail,
                    supportPhone,
                    chargebackEmail
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
                GetBusinessProfile()
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
                GetBusinessProfile()


            }
        })
    })

    return (
        <div className={styles.editBusinessInfo}>


            <div className={styles.form}>


                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} mb="1px">
                            <InputLabel>Business Address</InputLabel>

                            <TextField fullWidth name='businessAddress' value={values?.businessAddress} onChange={handleChange} placeholder="Enter Business Address" helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.businessAddress && errors?.businessAddress}</span>} />
                        </Grid>


                        <Grid item xs={12} md={6} mb="1px">
                            <InputLabel>State</InputLabel>

                            <TextField name='stateRegion' value={values?.stateRegion} onChange={handleChange} fullWidth placeholder='Enter State or region' helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.stateRegion && errors?.stateRegion}</span>} />
                        </Grid>

                        <Grid item xs={12} md={6} mb="1px">
                            <InputLabel>City</InputLabel>
                            <TextField name='city' fullWidth value={values?.city} onChange={handleChange} placeholder='Nomba Limited' helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.city && errors?.city}</span>} />
                        </Grid>
                        <Grid item xs={12} md={6} mb="1px">
                            <InputLabel>Support Email Address</InputLabel>
                            <TextField name='supportEmail' value={values?.supportEmail} onChange={handleChange} fullWidth placeholder='Enter Support Email' helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.supportEmail && errors?.supportEmail}</span>} />
                        </Grid>
                        <Grid item xs={12} md={6} mb="1px">
                            <InputLabel>Support Phone Number </InputLabel>
                            <TextField name='supportPhone' fullWidth onChange={handleChange} value={values?.supportPhone} placeholder='09069003426' helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.supportPhone && errors?.supportPhone}</span>} />
                        </Grid>
                        <Grid item xs={12} md={6} mb="1px">
                            <InputLabel>Chargeback Email</InputLabel>
                            <TextField name='chargebackEmail' onChange={handleChange} fullWidth value={values?.chargebackEmail} placeholder='Enter Chargeback Email' helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.chargebackEmail && errors?.chargebackEmail}</span>} />
                        </Grid>

                        <Stack direction={"row"} gap="24px" justifyContent={"flex-end"} alignItems="center" className={styles.buttonGroup}>
                            <button>Cancel</button>
                            <button>Save Changes </button>
                        </Stack>
                    </Grid>
                </form>
            </div>
        </div >
    )
}

export default EditBusiness