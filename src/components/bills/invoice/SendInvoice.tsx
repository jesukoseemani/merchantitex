import { Box, Stack } from '@mui/material'
import React from 'react'
import Styles from "./invoicedetails.module.scss"

const SendInvoice = () => {
    return (
        <Box sx={{
            width: "416px",
            height: "287px",
            boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
            borderRadius: "20px"
        }}>

            <Box className={Styles.sendInvoice_title}>
                <h2>Send invoice</h2>
            </Box>

            <Box className={Styles.invoiceDesc}>
                <p>   Do you want to send this payment receipt to your customer (debra.holt@example.com)?</p>
            </Box>

            <Stack direction={"row"} spacing={3} className={Styles.invoice__btn__group}>
                <button>Cancel invoice</button>
                <button>Send invoice</button>
            </Stack>
        </Box>
    )
}

export default SendInvoice