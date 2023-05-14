import { CheckBox } from '@material-ui/icons';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomClickTable from '../../../components/table/CustomClickTable';
import OverviewTable from '../../../components/table/OverviewTable';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { GetTransHistoryRes, TransHistory } from '../../../types/transferTypes';
import styles from "./transferEntries.module.scss";
import { Checkbox, IconButton } from '@mui/material';
import BeneficiaryMenu from '../beneficiary/BeneficiaryMenu';
import DeleteEntries from './DeleteEntries';
const TransferHistorytable = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [transactions, setTransactions] = useState<TransHistory[]>([]);
    const [rows, setRows] = useState<TransHistory[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const limit = (value: number) => {
        setRowsPerPage(value);
    };

    interface Column {
        id: "checkbox" | 'amt' | 'naration' | 'acctNum' | 'bankname' | 'acctname' | 'status' | 'actions';
        label: any;
        minWidth?: number;
        align?: 'right' | 'left' | 'center';
    }
    const columns: Column[] = [
        {
            id: "checkbox",
            label: <Checkbox />,
        },
        { id: 'amt', label: 'Amount', minWidth: 100 },
        { id: 'naration', label: 'Naration', minWidth: 100 },
        { id: 'acctNum', label: 'Account number', minWidth: 100 },
        { id: 'bankname', label: 'Bank name', minWidth: 100, align: 'right' },
        { id: 'acctname', label: 'Account name', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' },
    ];

    const handleBLacklist = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    height: "254px",
                    width: "653px",
                    maxWidth: "97%",
                    borderRadius: '20px',
                    boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
                },
                modalContent: (
                    <div className='modalDiv'>
                        {/* <RemoveBlacklist /> */}
                    </div>
                ),
            })
        );
    };
    // open dropdown menu
    const [action, setAction] = React.useState<null | HTMLElement>(null);
    const openAction = Boolean(action);
    const handleOpenActionMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAction(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAction(null);
    };

    const handleEdit = () => { }
    const handleRemove = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    height: "254px",
                    width: "653px",
                    maxWidth: "97%",
                    borderRadius: '20px',
                    boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
                },
                modalContent: (
                    <div className='modalDiv'>
                        <DeleteEntries />
                    </div>
                ),
            })
        );
    }
    const handleVerified = () => { }

    const data = [
        {
            id: 1,
            name: "Edit",
            func: handleEdit,
        },
        {
            id: 2,
            name: "Remove",
            func: handleRemove,
        },

        {
            id: 3,
            name: "Mark as verified",
            func: handleVerified,
        },
    ];

    const CustomerRowTab = useCallback(
        (amount, naration, acctnum, acctname, bankname, status, id) => ({
            checkbox: <Checkbox />,
            amt: (
                <p className={styles.tableBodyText}>
                    <span className={styles.capitalText}>{amount}</span>{' '}
                </p>
            ),
            naration: <p className={styles.tableBodyText}>{naration}</p>,
            acctNum: <p className={styles.tableBodyText}>{acctnum}</p>,
            acctname: <p className={styles.tableBodyText}>{acctname}</p>,
            bankname: <p className={styles.tableBodyText}>{bankname}</p>,
            status: (
                <p className={status === "verified" ? styles.verifiedText : styles.unverifiedText}>
                    {status}
                </p>
            ),
            actions: (
                <>
                    <IconButton onClick={handleOpenActionMenu}><MoreHorizOutlinedIcon /></IconButton>

                </>
            ),
            id: <p>{id}</p>,
        }),
        []
    );

    useEffect(() => {
        const newRowOptions: any[] = [];
        transactions?.map((each: TransHistory) =>
            newRowOptions.push(
                CustomerRowTab(
                    each?.amount,
                    each?.naration,
                    each?.acctnum,
                    each?.bankname,
                    each?.acctname,
                    each?.status,
                    each.id,
                )
            )
        );
        setRows(newRowOptions);
    }, [transactions, CustomerRowTab]);

    const getCustomers = async () => {
        dispatch(openLoader());
        try {
            const res = await axios.get<GetTransHistoryRes>(
                '/mockData/transactionhistory.json',
                { baseURL: '' }
            );
            console.log(res?.data);
            const { _metadata, history } = res?.data;
            console.log(res.data)
            if (history.length) {
                setTransactions(history);
                setTotalRows(_metadata?.totalcount);

            }
            dispatch(closeLoader());
        } catch (err) {
            console.log(err);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: 'Failed to get customers',
                    msgType: "error"
                })
            );
        }
    };

    useEffect(() => {
        getCustomers();
    }, [pageNumber, rowsPerPage]);




    return (
        <div className={styles.tableContainer}>
            <CustomClickTable
                columns={columns}
                rows={rows}
                totalRows={totalRows}
                changePage={changePage}
                limit={limit}
                rowsData={history}
            />
            <BeneficiaryMenu
                openBeneficiary={openAction}
                handleCloseMenu={handleCloseMenu}
                beneficiary={action}
                data={data}
                style={{ width: "10rem", borderRadius: "20px !important" }}

            />
        </div>
    )
}

export default TransferHistorytable
