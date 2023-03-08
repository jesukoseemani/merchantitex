import { Box, Stack } from '@mui/material'
import React from 'react'
import styles from "./transferEntries.module.scss"

const DeleteEntries = () => {
    return (
        <Box>
            <Box className={styles.headerTitle}>
                <h2>Delete selected entries</h2>
            </Box>
            <Box className={styles.content}>
                <p>Are you sure want to delete the selected entries. They will be removed from the list of entries. Click on ‘Confirm’ to proceed.</p>
            </Box>
            <Stack justifyContent={"flex-end"} direction={"row"} spacing={2} px={"50px"} alignItems={"center"} flexWrap="wrap" className={styles.ctx}>
                <button>Cancel</button>
                <button>Confirm</button>
            </Stack>
        </Box>
    )
}

export default DeleteEntries