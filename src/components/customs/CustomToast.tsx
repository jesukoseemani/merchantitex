import React, { useEffect, useState } from 'react'
import styles from "./toast.module.scss"
import { Box, ClickAwayListener } from '@mui/material';
import { ReactComponent as SuccessIcon } from "../../assets/images/doubleCheckIcon.svg";
import { ReactComponent as ErrorIcon } from "../../assets/images/errorCheck.svg";


interface Props {
    text: string;
    type?: "success" | "error";
    style?: React.CSSProperties
}
export const CustomToast = ({ text, type, style }: Props) => {
    const [showToast, setShowToast] = useState(true)


    useEffect(() => {
        setShowToast(true)

    }, [showToast])


    const handleClickAway = () => {
        setShowToast(!false)
    }
    setTimeout(() => {
        setShowToast(!false)

    }, 4000);

    return (
        <>
            {showToast && <ClickAwayListener
                onClickAway={handleClickAway}

            >
                <div onClick={handleClickAway} className={type === "success" ? styles.toastSuccess : styles.toastError} >
                    {type === "success" ? <SuccessIcon /> : <ErrorIcon />}
                    <p>{text}</p>

                </div>
            </ClickAwayListener>}
        </>
    )
}
