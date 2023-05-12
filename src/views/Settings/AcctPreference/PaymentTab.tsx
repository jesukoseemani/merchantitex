import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { openLoader, closeLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import styles from "./style.module.scss"
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';




interface Props {
    merchantaccountmethodid: number;
    merchantaccountid: number,
    paymentmethod: string;
    iseditable: boolean;
    currency: string
}
const PaymentTab = () => {

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
                            msgType: "error"
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

    const [paymentOptions, setPaymentOption] = useState<any>([])
    const [newPaymentOptions, setNewPaymentOption] = useState<any>()
    // const handleChange = (e: any, id: any) => {
    //     let { value } = e.target
    //     setPaymentOption({ ...paymentOptions, value })



    // }

    console.log(newPaymentOptions)
    console.log(paymentOptions);


    const handleChange = (e: any, id: any) => {

        dispatch(openLoader());
        axios
            .get<SwitchProp>(`/v1/setting/methods/${e.target.value}/switch`)
            .then((res: any) => {
                if (res?.data?.code === "success") {
                    dispatch(
                        openToastAndSetContent({
                            toastContent: res?.data?.message,
                            msgType: "success"
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
                            msgType: "error"
                        })
                    );
                }
            });
    }
    return (
        <div className={styles.account__container}>
            <div className={styles.account__header}>
                <div className="left">
                    <h2>Payment Preferences</h2>
                    <p>Manage your payment preferences</p>
                </div>
                <div className="right">
                    <button>Save changes</button>
                </div>
            </div>

            <div className={styles.account__body}>
                <p>Transfer and payout receipts</p>
                <div>
                    {!payment?.length ? (
                        <p>No payment method found</p>
                    ) : (

                        payment?.map((x: any, i: any) => (
                            <FormGroup key={i}>
                                <FormControlLabel name={x?.paymentmethod} id={x?.merchantaccountmethodid} value={x?.merchantaccountmethodid} onChange={(e: any, id: any) => handleChange(e, id)} control={<Checkbox defaultChecked />} label={x?.paymentmethod} />

                            </FormGroup>
                        ))
                    )


                    }
                </div>

            </div>
        </div>
    )
}

export default PaymentTab