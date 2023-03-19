import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, OutlinedInput } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions'
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions'
import Styles from "./styles.module.scss"
import { TextField } from '@material-ui/core';

const LiveHook = () => {
    const [url, setUrl] = useState('');
    const [SecreteHash, setSecreteHash] = useState('');
    const [value, setValue] = useState('1');
    useEffect(() => {
        axios
            .get(`/merchant/account/webhook`)
            .then((res: any) => {
                setUrl(res.data.url);
                setSecreteHash(res?.data?.setSecreteHash)
                console.log(res?.data)
            })
            .catch((err) => {
                console.log(err);
                dispatch(closeLoader());
                dispatch(
                    openToastAndSetContent({
                        // toastContent: "Login Failed",
                        toastContent: err?.response?.data?.message,

                        toastStyles: {
                            backgroundColor: 'red',
                        },
                    })
                );
            });
    }, []);

    const dispatch = useDispatch();
    const webhookHandler = () => {
        dispatch(openLoader());
        axios
            .post(`/merchant/account/webhook`, { url })
            .then((res: any) => {
                console.log('heris:', res);
                dispatch(closeLoader());
                dispatch(
                    openToastAndSetContent({
                        // toastContent: "Login Failed",
                        toastContent: res?.data?.message,

                        toastStyles: {
                            backgroundColor: 'green',
                        },
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

                        toastStyles: {
                            backgroundColor: 'red',
                        },
                    })
                );
            });
    };
    return (
        <Box>

            {/* <NavBar /> */}
            <div className={Styles.container}>
                <Grid container>

                    <Grid item xs={12} sm={12} md={8}>
                        <Box mb={"20px"}>
                            <InputLabel>URL</InputLabel>

                            <OutlinedInput
                                fullWidth
                                sx={{ background: "#fff" }}
                                type='url'
                                className={Styles.quarterField}
                                // label='Url'
                                placeholder='https://mysite.com/'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}

                            />
                            {/* <TextField placeholder=''/> */}

                        </Box>


                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>

                        <Box mb={"20px"}>
                            <InputLabel>Secrete Hash</InputLabel>


                            <OutlinedInput
                                fullWidth
                                sx={{ background: "#fff" }}
                                type='Secrete Hash'
                                // label='Secrete Hash'
                                placeholder='Secrete hash'
                                // value={SecreteHash}
                                onChange={(e) => setUrl(e.target.value)}
                            />


                            <br />

                            <FormHelperText id="component-helper-text" className={Styles.helperText} style={{ maxWidth: "90%" }}>


                                Secret harsh is used to verify your webhook requests. Verify webhook requests with the secretharsh returned as verify hash from ITEX Pay
                            </FormHelperText>
                        </Box>
                    </Grid>
                </Grid>



                <div className={Styles.checkboxField}>

                    <FormControl>
                        {/* <FormLabel id="demo-radio-buttons-group-label">Transaction Emails</FormLabel> */}

                        <FormControlLabel control={<Checkbox />} label="Receive webhook response in JSON format" />
                        <FormControlLabel control={<Checkbox />} label="Enable Webhook retries" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Enable failed transactions webhook" />
                    </FormControl>
                    <Box sx={{
                        width: "300px",
                        marginLeft: "20px",
                        marginBottom: "64px",
                        '& > *': {
                            width: "100%",
                            maxWidth: "100%"
                        }
                    }}>
                        <OutlinedInput placeholder="Enter a custom hook URL" sx={{ backgroundColor: "#fff", width: "454px", maxWidth: "100%" }} />
                    </Box>
                </div>
                <button onClick={webhookHandler} style={{ borderRadius: "20px", height: "39px" }} className='success'>
                    Save webhook settings
                </button>
            </div>
        </Box>
    )
}

export default LiveHook
