import React, { useState, useCallback, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./transfer.module.scss";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import OperantTable from "../../components/table/OperantTable";
import { Label, Input, Select } from "semantic-ui-react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ArrowRightIcon } from "../../assets/images/arrowRight.svg";
import CustomClickTable from '../../components/table/CustomClickTable';

import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import { Payout, PayoutRes } from "../../types/Payout";
import { getTransactionStatus } from "../../utils/status";
import { statusFormatObj } from "../../helpers";
<<<<<<< HEAD
=======
import CustomStatus from "../customs/CustomStatus";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import CustomDateFormat from "../customs/CustomDateFormat";
import CustomCurrencyFormat from "../customs/CustomCurrencyFormat";
>>>>>>> cf1b6e5573d3a5cbb6ed65d56994332ba0b85dfb

export default function TransfersTable({ payout, changePage }: { payout: PayoutRes; changePage?: (p: number) => void }) {
  interface TransactionsProps {
    amount: number;
    status: string;
    receipientName: string;
    receipientBank: string;
    receipientAcctno: number;
    date: string;
  }

  const [rows, setRows] = useState<TransactionsProps[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  const statusOption = [
    { key: 1, value: "online", text: "Online" },
    { key: 2, value: "offline", text: "Offline" },
  ];
  const paymentOption = [
    { key: 1, value: "card", text: "Card" },
    { key: 2, value: "transfer", text: "Transfer" },
  ];
  interface Column {
    id: "amount" | "status" | "receipient" | "date";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "receipient", label: "Beneficiary", minWidth: 200 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const LoanRowTab = useCallback(
<<<<<<< HEAD
    (amount: number, status: string, receipient: string, date: any, id: number) => ({
      amount: (
        <div className={Styles.amount}>
          <span>NGN {amount}</span>
        </div>
      ),
      status: (
        <Label
          className={Styles[statusFormatObj[status] || "pendingText"]}
        >
          <p style={{ borderRadius: "20px" }}> {status}</p>
        </Label>
=======
    (currency, amount, status, receipientname, receipientbank, recipientaccountnumber, date, id) => ({
      amount: (
        <CustomCurrencyFormat currency={currency} amount={amount} />
      ),
      status: (
        <CustomStatus type={status} text={status} />
>>>>>>> cf1b6e5573d3a5cbb6ed65d56994332ba0b85dfb
      ),
      receipient: <p>{`${receipientname} | ${receipientbank} | ${recipientaccountnumber}`}</p>,
      date: (
<<<<<<< HEAD
        <div className={Styles.date}>
          <p>{date.format}{date.time}</p>
          <span>{date}</span>
        </div>
=======
        <CustomDateFormat date={date} time={date} />
>>>>>>> cf1b6e5573d3a5cbb6ed65d56994332ba0b85dfb
      ),
      id
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    payout?.payouts?.map((each: Payout) =>
      newRowOptions.push(
<<<<<<< HEAD
        LoanRowTab(each.amount, getTransactionStatus(each?.responsecode!), each?.recipientname!, each.timein, each.id)
=======
        LoanRowTab(each?.currency, each?.amount, getTransactionStatus(each?.responsecode!), each?.recipientname, each?.recipientbank, each?.recipientaccountnumber, each?.timein, each?.id)
>>>>>>> cf1b6e5573d3a5cbb6ed65d56994332ba0b85dfb
      )
    );
    setRows(newRowOptions);
  }, [payout, LoanRowTab]);

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

  console.log({ payout });

  return (
    <div className={Styles.container}>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        classes={{ paper: classes.container }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={Styles.menuContainer}>
          <div className={Styles.menuHeader}>
            <h2>Filters</h2>
          </div>
          <div className={Styles.menuContent}>
            <div className={Styles.dateRange}>
              <h2>Date range</h2>
              <div>
                <Button>Today</Button>
                <Button>Last 7 days</Button>
                <Button>30 days</Button>
                <Button>1 year</Button>
              </div>
            </div>
            <div className={Styles.dateRange}>
              <h2>Custom date range</h2>
              <div className={Styles.dateInputRange}>
                <Input type="date" placeholder="Start date" />
                <ArrowRightIcon />
                <Input type="date" placeholder="End date" />
              </div>
            </div>
            <div className={Styles.dateRange}>
              <h2>Customer email</h2>
              <div className={Styles.fluid}>
                <Input type="email" placeholder="Enter business name" />
              </div>
            </div>
            <div className={Styles.dateRange}>
              <h2>Status</h2>
              <div className={Styles.fluid}>
                <Select placeholder="Choose status" options={statusOption} />
              </div>
            </div>
            <div className={Styles.dateRange}>
              <h2>Payment type</h2>
              <div className={Styles.fluid}>
                <Select
                  placeholder="Select payment type"
                  options={paymentOption}
                />
              </div>
            </div>
          </div>
          <div className={Styles.menuFooter}>
            <Button>Clear filter</Button>
            <Button>Apply filter</Button>
          </div>
        </div>
      </Menu>
      <div className={Styles.wrapper}>
        <CustomClickTable
          columns={columns}
          rows={rows}
          totalRows={payout?._metadata?.totalcount || 0}
          changePage={changePage!}
          limit={limit}
          // reset={reset}
          link="/payout"
          clickable
          identifier="id"
          rowsData={payout?.payouts || []}
        />
      </div>
    </div>
  );
}

