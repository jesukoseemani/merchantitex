import { Box, Link } from '@mui/material'
import React from 'react'
import Styles from "./transferform.module.scss"

const Confirmation = () => {
    return (
        <Box className={Styles.container}>
            <Box className={Styles.title}><h2>Transfer confirmation</h2></Box>

            <Box className={Styles.confirm}>
                <p>We sent a confirmation code to 08090909090 to complete your transfer of NGN 10,500 to James Seun - Access bank (1234567890)</p>
                <Box className={Styles.confirmFooter}>
                    <button>Continue</button>
                    <p>Didn’t get the code? <Link href='#'>Resend verification code</Link> </p>
                </Box>
            </Box>

        </Box>
    )
}

export default Confirmation
