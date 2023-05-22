import React from "react";
import styles from "./BalanceItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Box, IconButton } from "@mui/material";
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
import {
  getSettlementTransactions,
  getSingleSettlement,
} from "../../services/settlement";
import { Settlement } from "../../types/Settlement";
import { capitalize } from "lodash";
import { getBankName } from "../../utils";
import { Transaction } from "../../types/Transaction";
import CustomStatus from "../../components/customs/CustomStatus";
import FormatToCurrency from '../../helpers/NumberToCurrency';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import Navigation from "../../components/navbar/Navigation";



const SettlementItem = () => {
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
    id: "amt" | "status" | "email" | "txnType" | "added";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "email", label: "Email address", minWidth: 100 },
    { id: "txnType", label: "Transaction Type", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const TransactionRowTab = useCallback(
    (amount, responsemessage, customer, txnType, added, chargetype) => ({
      amt: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {FormatToCurrency(amount)}
        </p>
      ),
      status: (

        <CustomStatus text={responsemessage} type={responsemessage} />
      ),
      email: <p>{customer?.email}</p>,
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
          each.responsemessage,
          each.customer,
          each?.chargetype,
          each?.transactiontype,
          each?.responsecode
        )
      )
    );
    setRows(newRowOptions);
  }, [txns, TransactionRowTab]);

  useEffect(() => {
    try {
      (async () => {
        dispatch(openLoader());
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
          msgType: "success"
        })
      );
    }
  }, [pageNumber, rowsPerPage]);

  useEffect(() => {
    if (slug) {
      try {
        (async () => {
          dispatch(openLoader());
          const res = await getSingleSettlement(slug);
          setSettlement(res?.settlement || {});
          dispatch(closeLoader());
        })();
      } catch (error) {
        dispatch(closeLoader());
        dispatch(
          openToastAndSetContent({
            toastContent: "Failed to get settlement",
            msgType: "error"
          })
        );
      }
    }
  }, [slug]);

  return (
    <Navigation title="Settlements">

      <div className={styles.container}>
        <div className={styles.pageWrapper}>
          <div className={styles.sectionOne}>
            <div>
              <Link to="/balance/settlements" style={{ textDecoration: "none" }}>
                <div>
                  <ArrowLeftIcon />
                  <p>Back to settlements</p>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.sectionThree}>
            <div className={styles.sectionThree_header}>
              <h2>NGN {FormatToCurrency(Number(settlement?.chargeamount)) || 0}</h2>

              <CustomStatus text={capitalize(
                (settlement?.responsemessage || ""))} type={capitalize((settlement?.responsemessage || ""))} />

            </div>

            <div className={styles.sectionThreeBody}>
              <div>
                <span>Date / Time </span>
                <p>{settlement?.settlementdate || ''}</p>
              </div>
              <div>
                <span>Settlement Destination</span>
                <p>{`${settlement?.settlementaccountname || ''} | ${getBankName(settlement?.settlementbankcode || "")} | ${settlement?.settlementaccountnumber || ''}`}</p>
              </div>
              <div>
                <span>Chargebacks</span>
                <p>None</p>
              </div>
              <div>
                <span>Refunds</span>
                <p>None</p>
              </div>
            </div>
          </div>


          <div className={styles.sectionFour_Payment}>
            <div className={styles.sectionFour_payment_header}>
              <h2>Payment information</h2>
            </div>
            <div className={styles.sectionFour_payment_body}>
              <div>
                <span>Payment reference</span>
                <p>{settlement?.settlementid || ""}
                  <CopyToClipboard text={String(settlement?.settlementid)}>
                    <IconButton>
                      <CopyIcon />
                    </IconButton>

                  </CopyToClipboard></p>
              </div>
              <div>
                <span>Transaction Fee</span>
                <p>NGN{FormatToCurrency(Number(settlement?.fee)) || 0}</p>
              </div>
              <div>
                <span>Country/Region</span>
                <p>{settlement?.settlementcountry || ''}</p>
              </div>
              <div>
                <span>Bank name</span>
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
    </Navigation>
  );
};

export default SettlementItem;
