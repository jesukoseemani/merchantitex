import React, { useEffect, useState } from 'react'
import styles from "./toast.module.scss"
import { Box, ClickAwayListener } from '@mui/material';
import { ReactComponent as SuccessIcon } from "../../assets/images/doubleCheckIcon.svg";
import { ReactComponent as ErrorIcon } from "../../assets/images/errorCheck.svg";
import { useDispatch } from 'react-redux';
import { closeToast } from '../../redux/actions/toast/toastActions';


interface Props {
    toastContent?: string | number | null;
    msgType: "success" | "error";
    style?: React.CSSProperties
}
export const CustomToast = ({ toastContent, msgType, style }: Props) => {
    const [showToast, setShowToast] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setShowToast(true)

    }, [showToast])


    const handleClickAway = () => {
        setShowToast(!false)
    }
    setTimeout(() => {
        setShowToast(!false)
        dispatch(closeToast())
    }, 4000);

    return (
        <>
            {showToast && <ClickAwayListener
                onClickAway={handleClickAway}

            >
                <div onClick={handleClickAway} className={msgType === "success" ? styles.toastSuccess : styles.toastError} >
                    {msgType === "success" ? <SuccessIcon /> : <ErrorIcon />}
                    <p>{toastContent && toastContent}</p>

                </div>
            </ClickAwayListener>}
        </>
    )
}
