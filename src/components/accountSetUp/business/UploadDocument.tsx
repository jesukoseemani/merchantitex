import React from 'react'
import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box } from '@mui/material'
import Buttons from '../Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Styles from "../style.module.scss"

interface Props {
    handleNext: () => void;
    handleBack: () => void;

}
const UploadDocument = ({ handleBack, handleNext }: Props) => {
    return (
        <Box sx={{ height: "550px", marginTop: "-1.6rem" }}>
            <Grid container rowSpacing={3} columnSpacing={6} rowGap={2} justifyContent="space-between">


                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={Styles.label}>Upload Operating License </InputLabel>

                    <Button variant="outlined" fullWidth component="label"
                        style={{
                            background: "#F6F9FD",
                            fontSize: "14px", color: "#4F4F4F",
                            height: 44,
                            border: "1px dashed #7A9CC4",
                            borderRadius: 4,
                            fontWeight: 300,
                            fontFamily: "Avenir",
                            textTransform: "inherit"
                        }}>
                        <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <FormHelperText id="component-helper-text" className={Styles.helperText}>
                        <ErrorOutlineIcon /> Only PDF, JPG and PNG are the accepted file formats
                    </FormHelperText>
                </Grid>
                <br />
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={Styles.label}>Upload CAC Document</InputLabel>

                    <Button variant="outlined" fullWidth component="label"
                        style={{
                            background: "#F6F9FD",
                            fontSize: "14px", color: "#4F4F4F",
                            height: 44,
                            border: "1px dashed #7A9CC4",
                            borderRadius: 4,
                            fontWeight: 300,
                            fontFamily: "Avenir",
                            textTransform: "inherit"
                        }}>
                        <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>

                    <FormHelperText id="component-helper-text" className={Styles.helperText}>
                        <ErrorOutlineIcon /> Only PDF, JPG and PNG are the accepted file formats
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Box sx={{ marginTop: "-1rem" }}>
                        <span className={Styles.label}  >Upload MERMAT, constitution or application for business registration </span>
                    </Box>

                    <Button variant="outlined" fullWidth component="label"
                        style={{
                            background: "#F6F9FD",
                            fontSize: "14px", color: "#4F4F4F",
                            height: 44,
                            border: "1px dashed #7A9CC4",
                            borderRadius: 4,
                            fontWeight: 300,
                            fontFamily: "Avenir",
                            textTransform: "inherit"
                        }}>
                        <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>


                    <FormHelperText id="component-helper-text" className={Styles.helperText}>
                        <ErrorOutlineIcon /> Only PDF, JPG and PNG are the accepted file formats
                    </FormHelperText>
                </Grid>
                <br />
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={Styles.label}>Upload other relevant documents</InputLabel>

                    <Button variant="outlined" fullWidth component="label"
                        style={{
                            background: "#F6F9FD",
                            fontSize: "14px", color: "#4F4F4F",
                            height: 44,
                            border: "1px dashed #7A9CC4",
                            borderRadius: 4,
                            fontWeight: 300,
                            fontFamily: "Avenir",
                            textTransform: "inherit"
                        }}>
                        <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <FormHelperText id="component-helper-text" sx={{ color: "blue", marginTop: "12px", cursor: "pointer", fontFamily: "Avenir", fontSize: "12px", }}>
                        <span color='blue'> + Add another document</span>
                    </FormHelperText>
                </Grid>


                <Grid item xs={12} sm={12} md={12}></Grid>
                <br />
                <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 10 }}>
                    <button style={{
                        backgroundColor: 'transparent',
                        color: '#333',
                        border: '1px solid green',
                        height: "44px",
                        width: '146px',
                        fontSize: "16px",
                        fontWeight: 800,
                        borderRadius: '20px',
                        cursor: 'pointer',
                        margin: "9px 0px ",
                        fontFamily: 'Avenir',

                    }} onClick={handleBack}>Previous</button>
                    <button
                        style={{
                            backgroundColor: '#27AE60',
                            height: "44px",
                            width: '146px',
                            color: '#fff',
                            border: 'none',
                            fontSize: "16px",
                            fontWeight: 800,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            margin: "9px 0px ",
                            fontFamily: 'Avenir',
                        }}

                        onClick={handleNext}>Submit</button>
                </Stack>

            </Grid>
        </Box>
    )
}

export default UploadDocument