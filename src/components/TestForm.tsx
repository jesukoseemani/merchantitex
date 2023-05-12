
import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box, styled } from '@mui/material'
import { ReactSVG } from 'react-svg';
import { useState } from 'react';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import WarningIcon from "../assets/images/warningIcon.svg";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeLoader } from '../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../redux/actions/toast/toastActions';
import { v4 as uuidv4 } from "uuid";

interface Props {
    handleNext: () => void;
    handleBack: () => void;

}





interface IdProps {
    id: number;
    name: string;
}

const TestForm = () => {
    const [imgUrl, setImgUrl] = useState("")
    const [img, setImg] = useState("")
    const [loading, setLoading] = useState(false)

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


    // const { handleUpload, imgUrl, loading } = useCustomUpload()



    const handleUpload = async (e: any) => {
        setLoading(true)
        try {
            const formData = new FormData()

            formData.append("file", e.target.files[0])
            const { data } = await axios.post<any>("/v1/setup/doc/uploader", formData)

            if (data) {

                setImgUrl(data?.fileUrl)
                setLoading(false)
                setImg("")
                console.log(imgUrl)
            }


            dispatch(closeLoader());

        } catch (error: any) {

            dispatch(closeLoader());
            setLoading(false)
            setImg("")

            const { message } = error?.response.data;
            dispatch(
                dispatch(
                    openToastAndSetContent({
                        toastContent: message,
                        msgType: "error"
                    })
                )
            );
        } finally {
            dispatch(closeLoader());
        }
    }

    // const [imgCont, setImgCont] = useState<any>({})

    console.log(imgUrl)

    const [input, setInput] = useState<any>([
        {
            firstname: "",
            lastname: "",
            phonenumber: "",
            bvn: "",
            email: "",
            address: "",
            docNumber: ""
        }
    ])

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setInput({ ...input, [e.target.name]: e.target.value })
    // }


    const [directorList, setDirectorList] = useState<any>([])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: any) => {
        let data = [...input]
        data[index][event.target.name] = event.target.value
        setInput(data)
    }

    // const {
    //     firstname,
    //     lastname,
    //     phonenumber,
    //     bvn,
    //     email,
    //     address,
    //     docNumber,
    // } = input






    // const handleSunmit = (e: any) => {
    //     e.preventDefault()
    //     e.stopPropagation()

    //     let itemArray = {

    //         firstname,
    //         lastname,
    //         phonenumber,
    //         bvn,
    //         email,
    //         address,
    //         docNumber,
    //         id: uuidv4(),
    //         docUrl: imgUrl
    //     }


    //     setDirectorList((prev: any) => [...prev, itemArray])

    //     setInput({
    //         firstname: "",
    //         lastname: "",
    //         phonenumber: "",
    //         bvn: "",
    //         email: "",
    //         address: "",
    //         docNumber: ""
    //     })
    //     setImgUrl("")

    // }
    // console.log(directorList);




    const {
        firstname,
        lastname,
        phonenumber,
        bvn,
        email,
        address,
        docNumber,
    } = input

    const addnewForm = (e: any) => {
        e.preventDefault()
        e.stopPropagation()

        let object = {
            firstname: "",
            lastname: "",
            phonenumber: "",
            bvn: "",
            email: "",
            address: "",
            docNumber: ""

        }
        setInput([...input, object])
    }


    const handleSubmit = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(input)
    }

    return (
        <Box p={5}>


            <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>

                <div>
                    <h2>Add Director</h2>


                    <div>




                        <Grid container columnSpacing={4} p={4} justifyContent="space-between">
                            {input.map((form: any, index: number) => (
                                <div>

                                    <Grid item xs={12} sm={6} md={6} mb="22px">

                                        <InputLabel>Director’s First Name</InputLabel>
                                        <TextField


                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.firstname}

                                            name={"firstname"}

                                            placeholder="Director’s First Name"
                                            type="text"
                                            size="small"
                                            fullWidth

                                        // error={touched?.businessAddress && errors?.businessAddress}



                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={6} md={6} mb="22px">
                                        <InputLabel>Director’s last Name</InputLabel>
                                        <TextField
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.lastname}


                                            name={"lastname"}
                                            placeholder="Director’s last Name"

                                            type="text"
                                            size="small"
                                            fullWidth
                                        // error={touched?.businessAddress && errors?.businessAddress}



                                        />

                                    </Grid>



                                    <Grid item xs={12} sm={6} md={6} mb="22px">
                                        <InputLabel>Director’s BVN</InputLabel>
                                        <TextField
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.bvn}

                                            fullWidth
                                            placeholder='Enter Director’s BVN'
                                            name={"bvn"}



                                        />
                                    </Grid>





                                    <Grid item xs={12} sm={6} md={6} mb="22px">
                                        <InputLabel>Director’s phone number</InputLabel>
                                        <TextField

                                            fullWidth
                                            placeholder='Director’s phone number'
                                            name={"phonenumber"}
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.phonenumber}
                                        />

                                    </Grid>






                                    <Grid item xs={12} sm={6} md={6} mb="22px">
                                        <InputLabel>Director’s Address</InputLabel>
                                        <TextField
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.address}
                                            name={"address"}
                                            type="text"
                                            size="small"
                                            fullWidth

                                            placeholder='Director’s Address'


                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} mb="22px">
                                        <InputLabel>Director’s Email</InputLabel>
                                        <TextField
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.email}
                                            name={"email"}
                                            type="email"
                                            size="small"
                                            fullWidth

                                            placeholder='Director’s Email'


                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} mb="22px">
                                        <InputLabel>Select an ID type</InputLabel>
                                        {/* <TextField onChange={handleInputChange}
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
                                        <InputLabel>ID Document number</InputLabel>
                                        <TextField
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.docNumber}

                                            name={"docNumber"}


                                            type="text"
                                            size="small"
                                            fullWidth
                                            // error={touched?.chargebackEmail && errors?.businessAddress}

                                            placeholder='1234567890'



                                        />

                                    </Grid>




                                    <Grid item xs={12} sm={6} md={6} mb="22px" >
                                        <TextField
                                            onChange={(event) => handleInputChange(event, index)}
                                            value={form.docUrl}

                                            name={"docUrl"}

                                            type="text"
                                            size="small"
                                            fullWidth
                                            // error={touched?.chargebackEmail && errors?.businessAddress}

                                            placeholder='1234567890'
                                        // defaultValue={imgUrl}


                                        />



                                    </Grid>


                                    <Grid item xs={12} sm={6} md={6} mb="22px" >
                                        <InputLabel>Upload an ID </InputLabel>

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
                                            <CloudUploadOutlinedIcon fontSize='small' />   {loading ? "upload in progress" : "choose file to upload"}
                                            <input name={"file"} hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," onChange={handleUpload} type="file" id='file' />




                                            <span>{imgUrl && imgUrl}</span>



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
                                </div>
                            ))}
                        </Grid>





                        <button onClick={addnewForm}>Add new director</button>

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

                        }} >Previous</button>
                        <button
                            // onClick={saveDirector}
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

                            type="submit">continue</button>
                    </Stack>

                </div>
            </form>






        </Box >
    )
}

export default TestForm