import { CircularProgress } from '@material-ui/core';
import { Button as Btn, ButtonProps } from '@mui/material';
import { FC } from 'react';

const Button: FC<ButtonProps & { text: string, isOutlined?: boolean, loading?: boolean }> = ({ text, loading, ...props }) => {
    return (
        <Btn
            {...props}
            style={{ display: 'flex', alignItems: 'center' }}
        >
            {text}
            {loading ? <span>
                <CircularProgress size={15} />
            </span> : null}
        </Btn>
    )
}

export default Button