import { Grid, TextField, InputLabel, Stack } from '@mui/material'
import React from 'react'
import styles from "./profile.module.scss";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { closeLoader } from '../../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../../redux/actions/toast/toastActions';
import { closeModal } from '../../../../redux/actions/modal/modalActions';
import axios from 'axios';
import { saveMe } from '../../../../redux/actions/me/meActions';

interface Props {
    firstname: string;
    latname: string;
    phonenumber: string;
}
const EditProfile = ({ me, fetchUserDetails }: any) => {
    const dispatch = useDispatch()

    const validateUser = Yup.object({

        firstname: Yup.string()
            .required('firstname is required'),
        lastname: Yup.string()
            .required('lastname is required'),

        phonenumber: Yup.string()
            .required('phonenumber is required'),

    });

    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            roleid: me?.user?.userRole?.id,
            firstname: me?.user?.firstname || "",
            lastname: me?.user?.lastname || "",
            phonenumber: me?.user?.phonenumber || "",
        },
        validationSchema: validateUser,
        onSubmit: (async (values) => {
            try {
                dispatch(closeLoader());
                const { data } = await axios.post<any>(`/v1/users/${me?.user?.id}/edit`, values)

                if (data?.code === "success") {
                    console.log(data)
                    dispatch(
                        openToastAndSetContent({
                            toastContent: data?.message,
                            msgType: "success"
                        })
                    );

                    dispatch(closeModal())
                    // dispatch(saveMe({ ...me, }))
                    fetchUserDetails()
                }
                console.log(data, "data");

            } catch (error: any) {
                dispatch(closeLoader());

                dispatch(
                    openToastAndSetContent({
                        toastContent: error?.response?.data?.message,
                        msgType: "error"
                    })
                );
            }

        })


    })


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container px={"40px"}>
                    <Grid item xs={12} mb={"18px"}>
                        <InputLabel>Firstname</InputLabel>

                        <TextField onChange={handleChange} fullWidth name='firstname' defaultValue={values?.firstname} placeholder='Firstname' />
                    </Grid>
                    <Grid item xs={12} mb={"18px"}>
                        <InputLabel>Lastname</InputLabel>

                        <TextField fullWidth onChange={handleChange} name="lastname" defaultValue={values?.lastname} placeholder='Lastname' /></Grid>
                    <Grid item xs={12} mb={"18px"}>
                        <InputLabel>Email address</InputLabel>

                        <TextField fullWidth value={me?.user?.email} placeholder='Email' /></Grid>
                    <Grid item xs={12} >
                        <InputLabel>Phone Number</InputLabel>

                        <TextField onChange={handleChange} name="phonenumber" fullWidth defaultValue={values?.phonenumber} placeholder='phone numner' />
                    </Grid>
                    <div className={styles.btnGroup}>
                        <button onClick={() => closeModal()}>Cancel</button>
                        <button type='submit'>Save Changes</button>
                    </div>
                </Grid>
            </form>
        </div>
    )
}

export default EditProfile