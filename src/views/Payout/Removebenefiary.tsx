import { Box, Stack } from '@mui/material'
import Styles from "./beneficiaries.module.scss"
const Removebenefiary = () => {
    return (
        <Box>
            <Box className={Styles.modalHeader}>
                <h2>Remove beneficiaries</h2>
            </Box>
            <Box className={Styles.bodyText}>
                <p>Are you sure want to remove this beneficiary. They will be removed from the list of beneficiary. Click on ‘Confirm’ to proceed.</p>
            </Box>
            <Box className={Styles.removeBtn} p={2}>
                <Stack direction={"row"} justifyContent="flex-end" gap={3} className={Styles.btnWrapper}>
                    <button className={Styles.cancelBtn}>Cancel</button>
                    <button className={Styles.confirmBtn}>Confirm</button>
                </Stack>
            </Box>
        </Box>
    )
}

export default Removebenefiary