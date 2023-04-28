import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, MenuItem, Box, styled, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import styles from "../style.module.scss"
import { ReactComponent as AngleDown } from "../../../assets/images/circle-arrowdown.svg"
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ErrorMessage } from 'formik';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SelectWrapper from '../../formUI/Select';
import WarningIcon from "../../../assets/images/warningIcon.svg";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { saveDirector } from '../../../redux/actions/setup/index';
import { ValidateUploads } from '../../validation/setup/Businesssetup';
import *  as Yup from "yup"
import useCustomUpload from '../../hooks/CustomUpload';
import { v4 as uuidv4 } from "uuid";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CustomUploadBtn from '../../customs/CustomUploadBtn';
import { ReactComponent as AddIcon } from '../../../assets/images/plus.svg';


interface Props {
    handleNext: () => void;
    handleBack: () => void;

}





interface IdProps {
    id: number;
    name: string;
}

const DirectorInfo = ({ handleBack, handleNext }: Props) => {
    const [presentIndex, setPresentIndex] = useState(0)
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState("")

    const { directors } = useSelector(state => state?.setupReducer)

    const [input, setInput] = useState<any>([{
        firstname: "",
        lastname: "",
        phonenumber: "",
        bvn: "",
        email: "",
        address: "",
        docNumber: "",
        docUrl: "",
        docType: ""
    }])




    useEffect(() => {
        setInput(directors)
    }, [directors])


    const dispatch = useDispatch()

    const idTypes: IdProps[] = [
        {
            id: 1,
            name: "intpassport"
        },
        {
            id: 2,
            name: "driverlicense"
        },


    ]





    const handleUpload = async (e: any) => {
        setLoading(true)
        try {
            const formData = new FormData()

            formData.append("file", e.target.files[0])
            const { data } = await axios.post<any>("/v1/setup/doc/uploader", formData)

            if (data) {
                console.log({ data })
                setImgUrl(data?.fileUrl)
                setLoading(false)
            }


            dispatch(closeLoader());

        } catch (error: any) {

            dispatch(closeLoader());
            setLoading(false)

            const { message } = error?.response.data;
            dispatch(
                dispatch(
                    openToastAndSetContent({
                        toastContent: message,
                        toastStyles: {
                            backgroundColor: "red",
                        },
                    })
                )
            );
        } finally {
            dispatch(closeLoader());
        }
    }


    useEffect(() => {
        imgUrl !== "" && handleInputChange(presentIndex, "docUrl", imgUrl)
    }, [imgUrl])




    const handleInputChange = (index: number, name: string, value: string) => {
        let itemCopy = [...input][index]
        itemCopy[name] = value
        let inputCopy = [...input]
        inputCopy.splice(index, 1, itemCopy)
        setInput(inputCopy)
    }



    console.log({ presentIndex });



    const saveDirectorInfo = (e: any) => {
        // if (allNotFilled) return
        // e.preventDefault()
        e.stopPropagation()
        dispatch(saveDirector(input))
        handleNext()

    }



    const allNotFilled = input.map((each: any) => Object.values(each).some(every => every === "")).includes(true)

    const addNewdirector = () => {

        if (allNotFilled) return
        setInput((prev: any) => [...prev, {
            firstname: "",
            lastname: "",
            phonenumber: "",
            bvn: "",
            email: "",
            address: "",
            docNumber: "",
            docUrl: "",
            docType: ""
        }])

    }



    const handleRemove = (index: number) => {
        let inputCopy = [...input]
        inputCopy.splice(index, 1)
        setInput(inputCopy)
    }



    const handleBackDirector = () => {
        dispatch(saveDirector(input))
        handleBack()
    }

    console.log(input[0].phonenumber)

    const AccordionStyle = {
        '&:before': {
            backgroundColor: 'transparent !important',
        },
    };
    return (
        <Box>


            <form encType='multipart/form-data' method='post'>

                <div>


                    <div>

                        {input?.map((form: any, index: number) => (
                            <Accordion disableGutters elevation={0} defaultExpanded={input?.length > 1 && true} sx={AccordionStyle}>
                                {input?.length > 1 &&

                                    <AccordionSummary
                                        expandIcon={<AngleDown style={{ width: "20px", }} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{ display: "flex", gap: "10px", position: "relative", justifyContent: "center", border: "2px solid red !important" }}

                                    >
                                        <Grid container>

                                            <Grid item xs={12} mb="22px">
                                                <Box sx={{ borderBottom: "1px dashed #E0E0E0", position: "relative", marginTop: "20px", }}>
                                                    <p style={{ background: "#fff", paddingRight: "10px", position: "absolute", marginTop: "-0.5rem", fontWeight: "600" }}> Director’s Information {index + 1}</p>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    </AccordionSummary>
                                }
                                <AccordionDetails>

                                    <Grid key={index} container columnSpacing={"55px"} justifyContent="space-between">
                                        <Grid item xs={12} justifyContent="flex-end" sx={{ float: "right" }}>
                                            {input?.length > 1 && <IconButton sx={{ background: "red", width: "20px", height: "20px" }} onClick={() => handleRemove(index)}><CloseOutlinedIcon style={{ fontSize: "12px", padding: "5px" }} /></IconButton>}
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} mb="22px">

                                            <InputLabel className={styles.label}>Director’s First Name</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                                                name={"firstname"}
                                                placeholder="Director’s First Name"
                                                type="text"
                                                size="small"
                                                fullWidth
                                                value={input[index].firstname}

                                            />
                                        </Grid>


                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>Director’s last Name</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}

                                                name={"lastname"}
                                                placeholder="Director’s last Name"

                                                type="text"
                                                size="small"
                                                fullWidth
                                                value={input[index].lastname}

                                            // error={touched?.businessAddress && errors?.businessAddress}



                                            />

                                        </Grid>



                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>Director’s BVN</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}


                                                fullWidth
                                                placeholder='Enter Director’s BVN'
                                                name={"bvn"}
                                                value={input[index].bvn}




                                            />
                                        </Grid>





                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>Director’s phone number</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}

                                                fullWidth
                                                placeholder='Director’s phone number'
                                                name={"phonenumber"}
                                                value={input[index].phonenumber}

                                            />

                                        </Grid>






                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>Director’s Address</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}

                                                name={"address"}
                                                type="text"
                                                size="small"
                                                fullWidth

                                                value={input[index].address}
                                                placeholder='Director’s Address'


                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>Select an ID type</InputLabel>
                                            <TextField select onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}
                                                value={input[index].docType}

                                                name={"docType"}
                                                type="text"
                                                size="small"
                                                fullWidth
                                            >
                                                {idTypes?.map(({ id, name }) => (
                                                    <MenuItem value={name} key={id}>{name}</MenuItem>
                                                ))}
                                            </TextField>


                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>Director’s Email</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}

                                                name={"email"}
                                                type="email"
                                                size="small"
                                                fullWidth
                                                value={input[index].email}

                                                placeholder='Director’s Email'


                                            />

                                        </Grid>


                                        {/* {director.lastname.}urß */}

                                        <Grid item xs={12} sm={6} md={6} mb="22px">
                                            <InputLabel className={styles.label}>ID Document number</InputLabel>
                                            <TextField onChange={(e) => handleInputChange(index, e.target.name, e.target.value)}


                                                name={"docNumber"}

                                                value={input[index].docNumber}

                                                type="text"
                                                size="small"
                                                fullWidth
                                                // error={touched?.chargebackEmail && errors?.businessAddress}

                                                placeholder='1234567890'



                                            />

                                        </Grid>



                                        <Grid item xs={12} sm={6} md={6} mb="22px" className={styles.upload}>
                                            <CustomUploadBtn helperText='A valid NIN Slip, National ID Card, Permanent Voters Card, International Passport or Drivers License' onChange={(e) => {
                                                setPresentIndex(index)
                                                handleUpload(e)
                                            }} label='Upload an ID' />



                                        </Grid>


                                    </Grid>
                                </AccordionDetails>
                            </Accordion>




                        ))
                        }

                    </div>





                    <Stack sx={{ padding: "20px", position: "relative" }}>
                        <Box sx={{ width: "100%, border", borderBottom: "0.5px dashed #E0E0E0", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

                            <IconButton onClick={addNewdirector} style={{ position: "absolute", gap: "5px", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", background: "#fff", color: "#333" }}><AddIcon /> Add new director</IconButton>
                        </Box>
                    </Stack>
                    <Box>
                        {/* <button onClick={addNewdirector}>Add new director</button> */}

                    </Box>
                    <Stack direction="row" mb={4} gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-start"} sx={{ width: "100%", marginTop: 8 }}>



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

                        }} onClick={handleBackDirector}>Previous</button>
                        <button
                            onClick={saveDirectorInfo}
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
                            disabled={allNotFilled}
                            type="submit">continue</button>
                    </Stack>

                </div>
            </form>






        </Box >
    )
}

export default DirectorInfo