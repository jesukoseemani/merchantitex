import { Box, Link, InputLabel } from '@mui/material'
import { FC, useState } from 'react'
import Styles from "./transferform.module.scss"
import { OutlinedInput } from '@mui/material';
import { payoutTransfer } from '../../../services/payout';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { useDispatch } from 'react-redux';

const Confirmation: FC<{
    form?: {
        balance: number;
        amount: number;
        account: number;
        description: string
    }
}> = ({ form }) => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const pay = async () => {
        setLoading(true)
        try {
            await payoutTransfer({
                amount: Number(form?.amount),
                recipientid: Number(form?.account),
                accountid: Number(form?.balance),
                narration: form?.description!,
                otp
            })
        } catch (error: any) {
            dispatch(
                openToastAndSetContent({
                    toastContent: error?.response?.data?.message || 'Failed to make a payout',
                    toastStyles: {
                        backgroundColor: 'red',
                    },
                })
            );
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box className={Styles.confirm_container}>
            <Box className={Styles.title}><h2>Payout confirmation</h2></Box>

            <Box className={Styles.confirm}>
                <p className={Styles.mb}>Enter the code generated from the google authenticator</p>
                <div>
                    <InputLabel style={{ color: '#000' }}>Confirmation Code</InputLabel>
                    <OutlinedInput fullWidth placeholder='Enter confirmation code' onChange={e => setOtp(e.target.value)} />
                </div>
                <Box className={Styles.confirmFooter}>
                    <button onClick={pay}>{loading ? 'PLEASE WAIT' : 'Continue'}</button>
                </Box>
            </Box>

        </Box>
    )
}

export default Confirmation
