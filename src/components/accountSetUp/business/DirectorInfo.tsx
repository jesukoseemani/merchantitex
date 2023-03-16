import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box, styled } from '@mui/material'
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
import DirectorForm from './DirectorForm';


interface Props {
    handleNext: () => void;
    handleBack: () => void;

}

const DirectorInfo = ({ handleBack, handleNext }: Props) => {



    const [formCounter, setFormCounters] = useState(1)
    const handleShowForm = () => {
        setFormCounters((prev) => prev + 1)

    }


    const [directorForm, setDirectorForm] = useState([<DirectorForm formCounter={formCounter} />])

    const handleOnChange = () => { }
    return (
        <Box sx={{ color: "#222", ".css-x0dsna-MuiGrid-root>.MuiGrid-item": { padding: 0, } }}>


            {/* 
            <Grid container
                columnGap={0}
                justifyContent={"flex-start"}
                alignItems="center" spacing={0}
                sx={{ marginTop: "-1.8rem", marginBottom: "5px" }}>


                <Grid item xs={3.5}><Box><span className={styles.directorInfo}>First Director’s Information</span></Box></Grid>
                <Grid item xs={7.5}><Box
                    sx={{
                        width: "100%",
                        borderBottom: "1px dashed  #E0E0E0"
                    }}></Box>

                </Grid>
                <Grid item xs={1}> <img src={AngleDown} alt={"arrow down"} style={{ cursor: "pointer" }} /> </Grid>
            </Grid> */}





            <Box sx={{ overflow: "auto", marginTop: "-20px" }}>



                {[...Array(formCounter)].map((_, i) => <DirectorForm key={i} formCounter={formCounter} />)}





                <Grid container
                    justifyContent={"flex-start"}
                    alignItems="center"
                    mt={2} spacing={0}>
                    <Grid item xs={3.3}>
                        <Box sx={{
                            width: "100%",
                            borderBottom: "1px dashed  #E0E0E0"
                        }}>

                        </Box>
                    </Grid>
                    <Grid item xs={5.4} onClick={handleShowForm} >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px", justifyContent: "center"
                            }}><ReactSVG src={AddIcon} style={{ cursor: "ponter" }} /> <p className={styles.addBtn}>Add another director</p></Box></Grid>
                    <Grid item xs={3.3}><Box sx={{
                        width: "100%",
                        borderBottom: "1px dashed  #E0E0E0"
                    }}></Box></Grid>
                </Grid>
                <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: "40px" }}>
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

                            fontFamily: 'Avenir',
                        }}

                        onClick={handleNext}>continue</button>
                </Stack>
            </Box>



        </Box >
    )
}

export default DirectorInfo