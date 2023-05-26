import React, { useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { styled } from '@material-ui/styles';
// import { styled } from '@mui/system';

const CustomPayout = ({ name, options, ...otherProps }: any) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

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
        <TextField {...configSelect}>
            {options?.map((item: any, i: any) => {
                return (
                    <MenuItem key={i} value={item?.text}>
                        {/* {options[item]} */}
                        {item?.text}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default CustomPayout;
