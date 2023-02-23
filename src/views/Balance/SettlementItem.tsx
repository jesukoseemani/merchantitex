import NavBar from "../../components/navbar/NavBar";
import styles from "./BalanceItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import {
  GetTransactionsRes,
  TransactionItem,
} from "../../types/MockTransactionTypes";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import axios from "axios";
import CustomClickTable from "../../components/table/CustomClickTable";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

const useTableStyles = makeStyles({
  root: {
    marginTop: "1rem",
    "& .MuiTableRow-head": {
      fontSize: ".875rem",
      padding: "1rem",
      backgroundColor: "#F4F6F8",
    },
    "& .MuiTableCell-head": {
      fontSize: ".875rem",
      color: "#333",
      fontWeight: "500",
      textTransform: "capitalize",
    },
    "& .MuiTableCell-root": {
      borderBottom: "none",
    },
    "& .MuiTableCell-body": {
      fontFamily: `'Avenir', san-serif`,
      fontWeight: "400",
      fontSize: ".875rem",
      color: "#333",
      borderBottom: "1px solid #E0E0E0",
      cursor: "pointer",
    },
    "& .darkText": {
      color: "#333",
      fontSize: ".875rem",
      fontWeight: "700",
    },
    "& .redText": {
      color: "#EB5757",
      fontSize: ".875rem",
      fontWeight: "700",
    },
    "& .greenText": {
      color: "#219653",
      fontSize: ".875rem",
      fontWeight: "700",
    },
    "& .lightText": {
      color: "#828282",
      fontSize: ".875rem",
    },
  },
});

const SettlementItem = () => {
  const tableClasses = useTableStyles();
  const dispatch = useDispatch();

  const [txns, setTxns] = useState<TransactionItem[]>([]);
  const [rows, setRows] = useState<TransactionItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
    id: "amt" | "status" | "txnType" | "card" | "bankName" | "added";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "txnType", label: "Transaction Type", minWidth: 100 },
    { id: "card", label: "Card", minWidth: 100 },
    { id: "bankName", label: "Bank name", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const statusFormatObj: { [key: string]: string } = {
    successful: "wonText",
    error: "lostText",
    pending: "pendingText",
  };

  const TransactionRowTab = useCallback(
    (amt, status, txnType, card, bankName, added) => ({
      amt: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {amt}
        </p>
      ),
      status: (
        <p className={styles[statusFormatObj[status] || "pendingText"]}>
          {status}
        </p>
      ),
      txnType: <p className={styles.tableBodyCapital}>{txnType}</p>,
      card: <p className={styles.tableBodyText}>{card}</p>,
      bankName: <p className={styles.tableBodyText}>{bankName}</p>,
      added: (
        <p className={styles.tableBodyText}>
          {moment(added).format("MMM D YYYY")}
          <span className={styles.tableBodySpan}>
            {" "}
            {moment(added).format("h:mm A")}
          </span>
        </p>
      ),
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    txns?.map((each: TransactionItem) =>
      newRowOptions.push(
        TransactionRowTab(
          each?.amt,
          each?.status,
          each?.txnType,
          each?.card,
          each?.bankName,
          each?.added
        )
      )
    );
    setRows(newRowOptions);
  }, [txns, TransactionRowTab]);

  const getTransactions = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetTransactionsRes>(
        "/mockData/transactions.json",
        { baseURL: "" }
      );
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
          toastContent: "Failed to get transactions",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  };

  useEffect(() => {
    getTransactions();
  }, [pageNumber, rowsPerPage]);

  return (

    <div className={styles.container}>

      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to="/balance/settlements">
              <div>
                <ArrowLeftIcon />
                <p>Back to settlements</p>
              </div>
            </Link>
          </div>
          <div>
            <p>NGN 33,983.92</p>
            <p>Successful</p>
          </div>
        </div>
        <hr />
        <div className={styles.sectionTwo}>
          <div>
            <p>Date paid</p>
            <p>Jul 18, 2018 2:21 PM</p>
          </div>
          <div></div>
          <div>
            <p>Settlement reference</p>
            <p>ITEX-ab87dbsdbv989</p>
          </div>
          <div></div>
          <div>
            <p>Fees</p>
            <p>NGN0.0</p>
          </div>
          <div></div>
          <div>
            <p>Reserve percentage</p>
            <p>10%</p>
          </div>
          <div></div>
          <div>
            <p>Bank account details</p>
            <p>123232344-GTBank</p>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <div>
            <h3>Settlement information</h3>
          </div>
          <div>
            <div>
              <p>ITEX fees</p>
              <p>iTEX-abcsdsjdosu</p>
            </div>
            <div>
              <p>Refunds</p>
              <p>NGN0.0</p>
            </div>
            <div>
              <p>ChargeBacks</p>
              <p>NGN0.0</p>
            </div>
            <div>
              <p>Bank name</p>
              <p>GTBank</p>
            </div>
            <div>
              <p>Rolling reserve</p>
              <p>NGN0.0</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionFour}>
          <div>
            <h3>Settlement transactions</h3>
          </div>
          <div className={styles.tableContainer}>
            <CustomClickTable
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
              rowsData={txns}
            />
          </div>
        </div>
      </div>
    </div>


  );
};

export default SettlementItem;
