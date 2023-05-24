import { InputLabel, TextField } from '@mui/material'
import React from 'react'
import { ErrorMessage, Field } from 'formik';
import styles from "./style.module.scss"


interface Props {
    label?: string | number;
    // errorName: string;
    placeholder?: string;
    name: string;
    type?: string;
    id?: string;
    className?: string;
    size?: string;
    value?: any;
    options?: any;
    as?: any;
    multiline?: boolean;
    rows?: number;
    style?: React.CSSProperties;

}

const CustomInputField = ({ className, style, value, id, options, as = "", size = "small", rows, multiline = false, label, placeholder, name, type = "text", ...otherprops }: Props) => {
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
                name={name}
                placeholder={placeholder}
                // margin="normal"
                type={type}
                size={size}
                fullWidth
                className={className}
                id={id}
                options={options}
                multiline={multiline}
                rows={rows}
                {...otherprops}
                style={style}
                value={value}


            />


        </div>
    )
}




export default CustomInputField