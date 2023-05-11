import React, { useState, useEffect } from 'react';
import styles from './bank.module.scss';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputLabel, TextField, Button, } from '@material-ui/core';
import SelectWrapperCountry from '../../../components/formUI/SelectCountry';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { saveCountry } from '../../redux/actions/country/countryActions';
import * as Yup from 'yup';
import { styled } from '@mui/system';
import { Box, MenuItem, Select, FormHelperText, Stack, Checkbox } from '@mui/material';

import WarningIcon from "../../../assets/images/warningIcon.svg";
import { ReactSVG } from 'react-svg';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { closeModal } from '../../../redux/actions/modal/modalActions';




interface BankProps {


    id: String;
    bank: string;
    countryIso: number



}

const AddBank = ({ data, getTransactions }: any) => {
    console.log(data, "single account")



    const dispatch = useDispatch()
    const { auth } = useSelector(state => state?.authReducer)
    const [bankList, setBankList] = useState<BankProps[]>()
    const [currencyList, setCurrencyList] = useState<any>()
    const [accountName, setAccountName] = useState("")
    const [loading, setLoading] = useState(false)
    const [editData, setEditData] = useState<any>(data?.data)
    const [selectedBank, setSeletedBank] = useState<any>()

    const fetchList = useSelector(state => state?.bankAcctReducer)

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const { data } = await axios.get<any>(`/resource/banks/${auth?.user?.country}`)
                console.log(data, "banks")
                setBankList(data?.banks)


            } catch (err: any) {
                dispatch(closeLoader());

                dispatch(
                    openToastAndSetContent({
                        toastContent: err?.response?.data?.message,
                        msgType: "error"
                    })
                );
            }
        }

        fetchBanks()
    }, [])


    // fwtch currency
    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const { data } = await axios.get<any>(`resource/currencies`)
                console.log(data, "currency")
                setCurrencyList(data?.currencies)

            } catch (err: any) {
                dispatch(closeLoader());

                dispatch(
                    openToastAndSetContent({
                        toastContent: err?.response?.data?.message,
                        msgType: "error"
                    })
                );
            }
        }

        fetchCurrency()
    }, [])


    // filter banklist
    let filterBank = bankList?.find((x: any) => x?.bank === editData?.bank);
    // setSeletedBank(filterBank)
    console.log(filterBank);



    const validate = Yup.object({
        bankid: Yup.number().required('Required'),
        accountNumber: Yup.string().required('Required'),
        bvn: Yup.string().required('Required'),
        otp: Yup.string().required('Required'),
        id: Yup.number(),
        termsAndConditions: Yup
            .boolean()
            .oneOf([true], 'You need to accept the terms and conditions')
    });

    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44,
            marginBottom: "18px",
        }
    });

    console.log(editData)
    return (
        <div style={{ width: '100%', maxWidth: '400px', overflow: 'hidden' }}>
            {/* <div className={styles.header}> */}
            {/* <h3>Add/Edit a settlement account</h3> */}
            {/* </div> */}
            <div style={{ width: '80%', margin: '0 auto', }}>
                <Formik
                    initialValues={{
                        bankid: filterBank?.id || '',
                        accountNumber: editData?.accountnumber || '',
                        bvn: '',
                        otp: "",


                    }}
                    validationSchema={validate}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        dispatch(openLoader());
                        setLoading(true)
                        axios
                            .post('/v1/setup/account/validate', {

                                bvn: values.bvn,
                                accountNumber: values.accountNumber,
                                bankid: values.bankid,

                            },
                            )

                            .then((res: any) => {
                                console.log(res, "bvnnnnnnnn")
                                dispatch(closeLoader());

                                if (res?.data?.code === "Account validated successfully") {
                                    setAccountName(res?.data?.accountName)


                                    axios
                                        .post('/v1/setting/settlement/account', {

                                            bvn: values.bvn,
                                            accountNumber: values.accountNumber,
                                            bankid: values.bankid,
                                            accountName: res?.data?.accountName,
                                            otp: values.otp,
                                            accountid: editData?.id || ""




                                        }).then((resp: any) => {
                                            console.log(resp)
                                            if (resp?.data?.code === "success") {
                                                setLoading(false)
                                                // dispatch(fetchBankAcct())
                                                dispatch(
                                                    openToastAndSetContent({
                                                        toastContent: resp?.data?.message,
                                                        msgType: "success"
                                                    })
                                                );



                                                resetForm()
                                                closeModal()
                                                // fetch accountlist
                                                getTransactions()



                                            }

                                        }).catch((err) => {
                                            dispatch(closeLoader());
                                            setLoading(false)


                                            dispatch(
                                                openToastAndSetContent({
                                                    toastContent: err?.response?.data?.message,
                                                    msgType: "error"
                                                })
                                            );
                                        });



                                }

                                // resetForm();
                                dispatch(closeModal());
                            })

                            .catch((err) => {
                                dispatch(closeLoader());
                                setLoading(false)


                                dispatch(
                                    openToastAndSetContent({
                                        toastContent: err?.response?.data?.message,
                                        msgType: "error"
                                    })
                                );
                            });
                    }}>
                    {(props) => (
                        <Form>
                            <Grid container style={{ paddingInline: "10px" }}>


                                <Grid item xs={12}>
                                    <InputLabel className={styles.label}>BVN</InputLabel>
                                    <Field
                                        as={StyledTextField}
                                        helperText={
                                            <ErrorMessage name='bvn'>
                                                {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name='bvn'
                                        placeholder='Enter your BVN'
                                        variant='outlined'

                                        size='small'
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel className={styles.label}>Bank name</InputLabel>
                                    <Field
                                        as={SelectWrapperCountry}
                                        helperText={
                                            <ErrorMessage name='bankid'>
                                                {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name='bankid'
                                        placeholder='Type'
                                        size='small'
                                        options={bankList}
                                    // defaultValue={filterBank?.id || ""}



                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel className={styles.label}>Account Number</InputLabel>
                                    <Field
                                        as={StyledTextField}
                                        helperText={
                                            <ErrorMessage name='accountNumber'>
                                                {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name='accountNumber'
                                        placeholder='Account Number'
                                        variant='outlined'
                                        defaultValue={editData?.accountnumber || ""}
                                        size='small'
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel className={styles.label}>Otp</InputLabel>
                                    <Field
                                        as={StyledTextField}
                                        helperText={
                                            <ErrorMessage name='otp'>
                                                {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                        name='otp'
                                        placeholder='Enter otp'
                                        variant='outlined'

                                        size='small'
                                        fullWidth
                                    />
                                </Grid>

                                {/* <h6 className={styles.resolve}> Account name</h6> */}
                                <Box>

                                    <Stack direction={"row"} alignItems="center" columnGap={2}>

                                        {/* <ReactSVG src={WarningIcon} /> */}
                                        <FormHelperText sx={{
                                            fontFamily: 'Avenir',
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "12px",
                                            lineHeight: "14px",
                                            marginBottom: "20px",
                                            color: "#828282"
                                        }}>
                                            Resolved Account name
                                        </FormHelperText>
                                    </Stack>
                                    <h2 style={{
                                        fontFamily: 'Avenir',
                                        fontWeight: "900",
                                        fontSize: "14px",
                                        lineHeight: "19px",
                                        // marginTop: "-7px",

                                        color: "#333"
                                    }}>
                                        {accountName && accountName}


                                    </h2>
                                </Box>
                                <br />
                                <Box>
                                    <Stack direction={"row"} alignItems="center" gap={1} mt={"20px"}>

                                        <Field as={Checkbox} type="checkbox"
                                            helperText={
                                                <ErrorMessage name='termsAndConditions'>
                                                    {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                                </ErrorMessage>
                                            } name="termsAndConditions" />
                                        <p>Make this the primary account</p>
                                    </Stack>
                                </Box>

                                <Grid item xs={12}>
                                    <Button
                                        variant='contained'
                                        style={{
                                            background: 'rgba(39, 174, 96, 1)',
                                            color: 'white',
                                            marginTop: '30px',
                                            height: '44px',
                                            marginBottom: '2.4rem',
                                            borderRadius: 20
                                        }}
                                        fullWidth
                                        type='submit'>
                                        {loading ? "Please wait" : "Continue"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default AddBank