import axios from "axios";
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
    closeLoader,
    openLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import CustomClickTable from "../table/CustomClickTable";
import { makeStyles } from "@material-ui/styles";
import styles from "../../views/PointOfSale/PointOfSale.module.scss";
import moment from "moment";
import { BillRequestItem, GetBillRequestsRes } from "../../types/BiilsTypes";

const useModalBtnStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "1rem 1.5rem 0",
        gap: "1.25rem",
        "& .MuiButton-root": {
            fontFamily: `'Avenir', sans-serif`,
            fontWeight: "500",
            fontSize: ".875rem",
            color: "black",
            background: "#E0E0E0",
            borderRadius: "3px",
            textTransform: "none",
        },
        "& .MuiButton-root:nth-child(2)": {
            color: "white",
            background: "#27AE60",
        },
    },
});

const useBtnStyles = makeStyles({
    root: {
        fontFamily: `'Avenir', sans-serif`,
        "& .MuiButtonBase-root": {
            borderRadius: ".25rem",
            padding: ".5rem 1rem",
            textTransform: "none",
            fontSize: ".875rem",
            fontWeight: "400",
            alignItem: "center",
            display: "flex",
            backgroundColor: "#27AE60",
            color: "#FFF",
            gap: ".5rem",
        },
        "& svg": {
            fontSize: "1rem",
            marginLeft: ".25rem",
        },
    },
});

const BillEntryReqtable = () => {
    const [history, setHistory] = useState<BillRequestItem[]>([]);
    const [rows, setRows] = useState<BillRequestItem[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
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
        id: "country" | "bill" | "billId" | "packages" | "amount";
        label: any;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "country", label: "Country", minWidth: 100 },
        { id: "bill", label: "Bill", minWidth: 100 },
        { id: "billId", label: "Bill Payment ID", minWidth: 100 },
        { id: "packages", label: "Bill Packages", minWidth: 100 },
        { id: "amount", label: "Amount", minWidth: 100, align: "right" },

    ];

    const billhistoryRowTab = useCallback(
        (country, bill, amount, billId, packages, id) => ({
            country: (
                <p className={styles.tableBodyText}>
                    <span className={styles.tableBodySpan}> </span>
                    {country}
                </p>
            ),
            bill: (
                <p className={styles.tableBodyText}>
                    <span>{bill}</span>
                </p>
            ),
            billId: (
                <p className={styles.tableBodyText}>
                    <span>{billId}</span>
                </p>
            ),
            amount: (
                <p className={styles.tableBodyText}>
                    <span className={styles.tableBodySpan}>NGN </span>
                    {amount}
                </p>
            ),
            packages: <p className={styles.tableBodyText}>{packages}</p>,

            id: <p>{id}</p>,
        }),
        []
    );
    useEffect(() => {
        const newRowOptions: any[] = [];
        history?.map((each: BillRequestItem) =>
            newRowOptions.push(
                billhistoryRowTab(
                    each?.country,
                    each?.bill,
                    each?.amount,
                    each?.billId,
                    each?.packages,
                    each?.id
                )
            )
        );
        setRows(newRowOptions);
    }, [history, billhistoryRowTab]);

    const getBillRequests = async () => {
        dispatch(openLoader());
        console.log();
        try {
            const res = await axios.get<GetBillRequestsRes>(
                "/mockData/billsRequest.json",
                { baseURL: "" }
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
                    toastContent: "Failed to get items",
                    toastStyles: {
                        backgroundColor: "red",
                    },
                })
            );
        }
    };

    useEffect(() => {
        getBillRequests();
    }, [pageNumber, rowsPerPage]);
    return (
        <div>
            <CustomClickTable
                columns={columns}
                rows={rows}
                totalRows={totalRows}
                changePage={changePage}
                limit={limit}
                clickable
                link="/bill/requests"
                identifier="id"
                rowsData={history}
            />
        </div>
    );
};

export default BillEntryReqtable;
