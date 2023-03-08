import { Box, InputLabel, OutlinedInput, Stack } from '@mui/material'
import styles from "./styles.module.scss"

const SetUsdLimitModal = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.header__titles}>
                <h2>Set low limits (USD)</h2>
            </Box>

            <Box className={styles.description}>
                <p>Allow us inform you to top-up your balance anytime it exceeds the specified level by setting a minimum limit for this wallet.</p>
            </Box>
            <Box className={styles.form}>
                <InputLabel className={styles.label}>Enter a low limit</InputLabel>
                <OutlinedInput fullWidth placeholder='USD0.00' sx={{ height: "44px", paddingLeft: "20px" }} />
                <Box className={styles.btn__group}>
                    <Stack direction={"row"} justifyContent="flex-end" spacing={2} alignItems={"centetr"}>
                        <button>Cancel</button>
                        <button>Set low limit</button>
                    </Stack>
                </Box>
            </Box>

        </Box>
    )
}

export default SetUsdLimitModal
