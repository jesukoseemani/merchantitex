import { Box } from '@mui/material'

import InvoiceRequesttable from './InvoiceRequesttable'
import Navigation from '../../navbar/Navigation';

const Invoice = () => {

    return (
        <Navigation title='Invoice'>
            <Box>

                <InvoiceRequesttable />
            </Box>

        </Navigation>

    )
}

export default Invoice
