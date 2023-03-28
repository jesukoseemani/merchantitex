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
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import SuccessModal from '../../../components/accountSetUp/business/SuccessModal';
import ProfileBusinessInfo from '../../../components/accountSetUp/profile/BusinessInfo';
import ProfileAdditionalInfo from '../../../components/accountSetUp/profile/AdditionalInfo';
import ProfileUploadDocument from '../../../components/accountSetUp/profile/UploadProfileInfo';
import CloseOutlined from '@mui/icons-material/CloseOutlined';


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

const ProfileSetup = () => {
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
                return <ProfileBusinessInfo handleNext={handleNext} />
            case 2:
                return <ProfileAdditionalInfo handleBack={handleBack} handleNext={handleNext} />

            case 3:
                return <ProfileUploadDocument handleBack={handleBack} handleNext={handleSubmit} />


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
                <Grid container spacing={4} p={1} justifyContent="space-around" alignItems={"center"}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            borderRight: "1px solid #E0E0E0",
                            height: "100%",
                            marginRight: "-45px"
                        }}>
                            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                                // height: "70%",
                                position: { md: "absolute" },
                                top: "12%",




                            }}>
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
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

                    <Grid item xs={12} md={7} >


                        <div className={Styles.formContainer}>

                            <div> <SlideForm /></div>
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

        </div>
    )
}

export default ProfileSetup