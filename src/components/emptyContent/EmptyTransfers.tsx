import React, { useState, useEffect } from "react";
import Styles from "./transfers.module.scss";
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
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import Confirmation from "../../views/Payout/transfer/Confirmation";
import { useDispatch } from "react-redux";
import { getBalance } from "../../services/balance";
import { Balance } from "../../types/BalanceTypes";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { getSettlementAccounts } from "../../services/settlement";
import FormatToCurrency from "../../helpers/NumberToCurrency";

const DATA = {
  balance: 0,
  amount: 0,
  account: 0,
  description: ''
}

export default function EmptyTransfers() {
  const dispatch = useDispatch();
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
              toastStyles: {
                backgroundColor: 'red',
              },
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
        onClose={() => setOpenItexModel(false)}
        onOpen={() => setOpenItexModel(true)}
        open={openItexModel}
        className={Styles.modalContainer}
      >
        <div className={Styles.modalHeader}>
          <h2>Make a payout</h2>
          <IconButton onClick={() => setOpenItexModel(false)}>
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
    setOpenItexModel(false)
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
    <>
      <ItexModalPayout />
      <div className={Styles.container}>
        <h2>You have not made any payouts</h2>
        <p>
          But, you can change that. You can start by initiating your first to a bank account.
        </p>
        <Button className="success" onClick={() => setOpenItexModel(true)}>
          <Dropdown.Item>
            Make a payout
          </Dropdown.Item>
        </Button>
      </div>
    </>
  );
}
