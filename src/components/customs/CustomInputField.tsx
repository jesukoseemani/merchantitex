import { InputLabel, TextField } from '@mui/material'
import React from 'react'
import { ErrorMessage, Field } from 'formik';
import styles from "./style.module.scss"
import { Box } from '@mui/material';


interface Props {
    label?: string | number;
    // errorName: string;
    placeholder?: string;
    name?: string;
    type?: string;
    id?: string;
    className?: string;
    size?: string;
    defaultValue?: string | number;
    value?: string | number;
    options?: any;
    as?: any;
    multiline?: boolean;
    rows?: number;

}

const CustomInputField = ({ className, id, options, as = "", size = "small", rows, multiline = false, label, placeholder, name = "", type = "text", defaultValue, value, ...otherprops }: Props) => {
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
                fullWidth
                className={className}
                id={id}
                defaultValue={defaultValue}
                value={value}
                options={options}
                multiline={multiline}
                rows={rows}
                {...otherprops}


            />


        </div>
    )
}




export default CustomInputField