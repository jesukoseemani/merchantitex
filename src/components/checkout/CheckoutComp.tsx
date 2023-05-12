import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, OutlinedInput } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions'
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions'
import Styles from "./styles.module.scss"


const CheckoutComp = () => {
    const [url, setUrl] = useState('');
    const [SecreteHash, setSecreteHash] = useState('');
    const [value, setValue] = useState('1');




    const fetchWebhook = () => {
        axios
            .get<any>(`/v1/developer/webhook`)
            .then((res: any) => {
                setUrl(res?.data?.webhook?.url);
                setSecreteHash(res?.data?.webhook?.secretKey)
                console.log(res?.data)
            })
            .catch((err) => {
                console.log(err);
                dispatch(closeLoader());
                dispatch(
                    openToastAndSetContent({
                        // toastContent: "Login Failed",
                        toastContent: err?.response?.data?.message,

                        msgType: "error"
                    })
                );
            });
    }
    useEffect(() => {
        fetchWebhook()
    }, []);

    const dispatch = useDispatch();
    const webhookHandler = () => {
        dispatch(openLoader());
        axios
            .post(`/v1/developer/webhook/update`, {
                url,
                secretKey: SecreteHash,
                enableNotification: true


            })
            .then((res: any) => {
                console.log('heris:', res);

                dispatch(closeLoader());
                fetchWebhook()
                dispatch(
                    openToastAndSetContent({
                        // toastContent: "Login Failed",
                        toastContent: res?.data?.message,

                        msgType: "success"
                    })
                );
            })
            .catch((err) => {
                console.log(err);
                dispatch(closeLoader());
                dispatch(
                    openToastAndSetContent({
                        // toastContent: "Login Failed",
                        toastContent: err?.response?.data?.message,
                        msgType: "error"
                    })
                );
            });
    };
    return (
        <div>
            <div className={Styles.container}>

                <div className={Styles.webhook_header}>
                    <div>
                        <h2>Checkout Customization</h2>
                        <p>Customize your checkout to match your brand</p>
                    </div>
                    <div>
                        <button onClick={webhookHandler}>Save Changes</button>
                    </div>
                </div>


                <div className={Styles.hook_body}>
                    <div className='hook_wrapper'>
                        <div className='hook_left'></div>
                        <div className='hook_right'></div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default CheckoutComp
