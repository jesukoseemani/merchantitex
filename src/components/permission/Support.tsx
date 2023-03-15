import { Step, Stepper, StepLabel } from '@mui/material'
import React from 'react'
import Permission from '../../views/Settings/Permission'

const Support = () => {
    return (
        <Permission>
            <Stepper orientation='vertical' activeStep={0}>
                <Step>
                    <StepLabel>Chelsea</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Machester</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Arsenal</StepLabel>
                </Step>
            </Stepper>
        </Permission>
    )
}

export default Support