import React, { useEffect, useState } from 'react';
import styles from './user.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import {
    openLoader,
    closeLoader,
} from '../../../redux/actions/loader/loaderActions';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, TextField } from '@mui/material';
import { Divider, MenuItem, styled, Select, Stack, Link, Grid } from '@mui/material';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomCategory from '../../../components/customs/CustomCategory';
import 'yup-phone-lite'
import { countryCode } from '../../../helpers/CountryCode';




interface Props {
    roles: {
        id: string;
        decription: string;
        roleName: string;
    }[]

}


interface UserProps {
    code: string;
    message: string;
}

const EditUserModal = ({ data, getUsers }: any) => {
    const { user } = useSelector(state => state?.meReducer?.me)


    console.log(data?.data.firstname, "edit")
    const { id, phonenumber, roleid, firstname, lastname } = data?.data

    const validate = Yup.object({

        firstname: Yup.string()
            .required('firstname is required'),
        lastname: Yup.string()
            .required('lastname is required'),

        phonenumber: Yup.string().phone(user?.country, 'Phone number is not valid'),


        roleid: Yup.string()
            .required('Role is required'),
    });










    const [roles, setRoles] = useState<any>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(openLoader());
        const fetchPermission = async () => {

            try {

                const { data } = await axios.get<Props>("/v1/setting/roles")
                console.log(data)
                setRoles(data?.roles)


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
            } finally {
                dispatch(closeLoader());
            }
        }


        fetchPermission()
    }, [])








    return (
        <div>

            <Formik
                initialValues={{

                    roleid,
                    firstname,
                    lastname,
                    phonenumber,
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                    try {
                        dispatch(closeLoader());
                        const { data } = await axios.post<UserProps>(`/v1/users/${id}/edit`, values)


                        if (data?.code === "success") {
                            console.log(data)
                            dispatch(
                                openToastAndSetContent({
                                    toastContent: data?.message,
                                    msgType: "success"
                                })
                            );
                            dispatch(closeModal())
                            getUsers()
                        }

                    } catch (error: any) {
                        dispatch(closeLoader());

                        dispatch(
                            openToastAndSetContent({
                                toastContent: error?.response?.data?.message,
                                msgType: "error"
                            })
                        );
                    }
                }}>
                {(props) => (
                    <div className={styles.userContainer}>

                        <div className={styles.userDiv}>
                            <div className={styles.userContent}>
                                <Form>



                                    <Grid container justifyContent="space-between" alignItems={"center"} >

                                        <Grid item xs={12} md={5.6} mb="18px">
                                            <InputLabel>
                                                <span className={styles.formTitle}>User Role</span>
                                            </InputLabel>
                                            <Field
                                                as={CustomCategory}
                                                helperText={
                                                    <ErrorMessage name='roleid'>
                                                        {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                                    </ErrorMessage>
                                                }
                                                name='roleid'
                                                // value={data?.data?.roleid}
                                                options={roles}
                                            // SelectProps={{
                                            //     renderValue: (value: any) => value,
                                            // }}

                                            />



                                        </Grid>


                                        <Grid item xs={12} md={5.6} mb="18px">
                                            <InputLabel>
                                                <span className={styles.formTitle}>First name</span>
                                            </InputLabel>
                                            <Field
                                                as={TextField}
                                                helperText={
                                                    <ErrorMessage name="firstname">
                                                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                    </ErrorMessage>
                                                }
                                                name="firstname"
                                                placeholder="firstname"
                                                // margin="normal"
                                                type="text"
                                                size="small"
                                                fullWidth
                                                defaultValue={firstname}

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5.6} mb="18px">
                                            <InputLabel>
                                                <span className={styles.formTitle}>last name</span>
                                            </InputLabel>
                                            <Field
                                                as={TextField}
                                                helperText={
                                                    <ErrorMessage name="lastname">
                                                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                    </ErrorMessage>
                                                }
                                                name="lastname"
                                                placeholder="lastname"
                                                // margin="normal"
                                                type="text"
                                                size="small"
                                                fullWidth
                                                defaultValue={lastname}


                                            />
                                        </Grid>

                                        <Grid item xs={12} md={5.6} mb="18px">
                                            <InputLabel>
                                                <span className={styles.formTitle}>Phone Number</span>
                                            </InputLabel>
                                            <Field
                                                as={TextField}
                                                helperText={
                                                    <ErrorMessage name="phonenumber">
                                                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                    </ErrorMessage>
                                                }
                                                name="phonenumber"
                                                placeholder="phonenumber"
                                                // margin="normal"
                                                type="text"
                                                size="small"
                                                fullWidth
                                                defaultValue={phonenumber}


                                            />
                                        </Grid>


                                        <button
                                            style={{
                                                backgroundColor: '#27AE60',
                                                height: '44px',
                                                width: '100%',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                marginTop: "23px",
                                                fontFamily: 'Avenir',
                                                fontStyle: "normal",
                                                fontWeight: 800,
                                                fontSize: 16,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                            type='submit'
                                            color='primary'>

                                            Update User
                                        </button>
                                    </Grid>
                                </Form>
                            </div>
                            <div className={styles.user_permission}>
                                <Stack direction={"row"} mb={2} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #F2F2F2" pb={"18px"} >
                                    <h2>Permissions</h2>
                                    <Link href={"#"}>View all permissions</Link>
                                </Stack>

                                {roles?.map(({ id, roleName, description }: any) => (
                                    <div className={styles.user_content} key={id}>
                                        <p className={styles.user_h3}>{roleName}</p>
                                        <span className={styles.user_p}>{description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
                }
            </Formik >
        </div >
    );
}

export default EditUserModal;


