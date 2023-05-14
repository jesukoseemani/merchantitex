import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormatToCurrency from '../../../helpers/NumberToCurrency';
import { Balance } from '../../../types/BalanceTypes';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { getBalance } from '../../../services/balance';
import { getSettlementAccounts } from '../../../services/settlement';
import { Formik, Form } from 'formik';
import { closeModal, openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import styles from "./addPayout.module.scss"
import { TextField } from '@mui/material';
import CustomInputField from '../../../components/customs/CustomInputField';
import CustomPayout from '../../../components/customs/CustomPayout';
import * as Yup from 'yup';
import Confirmation from './Confirmation';
import { ReactComponent as WarningIcon } from "../../../assets/images/warningIcon.svg";


interface Props {
    balance: 0,
    amount: 0,
    account: 0,
    description: ''
}
const Addpayout = () => {
    const dispatch = useDispatch()
    const [balances, setBalances] = useState<Balance[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);

    const formattedBalance = balances.map((b, i: number) => ({ key: i + 1, value: b.id, text: `${b.currency} balance - ${FormatToCurrency(b.availablebalance)}` }))
    const formattedAccount = accounts.map((b, i: number) => ({ key: i + 1, value: b.id, text: `${b.accountname} - ${b.accountnumber}` }))

    console.log({ formattedBalance, formattedAccount })
    const [openItexModel, setOpenItexModel] = useState(false);



    const validate = Yup.object({
        balance: Yup.string().required("balance is Required"),
        amount: Yup.number().required("amount is Required"),
        account: Yup.string().required("Account is required"),
        description: Yup.string().required("description is required"),

    })
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

    console.log({ balances, accounts });

    return (
        <Formik
            initialValues={{

                amount: "",
                account: "",
                balance: "",
                description: "",
            }}
            validationSchema={validate}
            onSubmit={async (values: any) => {
                dispatch(
                    openModalAndSetContent({
                        modalStyles: {
                            padding: 0,
                            borderRadius: "20px",
                            width: "560.66px",
                            height: "442px !important",
                            boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",

                        },
                        modalTitle: "Payout confirmation",
                        modalContent: (
                            <>
                                <Confirmation form={values} />
                            </>
                        ),
                    })
                );

            }}>
            {(props) => (
                <div className={styles.userContainer}>

                    <div className={styles.userDiv}>
                        <div className={styles.userContent}>
                            <Form>



                                <Grid container justifyContent="space-between" alignItems={"center"} >
                                    <div className={styles.userContentBox}>


                                        <Grid item xs={12} mb="18px">

                                            <CustomInputField label={"Select to be debited"} name="balance"
                                                as={CustomPayout}
                                                options={formattedBalance}
                                            />



                                        </Grid>


                                        <Grid item xs={12} mb="18px">
                                            <CustomInputField label={"Payout amount"} name="amount" as={TextField} />
                                        </Grid>
                                        <Grid item xs={12} mb="23px">
                                            <CustomInputField label={"Select beneficiary account"} name="account"
                                                as={CustomPayout}
                                                options={formattedAccount}
                                            />
                                        </Grid>

                                    </div>
                                    <div className={styles.descBox}>
                                        <Grid item xs={12}>
                                            <CustomInputField label={"Payout desciption (optional)"} name="description" as={TextField} />
                                        </Grid>
                                        <div className={styles.warning}>
                                            <WarningIcon />
                                            <p> You will be charged <span> NGN45</span> fee for this transaction</p>
                                        </div>

                                    </div>


                                    <button
                                        style={{
                                            backgroundColor: '#27AE60',
                                            height: '44px',
                                            width: '100%',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontFamily: 'Avenir',
                                            fontStyle: "normal",
                                            fontWeight: 800,
                                            fontSize: 16,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        type='submit'
                                        color='primary'>

                                        Submit
                                    </button>
                                </Grid>
                            </Form>
                        </div>

                    </div>
                </div>
            )
            }
        </Formik >
    )
}

export default Addpayout