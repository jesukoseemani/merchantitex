import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { AirtimeRequestItem, BillInvoiceRequestItem, GetAirtimeRequestsRes, GetInvoiceRequestsRes } from '../../../types/BiilsTypes';
import CustomClickTable from '../../table/CustomClickTable';
import styles from "./style.module.scss"

const useModalBtnStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem 1.5rem 0',
        gap: '1.25rem',
        '& .MuiButton-root': {
            fontFamily: `'Avenir', sans-serif`,
            fontWeight: '500',
            fontSize: '.875rem',
            color: 'black',
            background: '#E0E0E0',
            borderRadius: '3px',
            textTransform: 'none',
        },
        '& .MuiButton-root:nth-child(2)': {
            color: 'white',
            background: '#27AE60',
        },
    },
});

const useBtnStyles = makeStyles({
    root: {
        fontFamily: `'Avenir', sans-serif`,
        '& .MuiButtonBase-root': {
            borderRadius: '.25rem',
            padding: '.5rem 1rem',
            textTransform: 'none',
            fontSize: '.875rem',
            fontWeight: '400',
            alignItem: 'center',
            display: 'flex',
            backgroundColor: '#27AE60',
            color: '#FFF',
            gap: '.5rem',
        },
        '& svg': {
            fontSize: '1rem',
            marginLeft: '.25rem',
        },
    },
});

const InvoiceRequesttable = () => {
    const [requests, setRequests] = useState<BillInvoiceRequestItem[]>([]);
    const [history, setHistory] = useState<BillInvoiceRequestItem[]>([]);
    const [rows, setRows] = useState<BillInvoiceRequestItem[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

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
        id: 'title' | 'status' | 'amount' | 'name' | "email" | 'date';
        label: any;
        minWidth?: number;
        align?: 'right' | 'left' | 'center';
    }
    const columns: Column[] = [
        { id: 'title', label: 'Invoice Title', minWidth: 100 },
        { id: 'status', label: 'Payment Status', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        { id: 'name', label: 'Customer Name', minWidth: 100 },
        { id: 'email', label: 'Customer Email', minWidth: 100 },
        { id: 'date', label: 'Created Date', minWidth: 100 },
    ];


    const InvoiceHistoryRowTab = useCallback(
        (title, status, amount, name, added, email, id) => ({
            title: (
                <p className={styles.tableBodyText}>
                    <span className={styles.tableBodySpan}> </span>
                    {title}
                </p>
            ),
            amount: (
                <p className={styles.tableBodyText}>
                    <span className={styles.tableBodySpan}>NGN </span>
                    {amount}
                </p>
            ),
            status: (
                <span
                    className={status === "Successful" ? styles.status : styles.pending}
                >
                    {" "}
                    {status}
                </span>
            ),
            name: <p className={styles.tableBodyText}>{name}</p>,
            email: <p className={styles.tableBodyText}>{email}</p>,
            date: (
                <p className={styles.tableBodyText}>
                    {moment(added).format('MMM D YYYY')}
                    <span className={styles.tableBodySpan}>
                        {' '}
                        {moment(added).format('h:mm A')}
                    </span>
                </p>
            ),
            id: <p>{id}</p>,
        }),
        []
    );
    useEffect(() => {
        const newRowOptions: any[] = [];
        history?.map((each: BillInvoiceRequestItem) =>
            newRowOptions.push(
                InvoiceHistoryRowTab(
                    each?.title,
                    each?.status,
                    each?.amount,
                    each?.name,
                    each?.added,
                    each?.email,
                    each?.id,

                )
            )
        );
        setRows(newRowOptions);
    }, [history, InvoiceHistoryRowTab]);

    const getInvoiceRequest = async () => {
        dispatch(openLoader());
        console.log();
        try {
            const res = await axios.get<GetInvoiceRequestsRes>(
                '/mockData/invoicerequests.json',
                { baseURL: '' }
            );
            const { history, _metadata } = res?.data;
            console.log(res?.data);
            if (history.length) {
                setHistory(history);
                setTotalRows(_metadata?.totalcount);
            }
            dispatch(closeLoader());
        } catch (err) {
            console.log(err);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: 'Failed to get items',
                    toastStyles: {
                        backgroundColor: 'red',
                    },
                })
            );
        }
    };

    useEffect(() => {
        getInvoiceRequest();
    }, [pageNumber, rowsPerPage]);
    console.log(history)
    return (
        <div>
            <CustomClickTable
                columns={columns}
                rows={rows}
                totalRows={totalRows}
                changePage={changePage}
                limit={limit}
                clickable
                link='/bills/invoice/details'
                identifier='id'
                rowsData={history}
            />


        </div>
    );
};


export default InvoiceRequesttable
