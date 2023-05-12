import React from 'react'
import { Box } from '@mui/material';
import styles from './Checkout.module.scss'
import CheckoutComp from '../../../components/checkout/CheckoutComp';

function Checkout() {
    return (

        <Box mt={3}>
            <CheckoutComp />
        </Box>
    );
}

export default Checkout