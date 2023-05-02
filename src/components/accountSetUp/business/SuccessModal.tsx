import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ColorcheckIcon from "../../../assets/images/circle-check-color.svg"
import Styles from "./success.module.scss"

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
 

const SuccessModal = () => {

    return (

        <Box className={Styles.container}>
            <Box sx={{

                height: "160px",
                marginInline: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // marginTop: "50px",
                // marginBottom: "3px",
            }}>
                <CheckCircleOutlinedIcon color='success' style={{
                    fontSize: "100px"

                }} />

            </Box>
            <Box className={Styles.textContainer} >
                <h2 >Your Information has being received</h2>
                <p>We will ensure to get back to you within 24hours, incase you do not hear from us after then, feel free to contact Support</p>
            </Box>



        </Box >
    )
}

export default SuccessModal