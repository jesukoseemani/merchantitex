import { Box, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { ErrorMessage, Field } from 'formik';
import styles from "./style.module.scss"
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';


interface Props {
    label?: string | number;
    // errorName: string;
    placeholder?: string;
    name?: string;
    size?: string;
    defaultValue?: string | number;
    value?: string | number;
    options?: string | number;
    as?: any;

    multiline?: boolean;
    rows?: number;
    id?: string;
    className?: string;
    position?: any;


}

const CustomPasswordInput = ({ className, position = "end", id, options, as = "", size = "small", rows, label, placeholder, name = "", defaultValue, value, ...props }: Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <InputLabel>
                <span className={styles.formTitle}>{label && label}</span>
            </InputLabel>
            <Field
                as={TextField}
                helperText={
                    <ErrorMessage name={name}>
                        {(msg) => <span style={{ color: 'red' }}>{msg}</span>}
                    </ErrorMessage>
                }
                className={className}

                name={name}
                placeholder={placeholder}
                variant='outlined'

                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: <InputAdornment position={position}>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{ paddingRight: "14px" }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>,
                }}

                size={size}
                fullWidth


            />
        </div>
    )
}

export default CustomPasswordInput
