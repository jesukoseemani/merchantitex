import { Box, Stack } from '@mui/material'
import React from 'react'
import BillEntryReqtable from './Billentryrequesttable'


const BillPaymentEntry = () => {
    return (

        <Box sx={{ marginTop: "3rem" }}>
            <Box p={2}>
                <Stack direction={"row"} flexWrap="wrap" justifyContent="space-between" alignItems={"center"}>
                    <h2>5 Bill payment entries</h2>
                    <button style={{ background: "#27AE60", height: "35px", padding: "10px 20px", color: "#fff", borderRadius: "20px" }}>Confirm bill payment</button>
                </Stack>
            </Box>

            <Box>
                <BillEntryReqtable />
            </Box>
        </Box>

    )
}

export default BillPaymentEntry