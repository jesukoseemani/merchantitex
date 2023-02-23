import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";

import Styles from "./beneficiaries.module.scss";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import BeneficiaryFilterModal from "../../components/Beneficiaries/BeneficiaryFilterModal";
import BeneficiaryMenu from "./BeneficiaryMenu";
import FilterModal from "../../components/FilterModal";
import moment from "moment";
import ParentContainer from "../../components/ParentContainer/ParentContainer";
import { beneficiaryRequestItem, getBeneficiaryRes } from "../../types/beneficiaryTypes";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import CustomClickTable from "../../components/table/CustomClickTable";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import AddbankForm from "./beneficiary/AddbankForm";
import PayviceForm from "./beneficiary/PayviceForm";
import ItexpayForm from "./beneficiary/ItexpayForm";

function PendingApproval() {

  const dispatch = useDispatch()

  const [history, setHistory] = useState<beneficiaryRequestItem[]>([]);
  const [rows, setRows] = useState<beneficiaryRequestItem[]>([]);
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
    setTotalRows(history.length);
  }, []);



  interface Column {
    id: "name" | "bankName" | "bankAccount" | "date";
    label?: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "bankName", label: "Bank name", minWidth: 100 },
    { id: "bankAccount", label: "Bank account", minWidth: 200 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const LoanRowTab = useCallback(
    (name, date, bankName, acctNo, id) => ({
      name,
      bankName: bankName,
      bankAccount: acctNo,
      date: date,
      id: <p>{id}</p>

    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    history?.map((each: beneficiaryRequestItem) =>
      newRowOptions.push(
        LoanRowTab(each.name, each.bankName, each.acctNo, each.date, each.id)
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


  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
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


  const GetPendingRequest = async () => {
    dispatch(openLoader());

    try {
      const res = await axios.get<getBeneficiaryRes>(
        '/mockData/beneficiaryrequest.json',
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
          toastStyles: {
            backgroundColor: 'red',
          },
        })
      );
    }
  };

  useEffect(() => {
    GetPendingRequest();
  }, [pageNumber, rowsPerPage]);

  const pdfFuc = () => {
    window.alert("this is pdf");
  };
  const excelFuc = () => {
    window.alert("this is excel");
  };
  const CSVFuc = () => {
    window.alert("this is csv");
  };


  const handleaddBankForm = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: "20px",
          width: "419px",
          maxWidth: "97%",
          height: "498px",
          overflow: "hidden"
        },
        modalContent: (
          <>
            <AddbankForm />
          </>
        ),
      })
    );
  }
  const handlePayviceForm = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: "20px",
          width: "419px",
          maxWidth: "97%",
          height: "408px",
          overflow: "hidden"
        },
        modalContent: (
          <>
            <PayviceForm />
          </>
        ),
      })
    );
  }
  const handleItexPay = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: "20px",
          width: "419px",
          maxWidth: "97%",
          height: "408px",
          overflow: "hidden"
        },
        modalContent: (
          <>
            <ItexpayForm />
          </>
        ),
      })
    );
  }

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
      func: handleaddBankForm,
    },
    {
      id: 2,
      name: "Payvice",
      func: handlePayviceForm,
    },

    {
      id: 3,
      name: "ITEX pay",
      func: handleItexPay,
    },
  ];
  const modalFunc = () => {
    setReset(true);
  };

  return (


    <div style={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: "20px" }}>

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
              <InsertDriveFileOutlinedIcon />Download
            </button>
            <button className={Styles.success} onClick={handleClickBeneficiary}>
              + Add new beneficiary
            </button>
          </div>
        </div>

        <div className={Styles.wrapper}>
          <CustomClickTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
            clickable
            link="/payout/beneficiaries/details"
            identifier={"id"}
            rowsData={history}
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
        style={{ width: "13rem", }}
        sx={{ border: "2px solid green" }}
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
