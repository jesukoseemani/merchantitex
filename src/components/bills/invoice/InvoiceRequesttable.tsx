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

import { Box, Button, Stack } from '@mui/material'
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions'
import CreateInvoice from './CreateInvoice'
import CustomStatus from '../../customs/CustomStatus';
import FormatToCurrency from '../../../helpers/NumberToCurrency';
import CustomCurrencyFormat from '../../customs/CustomCurrencyFormat';
import CustomDateFormat from '../../customs/CustomDateFormat';



// const useModalBtnStyles = makeStyles({
//     root: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         padding: '1rem 1.5rem 0',
//         gap: '1.25rem',
//         '& .MuiButton-root': {
//             fontFamily: `'Avenir', sans-serif`,
//             fontWeight: '500',
//             fontSize: '.875rem',
//             color: 'black',
//             background: '#E0E0E0',
//             borderRadius: '3px',
//             textTransform: 'none',
//         },
//         '& .MuiButton-root:nth-child(2)': {
//             color: 'white',
//             background: '#27AE60',
//         },
//     },
// });

// const useBtnStyles = makeStyles({
//     root: {
//         fontFamily: `'Avenir', sans-serif`,
//         '& .MuiButtonBase-root': {
//             borderRadius: '.25rem',
//             padding: '.5rem 1rem',
//             textTransform: 'none',
//             fontSize: '.875rem',
//             fontWeight: '400',
//             alignItem: 'center',
//             display: 'flex',
//             backgroundColor: '#27AE60',
//             color: '#FFF',
//             gap: '.5rem',
//         },
//         '& svg': {
//             fontSize: '1rem',
//             marginLeft: '.25rem',
//         },
//     },
// });

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
        { id: 'status', label: 'Payment Status', minWidth: 140 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        { id: 'name', label: 'Customer Name', minWidth: 100 },
        { id: 'email', label: 'Customer Email', minWidth: 100 },
        { id: 'date', label: 'Created Date', minWidth: 200 },
    ];


    const InvoiceHistoryRowTab = useCallback(
        (invoiceName, status, currency, totalAmount, firstname, lastname, email, createdAt, id) => ({
            title: (
                <p className={styles.tableBodyText}>
                    <span className={styles.tableBodySpan}> </span>
                    {invoiceName}
                </p>
            ),
            amount: (<CustomCurrencyFormat amount={totalAmount} currency={currency} />),

            status: (<CustomStatus type={status} text={status} />
            ),
            name: <p className={styles.tableBodyText}>{`${firstname} ${lastname}`}</p>,
            email: <p className={styles.tableBodyText}>{email}</p>,
            date: (
                <CustomDateFormat time={createdAt} date={createdAt} />
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
                    each?.invoiceName,
                    each?.status,
                    each?.currency,
                    each?.totalAmount,
                    each?.customer.firstname,
                    each?.customer.lastname,
                    each?.customer.email,
                    each?.createdAt,
                    each?.id,

                )
            )
        );
        setRows(newRowOptions);
    }, [history, InvoiceHistoryRowTab]);

    const getInvoiceRequest = async () => {
        dispatch(openLoader());

        try {
            const { data } = await axios.get<any>("/v1/payment/merchantinvoices")

            console.log(data);

            if (data?.invoices) {
                // const { invoices, _metadata } = invoiceList;
                setHistory(data?.invoices);
                setTotalRows(data?._metadata?.totalcount);
            }
            dispatch(closeLoader());
        } catch (error: any) {
            dispatch(closeLoader());
            const { message } = error.response.data;
            dispatch(
                dispatch(
                    openToastAndSetContent({
                        toastContent: message,
                        toastStyles: {
                            backgroundColor: "red",
                        },
                    })
                )
            );
        } finally {
            dispatch(closeLoader());
        }
    };

    useEffect(() => {
        getInvoiceRequest();
    }, [pageNumber, rowsPerPage]);





    // create invoice
    const handleCreateInvoice = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "0.5rem",
                    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
                    width: "753px",
                    maxWidth: "100%"
                },
                modalTitle: "Create an Invoice",
                modalContent: (
                    <div className="modalDiv">
                        <CreateInvoice fetchInvoice={getInvoiceRequest} />
                    </div>
                ),
            })
        );
    }
    return (
        <Box sx={{ marginTop: "1.7rem" }}>
            <Stack direction={"row"} justifyContent="space-between" flexWrap={"wrap"} alignItems={"center"} spacing={2}>
                <h2 className={styles.headerTitle}>{history?.length} Invoices Created</h2>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginTop: { xs: "30px" } }} >
                    <button className={styles.outlinedBtn}>All invoice</button>
                    <button className={styles.containedBtn} onClick={handleCreateInvoice}>+ Create invoice</button>
                </Box>
            </Stack>

            <Box sx={{ marginTop: "1rem" }}> <CustomClickTable
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
            </Box>
        </Box>

    );
};


export default InvoiceRequesttable
