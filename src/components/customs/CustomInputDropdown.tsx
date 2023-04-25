import { Box, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { ErrorMessage, Field } from 'formik';
import styles from "./style.module.scss"
import { InputAdornment } from '@mui/material';


interface Props {
    label?: string | number;
    // errorName: string;
    placeholder?: string;
    name?: string;
    type?: string;
    size?: string;
    defaultValue?: string | number;
    value?: string | number;
    options?: string | number;
    as?: any;
    adornmentType?: any;
    adornment?: any;
    multiline?: boolean;
    rows?: number;
    InputProps?: boolean;
    id?: string;
    className?: string;
    position?: any;
    adornmentName: string;
    adornmentOptions?: string | number;


}

const CustomInputDropdown = ({ adornmentOptions, adornmentName = "", className, position = "start", adornment, adornmentType, id, InputProps, options, as = "", size = "small", rows, multiline = false, label, placeholder, name = "", type = "text", defaultValue, value, ...props }: Props) => {
    return (
        <div>
            <InputLabel>
                <span className={styles.formTitle}>{label && label}</span>
            </InputLabel>
            <Field
                as={as}
                helperText={
                    <ErrorMessage name={name}>
                        {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                }
                name={name && name}
                placeholder={placeholder}
                // margin="normal"
                type={type}
                size={size}
                id={id}
                className={className}
                fullWidth
                defaultValue={defaultValue}
                value={value}
                options={options}
                multiline={multiline}
                rows={rows}
                {...props}



                InputProps={{
                    startAdornment: <InputAdornment position={position}>

                        <Box sx={{ height: "40px", width: "80px", marginTop: "-4px !important", marginLeft: "-10px" }}>

                            {/* <Box sx={{ height: "40px", width: "70px", marginTop: "-4px", marginLeft: "-10px" }}> */}
                            <Field
                                as={adornmentType}
                                helperText={
                                    <ErrorMessage name={adornmentName}>
                                        {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                                    </ErrorMessage>
                                }
                                name={adornmentName}
                                placeholder={placeholder}
                                size={size}
                                options={adornmentOptions}
                                sx={{
                                    " .css-zi7sdk": {
                                        border: "2px solid red"

                                    }
                                }}
                            />


                        </Box>
                    </InputAdornment>,
                }}

            />
        </div>
    )
}

export default CustomInputDropdown