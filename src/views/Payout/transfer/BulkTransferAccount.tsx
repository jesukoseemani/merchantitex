import { Box, Button, Grid, InputLabel, Link, MenuItem, TextField } from '@mui/material'
import React from 'react'
import Styles from "./transferform.module.scss";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/actions/modal/modalActions';

const BulkTransferAccount = () => {
    // const history = useNav()
    const dispatch = useDispatch()
    const history = useHistory()



    const submitBulk = () => {
        // history.push("/bulk-transfer-entries")

        dispatch(closeModal())
        console.log(history)

    }
    return (

        <Box className={Styles.bulk__container}>
            <Box className={Styles.title}><h2>Bulk transfer</h2></Box>

            <Box className={Styles.topText}>
                <h3>Upload File - Must be CSV</h3>
                <p>CSV file should contain account number, bank, amount, and description columns.</p>

                <p>The order of the columns should be the same as the order in which they are listed above with the first row header.</p>
            </Box>
            <Box>
                <Grid container p={3} px={6} spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel>Balance to be debited</InputLabel>
                        <TextField select fullWidth>
                            <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                                <MenuItem>3</MenuItem>
                            </Box>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Bulk transfer CSV file</InputLabel>
                        <Button variant="outlined" fullWidth component="label"
                            style={{
                                background: "#F6F9FD",
                                fontSize: "14px", color: "#4F4F4F",
                                height: 49,
                                border: "1px dashed #7A9CC4",
                                borderRadius: 4,
                                fontWeight: 300,
                                fontFamily: "Avenir",
                                textTransform: "inherit"
                            }}
                        >
                            <CloudUploadOutlinedIcon />   choose file to upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>


                        <Link href='/payout/transfer/entries'>
                            <button onClick={submitBulk}>Submit</button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default BulkTransferAccount
