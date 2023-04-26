import NavBar from "../../components/navbar/NavBar";
// import Styles from "./transaction.module.scss";
import styles from "./BalanceItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link, useParams } from "react-router-dom";
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
import {
  getSettlementTransactions,
  getSingleSettlement,
} from "../../services/settlement";
import { Settlement } from "../../types/Settlement";
import { getSettlementStatus, getTransactionStatus } from "../../utils/status";
import { capitalize } from "lodash";
import { getBankName } from "../../utils";
import { Transaction } from "../../types/Transaction";
import { statusFormatObj } from "../../helpers";

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

  const [txns, setTxns] = useState<Transaction[]>([]);
  const [rows, setRows] = useState<Transaction[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settlement, setSettlement] = useState<Settlement | null>(null);
  const open = Boolean(anchorEl);
  console.log(settlement, "settlement");

  const { slug } = useParams<{ slug: string }>();

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
    id: "amt" | "status" | "txnType" | "added";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "txnType", label: "Transaction Type", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const TransactionRowTab = useCallback(
    (amt, status, txnType, added) => ({
      amt: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {amt}
        </p>
      ),
      status: (
        <p
          className={
            styles[
            statusFormatObj[getTransactionStatus(status)!] || "pendingText"
            ]
          }
        >
          {getTransactionStatus(status)}
        </p>
      ),
      txnType: <p className={styles.tableBodyCapital}>{txnType}</p>,
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
    txns?.map((each: Transaction) =>
      newRowOptions.push(
        TransactionRowTab(
          each?.amount,
          each?.responsecode,
          each?.chargetype,
          each?.transactiontype
        )
      )
    );
    setRows(newRowOptions);
  }, [txns, TransactionRowTab]);

  useEffect(() => {
    try {
      dispatch(openLoader());
      (async () => {
        const res = await getSettlementTransactions(slug);
        if (res?.transactions?.length) {
          setTxns(res?.transactions || []);
          setTotalRows(res?._metadata?.totalcount);
        }
        dispatch(closeLoader());
      })();
    } catch (error) {
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
  }, [pageNumber, rowsPerPage]);

  useEffect(() => {
    if (slug) {
      try {
        dispatch(openLoader());
        (async () => {
          const res = await getSingleSettlement(slug);
          setSettlement(res?.settlement || {});
          dispatch(closeLoader());
        })();
      } catch (error) {
        dispatch(closeLoader());
        dispatch(
          openToastAndSetContent({
            toastContent: "Failed to get settlement",
            toastStyles: {
              backgroundColor: "red",
            },
          })
        );
      }
    }
  }, [slug]);

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
        </div>

        <div className={styles.sectionThree} style={{ marginBottom: "30px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}>
              <p style={{ marginRight: "10px" }}>NGN {settlement?.chargeamount || 0}</p>
              <p
                className={
                  styles[
                  statusFormatObj[
                  getSettlementStatus(settlement?.responsecode!)!
                  ] || "pendingText"
                  ]
                }
              >
                {capitalize(
                  getSettlementStatus(settlement?.responsecode || "")
                )}
              </p>
            </div>{" "}
          </div>
          <div>
            <div>
              <p>Date / Time </p>
              <p>{settlement?.settlementdate || ''}</p>
            </div>
            <div>
              <p>Settlement Destination</p>
              <p>{`${settlement?.settlementaccountname || ''} | ${getBankName(settlement?.settlementbankcode || "")} | ${settlement?.settlementaccountnumber || ''}`}</p>
            </div>
            <div>
              <p>Chargebacks</p>
              <p>None</p>
            </div>
            <div>
              <p>Refunds</p>
              <p>None</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <div>
            <h3>Payment information</h3>
          </div>
          <div>
            <div>
              <p>Payment reference</p>
              <p>{settlement?.settlementid || ""}</p>
            </div>
            <div>
              <p>Transaction Fee</p>
              <p>NGN{settlement?.fee || 0}</p>
            </div>
            <div>
              <p>Country/Region</p>
              <p>{settlement?.settlementcountry || ''}</p>
            </div>
            <div>
              <p>Bank name</p>
              <p>{getBankName(settlement?.settlementbankcode || "")}</p>
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
