import React from 'react'
import styles from "./breakdown.module.scss"
import { IconButton, Box, Stepper, Step, StepLabel } from '@mui/material';
import { ReactComponent as CheckColorIcon } from "../../assets/images/circle-check-color.svg";
import { ReactComponent as CheckIcon } from "../../assets/images/circle-check.svg";


const TransBreakDown = () => {

    let data2 = [
        {
            time: "2:49 PM",
            label: "Initiated Checkout from https://imorapidtransfer",
            icon: <CheckIcon />,
            id: 1,
        },
        {
            time: "2:49 PM",
            label: "Launched Mobile Money as initial payment option",
            icon: <CheckIcon />,
            id: 2
        },
        {
            time: "2:49 PM",
            label: "Charge request successful - Pending verification",
            icon: <CheckColorIcon />,
            id: 3
        },
        {
            time: "2:49 PM",
            label: "Transaction Completed!",
            icon: <CheckColorIcon />,
            id: 4
        },
    ]


    return (
        <div>
            <div className={styles.headerText}>
                <p>1 min 05secs <span>Time spent making payment</span></p>
                <p>1 Error <span>While making payment</span></p>
            </div>

            <div className={styles.stepperBox}>
                <Stepper activeStep={1} orientation="vertical" sx={{
                    '.css-5grjn4-MuiStepConnector-line': {
                        minHeight: "40px",
                        marginTop: "-0.6rem"

                    }
                }}>
                    <Step>
                        <StepLabel className={styles.steplabel} icon={<CheckColorIcon />}>
                            <div style={{ marginTop: "-0.4rem" }}>
                                <h3>Payment started</h3>
                                <p>
                                    Aug 13 2020 <span>2:21 PM</span>
                                </p>
                            </div>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel className={styles.steplabel} icon={<CheckColorIcon />}>
                            <div style={{ marginTop: "-0.4rem" }}>

                                <h3>Payment Completed</h3>
                                <p>
                                    Aug 13 2020 <span>2:21 PM</span>
                                </p>
                            </div>
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>


            <div className={styles.stepper__container_2}>
                <Stepper activeStep={1} orientation="vertical" sx={{
                    '.css-5grjn4-MuiStepConnector-line': {
                        minHeight: "45px",
                        marginTop: "-0.6rem"
                    },

                }}>
                    {
                        data2?.map((x: any) => (
                            <Step>
                                <StepLabel className={styles.steplabel} icon={x?.icon} key={x?.id}>
                                    <div style={{ marginTop: "5px" }}>
                                        <span>{x?.time}</span>
                                        <h3>{x?.label}   </h3>
                                    </div>

                                </StepLabel>

                            </Step >
                        ))
                    }
                </Stepper>
            </div>

            <div className={styles.btn}>   <button>Okay</button></div>


        </div>
    )
}

export default TransBreakDown

