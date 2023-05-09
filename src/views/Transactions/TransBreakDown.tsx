import React from 'react'
import styles from "./breakdown.module.scss"
import { IconButton, Box, Stepper, Step, StepLabel } from '@mui/material';
import { ReactComponent as CheckColorIcon } from "../../assets/images/circle-check-color.svg";
import { ReactComponent as CheckIcon } from "../../assets/images/circle-check.svg";


const TransBreakDown = () => {

    let data2 = [
        {
            time: "2:49 PM",
            label: "Initiated Checkout from https://imorapidtransfer.com/deposit",
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
                    "& .MuiStepConnector-root": {
                        height: "30px",

                    },
                    ".css-iprrf9-MuiStepConnector-line": {
                        height: "45px",
                        marginLeft: "-3px",
                        border: "0.6px solid #27ae60 !important",
                        width: "2px",
                        marginTop: "-1.6rem !important"
                    }


                }}>
                    <Step>
                        <StepLabel className={styles.steplabel} icon={<CheckColorIcon />} optional={<p>
                            Aug 13 2020 <span>2:21 PM</span>
                        </p>}>
                            <h3>Payment started</h3>
                        </StepLabel>
                    </Step>
                    <Step sx={{ marginTop: "-30px" }}>
                        <StepLabel className={styles.steplabel} icon={<CheckColorIcon />} optional={<p>
                            Aug 13 2020 <span>2:21 PM</span>
                        </p>}>
                            <h3>Payment Completed</h3>
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>

            <div className={styles.stepper__container_2}>
                <Stepper activeStep={1} orientation="vertical" sx={{
                    "& .MuiStepConnector-root": {
                        height: "0px",
                        marginTop: "-4rem"

                    },
                    ".css-iprrf9-MuiStepConnector-line": {
                        height: "40px",
                        marginLeft: "-3px",
                        border: "0.6px solid #27ae60 !important",
                        width: "2px",



                    }


                }}>
                    {
                        data2?.map((x: any) => (
                            <Step sx={{ marginTop: "-1rem" }}>
                                <StepLabel className={styles.steplabel} icon={x?.icon} optional={<h3>{x?.label} <br />  </h3>} key={x?.id}>
                                    <br />
                                    {/* <br /> */}
                                    <span>{x?.time}</span>

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

