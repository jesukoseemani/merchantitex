import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../../components/navbar/NavBar";
import OperantTable from "../../components/table/OperantTable";
import Styles from "./beneficiaries.module.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Modal from "../../components/Modal";
import BeneficiaryFilter from "../../components/Beneficiaries/BeneficiaryFilterModal";
import BeneficiaryFilterModal from "../../components/Beneficiaries/BeneficiaryFilterModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BeneficiaryMenu from "./BeneficiaryMenu";
import BeneficiaryDownload from "./DownloadMenu";

function PendingApproval() {
  interface TransactionsProps {
    name: string;
    type: string;
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
    name: "Princess Ogechi",
    type: "ITEX Pay",
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
  const [filterOpen, setFilterOpen] = React.useState<Boolean>(false);
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
    id: "name" | "type" | "receipient" | "date";
    label?: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "type", label: "Type", minWidth: 100 },
    { id: "receipient", label: "Receipient", minWidth: 200 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const LoanRowTab = useCallback(
    (name: string, type: string, receipient: string, date: any) => ({
      name,
      type,
      receipient,
      date: (
        <div className={Styles.date}>
          <h2>{date.format}</h2>
          <span>{date.time}</span>
        </div>
      ),
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    transactions?.map((each: TransactionsProps) =>
      newRowOptions.push(
        LoanRowTab(each.name, each.type, each.receipient, each.date)
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

  // open menu
  const [beneficiary, setBeneficary] = React.useState<null | HTMLElement>(null);
  const openBeneficiary = Boolean(beneficiary);
  const handleClickBeneficiary = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setBeneficary(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setBeneficary(null);
  };

  // filter
  const handleOpen = (): void => setFilterOpen(true);

  const pdfFuc = () => {
    window.alert("this is pdf");
  };
  const excelFuc = () => {
    window.alert("this is excel");
  };
  const CSVFuc = () => {
    window.alert("this is csv");
  };

  const data = [
    {
      id: 1,
      name: "PDF",
      func: pdfFuc,
    },
    {
      id: 2,
      name: "Excel",
      func: excelFuc,
    },

    {
      id: 3,
      name: "CSV",
      func: CSVFuc,
    },
  ];
  const dataDownload = [
    {
      id: 1,
      name: "Bank Account",
      func: pdfFuc,
    },
    {
      id: 2,
      name: "Payvice",
      func: excelFuc,
    },

    {
      id: 3,
      name: "ITEX pay",
      func: CSVFuc,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Pending Approval" />
      <div className={Styles.tableContainer}>
        <div className={Styles.tableHeader}>
          <h2>Beneficiaries</h2>
          <div>
            <button onClick={handleOpen}>
              Filter <ArrowDropDownOutlinedIcon />
            </button>
            <button>
              Download <CloudUploadOutlinedIcon />
            </button>
            <button className={Styles.success} onClick={handleClickBeneficiary}>
              + Add new beneficiary
            </button>
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

      <BeneficiaryFilterModal
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
      <BeneficiaryMenu
        openBeneficiary={openBeneficiary}
        handleCloseMenu={handleCloseMenu}
        beneficiary={beneficiary}
        data={data}
      />
      <BeneficiaryDownload
        openBeneficiary={openBeneficiary}
        handleCloseMenu={handleCloseMenu}
        beneficiary={beneficiary}
        datas={dataDownload}
      />
    </div>
  );
}

export default PendingApproval;
