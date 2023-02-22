import { Box, FormHelperText, InputLabel } from '@material-ui/core'
import { Grid, MenuItem, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import Styles from "./transferform.module.scss";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { banks } from '../../../helpers/bankslists';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Confirmation from './Confirmation';

const SingleTransferBankAcct = () => {
    const [bankAcct, setBankAcct] = useState(null)
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "420px",
                    height: "200px",
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
            <Box className={Styles.title}><h2>Single transfer</h2></Box>


            <Grid container p={3} px={6} spacing={3}>
                <Grid item xs={12}>
                    <InputLabel>Balance to be debited</InputLabel>
                    <TextField select fullWidth>
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel>Transfer amount</InputLabel>
                    <TextField fullWidth placeholder='NGN 0.0' />


                </Grid>

                <Grid item xs={12}>
                    <InputLabel>Bank name</InputLabel>
                    <TextField fullWidth select value={bankAcct} >
                        {banks?.map(({ id, name }) => (
                            <Box sx={{ display: "flex", justifyContent: "center", padding: "10px", flexDirection: "column" }}>
                                <MenuItem id={name} style={{ padding: "8px" }} key={id}>{name}</MenuItem>

                            </Box>
                        ))}
                    </TextField >


                </Grid>
                <Grid item xs={12}>
                    <InputLabel>Bank Account no</InputLabel>
                    <TextField fullWidth placeholder='Bank Account no' />



                </Grid>

            </Grid>
            <Box className={Styles.box2}>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                    <p>James Holiday</p>
                    <p className={Styles.savebeneficiary}>+ Save as beneficiary</p>
                </Stack>
            </Box>
            <Grid container p={3} spacing={2} px={6}>
                <Grid item xs={12}>
                    <InputLabel>Transfer description (optional)</InputLabel>
                    <TextField fullWidth placeholder='Bank account' />
                    <br />
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
