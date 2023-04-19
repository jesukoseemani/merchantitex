import React, { useEffect } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/system';
import ReactCountryFlag from 'react-country-flag';

const CustomPhoneNumber = ({ name, options, ...otherProps }: any) => {
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
    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44
        }
    });
    ;

    return (
        <StyledTextField {...configSelect}>
            {options?.map((item: any, i: any) => {
                return (
                    <MenuItem key={item?.id} value={item.dialCode}>
                        <ReactCountryFlag
                            countryCode={item.countryIso}
                            svg
                            style={{
                                width: '1.5em',
                                height: '1.5em',
                                marginRight: "5px"
                            }}
                            title={item.countryIso}
                        />
                        {item?.dialCode}
                    </MenuItem>
                );
            })}
        </StyledTextField>
    );
};


export default CustomPhoneNumber;
