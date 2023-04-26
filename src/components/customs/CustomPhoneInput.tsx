import { Box, InputLabel, Select, TextField } from '@mui/material'
import React from 'react'
import { ErrorMessage, Field } from 'formik';
import styles from "./style.module.scss"
import { InputAdornment } from '@mui/material';
import useCountry from '../hooks/UseCountry';
import CustomSelect from './CustomSelect';
import SelectWrapperCountry from '../formUI/SelectCountry';
import { CircleFlag } from 'react-circle-flags';


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
    // adornmentType?: any;
    adornment?: any;
    multiline?: boolean;
    rows?: number;
    InputProps?: boolean;
    id?: string;
    className?: string;
    position?: any;
    // adornmentName: string;
    adornmentOptions?: string | number;


}

const CustomPhoneNumber = ({ adornmentOptions, className, position = "start", adornment, id, InputProps, options, as = "", size = "small", rows, multiline = false, label, placeholder, name = "", type = "text", defaultValue, value, ...props }: Props) => {
    const [countryList, defaultCountry, defaultCountryDialCode,] = useCountry()

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

                        <Box sx={{ width: "80px", display: "flex", gap: "4px", height: "40px", borderRight: "0.5px solid #ddd", marginLeft: "-10px", justifyContent: "center", alignItems: "center" }}>



                            <CircleFlag countryCode={`${defaultCountry?.countryIso?.toLocaleLowerCase()}`} height="15" />
                            <p
                                style={{
                                    fontFamily: 'Avenir',
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: "19px",
                                    color: "#333333",

                                }}
                            >{defaultCountry?.dialCode}</p>

                        </Box>
                    </InputAdornment>,
                }}

            />
        </div>
    )
}

export default CustomPhoneNumber;

