import { Box } from '@mui/material'
import React from 'react'
import Styles from "./style.module.scss"
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import Snackbar from '../../Snackbar';
const Success = () => {
    const dispatch = useDispatch()
    const handleCopy = () => {
        dispatch(closeModal())
        return (
            <>
                {/* <Snackbar text='Your account is currently in Test mode because your business is not yet verified' /> */}
            </>
        )
    }
    return (
        <Box className={Styles.successWrapper}>
            <Box sx={{

                // height: "150px",
                marginInline: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <CheckCircleOutlinedIcon color='success' style={{
                    fontSize: "100px"

                }} />

            </Box>
            <Box className={Styles.textContainer} >
                <h2>Invoice Created Succesfully</h2>
                <p>Your invoice is on its way to your customer’s mail, you can also share this link below. </p>
                <button onClick={handleCopy}>Copy link</button>
            </Box>

        </Box>
    )
}

export default Success
