import { Box, Stack } from '@mui/material'
import React from 'react'
import { Button } from 'semantic-ui-react'
import BillEntryReqtable from './Billentryrequesttable'


const BillPaymentEntry = () => {
    return (

        <Box sx={{ marginTop: "3rem" }}>
            <Box bgcolor={"#fff"} p={2}>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                    <h2>5 Bill payment entries</h2>
                    <button style={{ background: "#27AE60", padding: "10px 20px", color: "#fff", borderRadius: "4px" }}>Confirm bill payment</button>
                </Stack>
            </Box>

            <Box>
                <BillEntryReqtable />
            </Box>
        </Box>

    )
}

export default BillPaymentEntry