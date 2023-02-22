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
import FilterModal from "../../components/FilterModal";
import moment from "moment";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

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
  const [beneficiary, setBeneficiary] = React.useState<null | HTMLElement>(
    null
  );
  const [download, setDownload] = React.useState<null | HTMLElement>(null);
  const openBeneficiary = Boolean(beneficiary);
  const openDownloadMenu = Boolean(download);

  const handleClickBeneficiary = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setBeneficiary(event.currentTarget);
  };
  const handleOpenDownloadMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDownload(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setBeneficiary(null);
  };
  const handleCloseDownloadMenu = () => {
    setDownload(null);
  };

  // filter
  const handleOpen = (): void => setFilterOpen(true);

  //FILTER
  // DATE CONVERTION
  const now = new Date();
  const dateNow = moment().format("YYYY-MM-DD");
  const sevenDaysAgo = moment().subtract(7, "day").format("YYYY-MM-DD");
  const thirtyDaysAgo = moment().subtract(30, "day").format("YYYY-MM-DD");
  const startOfYear = moment().startOf("year").format("YYYY-MM-DD");
  const endOfYear = moment().endOf("year").format("YYYY-MM-DD");

  // FOR FILTER METHOD

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ref, setRef] = useState("");
  const [payment, setPayment] = useState("");
  const [event, setEvent] = useState("");

  const [count, setCounter] = useState(null);
  const [showNoTransaction, setShowNoTransaction] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [query, setquery] = useState(false);
  const [bearer, setBearer] = useState(false);

  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    if (event === "today") {
      setFromDate(dateNow);
      setToDate(dateNow);
    } else if (event === "last7days") {
      setFromDate(sevenDaysAgo);
      setToDate(dateNow);
    } else if (event === "last30days") {
      setFromDate(thirtyDaysAgo);
      setToDate(dateNow);
    } else if (event === "oneyear") {
      setFromDate(startOfYear);
      setToDate(endOfYear);
    } else {
      setFromDate("");
      setToDate("");
    }
  }, [event]);

  const clearHandler = () => {
    setEvent("");
    setFromDate("");
    setToDate("");
    setRef("");
    setBearer(true);
    setIsFilterModalOpen(false);
  };

  const pdfFuc = () => {
    window.alert("this is pdf");
  };
  const excelFuc = () => {
    window.alert("this is excel");
  };
  const CSVFuc = () => {
    window.alert("this is csv");
  };

  // download menu array
  const dataDownload = [
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

  // add beneficiary menu array
  const data = [
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
  const modalFunc = () => {
    setReset(true);
  };

  return (


      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

        <FilterModal
          isOpen={isFilterModalOpen}
          handleClose={() => setIsFilterModalOpen(false)}
          setEvent={setEvent}
          setFromDate={setFromDate}
          setToDate={setToDate}
          setRef={setRef}
          setPayment={setPayment}
          eventDate={event}
          clearHandler={clearHandler}
          setBearer={setBearer}
          payment={payment}
          name="transaction"
          filterFunction={modalFunc}
          changePage={changePage}
        />
        <div className={Styles.tableContainer}>
          <div className={Styles.tableHeader}>
            <h2>Beneficiaries</h2>
            <div>
              <button onClick={() => setIsFilterModalOpen(true)}>
                Filter <ArrowDropDownOutlinedIcon />
              </button>
              <button onClick={handleOpenDownloadMenu}>
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
          style={{ width: "13rem", textAlign: "center" }}
        />

        {/* download */}
        <BeneficiaryMenu
          openBeneficiary={openDownloadMenu}
          handleCloseMenu={handleCloseDownloadMenu}
          beneficiary={download}
          data={dataDownload}
          style={{ width: "8.5rem", textAlign: "center" }}
        />
      </div>

  );
}

export default PendingApproval;
