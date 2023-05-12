import { Box, FormHelperText, InputLabel } from '@material-ui/core'
import { Grid, MenuItem, Stack, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Styles from "./transferform.module.scss";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { banks } from '../../../helpers/bankslists';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Confirmation from './Confirmation';
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@material-ui/core";
import {
    Dropdown,
    Menu,
    Button,
    Header,
    Image,
    Modal,
    Checkbox,
    Form,
    Select,
} from "semantic-ui-react";
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { getSettlementAccounts } from '../../../services/settlement';
import { getBalance } from '../../../services/balance';
import { Balance } from '../../../types/BalanceTypes';
import FormatToCurrency from '../../../helpers/NumberToCurrency';

const DATA = {
    balance: 0,
    amount: 0,
    account: 0,
    description: ''
}




const SingleTransferBankAcct = ({ close }: { close: () => void }) => {
    const [bankAcct, setBankAcct] = useState(null)
    const dispatch = useDispatch();
    const [form, setForm] = useState<typeof DATA>(DATA)

    const [openModal, setOpenModal] = useState(false)

    const [balances, setBalances] = useState<Balance[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);

    const formattedBalance = balances.map((b, i: number) => ({ key: i + 1, value: b.id, text: `${b.currency} balance - ${FormatToCurrency(b.availablebalance)}` }))
    const formattedAccount = accounts.map((b, i: number) => ({ key: i + 1, value: b.id, text: `${b.accountname} - ${b.accountnumber}` }))


    const [openItexModel, setOpenItexModel] = useState(false);

    useEffect(() => {
        (
            async () => {

                try {
                    const [balanceRes, settlementRes] = await Promise.all([getBalance(), getSettlementAccounts()]);
                    setBalances(balanceRes?.balances || []);
                    setAccounts(settlementRes?.accounts || [])
                } catch (error: any) {
                    dispatch(
                        openToastAndSetContent({
                            toastContent: error?.response?.data?.message || 'Failed to get balances',
                            msgType: "error"
                        })
                    );
                }
            }
        )()
    }, [])



    const ItexModalPayout = () => {
        const [form, setForm] = useState(DATA)

        const handleChange = (value: string, key: string) => {
            setForm({
                ...form,
                [key]: value
            })
        }

        return (
            <Modal
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
                className={Styles.modalContainer}
            >
                <div className={Styles.modalHeader}>
                    <h2>Make a payout</h2>
                    <IconButton onClick={() => setOpenModal(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Balance to be debited</label>
                    <Select
                        placeholder="NGN balance - 123,456.78"
                        options={formattedBalance}
                        onChange={(e: any, value: any) => handleChange(value.value, 'balance')}
                    />
                </Form.Field>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Payout amount</label>
                    <input placeholder="NGN 0.0" onChange={e => handleChange(e.target.value, 'amount')} />
                </Form.Field>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Select beneficiary account</label>
                    <Select
                        placeholder="Select beneficiary account"
                        options={formattedAccount}
                        onChange={(e: any, value: any) => handleChange((value.value), 'account')}
                    />        </Form.Field>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Payout desciption (optional)</label>
                    <input placeholder="e.g Thank you" onChange={e => handleChange(e.target.value, 'description')} />
                </Form.Field>
                {/* <p>
          <InfoOutlinedIcon />
          You will be charged <span> NGN45</span> fee for this transaction
        </p> */}
                <div className={Styles.modalFooter}>
                    <Button onClick={() => handleSubmit(form)} disabled={!form.balance || !form.amount || !form.account}>Submit</Button>
                </div>
            </Modal>
        );
    };



    const handleSubmit = (form: typeof DATA) => {
        close()
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "560.66px",
                    height: "442px",
                    overflow: "hidden"
                },
                modalContent: (
                    <>
                        <Confirmation form={form} />
                    </>
                ),
            })
        );
    }
    return (
        <Box className={Styles.container}>


            <Grid container mt={'33px'}>
                <Grid item xs={12} sx={{ marginBottom: "17px" }}>
                    <InputLabel>Balance to be debited</InputLabel>
                    <TextField select fullWidth>
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: "17px" }}>
                    <InputLabel>Payment amount</InputLabel>
                    <OutlinedInput fullWidth placeholder='NGN 0.0' />


                </Grid>

                <Grid item xs={12} sx={{ marginBottom: "17px" }}>
                    <InputLabel>Select Beneficiary account</InputLabel>
                    <TextField fullWidth select value={bankAcct} >
                        {banks?.map(({ id, name }) => (
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <MenuItem id={name} key={id}>{name}</MenuItem>

                            </Box>
                        ))}
                    </TextField >


                </Grid>

            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <InputLabel>Payout description (optional)</InputLabel>
                    <OutlinedInput fullWidth placeholder='Enter a description' />

                    <div className={Styles.helperText}>
                        <ErrorOutlineIcon fontSize='large' /> <span className={Styles.small}>You will be charged NGN 45  fee for this transaction</span>
                    </div>
                </Grid>
                <button>Continue</button>
            </Grid>



        </Box>
    )
}

export default SingleTransferBankAcct
