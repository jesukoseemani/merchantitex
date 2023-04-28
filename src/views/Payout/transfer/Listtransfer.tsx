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

const Listtransfer = ({ payout }: { payout?: PayoutRes }) => {
    const { calDownload } = useDownload({ url: `${BASE_URL}/v1/payout/download`, filename: 'payout' })

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
                className={ModalStyles.modalContainer}
            >
                <div className={ModalStyles.modalHeader}>
                    <h2>Make a payout</h2>
                    <IconButton onClick={() => setOpenItexModel(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Form.Field className={ModalStyles.inputWrapper}>
                    <label>Balance to be debited</label>
                    <Select
                        placeholder="NGN balance - 123,456.78"
                        options={formattedBalance}
                        onChange={(e: any, value: any) => handleChange(value.value, 'balance')}
                    />
                </Form.Field>
                <Form.Field className={ModalStyles.inputWrapper}>
                    <label>Payout amount</label>
                    <input placeholder="NGN 0.0" onChange={e => handleChange(e.target.value, 'amount')} />
                </Form.Field>
                <Form.Field className={ModalStyles.inputWrapper}>
                    <label>Select beneficiary account</label>
                    <Select
                        placeholder="Select beneficiary account"
                        options={formattedAccount}
                        onChange={(e: any, value: any) => handleChange((value.value), 'account')}
                    />        </Form.Field>
                <Form.Field className={ModalStyles.inputWrapper}>
                    <label>Payout desciption (optional)</label>
                    <input placeholder="e.g Thank you" onChange={e => handleChange(e.target.value, 'description')} />
                </Form.Field>
                {/* <p>
          <InfoOutlinedIcon />
          You will be charged <span> NGN45</span> fee for this transaction
        </p> */}
                <div className={ModalStyles.modalFooter}>
                    <Button onClick={() => handleSubmit(form)} disabled={!form.balance || !form.amount || !form.account}>Submit</Button>
                </div>
            </Modal>
        );
    };


    return (

        <Box mt={"20px"}>
            <Box>
                <Stack direction={"row"} justifyContent="space-between" gap={"5px"} flexWrap="wrap">
                    <h2 className={Styles.transfertitle}>{payout?._metadata?.totalcount || 0} Payout</h2>
                    <Box className={Styles.headerBox}>
                        <button><FilterAltOutlinedIcon />Filter by:</button>
                        <button onClick={calDownload}> <InsertDriveFileOutlinedIcon />Download</button>
                        <button onClick={() => setOpenItexModel(true)}>+ New transfer</button>
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
                <TransfersTable payout={payout!} />
            </Box>
            <ItexModalPayout />

            {/* <Box>
                <CustomModal
                    title="Make a payout"
                    isOpen={openModal}
                    handleClose={handleCloseModal}
                    close={() => setOpenModal(false)}>

                    <SingleTransferBankAcct close={handleCloseModal} />
                </CustomModal >
            </Box> */}
        </Box>
    )
}

export default Listtransfer