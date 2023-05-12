import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Styles from "./style.module.scss";
import ModalStyles from "../../../components/emptyContent/transfers.module.scss";
import TransfersTable from '../../../components/table/TransfersTable';
import BeneficiaryMenu from '../BeneficiaryMenu';
import { useDispatch } from 'react-redux';
import SingleTransferBankAcct from './SingleTransferBankAcct';
import { makeStyles } from '@material-ui/styles';
import CustomModal from '../../../components/customs/CustomModal';
import { BASE_URL } from '../../../config';
import useDownload from '../../../hooks/useDownload';
import { PayoutRes } from '../../../types/Payout';
import { getSettlementAccounts } from '../../../services/settlement';
import { getBalance } from '../../../services/balance';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { Balance } from '../../../types/BalanceTypes';
import FormatToCurrency from '../../../helpers/NumberToCurrency';
import { ReactComponent as WarningIcon } from "../../../assets/images/warningIcon.svg";

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
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Confirmation from './Confirmation';

const DATA = {
    balance: 0,
    amount: 0,
    account: 0,
    description: ''
}

const Listtransfer = ({ payout, setOpen, changePage }: { payout?: PayoutRes, setOpen?: () => void; changePage?: (p: number) => void }) => {
    const { calDownload } = useDownload({ url: `${BASE_URL}/payout/download`, filename: 'payout' })

    const useStyles = makeStyles({
        mui: {
            ".MuiPaper": {
                border: "2px solid green"
            }
        }
    })

    const { mui } = useStyles()
    const dispatch = useDispatch()
    // open menu
    const [download, setDownload] = React.useState<null | HTMLElement>(null);



    // please explain
    const openDownloadMenu = Boolean(download);

    const [openModal, setOpenModal] = useState(false)
    const handleCloseModal = () => setOpenModal(false);




    const handleOpenDownloadMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setDownload(event.currentTarget);
    };

    const handleCloseDownloadMenu = () => {
        setDownload(null);
    };


    // download
    const downloadpdfFuc = () => { }
    const downloadexcelFuc = () => { }
    const downloadcsvFuc = () => { }
    // download menu array
    const dataDownload = [
        {
            id: 1,
            name: "PDF",
            func: downloadpdfFuc,
        },
        {
            id: 2,
            name: "Excel",
            func: downloadexcelFuc,
        },

        {
            id: 3,
            name: "CSV",
            func: downloadcsvFuc,
        },
    ];


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





    const MakePayout = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "419px",
                    minHeight: "475px",
                    borderRadius: '20px',
                    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
                },
                modalTitle: "Make a payout",
                modalContent: (
                    <div className='modalDiv'>

                        <ItexModalPayout />
                    </div>
                ),
            })
        );
    }







    const ItexModalPayout = () => {
        const [form, setForm] = useState(DATA)
        const handleChange = (value: string, key: string) => {
            setForm({
                ...form,
                [key]: value
            })
        }
        return (

            <div className={Styles.modalContainer}>

                <Form.Field className={Styles.inputWrapper}>
                    <label>Balance to be debited</label>
                    <Select
                        placeholder="NGN balance - 123,456.78"
                        options={formattedBalance}
                        onChange={(e: any, value: any) => handleChange(value.value, 'balance')}
                        className={Styles.select}


                    />
                </Form.Field>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Payout amount</label>

                    <input placeholder="NGN 0.0" onChange={e => handleChange(e.target.value, 'amount')} className={Styles.select} />
                </Form.Field>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Select beneficiary account</label>
                    <Select
                        placeholder="Select beneficiary account"
                        options={formattedAccount}
                        onChange={(e: any, value: any) => handleChange((value.value), 'account')}
                        className={Styles.select}

                    />        </Form.Field>
                <Form.Field className={Styles.inputWrapper}>
                    <label>Payout desciption (optional)</label>
                    <input placeholder="e.g Thank you" onChange={e => handleChange(e.target.value, 'description')} />
                </Form.Field>
                <p className={Styles.warning}>
                    <WarningIcon />
                    You will be charged <span> NGN45</span> fee for this transaction
                </p>
                <div className={Styles.modalFooter}>
                    <Button onClick={() => handleSubmit(form)} disabled={!form.balance || !form.amount || !form.account}>Submit</Button>
                </div>
            </div>
        );
    }
    const handleSubmit = (form: typeof DATA) => {
        setOpenItexModel(false)
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "560.66px",
                    height: "250px !important",
                    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",

                },
                modalTitle: "Payout confirmation",
                modalContent: (
                    <>
                        <Confirmation form={form} />
                    </>
                ),
            })
        );
    }

    return (

        <Box mt={"20px"}>
            <Box>
                <Stack direction={"row"} justifyContent="space-between" gap={"5px"} flexWrap="wrap">
                    <h2 className={Styles.transfertitle}>{payout?._metadata?.totalcount || 0} Payout(s)</h2>
                    <Box className={Styles.headerBox}>
                        <button onClick={setOpen}><FilterAltOutlinedIcon />Filter by:</button>
                        <button onClick={calDownload}> <InsertDriveFileOutlinedIcon />Download</button>
                        <button onClick={MakePayout}>+ New transfer</button>
                    </Box>
                </Stack>
            </Box>

            {/* download */}
            <BeneficiaryMenu
                openBeneficiary={openDownloadMenu}
                handleCloseMenu={handleCloseDownloadMenu}
                beneficiary={download}
                data={dataDownload}
                style={{ width: "8.5rem", borderRadius: "20px" }}
            />

            <Box sx={{ width: "100%", marginInline: "auto" }}>
                <TransfersTable payout={payout!} changePage={changePage} />
            </Box>


        </Box>
    )
}

export default Listtransfer