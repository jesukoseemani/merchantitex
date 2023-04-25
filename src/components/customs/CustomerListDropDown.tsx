import React, { useEffect } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/system';
import { Avatar, Box } from '@mui/material';

const CustomerListDropDown = ({ name, options, handleClick, ...otherProps }: any) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);
    const handleChange = (evt: any) => {
        const { value } = evt.target;
        setFieldValue(name, value);
        console.log(value, "valueeee");

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
            height: 44,

        }
    });

    const color = ["red", "green", "blue", "yello", "tomato", "pink"]

    return (
        <StyledTextField {...configSelect}>
            <div style={{ borderRadius: "20px" }} >

                <p
                    onClick={handleClick}
                    style={{
                        padding: "18px 29px", cursor: "pointer",
                        borderBottom: "1px solid #DFDFDF",
                        fontFamily: 'Avenir',
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "19px",
                        color: "#333333",
                    }}
                >Customer not here? <span style={{ color: "green" }}>Add Customer</span></p>
            </div>
            {options?.map((item: any, i: any) => {
                return (
                    <MenuItem key={i} value={item.id}
                        style={{
                            borderTop: "1px solid #DFDFDF",


                        }}>
                        {/* {options[item]} */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px"

                            }}>
                            <Avatar
                                alt="customer profile"
                                sx={{
                                    height: "8px",
                                    width: "8px",
                                    background: color[i],
                                    textAlign: "center",
                                    padding: "15px"
                                }}
                            >
                                <h2 style={{ fontSize: "10px", color: "#fff" }}> {item?.firstname?.toUpperCase()?.substr(0, 1)} {item.lastname?.toUpperCase()?.substr(0, 1)}</h2>
                            </Avatar>

                            <h2
                                style={{
                                    textTransform: "capitalize",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "19px",
                                    color: "#333333",
                                }}
                            >{item?.firstname} {item.lastname}</h2>
                        </Box>

                    </MenuItem>
                );
            })}


        </StyledTextField>
    );
};

export default CustomerListDropDown;


// export default CustomerListDropDown;

