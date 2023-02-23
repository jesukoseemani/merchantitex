import { Box, FormHelperText, Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Styles from "./transferform.module.scss"
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Confirmation from './Confirmation';
import { useDispatch } from 'react-redux';

const SingleTransferItex = () => {
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
                    <InputLabel>Merchant ID</InputLabel>
                    <TextField fullWidth placeholder='Merchant ID' />


                </Grid>
            </Grid>
            <Box className={Styles.box2}>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                    <p>James Holiday</p>
                    {/* <p className={Styles.savebeneficiary}>+ Save as beneficiary</p> */}
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

export default SingleTransferItex