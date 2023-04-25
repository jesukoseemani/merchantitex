import { Box, Switch } from '@mui/material';
import React from 'react'
import UseFetch from '../../../components/hooks/UseFetch';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { openLoader, closeLoader } from '../../../redux/actions/loader/loaderActions';
import { useState } from 'react';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { useEffect } from 'react';
import styles from "./styles.module.scss"





interface Props {
    merchantaccountmethodid: number;
    merchantaccountid: number,
    paymentmethod: string;
    iseditable: boolean;
    currency: string
}
const PaymentMethod = () => {

    const dispatch = useDispatch();
    const [payment, setPayment] = useState<any>()
    const [checked, setChecked] = useState(false);



    const getPaymentMethod = () => {
        dispatch(openLoader());
        axios
            .get<Props>(`/v1/setting/methods`)
            .then((res: any) => {
                const { methods } = res?.data;
                // const { account } = business?.settlement;
                console.log(methods, "methods")

                setPayment(methods);
                dispatch(closeLoader());
            })
            .catch((error: any) => {
                dispatch(closeLoader());
                if (error.response) {
                    const { message } = error.response.data;
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            toastStyles: {
                                backgroundColor: "red",
                            },
                        })
                    );
                }
            });
    };

    useEffect(() => {
        getPaymentMethod();
    }, []);




    interface SwitchProp {
        code: string;
        message: string
    }


    const handleTogglepayment = (e: any) => {
        setChecked(true)
        // setChecked((prev) => !prev);
        console.log(e?.target.value)
        dispatch(openLoader());
        axios
            .get<SwitchProp>(`/v1/setting/methods/${e?.target.value}/switch`)
            .then((res: any) => {
                if (res?.data?.code === "success") {
                    dispatch(
                        openToastAndSetContent({
                            toastContent: res?.data?.message,
                            toastStyles: {
                                backgroundColor: "green",
                            },
                        })
                    );
                    getPaymentMethod()
                }

                // setPayment(methods);
                dispatch(closeLoader());
            })
            .catch((error: any) => {
                dispatch(closeLoader());
                if (error.response) {
                    const { message } = error.response.data;
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            toastStyles: {
                                backgroundColor: "red",
                            },
                        })
                    );
                }
            });
    }
    return (
        <Box className={styles.box__wrapper}>

            {!payment?.length ? (
                <p>No payment method found</p>
            ) : (

                payment?.map((x: any, i: number) => (
                    <Box key={i} className={styles.box}>


                        <h2>Paymentid: <p>{x?.merchantaccountmethodid}</p></h2>
                        <h2>userId: <p>{x?.merchantaccountid}</p></h2>
                        <h2>paymentmethod: <p>{x?.paymentmethod}</p></h2>
                        <h2>currency: <p>{x?.currency}</p></h2>
                        <h2>Switch Method: <p><Switch datatype={x} value={x?.merchantaccountmethodid} checked={checked} onChange={handleTogglepayment} /></p></h2>
                        {/* <h2>Switch Method: <p><button onClick={() => handleTogglepayment(x)}>Switch</button></p></h2> */}

                    </Box>
                ))
            )


            }
        </Box>
    )
}

export default PaymentMethod