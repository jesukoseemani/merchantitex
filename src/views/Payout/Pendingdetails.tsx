import { Box, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Styles from "./pending.module.scss";
import { Button } from '@material-ui/core';
import { pendingApprovalRequestItem } from '../../types/pendingAprovalTypes';
import Navigation from '../../components/navbar/Navigation';
import axios from 'axios';
import { closeLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { Payout } from '../../types/Payout';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';

interface Props {
    code: string;
    message: string;
}
const Pendingdetails = () => {


    const location = useLocation<{ rowData: string }>();
    const history = useHistory();
    const dispatch = useDispatch()


    const { id } = useParams<{ id: string }>();

    const [payoutItem, setPayoutItem] = useState<any>()

    const PayoutItem = async () => {
        try {

            const { data } = await axios.get<Props>(`/v1/payout/${id}`)

            if (data?.code === "success") {

                setPayoutItem(data)
                console.log(data, "payout")
            }


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

    useEffect(() => {
        PayoutItem()
        // return () => setChargebackItem("")
    }, [id])


    return (
        <Navigation title='Payouts'>
            <Box>
                <Box className={Styles.details__container}>
                    <Link to="/payout">
                        <Box className={Styles.goBack}>
                            <ArrowLeftIcon />
                            <p>Back to payout</p>
                        </Box >
                    </Link>

                    <Box className={Styles.sectionOne}>
                        <Stack direction={"row"} p={3} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #EFF3F8" >
                            <Box className={Styles.sectionHeader}>
                                <h2>NGN {"3000"}</h2>
                                <span>Pending approval</span>
                            </Box>
                            <Box>
                                <button className={Styles.btn} >Approve transfer</button>
                            </Box>
                        </Stack>
                        <Grid container p={3} className={Styles.sectionTwo}>
                            <Grid item xs={12} sm={6} md={3}>
                                <span>Recipient</span>
                                <p>James Holiday Jr</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <span>Balance debited</span>
                                <p>NGN Balance</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <span>Date / Time</span>
                                <p>{"date"}</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <span>Transfer type</span>
                                <p>Bank transfer</p>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box className={Styles.sectionThree}>
                        <Box className={Styles.sectionThree__Header}>
                            <p>Payment information</p>
                        </Box>
                        <Grid container columnGap={7} p={3} className={Styles.sectionTwo}>
                            <Grid item xs={12} sm={6} md={3}>
                                <span>Narration</span>
                                <p>Money for transportation</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <span>Transaction Fee</span>
                                <p>NGN2000</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <span>Bank name</span>
                                <p>Access Bank</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <span>Initiated by</span>
                                <p>James Seun</p>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

        </Navigation>
    )
}

export default Pendingdetails