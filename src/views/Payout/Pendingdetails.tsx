import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Styles from "./pending.module.scss";
import { Button } from '@material-ui/core';
import { pendingApprovalRequestItem } from '../../types/pendingAprovalTypes';
const Pendingdetails = () => {


    const location = useLocation<{ rowData: string }>();
    const history = useHistory();


    const { id } = useParams<{ id: string }>();

    if (!location.state.rowData) {
        history.replace("/payout/pending_approval");
    }

    const { rowData } = location.state;

    const formattedRowData: pendingApprovalRequestItem = JSON.parse(rowData);
    console.log(rowData);
    const {
        amount,
        date,
        // id,
        receipient,
        status

    } = formattedRowData;
    return (
        <Box>
            <Box className={Styles.details__container}>
                <Link to="/payout/pending_approval">
                    <Box className={Styles.goBack}>
                        <ArrowLeftIcon />
                        <p>Back to pending approval</p>
                    </Box >
                </Link>

                <Box className={Styles.sectionOne}>
                    <Stack direction={"row"} p={3} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #EFF3F8" >
                        <Box className={Styles.sectionHeader}>
                            <h2>NGN {amount}</h2>
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
                            <p>{date}</p>
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
                            <p>NGN{amount}</p>
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
    )
}

export default Pendingdetails