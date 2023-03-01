import { Box } from '@mui/material'
import React from 'react'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Styles from "./success.module.scss"
const PosSuccess = () => {
    return (
        <Box >
            <Box sx={{

                height: "150px",
                marginInline: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "33px",
                // marginBottom: "3px",
            }}>
                <CheckCircleOutlinedIcon color='success' style={{
                    fontSize: "100px"

                }} />

            </Box>
            <Box className={Styles.content}>
                <h3 style={{ color: "red" }}>Your POS request is successful!</h3>
                <hr className={Styles.divider} />
                <Box className={Styles.desc}>
                    <p>We have received your request and will be reviewing it. You will be notified as soon as possible.</p>

                    <p> You can also check the status of the request on your dashboard.</p>
                </Box>
            </Box>



        </Box >
    )
}

export default PosSuccess