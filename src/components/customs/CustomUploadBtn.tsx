import { Box, FormHelperText, Stack, InputLabel, Button } from '@mui/material'
import React from 'react'
import { ReactSVG } from 'react-svg'
import { ReactComponent as WarningIcon } from "../../assets/images/warningIcon.svg";
import { ReactComponent as DownloadIcon } from "../../assets/images/cloudDownload.svg";
import styles from "./style.module.scss"


interface Props {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    name?: string;
    helperText?: string;
    multiple?: boolean | undefined
}

const CustomUploadBtn = ({ onChange, label, helperText, multiple, name }: Props) => {
    return (
        <Box >
            <InputLabel className={styles.label}>{label}</InputLabel>
            <Button
                component="label"
                sx={{
                    background: "#F6F9FD !important",
                    fontSize: "14px",
                    color: "#4F4F4F",
                    height: 44,
                    border: "1px dashed #7A9CC4 !important",
                    borderRadius: "4px !important",
                    fontWeight: 300,
                    fontFamily: "Avenir",
                    textTransform: "inherit"
                }}

                fullWidth
            >


                <DownloadIcon style={{ marginRight: "8px", width: "23px", height: "23px", opacity: ".8" }} />   <span

                    style={{
                        fontFamily: 'Avenir',
                        // fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "19px",
                        color: "#4F4F4F"
                    }}
                >choose file to upload</span>
                <input hidden onChange={onChange} name={name} accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG," multiple={multiple} type="file" />
            </Button>
            <Stack direction={"row"} mt={1} alignItems="flex-start" columnGap={1}>

                <WarningIcon style={{ width: "15px", height: "15px" }} />
                <span style={{
                    fontFamily: 'Avenir',
                    // fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "9px",
                    lineHeight: "16px",
                    color: "rgba(74, 82, 106, 0.990517)",
                    width: "100%",

                }}>
                    {helperText}
                </span>
            </Stack>
        </Box>
    )
}

export default CustomUploadBtn