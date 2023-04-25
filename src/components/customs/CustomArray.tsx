import { Box } from '@mui/material';
import React from 'react'

interface Props<T> {
    data: T[];
    onClick: (value: T) => void;
}


const CustomArray = <T extends {}>({ data, onClick }: Props<T>) => {
    return (
        <div>
            {data?.map((x: any, index) => {
                if (typeof x === "object") {
                    return (
                        <Box key={x?.id}>
                            <h1 onClick={() => onClick(x)}>
                                {x?.name || x?.state || x?.country}</h1>
                        </Box>
                    )
                } else {
                    return (
                        <Box key={index}>
                            <h2 onClick={() => onClick(x)}>
                                {x}
                            </h2>
                        </Box>
                    )
                }
            })}
        </div>
    )
}

export default CustomArray