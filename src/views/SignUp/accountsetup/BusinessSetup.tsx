import { Box, Grid, StepConnector, StepIcon, TextField } from '@mui/material'
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




const BusinessSetup = () => {
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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setStep((prev) => prev + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setStep((prev) => prev - 1)
    };

    const handSubmit = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    minWidth: 200,
                    height: "493px",
                },

                modalContent: (
                    <div className='modalDiv'>
                        <SuccessModal />
                    </div>
                ),
            })
        )

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
                return <UploadDocument handleBack={handleBack} handleNext={handSubmit} />


            default:
                return null;
        }
    }


    return (
        <div className={Styles.container} style={{ height: "90" }}>
            <div className={Styles.title}>
                <p>Set up business profile</p>
            </div>





            <Box >
                <Grid container spacing={4} p={1} justifyContent="space-around" alignItems={"center"}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            borderRight: "1px solid #E0E0E0",
                            height: "100%",
                            padding: "0px 40px"

                        }}>
                            <Stepper nonLinear activeStep={activeStep} orientation="vertical" sx={{
                                '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
                                    color: "green"
                                },
                                '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root': {
                                    color: "#eee"
                                },

                            }}

                            >
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel>
                                            <Box sx={{ marginLeft: "20px" }}>
                                                <p className={Styles.stepLabel}>{step.label}</p>
                                                <p className={Styles.stepDesc}>{step.description}</p>
                                            </Box>
                                        </StepLabel>
                                        <StepConnector sx={{
                                            '.css-8t49rw-MuiStepConnector-line': {
                                                height: 40,



                                            }
                                        }} />

                                    </Step>
                                ))}
                            </Stepper>
                            {/* {activeStep === steps.length && (
                              
                            )} */}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7} >


                        <div className={Styles.formContainer}>

                            <div> <SlideForm /></div>
                        </div>
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default BusinessSetup