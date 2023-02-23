import React from 'react'
import { Grid, TextField, InputLabel, Stack, Button, FormHelperText } from '@mui/material'
import Buttons from '../Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
    handleNext: () => void;
    handleBack: () => void;

}
const UploadDocument = ({ handleBack, handleNext }: Props) => {
    return (
        <Grid container rowSpacing={3} columnSpacing={6} rowGap={2} justifyContent="space-between">


            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Upload Operating License </InputLabel>

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
                    }}>
                    <CloudUploadOutlinedIcon />   choose file to upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <FormHelperText id="component-helper-text" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", color: "#8B8B8B", fontFamily: "Avenir", fontSize: "12px", }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: "-22px" }}>Only PDF, JPG and PNG are the accepted file formats</span>
                </FormHelperText>
            </Grid>
            <br />
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Upload CAC Document</InputLabel>

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
                    }}>
                    <CloudUploadOutlinedIcon />   choose file to upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>

                <FormHelperText id="component-helper-text" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", color: "#8B8B8B", fontFamily: "Avenir", fontSize: "12px", }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: "-22px" }}>Only PDF, JPG and PNG are the accepted file formats</span>
                </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Upload MERMAT, constitution or application for business registration </InputLabel>

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
                    }}>
                    <CloudUploadOutlinedIcon />   choose file to upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>


                <FormHelperText id="component-helper-text" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", color: "#8B8B8B", fontFamily: "Avenir", fontSize: "12px", }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: "-22px" }}>Only PDF, JPG and PNG are the accepted file formats</span>
                </FormHelperText>
            </Grid>
            <br />
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Upload other relevant documents</InputLabel>

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
                    }}>
                    <CloudUploadOutlinedIcon />   choose file to upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <FormHelperText id="component-helper-text" sx={{ color: "blue", cursor: "pointer", fontFamily: "Avenir", fontSize: "12px", }}>
                    <span color='blue'> + Add another document</span>
                </FormHelperText>
            </Grid>


            <Grid item xs={12} sm={12} md={12}></Grid>
            <br />
            <Stack direction="row" spacing={3} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 10 }}>
                <Buttons backgroundColor='transparent' color='#333' border='1px solid green' onClick={handleBack}>Previous</Buttons>
                <Buttons onClick={handleNext}>Submit</Buttons>
            </Stack>

        </Grid>
    )
}

export default UploadDocument