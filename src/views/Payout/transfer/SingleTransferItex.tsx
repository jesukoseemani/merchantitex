import { Box, FormHelperText, Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Styles from "./transferform.module.scss"
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Confirmation from './Confirmation';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';

const SingleTransferItex = () => {
    const dispatch = useDispatch()


    const handleSubmit = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "560.66px",
                    height: "442px",
                    overflow: "hidden",
                    zIndex: "999999"
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


            <Grid container mt={'18px'} spacing={2}>
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
                    <InputLabel>Merchant ID</InputLabel>
                    <TextField fullWidth placeholder='Merchant ID' />


                </Grid>
            </Grid>
            <Box className={Styles.box2}>
                <Stack direction={"row"} p={0} justifyContent="space-between" alignItems={"center"} >
                    <p>James Holiday</p>
                    {/* <p className={Styles.savebeneficiary}>+ Save as beneficiary</p> */}
                </Stack>
            </Box>
            <Grid container spacing={2} mt={"68px"}>
                <Grid item xs={12}>
                    <InputLabel>Transfer description (optional)</InputLabel>
                    <TextField fullWidth placeholder='Bank account' />
                    <br />
                    <FormHelperText className={Styles.helperText}>
                        <ErrorOutlineIcon />You will be charged NGN 45  fee for this transaction
                    </FormHelperText>
                </Grid>
                <Box mt="9px" sx={{ width: "100%" }}>
                    <button onClick={handleSubmit}>Submit</button>
                </Box>
            </Grid>

        </Box>
    )
}

export default SingleTransferItex
