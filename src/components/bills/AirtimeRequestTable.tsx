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
import {
  AirtimeRequestItem,
  GetAirtimeRequestsRes,
} from "../../types/BiilsTypes";

const useModalBtnStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1.5rem 0",
    gap: "1.25rem",
    "& .MuiButton-root": {
      fontFamily: `'Roboto', sans-serif`,
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
    fontFamily: `'Roboto', sans-serif`,
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

const AirtimeRequestTable = () => {
  const [requests, setRequests] = useState<AirtimeRequestItem[]>([]);
  const [history, setHistory] = useState<AirtimeRequestItem[]>([]);
  const [rows, setRows] = useState<AirtimeRequestItem[]>([]);
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
    id: "country" | "recipient" | "amount" | "network" | "date";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "country", label: "Country", minWidth: 100 },
    { id: "recipient", label: "Recipient", minWidth: 100 },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "network", label: "Network", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];

  const AirtimehistoryRowTab = useCallback(
    (country, recipient, amount, network, date, id) => ({
      country: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {country}
        </p>
      ),
      amount: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {amount}
        </p>
      ),
      recipient: (
        <p className={styles.tableBodyText}>
          <span>{recipient}</span>
        </p>
      ),
      network: <p className={styles.tableBodyText}>{network}</p>,
      date: (
        <p className={styles.tableBodyText}>
          {moment(date).format("MMM D YYYY")}
          <span className={styles.tableBodySpan}>
            {" "}
            {moment(date).format("h:mm A")}
          </span>
        </p>
      ),
      id: <p>{id}</p>,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    history?.map((each: AirtimeRequestItem) =>
      newRowOptions.push(
        AirtimehistoryRowTab(
          each?.country,
          each?.recipient,
          each?.amount,
          each?.network,
          each?.date,
          each?.id
        )
      )
    );
    setRows(newRowOptions);
  }, [history, AirtimehistoryRowTab]);

  const getAirtimeRequests = async () => {
    dispatch(openLoader());
    console.log();
    try {
      const res = await axios.get<GetAirtimeRequestsRes>(
        "/mockData/airtimeRequest.json",
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
    getAirtimeRequests();
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
        link="/airtime/requests"
        identifier="id"
        rowsData={history}
      />
    </div>
  );
};

export default AirtimeRequestTable;
