import { Box, Stack } from '@mui/material'
import React from 'react'
import Styles from "./style.module.scss";

const Listtransfer = () => {
    return (
        <Box>
            <Box px={3} py={5}>
                <Stack direction={"row"} justifyContent="space-between" gap={3}>
                    <h2>19 transfers</h2>
                    <Box className={Styles.headerBox}>
                        <button>Filter by:</button>
                        <button>Download</button>
                        <button>+ New transfer</button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default Listtransfer