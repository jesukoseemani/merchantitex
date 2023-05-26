import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, OutlinedInput } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions'
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions'
import Styles from "./styles.module.scss"


const Webhooks = () => {
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

            {/* <NavBar /> */}
            <div className={Styles.container}>

                <div className={Styles.webhook_header}>
                    <div>
                        <h2>Webhooks</h2>
                        <p>Manage your webhooks settings</p>
                    </div>
                    <div>
                        <button onClick={webhookHandler}>Save Changes</button>
                    </div>
                </div>


                <div className={Styles.hook_body}>
                    <Grid container>

                        <Grid item xs={12} sm={12} md={8}>
                            <Box mb={"20px"}>
                                <InputLabel className={Styles.label}>URL</InputLabel>

                                <input

                                    type='url'
                                    className={Styles.quarterField}

                                    placeholder='https://mysite.com/'
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}

                                />
                                {/* <TextField placeholder=''/> */}

                            </Box>


                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>

                            <Box mb={"20px"}>
                                <InputLabel className={Styles.label}>Secrete Hash</InputLabel>


                                <input
                                    type='text'
                                    placeholder='Secrete hash'
                                    value={SecreteHash}
                                    onChange={(e) => setSecreteHash(e.target.value)}
                                />


                                <br />

                                <FormHelperText id="component-helper-text" className={Styles.helperText} style={{ maxWidth: "90%", marginTop: 3 }}>


                                    Secret harsh is used to verify your webhook requests. Verify webhook requests with the secretharsh returned as verify hash from ITEX Pay
                                </FormHelperText>
                            </Box>
                            {/* <div className="controlCheckbox">
                                <FormControlLabel control={<Checkbox />} label="Receive webhook response in JSON format" />

                            </div> */}
                        </Grid>
                    </Grid>


                </div>
            </div>
        </div>
    )
}

export default Webhooks
