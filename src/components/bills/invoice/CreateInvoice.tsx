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
    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44
        }
    });


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

                <Grid container spacing={2} padding={5}>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Invoice Title</InputLabel>
                        <StyledTextField fullWidth placeholder='123456789' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Business Logo</InputLabel>
                        <Button variant="outlined" fullWidth component="label"
                            style={{

                                fontSize: "14px", color: "#4F4F4F",
                                height: 44,
                                border: "1px solid #E0E0E0",
                                borderRadius: 4,
                                fontFamily: "Avenir",
                                textTransform: "inherit"
                            }}>
                            <CloudUploadOutlinedIcon />   choose file to upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Customer name</InputLabel>
                        <StyledTextField fullWidth placeholder='Roy philip' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Customer email Address</InputLabel>
                        <StyledTextField fullWidth placeholder='Roy.philip@example.com' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Phone Number</InputLabel>
                        <StyledTextField fullWidth placeholder='904567893' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Invoice Due Date</InputLabel>
                        <StyledTextField fullWidth placeholder='12-09-2023' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <InputLabel>Comment</InputLabel>
                        <StyledTextField fullWidth placeholder='Enter comment' />

                    </Grid>
                </Grid>

                <Stack className={Styles.puchaseHeader} direction={"row"} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #E0E0E0" paddingX={"45px"} paddingY={0}>
                    <h2>Purchase item</h2>
                    <p style={{ color: "#333" }}>NGN 0.00</p>
                </Stack>

                <Grid container spacing={2} padding={5}>
                    <Grid item xs={12} sm={12} md={6} >
                        <InputLabel>Item Description</InputLabel>
                        <StyledTextField fullWidth placeholder='Enter Decription' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Quantity</InputLabel>
                        <StyledTextField type={"number"} placeholder="2" fullWidth />

                    </Grid>

                    <Grid item xs={12} sm={12} md={6} >
                        <InputLabel>Currency</InputLabel>
                        <StyledTextField fullWidth placeholder='NGN' select sx={{ display: "block" }} InputProps={{
                            startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column", }}>
                                <MenuItem>10,000</MenuItem>
                                <MenuItem>20,000</MenuItem>
                                <MenuItem>30,000</MenuItem>
                                <MenuItem>40,000</MenuItem>
                                <MenuItem>50,000</MenuItem>
                            </Box>
                        </StyledTextField>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Unit Price</InputLabel>
                        <StyledTextField fullWidth InputProps={{
                            startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                        }} />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Tax</InputLabel>
                        <StyledTextField type={"number"} placeholder="10%" fullWidth />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <InputLabel>Discount</InputLabel>
                        <StyledTextField type={"number"} placeholder="10%" fullWidth />

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} justifyContent={"flex-end"}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "20px" }}>
                            <button onClick={handleSubmitInvoice}>Create Invoice</button>

                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default CreateInvoice
