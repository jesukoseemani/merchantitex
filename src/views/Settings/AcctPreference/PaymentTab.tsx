import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { openLoader, closeLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import styles from "./style.module.scss"
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { PaymentMethod, PaymentMethodRes } from '../../../types/paymentmethodtypes';




interface Props {
    merchantaccountmethodid: number;
    merchantaccountid: number,
    paymentmethod: string;
    iseditable: boolean;
    currency: string
}
const PaymentTab = () => {

    const dispatch = useDispatch();
    const [payment, setPayment] = useState<PaymentMethod[]>()
    const [checked, setChecked] = useState(false);



    const getPaymentMethod = async () => {
        try {
            dispatch(openLoader());
            let { data } = await axios.get<PaymentMethodRes>(`/v1/setting/methods`)
            if (data?.code === "success") {
                setPayment(data?.methods)
                dispatch(
                    openToastAndSetContent({
                        toastContent: data?.message,
                        msgType: "success"
                    })
                );
            }

        } catch (error: any) {
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
        }
        finally {
            dispatch(closeLoader());

        }
    }

    useEffect(() => {
        getPaymentMethod();
    }, []);





    const handleChange = (e: any) => {

        dispatch(openLoader());
        axios
            .get<PaymentMethodRes>(`/v1/setting/methods/${e.target.value}/switch`)
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

                        payment?.map((x: PaymentMethod) => (
                            <FormGroup key={x?.merchantaccountmethodid}>
                                <FormControlLabel name={x?.paymentmethod} value={x?.merchantaccountmethodid} onChange={(e: any) => handleChange(e)} control={<Checkbox defaultChecked={x?.status === true} />} label={x?.paymentmethod} />

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