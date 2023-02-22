import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import CustomClickTable from '../../components/table/CustomClickTable';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { GetTransactionsRes } from '../../types/CustomerTypes';
import { GetTransactionSettltementItemRes, TransactionItem, TransactionSettltementItem } from '../../types/MockTransactionTypes';
import { GetSettSubAcctsRes, GetSubAcctsRes, SubAcctItem } from '../../types/SubaccountTypes';
import { useTabBtnStyles } from '../PointOfSale/PointOfSale';
import styles from './SubaccountsItem.module.scss';
const SettlementAccount = () => {

    const btnClasses = useTabBtnStyles();

    const location = useLocation<{ rowData: string }>();
    const history = useHistory();
    const dispatch = useDispatch();

    const { slug } = useParams<{ slug: string }>();

    if (!location.state.rowData) {
        history.replace('/subaccounts');
    }

    const { rowData } = location.state;

    const formattedRowData: SubAcctItem = JSON.parse(rowData);
    console.log(formattedRowData)

    // const { de, details, acctId, acctShare, txnShare } = formattedRowData;

    const [isOverview, setIsOverview] = useState<boolean>(true);
    const [earned, setEarned] = useState<string>('0');
    const [paid, setPaid] = useState<string>('0');
    const [value, setValue] = useState<string>('0');

    const [txns, setTxns] = useState<TransactionSettltementItem[]>([]);
    const [rows, setRows] = useState<TransactionSettltementItem[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const limit = (value: number) => {
        setRowsPerPage(value);
    };

    interface Column {
        id: 'amt' | 'status' | 'destination' | 'added';
        label: any;
        minWidth?: number;
        align?: 'right' | 'left' | 'center';
    }
    const columns: Column[] = [
        { id: 'amt', label: 'Amount', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'destination', label: 'Destination', minWidth: 200 },

        { id: 'added', label: 'Date', minWidth: 100, align: "right" },
    ];

    const statusFormatObj: { [key: string]: string } = {
        successful: 'wonText',
        error: 'lostText',
        pending: 'pendingText',
    };

    const TransactionRowTab = useCallback(
        (amt, status, destination, id, added) => ({
            amt: (
                <p className={styles.tableBodyText}>
                    <span className={styles.tableBodySpan}>NGN </span>
                    {amt}
                </p>
            ),
            status: (
                <p style={{ borderRadius: "20px" }} className={styles[statusFormatObj[status] || 'pendingText']}>
                    {status}
                </p>
            ),
            destination: <p className={styles.tableBodyCapital}>{destination}</p>,

            added: (
                <p className={styles.tableBodyText}>
                    {moment(added).format('MMM D YYYY')}
                    <span className={styles.tableBodySpan}>
                        {' '}
                        {moment(added).format('h:mm A')}
                    </span>
                </p>
            ),
        }),
        []
    );

    useEffect(() => {
        const newRowOptions: any[] = [];
        txns?.map((each: TransactionSettltementItem) =>
            newRowOptions.push(
                TransactionRowTab(
                    each?.amt,
                    each?.status,
                    each?.destination,
                    each?.id,
                    each?.added
                )
            )
        );
        setRows(newRowOptions);
    }, [txns, TransactionRowTab]);

    const getTransactions = async () => {
        dispatch(openLoader());
        try {
            const res = await axios.get<GetTransactionSettltementItemRes>(
                '/mockData/subaccountsub.json',
                { baseURL: '' }
            );
            console.log(res)
            const { transactions, _metadata } = res?.data;
            if (transactions.length) {
                setTxns(transactions);
                setTotalRows(_metadata?.totalcount);
            }
            dispatch(closeLoader());
        } catch (err) {
            console.log(err);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: 'Failed to get transactions',
                    toastStyles: {
                        backgroundColor: 'red',
                    },
                })
            );
        }
    };

    useEffect(() => {
        getTransactions();
    }, [pageNumber, rowsPerPage]);

    const getSubAccts = async () => {
        dispatch(openLoader());
        try {
            const res = await axios.get<GetSettSubAcctsRes>(
                '/mockData/subaccountsub.json',
                { baseURL: '' }
            );
            console.log(res.data)
            const { transactions, earned, paid, value } = res?.data;
            if (transactions?.length) {
                setPaid(paid);
                setEarned(earned);
                setValue(value);
            }
            dispatch(closeLoader());
        } catch (err) {
            console.log(err);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: 'Failed to get accounts',
                    toastStyles: {
                        backgroundColor: 'red',
                    },
                })
            );
        }
    };

    useEffect(() => {
        getSubAccts();
    }, []);

    return (
        <div>
            <CustomClickTable
                columns={columns}
                rows={rows}
                totalRows={totalRows}
                changePage={changePage}
                limit={limit}
            />
        </div>
    )
}

export default SettlementAccount