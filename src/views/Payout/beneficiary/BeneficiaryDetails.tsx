import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Styles from "./beneficiaries.module.scss"
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { beneficiaryRequestItem } from '../../../types/beneficiaryTypes';
import BenefiacialRecentTrans from './BenefiacialRecentTrans';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Removebenefiary from '../PendingApproval/Removebenefiary';

const BeneficiaryDetails = () => {

    const location = useLocation<{ rowData: string }>();
    const history = useHistory();
    const dispatch = useDispatch()


    const { id } = useParams<{ id: string }>();

    if (!location.state.rowData) {
        history.replace("/payout/beneficiaries");
    }

    const { rowData } = location.state;

    const formattedRowData: beneficiaryRequestItem = JSON.parse(rowData);

    const {
        name,
        bankName,
        acctNo,
        date

    } = formattedRowData;


    const handleRemove = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "653px",
                    maxWidth: "97%",
                    height: "254px",

                },
                modalContent: (
                    <>
                        <Removebenefiary />
                    </>
                ),
            })
        );
    }


    return (
        <Box>
            <Box className={Styles.details__container}>
                <Link to="/payout/pending_approval">
                    <Box className={Styles.goBack}>
                        <ArrowLeftIcon />
                        <p>Back to pending approval</p>
                    </Box >
                </Link>


                <Box className={Styles.sectionOne} >
                    <Stack direction={"row"} p={3} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #EFF3F8" >

                        <Box className={Styles.sectionHeader}>
                            <h2>{name}</h2>
                            {/* <span>Pending approval</span> */}
                            <Box>
                                <button onClick={handleRemove} className={Styles.btn}>Remove beneficiary</button>
                            </Box>
                        </Box>
                    </Stack>
                    <Grid container p={3} className={Styles.sectionTwo}>
                        <Grid item xs={12} sm={6} md={3}>
                            <span>Bank Name</span>
                            <p>{bankName}</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <span>Account number</span>
                            <p>{acctNo}</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <span>Date created</span>
                            <p>{date}</p>
                        </Grid>

                    </Grid>
                </Box>
            </Box>

            <Box className={Styles.recent}>
                <h2>Recent transfers</h2>
            </Box>

            <BenefiacialRecentTrans />
        </Box>
    )
}

export default BeneficiaryDetails