import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box, styled } from '@mui/material'
import styles from "../style.module.scss"
import AddIcon from "../../../assets/images/add.svg"
import AngleDown from "../../../assets/images/arrowDown.png"
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
        docUrl: ""
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
            docUrl: ""
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
    return (
        <Box>


            <form encType='multipart/form-data' method='post'>

                <div>
                    <h2>Add Director</h2>


                    <div>

                        {input?.map((form: any, index: number) => (
                            <Grid key={index} container columnSpacing={4} justifyContent="space-between">
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

                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                    <InputLabel className={styles.label}>Select an ID type</InputLabel>
                                    {/* <TextField onChange={(e)=>handleInputChange(index,e.target.name, e.target.value)}
                                    as={SelectWrapper}


                                    name={"docType"}


                                    type="text"
                                    size="small"
                                    fullWidth
                                    // error={touched?.chargebackEmail && errors?.businessAddress}
                                    options={idTypes}

                                /> */}


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
                                        <CloudUploadOutlinedIcon fontSize='small' className={styles.downloadIcon} />   {loading ? "upload in progress" : "choose file to upload"}
                                        <input name={"file"} hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," onChange={(e) => {
                                            setPresentIndex(index)
                                            handleUpload(e)
                                        }} type="file" id='file' />




                                        {/* <span>{imgUrl && imgUrl}</span> */}



                                    </Button>




                                    <Stack direction={"row"} mt={1} alignItems="center" columnGap={1}>

                                        <ReactSVG src={WarningIcon} />
                                        <FormHelperText sx={{
                                            fontFamily: 'Avenir',
                                            fontStyle: "italic",
                                            fontWeight: 400,
                                            fontSize: "10px",
                                            lineHeight: "16px",
                                            color: "rgba(74, 82, 106, 0.990517)"
                                        }}>
                                            A valid NIN Slip, National ID Card, Permanent Voters Card, International Passport or Drivers License
                                        </FormHelperText>
                                    </Stack>



                                </Grid>



                                {input?.length > 1 && <button onClick={() => handleRemove(index)}><CloseOutlinedIcon /></button>}
                            </Grid>
                        ))
                        }

                    </div>






                    <Stack direction="row" mb={4} gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-start"} sx={{ width: "100%", marginTop: "-5px" }}>



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
            <button onClick={addNewdirector}>Add new director</button>






        </Box >
    )
}

export default DirectorInfo