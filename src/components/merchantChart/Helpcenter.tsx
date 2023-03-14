import { Box } from '@mui/material'
import React from 'react'
import styles from "./helpcenter.module.scss"

const Helpcenter = () => {
    return (
        <Box className={styles.header__center}>
            <Box className={styles.header__container}>
                <h2>Hello there 👋🏼</h2>
                <p>Choose a help option below.</p>
            </Box>

            <Box className={styles.sectionTwo}>
                <h2>FAQ</h2>
                <h2>Live chat</h2>
            </Box>

            <Box className={styles.sectionThree}>
                <p>Contact us</p>
                <p>+234-145-459-25</p>
                <p>info@iisysgroup.com</p>
            </Box>
        </Box>
    )
}

export default Helpcenter
