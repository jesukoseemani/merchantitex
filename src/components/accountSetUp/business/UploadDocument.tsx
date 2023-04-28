import React, { useState } from 'react'
import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box, Select, MenuItem } from '@mui/material'
import Buttons from '../Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Styles from "../style.module.scss"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import useCustomUpload from '../../hooks/CustomUpload';
import { saveUploadDoc } from '../../../redux/actions/setup';
import { saveLoading } from '../../../redux/actions/loadingState/loadingStateActions';
import { useHistory } from 'react-router';

interface Props {
    handleNext?: () => void;
    handleBack: () => void;

}

interface RequestProp {
    code: string;
    message: string
}
const UploadDocument = ({ handleBack, handleNext }: Props) => {
    const [loading, setLoading] = useState(false)
    const [bizDoc, setBizDoc] = useState("")
    const [bizNo, setBizNo] = useState("")
    const [biz_req_type, setBizReq_type] = useState("")
    const [lisenceDoc, setLisenceDoc] = useState("")
    const [lisenceno, setLisenceNo] = useState("")
    const [proveDoc, setProvDoc] = useState("")
    const [proveType, setProveType] = useState("")
    const dispatch = useDispatch()



    const [imgUrl, setImgUrl] = useState("")

    const { additionalDetails, directors, businessInfo, documents } = useSelector(state => state?.setupReducer)




    const history = useHistory()
    const handleUpload = async (e: any,) => {
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append("file", e.target.files[0])



            const { data } = await axios.post<any>("/v1/setup/doc/uploader", formData)

            if (data) {
                setImgUrl(data?.fileUrl)
                setLoading(false)
            }



            dispatch(closeLoader());

        } catch (error: any) {

            dispatch(closeLoader());
            setLoading(false)

            const { message } = error?.response?.data;
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




    const handleFileUploadRegDoc = (e: any) => {
        handleUpload(e)
        setBizDoc(imgUrl)



    }
    const handleUploadLinsence = (e: any) => {
        handleUpload(e)
        // s(imgUrl)
        setLisenceDoc(imgUrl)


    }
    const handleBusinesType = (e: any) => {
        handleUpload(e)
        setBizReq_type(imgUrl)
    }
    const handleProveDoc = (e: any) => {

        handleUpload(e)
        setProvDoc(imgUrl)
    }



    let fileArray = [
        {
            docType: bizDoc,
            docNumber: bizNo,
            docUrl: biz_req_type
        },
        {
            docNumber: lisenceno,
            docUrl: lisenceDoc
        },
        {
            docType: proveType,
            docUrl: proveDoc
        },

    ]
    const handleGoBack = () => {
        dispatch(saveUploadDoc(fileArray))
        handleBack()
    }

    let { email, city, businessAddress, businessDescription, stateRegion, phonenumber } = businessInfo
    let { businessIncome, chargebackEmail, contactemail, supportEmail, supportPhone, websiteUrl } = additionalDetails
    console.log(documents, "documents")


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(saveUploadDoc(fileArray))
        try {
            dispatch(openLoader());
            const { data } = await axios.post<RequestProp>('/v1/setup/business/submit', {



                businessDescription,
                businessAddress,
                stateRegion,
                businessIncome,
                chargebackEmail,
                contactemail,
                supportEmail,
                supportPhone,
                websiteUrl,
                // "contactPerson": {
                //     firstname: 'EMMANURL',
                //     lastname: "Ayodeji",
                //     address: "prince",
                //     phonenumber,
                //     email,
                // },

                directors,
                documents: fileArray,


            }


            )

            dispatch(closeLoader());

            if (data?.code === "success") {
                console.log(data)
                history.push("/")


                dispatch(
                    openToastAndSetContent({
                        toastContent: data?.message,
                        toastStyles: {
                            backgroundColor: 'green',
                        },
                    })
                )
                // window.location.href = "/"
            }

        } catch (err: any) {
            dispatch(closeLoader());
            dispatch(saveLoading(false));
            dispatch(
                openToastAndSetContent({
                    toastContent: err?.response?.data?.message,
                    toastStyles: {
                        backgroundColor: 'red',
                    },
                })
            );
        }
    }
    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>
            <Box sx={{ height: "550px", marginTop: "-1.6rem" }}>
                <Grid container rowSpacing={3} columnSpacing={3} rowGap={2} justifyContent="space-between" alignItems={"flex-start"}>




                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel className={Styles.label}>Business Registration Number </InputLabel>
                        <TextField name="biz_reg" onChange={(e) => setBizNo(e.target.value)} fullWidth placeholder='Enter Business Registration Number' />

                    </Grid>



                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel className={Styles.label}>Upload Business Registration Document </InputLabel>

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
                            }}

                            onChange={(e: any) => handleFileUploadRegDoc(e)}
                        >
                            <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                            <input hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," multiple type="file" />
                        </Button>
                        <FormHelperText id="component-helper-text" className={Styles.helperText}>
                            <ErrorOutlineIcon /> Only PDF, JPG and PNG are the accepted file formats
                        </FormHelperText>
                    </Grid>



                    <br />
                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel className={Styles.label}>Upload Application for Business Registration</InputLabel>

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
                            }}
                            onChange={(e: any) => handleBusinesType(e)}
                        >
                            <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                            <input hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," multiple type="file" />
                        </Button>

                        <FormHelperText id="component-helper-text" className={Styles.helperText}>
                            <ErrorOutlineIcon /> Only PDF, JPG and PNG are the accepted file formats
                        </FormHelperText>
                    </Grid>





                    <Grid item xs={12} md={12}>  <h2>Operating License</h2></Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel className={Styles.label}>Reg No. for Operating License</InputLabel>
                        <TextField name="license" onChange={(e: any) => setLisenceNo(e.target.value)} fullWidth placeholder='Enter Business Registration Number' />

                    </Grid>




                    <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ marginTop: "-1rem" }}>
                            <span className={Styles.label}>Upload Operating License Document </span>
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
                            <CloudUploadOutlinedIcon className={Styles.downloadIcon} fontSize="small" />   choose file to upload
                            <input hidden onChange={(e) => handleUploadLinsence(e)} accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," multiple type="file" />
                        </Button>


                        <FormHelperText id="component-helper-text" className={Styles.helperText}>
                            <ErrorOutlineIcon /> Only PDF, JPG and PNG are the accepted file formats
                        </FormHelperText>
                    </Grid>
                    <br />



                    <Grid item xs={12} md={12}>  <h2>Proof of Address</h2></Grid>



                    <Grid item>
                        <InputLabel className={Styles.label}>Select a Proof of Address Type</InputLabel>
                        <TextField fullWidth select value={proveDoc} onChange={(e: any) => setProveType(e.target.value)}>
                            <MenuItem value="waterbill">waterbill</MenuItem>
                            <MenuItem value="electricitybill">electricitybill</MenuItem>
                            <MenuItem value="wastebill">wastebill</MenuItem>
                            <MenuItem value="otherbill">otherbill</MenuItem>
                        </TextField>

                    </Grid>


                    <Grid item xs={12} sm={6} md={6}>
                        <InputLabel className={Styles.label}></InputLabel>

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
                            }}
                            onChange={(e: any) => handleProveDoc(e)}>
                            <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                            <input hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," multiple type="file" />
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

                        }} onClick={handleGoBack}>Previous</button>
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

                            type="submit">Submit</button>
                    </Stack>

                </Grid>
            </Box>

        </form>
    )
}

export default UploadDocument