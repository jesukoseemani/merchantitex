import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactComponent as ColorcheckIcon } from "../../../assets/images/circle-check-color.svg"
import { ReactComponent as Cancel } from "../../../assets/images/cancel.svg"
import Styles from "./success.module.scss"
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../redux/actions/modal/modalActions';


const SuccessModal = () => {
    const dispatch = useDispatch()
    const handleClose = () => [
        dispatch(closeModal())
    ]
    return (

        <Box className={Styles.container}>
            <Box sx={{
                position: "absolute",
                right: 39,
                top: 31
            }}>
                <IconButton onClick={handleClose}>  <ClearOutlinedIcon /></IconButton>
            </Box>
            <Box sx={{

                height: "160px",
                marginInline: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                '& svg': {
                    width: "116px",
                    height: 116
                }

            }}>
                <ColorcheckIcon />


            </Box>
            <Box className={Styles.textContainer} >
                <h2 >Your Information has being received</h2>
                <p>We will ensure to get back to you within 24hours, incase you do not hear from us after then, feel free to contact Support</p>
            </Box>



        </Box >
    )
}

export default SuccessModal