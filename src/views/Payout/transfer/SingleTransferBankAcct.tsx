import { Box, FormHelperText, InputLabel } from '@material-ui/core'
import { Grid, MenuItem, Stack, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react'
import Styles from "./transferform.module.scss";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { banks } from '../../../helpers/bankslists';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Confirmation from './Confirmation';
import { styled } from '@mui/system';

const SingleTransferBankAcct = () => {
    const [bankAcct, setBankAcct] = useState(null)
    const dispatch = useDispatch()




    const handleSubmit = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "560.66px",
                    height: "442px",
                    overflow: "hidden"
                },
                modalContent: (
                    <>
                        <Confirmation />
                    </>
                ),
            })
        );
    }
    return (
        <Box className={Styles.container}>


            <Grid container mt={'33px'}>
                <Grid item xs={12} sx={{ marginBottom: "17px" }}>
                    <InputLabel>Balance to be debited</InputLabel>
                    <TextField select fullWidth>
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: "17px" }}>
                    <InputLabel>Transfer amount</InputLabel>
                    <OutlinedInput fullWidth placeholder='NGN 0.0' />


                </Grid>

                <Grid item xs={12} sx={{ marginBottom: "17px" }}>
                    <InputLabel>Bank name</InputLabel>
                    <TextField fullWidth select value={bankAcct} >
                        {banks?.map(({ id, name }) => (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <MenuItem id={name} key={id}>{name}</MenuItem>

                            </Box>
                        ))}
                    </TextField >


                </Grid>
                <Grid item xs={12}>
                    <InputLabel>Bank Account no</InputLabel>
                    <OutlinedInput fullWidth placeholder='Bank Account no' />



                </Grid>

            </Grid>
            <Box className={Styles.box2}>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                    <p>James Holiday</p>
                    <p className={Styles.savebeneficiary}>+ Save as beneficiary</p>
                </Stack>
            </Box>
            <Grid container spacing={2} mt={"75px"}>
                <Grid item xs={12}>
                    <InputLabel>Transfer description (optional)</InputLabel>
                    <OutlinedInput fullWidth placeholder='Bank account' />

                    <FormHelperText className={Styles.helperText}>
                        <ErrorOutlineIcon />You will be charged NGN 45  fee for this transaction
                    </FormHelperText>
                </Grid>
                <button onClick={handleSubmit}>Submit</button>
            </Grid>



        </Box>
    )
}

export default SingleTransferBankAcct
