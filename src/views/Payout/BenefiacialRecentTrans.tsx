import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import Styles from "./beneficiaries.module.scss";
import { beneficiaryRecentRequestItem, beneficiaryRequestItem, getBeneficiartRecentRes, getBeneficiaryRes } from "../../types/beneficiaryTypes";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import CustomClickTable from "../../components/table/CustomClickTable";

function BenefiacialRecentTrans() {

    const dispatch = useDispatch()

    const [history, setHistory] = useState<beneficiaryRecentRequestItem[]>([]);
    const [rows, setRows] = useState<beneficiaryRecentRequestItem[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const limit = (value: number) => {
        setRowsPerPage(value);
    };

    useEffect(() => {
        setTotalRows(history.length);
    }, []);


    interface Column {
        id: "amount" | "status" | "bankName" | "bankAccount" | "date";
        label?: any;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "amount", label: "Amount", minWidth: 150 },
        { id: "status", label: "Status", minWidth: 150 },
        { id: "bankName", label: "Bank name", minWidth: 150 },
        { id: "bankAccount", label: "Bank account", minWidth: 150 },
        { id: "date", label: "Date", minWidth: 200 },
    ];
    const LoanRowTab = useCallback(
        (amount, status, bankName, acctNo, date, id) => ({
            amount,
            status: (
                <span
                    className={status === "Successful" ? Styles.status : Styles.pending}
                >
                    {" "}
                    {status}
                </span>
            ),
            bankName: bankName,
            bankAccount: acctNo,
            date,
            id: <p>{id}</p>

        }),
        []
    );
    useEffect(() => {
        const newRowOptions: any[] = [];
        history?.map((each: beneficiaryRecentRequestItem) =>
            newRowOptions.push(
                LoanRowTab(each.amount, each.status, each.bankName, each.acctNo, each.date, each.id)
            )
        );
        setRows(newRowOptions);
    }, [history, LoanRowTab]);
    const useStyles = makeStyles({
        container: {
            width: "407px",
            height: "auto",
            minHeight: "571px",
            background: "#ffffff",
            border: "1px solid #d5dae1",
            boxShadow: " 0px 10px 10px rgba(6, 44, 82, 0.92)",
            borderRadius: "3px",
        },
    });
    const classes = useStyles();






    const GetPendingRequest = async () => {
        dispatch(openLoader());

        try {
            const res = await axios.get<getBeneficiartRecentRes>(
                '/mockData/benefiaryrecentrequest.json',
                { baseURL: '' }
            );
            const { history, _metadata } = res?.data;
            console.log(history);
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
                    msgType: "error"
                })
            );
        }
    };

    useEffect(() => {
        GetPendingRequest();
    }, [pageNumber, rowsPerPage]);



    return (


        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>


            <div className={Styles.tableContainer}>
                <div className={Styles.wrapper}>
                    <CustomClickTable
                        columns={columns}
                        rows={rows}
                        totalRows={totalRows}
                        changePage={changePage}
                        limit={limit}

                        rowsData={history}
                    />
                </div>
            </div>


        </div>

    );
}


export default BenefiacialRecentTrans