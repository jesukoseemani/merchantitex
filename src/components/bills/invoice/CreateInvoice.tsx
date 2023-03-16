import { Box, Button, Grid, InputAdornment, InputLabel, MenuItem, Stack, TextField } from '@mui/material'
import React from 'react'
import Styles from "./style.module.scss"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Success from './Success';

const CreateInvoice = () => {

    const dispatch = useDispatch()



    const handleSubmitInvoice = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    boxShadow: "-4px 4px 14px rgba(224, 224, 224, 0.69)",
                },
                modalContent: (
                    <div className="modalDiv">
                        <Success />
                    </div>
                ),
            })
        );
    }
    return (
        <Box>
            <Box sx={{ width: "753px", maxWidth: "100%", height: "700px", borderRadius: "20px", }}>
                <Box className={Styles.createInvoiceheader}>
                    <h2>  Create an Invoice</h2>
                </Box>

                <Box sx={{ marginTop: "38px" }}>
                    <Grid container spacing={3} paddingX={"50px"} >
                        <Grid item xs={12} sm={12} md={6}>
                            <InputLabel className={Styles.label}>Invoice Title</InputLabel>
                            <TextField fullWidth placeholder='123456789' />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <InputLabel className={Styles.label}>Business Logo</InputLabel>
                            <Button variant="outlined" fullWidth component="label"
                                style={{

                                    fontSize: "14px", color: "#4F4F4F",
                                    height: 44,
                                    border: "1px solid #E0E0E0",
                                    borderRadius: 4,
                                    fontFamily: "Avenir",
                                    textTransform: "inherit",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    paddingLeft: "10px",
                                    gap: "0.8rem"
                                }}>
                                <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <InputLabel className={Styles.label}>Customer name</InputLabel>
                            <TextField fullWidth placeholder='Roy philip' />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <InputLabel className={Styles.label}>Customer email Address</InputLabel>
                            <TextField fullWidth placeholder='Roy.philip@example.com' />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <InputLabel className={Styles.label}>Phone Number</InputLabel>
                            <TextField fullWidth placeholder='904567893' />

                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <InputLabel className={Styles.label}>Invoice Due Date</InputLabel>
                            <TextField fullWidth placeholder='12-09-2023' />

                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <InputLabel className={Styles.label}>Comment</InputLabel>
                            <TextField fullWidth placeholder='Enter comment' />

                        </Grid>
                    </Grid>

                </Box>

                <Stack className={Styles.puchaseHeader} direction={"row"} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #E0E0E0" paddingX={"50px"} marginTop="3.5rem" paddingY={0}>
                    <h2 style={{ paddingBottom: "10px" }}>Purchase item</h2>
                    <p style={{ color: "#333", paddingBottom: "10px" }}>NGN 0.00</p>
                </Stack>

                <Grid container spacing={3} padding={"2rem"} px={6}>
                    <Grid item xs={12} sm={12} md={6} >
                        <InputLabel className={Styles.label}>Item Description</InputLabel>
                        <TextField fullWidth placeholder='Enter Decription' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel className={Styles.label}>Quantity</InputLabel>
                        <TextField type={"number"} placeholder="2" fullWidth />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6} >
                        <InputLabel className={Styles.label}>Currency</InputLabel>
                        <TextField fullWidth placeholder='NGN' select sx={{ display: "block" }} InputProps={{
                            startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                        }}>

                            <MenuItem>10,000</MenuItem>
                            <MenuItem>20,000</MenuItem>
                            <MenuItem>30,000</MenuItem>
                            <MenuItem>40,000</MenuItem>
                            <MenuItem>50,000</MenuItem>

                        </TextField>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel className={Styles.label}>Unit Price</InputLabel>
                        <TextField fullWidth InputProps={{
                            startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                        }} />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel className={Styles.label}>Tax</InputLabel>
                        <TextField type={"number"} placeholder="10%" fullWidth />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel className={Styles.label}>Discount</InputLabel>
                        <TextField type={"number"} placeholder="10%" fullWidth />

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} justifyContent={"flex-end"}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "20px" }}>
                            <button className={Styles.btn} onClick={handleSubmitInvoice}>Create Invoice</button>

                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default CreateInvoice
