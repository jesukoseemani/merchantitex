import { Box, Link, InputLabel } from '@mui/material'
import { FC, useState } from 'react'
import Styles from "./transferform.module.scss"
import { OutlinedInput } from '@mui/material';
import { payoutTransfer } from '../../../services/payout';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/actions/modal/modalActions';

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
            dispatch(closeModal())
        } catch (error: any) {
            dispatch(closeModal())

            dispatch(
                openToastAndSetContent({
                    toastContent: error?.response?.data?.message || 'Failed to make a payout',
                    msgType: "error"

                })

            );
        } finally {
            setLoading(false)
            dispatch(closeModal())

        }
    }

    console.log(form, "form");
    const { user } = useSelector(state => state?.meReducer?.me)

    return (
        <Box className={Styles.confirm_container}>

            <Box className={Styles.confirm}>
                <p className={Styles.confirmText}>Enter otp to complete your payout of  <span className={Styles.amt}>NGN{form?.amount}</span> to {form?.account}</p>
                <div className={Styles.confirmInput}>
                    <InputLabel className={Styles.label}>Confirmation Code</InputLabel>
                    <OutlinedInput fullWidth placeholder='Enter confirmation code' onChange={e => setOtp(e.target.value)} />
                </div>
                <Box className={Styles.confirmFooter}>
                    <button onClick={pay}>{loading ? 'PLEASE WAIT' : 'Continue'}</button>
                </Box>

                <div className={Styles.resend}>
                    <p>Didn’t get the code? <span>  Resend verification code</span></p>
                </div>
            </Box>

        </Box>
    )
}

export default Confirmation
