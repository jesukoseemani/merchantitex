import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box, styled } from '@mui/material'
import Buttons from '../Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from "../style.module.scss"
import AddIcon from "../../../assets/images/add.svg"
import AngleDown from "../../../assets/images/arrowDown.png"
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DirectorForm = ({ formCounter }: { formCounter: number }) => {


    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44,
            marginBottom: "22px",
        }
    });
    return (

        <Box sx={{ marginTop: "-1.3rem", marginBottom: "20px", height: "100%" }}>
            <Accordion elevation={0} defaultExpanded={formCounter === 1 ? true : false}>
                <AccordionSummary sx={{ width: "100%", boxShadow: "none", border: "none", }}>
                    <Grid container columnGap={0} justifyContent={"flex-start"} alignItems="center" px={2} >
                        <Grid item xs={3.5}><Box><span className={styles.directorInfo}>First Director’s Information</span></Box></Grid>
                        <Grid item xs={7.5}><Box sx={{
                            width: "100%",
                            borderBottom: "1px dashed  #E0E0E0"
                        }}></Box></Grid>
                        <Grid item xs={1}> <img src={AngleDown} alt={"arrow down"} style={{ cursor: "pointer" }} /> </Grid>
                    </Grid>
                </AccordionSummary>

                <AccordionDetails sx={{ marginTop: "-0.5rem" }}>
                    <Box sx={{ marginBottom: "10px", }}>

                        <Grid container columnSpacing={2} spacing={0} justifyContent="space-between">
                            {/* <Grid item xs={12} mb={2}>
                                <span>Second Director’s Information</span>

                            </Grid>
                            <Grid item xs={12}></Grid> */}
                            <br />
                            <Grid item xs={12} sm={6} md={6}>
                                <InputLabel className={styles.label}>Director's full name</InputLabel>
                                <StyledTextField variant='outlined' fullWidth placeholder="Director 's fullname" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <InputLabel className={styles.label}>Director's eail address</InputLabel>
                                <StyledTextField variant='outlined' fullWidth placeholder="Director's eail address" />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <InputLabel className={styles.label}>Director's BVN</InputLabel>
                                <StyledTextField variant='outlined' fullWidth placeholder="Director's BVN" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <InputLabel className={styles.label}>Director's phone number</InputLabel>
                                <StyledTextField variant='outlined' fullWidth placeholder="Director's phone number" />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <InputLabel className={styles.label}>Director's Address</InputLabel>
                                <StyledTextField variant='outlined' fullWidth placeholder="Director's ddress" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <InputLabel className={styles.label}>Upload an ID </InputLabel>

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
                                    <CloudUploadOutlinedIcon className={styles.downloadIcon} />   choose file to upload
                                    <input hidden accept="image/*" multiple type="file" />
                                </Button>
                                <FormHelperText id="component-helper-text" className={styles.helperText}>
                                    <ErrorOutlineIcon /> A valid NIN Slip, National ID Card, Permanent Voters Card, International Passport or Drivers License.
                                </FormHelperText>
                            </Grid>






                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>

        </Box>


    )
}

export default DirectorForm