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
import { FieldArray, Formik, Form } from 'formik';
import { Field } from 'formik';
import { ErrorMessage } from 'formik';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SelectWrapper from '../../formUI/Select';
import WarningIcon from "../../../assets/images/warningIcon.svg";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { saveDirector } from '../../../redux/actions/setup/index';
import { ValidateUploads } from '../../validation/setup/Businesssetup';
import *  as Yup from "yup"

interface Props {
    handleNext: () => void;
    handleBack: () => void;

}

// const DirectorInfo = ({ handleBack, handleNext }: Props) => {



//     const [formCounter, setFormCounters] = useState(1)
//     const handleShowForm = () => {
//         setFormCounters((prev) => prev + 1)

//     }


//     const [directorForm, setDirectorForm] = useState([<DirectorForm formCounter={formCounter} handleNext={handleNext} handleBack={handleBack} />])

//     const handleOnChange = () => { }
//     return (
//         <Box sx={{ color: "#222", ".css-x0dsna-MuiGrid-root>.MuiGrid-item": { padding: 0, } }}>


//             <Box sx={{ overflow: "auto", marginTop: "-20px" }}>



//                 {[...Array(formCounter)].map((_, i) => <DirectorForm key={i} formCounter={formCounter} handleNext={handleNext} handleBack={handleBack} />)}




//                 <Box mt={"-1rem"}>

//                     <Grid container
//                         justifyContent={"flex-start"}
//                         alignItems="center"
//                         spacing={0}>
//                         <Grid item xs={3.3}>
//                             <Box sx={{
//                                 width: "100%",
//                                 borderBottom: "1px dashed  #E0E0E0"
//                             }}>

//                             </Box>
//                         </Grid>
//                         <Grid item xs={5.4} onClick={handleShowForm} >
//                             <Box
//                                 sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "5px", justifyContent: "center"
//                                 }}><ReactSVG src={AddIcon} style={{ cursor: "ponter" }} /> <p className={styles.addBtn}>Add another director</p></Box></Grid>
//                         <Grid item xs={3.3}>
//                             <Box sx={{
//                                 width: "100%",
//                                 borderBottom: "1px dashed  #E0E0E0"
//                             }}></Box>
//                         </Grid>
//                     </Grid>
//                     <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-start"} sx={{ width: "100%", marginTop: "5px" }}>



//                         <button style={{
//                             backgroundColor: 'transparent',
//                             color: '#333',
//                             border: '1px solid green',
//                             height: "44px",
//                             width: '146px',
//                             fontSize: "16px",
//                             fontWeight: 800,
//                             borderRadius: '20px',
//                             cursor: 'pointer',

//                             fontFamily: 'Avenir',

//                         }} onClick={handleBack}>Previous</button>
//                         <button
//                             style={{
//                                 backgroundColor: '#27AE60',
//                                 height: "44px",
//                                 width: '146px',
//                                 color: '#fff',
//                                 border: 'none',
//                                 fontSize: "16px",
//                                 fontWeight: 800,
//                                 borderRadius: '20px',
//                                 cursor: 'pointer',

//                                 fontFamily: 'Avenir',
//                             }}

//                             type="submit">continue</button>
//                     </Stack>
//                 </Box>
//             </Box>




//         </Box >
//     )
// }

// export default DirectorInfo




interface IdProps {
    id: number;
    name: string;
}

const DirectorInfo = ({ handleBack, handleNext }: Props) => {
    const [img, setImg] = useState<any>()
    const [imgUrl, setImgUrl] = useState<any>()
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
        // console.log(data, e.target.file[0])
        // try {
        //     setImg(e.target.files[0])

        //     const formData = new FormData()

        //     formData.append("file", img)
        //     const { data } = await axios.post<any>("/v1/setup/doc/uploader", formData)
        //     // console.log(data, e.target.file[0])


        //     if (data) {

        //         setImgUrl(data?.fileUrl)
        //         setImg("")
        //         console.log(imgUrl)
        //     }





        //     dispatch(closeLoader());

        // } catch (error: any) {
        //     dispatch(closeLoader());
        //     const { message } = error?.response.data;
        //     dispatch(
        //         dispatch(
        //             openToastAndSetContent({
        //                 toastContent: message,
        //                 toastStyles: {
        //                     backgroundColor: "red",
        //                 },
        //             })
        //         )
        //     );
        // } finally {
        //     dispatch(closeLoader());
        // }
    }




    return (
        <Box>
            <Formik
                initialValues={{
                    directors: [{ firstname: "", lastname: "", email: "", docNumber: "", phonenumber: "", bvn: "", docType: "", address: "", docUrl: "", text: "" }]
                }}
                // enableReinitialize
                validationSchema={ValidateUploads}

                onSubmit={({ directors }, { setFieldValue }) => {
                    // setFieldValue("")
                    // directors.map(({ docUrl, docNumber, address, bvn, email, docType, firstname, lastname, phonenumber }) => {
                    //     direct.push({
                    //         docUrl: setValues(), docNumber, address, bvn, email, docType, firstname, lastname, phonenumber
                    //     })

                    // })
                    console.log(directors)
                    dispatch(saveDirector(directors))


                    // handleNext()
                }}
            >
                {(directorForm) => (

                    <Form method='post' encType='multipart/form-data'>

                        <div>
                            <h2>Add Director</h2>

                            <FieldArray name='directors' render={(arrayHelpers) => {
                                return (
                                    <div>

                                        {directorForm.values.directors.map((director, i) => (
                                            <Grid container columnSpacing={4} justifyContent="space-between">

                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    {directorForm.values.directors.length > 1 && <button onClick={() => arrayHelpers.remove(i)}>X</button>}
                                                    <InputLabel className={styles.label}>Director’s First Name</InputLabel>
                                                    <Field
                                                        as={TextField}

                                                        name={`directors.${i}.firstname`}

                                                        placeholder="Director’s First Name"
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        // error={touched?.businessAddress && errors?.businessAddress}


                                                        helperText={
                                                            <ErrorMessage name={`directors.${i}.firstname`}>
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>

                                                        }
                                                    />
                                                </Grid>


                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>Director’s last Name</InputLabel>
                                                    <Field
                                                        as={TextField}

                                                        helperText={
                                                            <ErrorMessage name={`directors.${i}.lastname`}>
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>
                                                        }
                                                        name={`directors.${i}.lastname`}
                                                        placeholder="Director’s last Name"

                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                    // error={touched?.businessAddress && errors?.businessAddress}



                                                    />

                                                </Grid>



                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>Director’s BVN</InputLabel>
                                                    <Field
                                                        as={TextField}

                                                        fullWidth
                                                        placeholder='Enter Director’s BVN'
                                                        name={`directors.${i}.bvn`}

                                                        helperText={
                                                            <ErrorMessage name={`directors.${i}.bvn`}>
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>

                                                        }

                                                    />
                                                </Grid>





                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>Director’s phone number</InputLabel>
                                                    <Field
                                                        as={TextField}

                                                        fullWidth
                                                        placeholder='Director’s phone number'
                                                        name={`directors.${i}.phonenumber`}

                                                        helperText={
                                                            <ErrorMessage name={`directors.${i}.phonenumber`}>
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>

                                                        }


                                                    />

                                                </Grid>






                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>Director’s Address</InputLabel>
                                                    <Field
                                                        as={TextField}
                                                        name={`directors.${i}.address`}
                                                        type="text"
                                                        size="small"
                                                        fullWidth

                                                        placeholder='Director’s Address'


                                                        helperText={

                                                            <ErrorMessage name={`directors.${i}.address`}>
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>
                                                        }
                                                    />

                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>Director’s Email</InputLabel>
                                                    <Field
                                                        as={TextField}
                                                        name={`directors.${i}.email`}
                                                        type="email"
                                                        size="small"
                                                        fullWidth

                                                        placeholder='Director’s Email'

                                                        helperText={
                                                            <ErrorMessage name={`directors.${i}.email`}>
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>

                                                        }

                                                    />

                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>Select an ID type</InputLabel>
                                                    <Field
                                                        as={SelectWrapper}


                                                        name={`directors.${i}.docType`}


                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        // error={touched?.chargebackEmail && errors?.businessAddress}
                                                        options={idTypes}

                                                    />
                                                    {/* <ErrorMessage name={`directors.${i}.docType`}
                                                    >
                                                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                    </ErrorMessage> */}

                                                </Grid>
                                                {/* {director.lastname.}urß */}

                                                <Grid item xs={12} sm={6} md={6} mb="22px">
                                                    <InputLabel className={styles.label}>ID Document number</InputLabel>
                                                    <Field
                                                        as={TextField}

                                                        name={`directors.${i}.docNumber`}


                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        // error={touched?.chargebackEmail && errors?.businessAddress}

                                                        placeholder='1234567890'

                                                        helperText={

                                                            <ErrorMessage name={`directors.${i}.docNumber`}
                                                            >
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>
                                                        }

                                                    />

                                                </Grid>




                                                <Grid item xs={12} sm={6} md={6} mb="22px" className={styles.upload}>
                                                    <Field
                                                        as={TextField}

                                                        name={`directors.${i}.docUrl`}

                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        // error={touched?.chargebackEmail && errors?.businessAddress}

                                                        placeholder='1234567890'
                                                        // defaultValue={imgUrl}
                                                        helperText={

                                                            <ErrorMessage name={`directors.${i}.docUrl`}
                                                            >
                                                                {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                            </ErrorMessage>
                                                        }

                                                        // value={imgUr


                                                        defaultValue={(directorForm.values.directors[i].docUrl = imgUrl) || ''}

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
                                                        <CloudUploadOutlinedIcon fontSize='small' className={styles.downloadIcon} />   choose file to upload
                                                        {/* <input name={`directors.${i}.docUrl`} hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," onChange={handleUpload} multiple type="file" id='file' /> */}
                                                        <div style={{ visibility: 'hidden' }}>
                                                            <Field
                                                                as={TextField}
                                                                name={`directors.${i}.docUrl`}
                                                                type="file"
                                                                size="small"
                                                                fullWidth
                                                                hidden

                                                                placeholder='Director’s docUrl'

                                                                helperText={
                                                                    <ErrorMessage name={`directors.${i}.docUrl`}>
                                                                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                                    </ErrorMessage>

                                                                }

                                                            />
                                                        </div>



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




                                            </Grid>
                                        ))}

                                        {!directorForm.errors.directors && imgUrl !== "" &&
                                            <div>
                                                <Box

                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "5px", justifyContent: "center"
                                                    }}><ReactSVG src={AddIcon} style={{ cursor: "ponter" }} onClick={() => arrayHelpers?.insert(directorForm.values.directors.length + 1,
                                                        { firstname: "", lastname: "", email: "", docNumber: "", phonenumber: "", bvn: "", docType: "", docUrl: "", address: "" })} /> <p className={styles.addBtn}>Add another director</p></Box>
                                                <Box sx={{
                                                    width: "100%",
                                                    borderBottom: "1px dashed  #E0E0E0"
                                                }}></Box>
                                            </div>
                                        }



                                    </div>



                                )
                            }} />


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

                                    type="submit">continue</button>
                            </Stack>

                        </div>
                    </Form>
                )}
            </Formik>

        </Box >
    )
}

export default DirectorInfo