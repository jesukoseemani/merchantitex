import React, { useEffect } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/system';

const CustomCurrency = ({ name, options, ...otherProps }: any) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44,
            marginBottom: "18px",
        }
    });

    const handleChange = (evt: any) => {
        const { value } = evt.target;
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange,
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <StyledTextField {...configSelect} placeholder="select bank" select>
            {options?.map((item: any, i: any) => {
                return (
                    <MenuItem key={i} value={item.id}>
                        {/* {options[item]} */}
                        {item.currencyIso}
                    </MenuItem>
                );
            })}
        </StyledTextField>
    );
};

export default CustomCurrency;
