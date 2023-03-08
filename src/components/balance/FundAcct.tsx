import { Box, IconButton, Stack } from '@mui/material'
import styles from "./styles.module.scss"
import CopyIcon from "../../assets/images/copy.svg"
import { ReactSVG } from 'react-svg'

const FundAcct = () => {
    return (
        <Box className={styles.fund__container}>
            <Box className={styles.fund__header}>
                <h2>Fund balance</h2>
            </Box>
            <Box mt={"27px"} className={styles.fund__desc}>
                <p>You can fund your balance by transferring to any of the accounts below</p>
            </Box>

            <Box className={styles.fund__reciept}>
                <h2>Account 1</h2>
                {/* <Stack> */}


                <Box className={styles.fund__form}>

                    <Box>
                        <p>Account number</p>
                        <p>8327217507

                            <IconButton>
                                <ReactSVG src={CopyIcon} />
                            </IconButton>
                        </p>
                    </Box>
                    <Box>
                        <p>Account name</p>
                        <p>ITEX/Adamu Bello </p>
                    </Box>
                    <Box>
                        <p>Bank name</p>
                        <p>Wema Bank</p>
                    </Box>
                </Box>

                <Box className={styles.fund__form2} >
                    <h2>Account 2</h2>
                    <Box>
                        <p>Account number</p>
                        <p>4550234569
                            <IconButton>
                                <ReactSVG src={CopyIcon} />
                            </IconButton></p>
                    </Box>
                    <Box>
                        <p>Account name</p>
                        <p>ITEX/Adamu Bello </p>
                    </Box>
                    <Box>
                        <p>Bank name</p>
                        <p>Fidelity Bank</p>
                    </Box>
                </Box>

                <Box className={styles.fund__cta}>
                    <button>Okay</button>
                </Box>
            </Box>
        </Box>
    )
}

export default FundAcct
