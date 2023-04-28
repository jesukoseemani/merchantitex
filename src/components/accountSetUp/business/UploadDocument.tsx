import React, { useState } from 'react'
import { Grid, TextField, InputLabel, Stack, Button, FormHelperText, Box, Select, MenuItem, Divider } from '@mui/material'
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
import { useHistory } from 'react-router-dom';
import { openModalAndSetContent, closeModal } from '../../../redux/actions/modal/modalActions';
import SuccessModal from './SuccessModal';
import CustomUploadBtn from '../../customs/CustomUploadBtn';
import useSetup from '../../hooks/useSetup';
import BankAccount from '../BankAccountModal';

interface Props {
    handleNext?: () => void;
    handleBack: () => void;

}

interface RequestProp {
    code: string;
    message: string;
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

    const { additionalDetails, contactInfo, directors, businessInfo, documents } = useSelector(state => state?.setupReducer)




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

    let { email, city, businessAddress, businessDescription, stateRegion, } = businessInfo
    let { businessIncome, chargebackEmail, contactemail, supportEmail, supportPhone, websiteUrl } = additionalDetails
    let { firstname, lastname, phonenumber, bvn, address, docType, docNumber, docUrl, } = contactInfo

    const { setupStatus } = useSetup()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(saveUploadDoc(fileArray))
        try {
            dispatch(openLoader());
            const { data } = await axios.post<RequestProp>('/v1/setup/business/submit', {

                // log(data)

                businessDescription,
                businessAddress,
                stateRegion,
                businessIncome,
                chargebackEmail,
                contactemail,
                supportEmail,
                supportPhone,
                websiteUrl,
                "contactPerson": {
                    firstname,
                    lastname,
                    address,
                    phonenumber,
                    bvn,
                    docType,
                    docNumber,
                    docUrl

                },

                directors,
                documents: fileArray,


            }


            )

            dispatch(closeLoader());

            if (data?.code === "success") {

                if (setupStatus?.isSettlementAccountSet === false) {

                    dispatch(
                        openModalAndSetContent({
                            modalStyles: {
                                padding: 0,
                                width: "400px",
                                minHeight: "600px",

                                borderRadius: 20,
                            },
                            modalTitle: "Add a bank account",

                            modalContent: (
                                <div className='modalDiv'>
                                    <BankAccount checkBusinessStatus={setupStatus} />
                                </div>
                            ),
                        })
                    );

                } else {
                    dispatch(
                        openModalAndSetContent({
                            modalStyles: {
                                padding: 0,
                                borderRadius: 20,
                                width: "300px !important",
                                height: "200px !important"

                            },

                            modalTitle: "",
                            modalContent: (
                                <div className='modalDiv'>
                                    <SuccessModal />
                                </div>
                            ),
                        })
                    );

                }



                history.push("/")


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
                <Grid container columnSpacing={"55px"} justifyContent="space-between" alignItems={"flex-start"}>




                    <Grid item xs={12} sm={6} md={6} mb="14px">
                        <InputLabel className={Styles.label} >Business Registration Number </InputLabel>
                        <TextField name="biz_reg" onChange={(e) => setBizNo(e.target.value)} fullWidth placeholder='Enter Business Registration Number' />

                    </Grid>



                    {/* <Grid item xs={12} sm={6} md={6} mb="14px"> */}

                    <Grid item xs={12} sm={6} md={6} mb="14px">
                        {/* {loading && "uploading......."}
                            {imgUrl && imgUrl} */}
                        <CustomUploadBtn helperText='Only PDF, JPG and PNG are the accepted file formats' label='Upload Business Registration Document' onChange={(e: any) => handleFileUploadRegDoc(e)} />


                    </Grid>





                    <br />
                    <Grid item xs={12} sm={6} md={6} mb="14px">

                        <CustomUploadBtn helperText='Only PDF, JPG and PNG are the accepted file formats' label='Upload Application for Business Registration' onChange={(e: any) => handleBusinesType(e)} />

                    </Grid>


                    <Divider />


                    <Grid item xs={12} md={12} mb="14px"  >  <h2 style={{ padding: "22px 0", fontWeight: "400", color: "#333", }} className={Styles.headerTitle}> Operating License</h2></Grid>
                    <Grid item xs={12} sm={6} md={6} mb="14px">
                        <InputLabel className={Styles.label}>Reg No. for Operating License</InputLabel>
                        <TextField name="license" onChange={(e: any) => setLisenceNo(e.target.value)} fullWidth placeholder='Enter Business Registration Number' />

                    </Grid>




                    <Grid item xs={12} sm={6} md={6} mb="14px">


                        <CustomUploadBtn helperText='Only PDF, JPG and PNG are the accepted file formats' label='Upload Operating License Document ' onChange={(e) => handleUploadLinsence(e)} />

                    </Grid>
                    <br />



                    <Grid item xs={12} md={12}>  <h2 style={{ padding: "22px 0", fontWeight: "400", color: "#333", borderTop: "0.5px solid #E0E0E0" }} className={Styles.headerTitle}>Proof of Address</h2></Grid>



                    <Grid item xs={12} md={6} >
                        <InputLabel className={Styles.label}>Select a Proof of Address Type</InputLabel>
                        <TextField fullWidth select value={proveType} onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setProveType(e.target.value)}>
                            <MenuItem value="waterbill">waterbill</MenuItem>
                            <MenuItem value="electricitybill">electricitybill</MenuItem>
                            <MenuItem value="wastebill">wastebill</MenuItem>
                            <MenuItem value="otherbill">otherbill</MenuItem>
                        </TextField>

                    </Grid>


                    <Grid item xs={12} sm={6} md={6}>



                        <CustomUploadBtn helperText='Only PDF, JPG and PNG are the accepted file formats' label='Upload a Proof of Address' onChange={(e: any) => handleProveDoc(e)} />

                    </Grid>


                    <Grid item xs={12} sm={12} md={12}></Grid>
                    <br />
                    <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 4 }}>
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