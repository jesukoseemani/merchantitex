import { Box, Grid, IconButton, Modal, StepConnector, StepIcon, TextField } from '@mui/material'
import React, { useState } from 'react'
import Styles from "./businessSetup.module.scss"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CustomInput from '../../../components/customs/CustomInput';
import CheckIcon from "../../../assets/images/circle-check.svg"
import ColorcheckIcon from "../../../assets/images/circle-check-color.svg"
import { ReactSVG } from "react-svg"
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import BusinessInfo from '../../../components/accountSetUp/business/BusinessInfo';
import AdditionalInfo from '../../../components/accountSetUp/business/AdditionalInfo';
import DirectorInfo from '../../../components/accountSetUp/business/DirectorInfo';
import UploadDocument from '../../../components/accountSetUp/business/UploadDocument';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import SuccessModal from '../../../components/accountSetUp/business/SuccessModal';
import CloseOutlined from '@mui/icons-material/CloseOutlined';




const BusinessSetup = () => {


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "540px",
        height: "493px",
        bgcolor: '#fff',
        borderRadius: '20px',

        // p: 4,
    };
    const steps = [
        {
            label: 'Business Information',
            description: `Add some more information about your business.`,
        },
        {
            label: 'Additional Information',
            description:
                'Add some additional information about your business.',
        },
        {
            label: 'Additional Director(s) Infomation',
            description:
                'Add some director(s) information for your business.',
        },
        {
            label: 'Upload Documents',
            description: `Upload required documents to go live and start transacting.`,
        },
    ];

    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = React.useState(0);
    const [step, setStep] = useState(1)
    const [open, setOpen] = React.useState(false);
    const handleSubmit = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStep((prev) => prev + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setStep((prev) => prev - 1)
    };



    const SlideForm = () => {
        switch (step) {
            case 1:
                return <BusinessInfo handleNext={handleNext} />
            case 2:
                return <AdditionalInfo handleBack={handleBack} handleNext={handleNext} />
            case 3:
                return <DirectorInfo handleBack={handleBack} handleNext={handleNext} />
            case 4:
                return <UploadDocument handleBack={handleBack} handleNext={handleSubmit} />


            default:
                return null;
        }
    }


    return (
        <div className={Styles.container}>
            <div className={Styles.title}>
                <p>Set up business profile</p>
            </div>





            <Box >
                <Grid container spacing={4} justifyContent="space-around" flexWrap={"wrap"} alignItems={"center"}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            borderRight: "1px solid #E0E0E0",
                            height: "450px",
                            padding: "0px 20px",
                            position: { md: "fixed" },
                            top: "17%"

                        }}>
                            <Stepper activeStep={activeStep} orientation="vertical"

                            // sx={{
                            //     ".css-wxvx37-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
                            //         color: "#27AE60"
                            //     }
                            // }}

                            >
                                {steps.map((step, index) => (
                                    <Step key={index}>
                                        <StepLabel icon={<ReactSVG src={index < activeStep || index === activeStep ? ColorcheckIcon : CheckIcon}
                                        />} sx={{
                                            '& svg': {
                                                width: "20px",
                                                height: "20px"
                                            }
                                        }}>
                                            <Box sx={{ marginLeft: "20px" }}>
                                                <p className={Styles.stepLabel}>{step.label}</p>
                                                <p className={Styles.stepDesc}>{step.description}</p>
                                            </Box>
                                        </StepLabel>


                                    </Step>
                                ))}
                            </Stepper>
                            {/* {activeStep === steps.length && (
                              
                            )} */}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} mt={3}>


                        <div className={Styles.formContainer}>

                            <div > <SlideForm /></div>
                        </div>
                    </Grid>

                </Grid>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        // height="56px"
                        py={"20px"}
                        position="fixed"
                        px="50px"
                        right={0}


                    >

                        <IconButton onClick={handleClose}>
                            <CloseOutlined />
                        </IconButton>
                    </Box>
                    <SuccessModal />
                </Box>
            </Modal>
        </div >
    )
}

export default BusinessSetup