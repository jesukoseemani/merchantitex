import { Box, Checkbox, CheckboxProps } from '@mui/material'
import React from 'react'

interface Props {
    title?: string | number;
    props?: CheckboxProps

}
const CustomCheckbox = ({ title, props }: Props) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "2px"

            }}
        >
            <Checkbox  {...props} />
            <span style={{
                fontFamily: 'Avenir',
                fontStyle: "mormal",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: "20px",
                color: '#212B36',

            }}>{title}</span>
        </Box>
    )
}

export default CustomCheckbox