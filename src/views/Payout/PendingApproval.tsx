import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Checkbox, Icon, Label, Dropdown } from "semantic-ui-react";
import NavBar from "../../components/navbar/NavBar";
import OperantTable from "../../components/table/OperantTable";
import Styles from "./pending.module.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function PendingApproval() {
  interface TransactionsProps {
    amount: number;
    narration: string;
    receipient: string;
    date: {
      format: string;
      time: string;
    };
  }
  const status = [
    "Successful",
    "Pending",
    "Error",
    "Successful",
    "Successful",
    "Error",
  ];
  const source = new Array(10).fill({
    amount: 20000,
    narration: "For transportation",
    receipient: "developer@gmail.com",
    date: {
      format: "Aug 13 2020",
      time: "2:21 PM",
    },
  });
  const [transactions, setTransactions] = useState<TransactionsProps[]>(source);
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
  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  useEffect(() => {
    setTotalRows(transactions.length);
  }, []);

  const statusOption = [
    { key: 1, value: "online", text: "Online" },
    { key: 2, value: "offline", text: "Offline" },
  ];
  const paymentOption = [
    { key: 1, value: "card", text: "Card" },
    { key: 2, value: "transfer", text: "Transfer" },
  ];
  interface Column {
    id: "checkbox" | "amount" | "narration" | "receipient" | "date" | "action";
    label?: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    {
      id: "checkbox",
      label: <Checkbox />,
    },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "narration", label: "Narration", minWidth: 100 },
    { id: "receipient", label: "Receipient", minWidth: 200 },
    { id: "date", label: "Date", minWidth: 100 },
    { id: "action", label: "" },
  ];
  const LoanRowTab = useCallback(
    (amount: number, narration: string, receipient: string, date: any) => ({
      checkbox: <Checkbox />,
      amount: (
        <div className={Styles.amount}>
          <span>NGN</span>
          <h2>{amount}</h2>
        </div>
      ),
      narration,
      receipient,
      date: (
        <div className={Styles.date}>
          <h2>{date.format}</h2>
          <span>{date.time}</span>
        </div>
      ),
      action: (
        <Dropdown text="" icon={"ellipsis horizontal"}>
          <Dropdown.Menu className={Styles.menuContainer}>
            <Dropdown.Item text="Approve" />
            <Dropdown.Item text="Decline" className="text-danger" />
            <Dropdown.Item text="Modify transfer" />
          </Dropdown.Menu>
        </Dropdown>
      ),
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    transactions?.map((each: TransactionsProps) =>
      newRowOptions.push(
        LoanRowTab(each.amount, each.narration, each.receipient, each.date)
      )
    );
    setRows(newRowOptions);
  }, [transactions, LoanRowTab]);
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

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Pending Approval" />
      <div className={Styles.tableContainer}>
        <div className={Styles.tableHeader}>
          <h2>19 pending transfers</h2>
          <div>
            <Button>
              Download <CloudUploadOutlinedIcon />
            </Button>
            <Button className={Styles.success}>Approve all</Button>
          </div>
        </div>
        <div className={Styles.wrapper}>
          <OperantTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
}

export default PendingApproval;
