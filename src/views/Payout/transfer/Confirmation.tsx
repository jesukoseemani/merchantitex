import { Box, Link, InputLabel } from '@mui/material'
import { FC } from 'react'
import Styles from "./transferform.module.scss"
import { OutlinedInput } from '@mui/material';

const Confirmation: FC<{
    form?: {
        balance: string;
        amount: string;
        account: string;
        description: string
    }
}> = ({ form }) => {
    return (
        <Box className={Styles.confirm_container}>
            <Box className={Styles.title}><h2>Payout confirmation</h2></Box>

            <Box className={Styles.confirm}>
                <p className={Styles.mb}>We sent a confirmation code to 08090909090 to complete your transfer of NGN 10,500 to James Seun - Access bank (1234567890)</p>
                <div>
                    <InputLabel style={{ color: '#000' }}>Confirmation Code</InputLabel>
                    <OutlinedInput fullWidth placeholder='Enter confirmation code' />
                </div>
                <Box className={Styles.confirmFooter}>
                    <button>Continue</button>
                    <p>Didn’t get the code? <Link href='#'> Resend verification code</Link> </p>
                </Box>
            </Box>

        </Box>
    )
}

export default Confirmation
