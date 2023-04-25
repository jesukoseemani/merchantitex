import {
  Button,

  Modal,
  OutlinedInput,
  ButtonBase,
  Box,
  IconButton,
} from "@mui/material";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Balance.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { makeStyles } from "@material-ui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import CustomClickTable from "../../components/table/CustomClickTable";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { getSettlementsService } from "../../services/settlement";
import { Settlement } from "../../types/Settlement";
import { getSettlementStatus } from "../../utils/status";
import { stripSearch } from "../../utils";

const useBtnStyles = makeStyles({
  root: {
    fontFamily: `'Avenir', sans-serif`,
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    border: "3px solid transparent",
    "& .MuiButtonBase-root": {

      borderRadius: ".25rem",
      padding: ".5rem 1rem",
      textTransform: "none",
      fontSize: ".875rem",
      fontWeight: "400",
      alignItem: "center",
      display: "flex",
    },
    "& .MuiButtonBase-root:nth-child(1)": {
      backgroundColor: "#E0E0E0",
      color: "#333",
      borderRadius: "20px",
      height: "32px",
    },
    "& .MuiButtonBase-root:nth-child(2)": {
      background: "transparent",
      color: "#27AE60",
      height: "32px",
      border: "1px solid #27AE60",
      borderRadius: "20px"
    },
    "& svg": {
      fontSize: "1rem",
    },
  },
});

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

const useModalBtnStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1.5rem 0",
    gap: "1.25rem",
    '& .MuiButton-root': {
      fontFamily: `'Avenir', sans-serif`,
      fontWeight: '500',
      fontSize: '.875rem',
      color: 'black',
      background: '#E0E0E0',
      borderRadius: '20px',
      textTransform: 'none',
      padding: '.35rem .85rem',
      marginBottom: "2rem",
      border: "1px solid blue"
    },
    '& .MuiButton-root:nth-child(2)': {
      color: 'white',
      background: '#27AE60',
    },
    '& .MuiButton-root:nth-child(1)': {
      // color: 'white',
      background: 'transparent',
      border: "1px solid #095B2C",
      color: "#095B2C",
    },
  },
  selected: {
    border: '1px solid #27ae60 !important',
    color: '#27ae60 !important',

  },
});

const Settlements = () => {
  const btnClasses = useBtnStyles();
  const tableClasses = useTableStyles();
  const modalBtnClasses = useModalBtnStyles();

  const history = useHistory();

  const { search } = useLocation();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [rows, setRows] = useState<Settlement[]>([]);
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

  const statusFormatObj: { [key: string]: string } = {
    successful: "wonText",
    error: "lostText",
    pending: "pendingText",
  };

  interface Column {
    id: "amt" | "status" | "destination" | "added";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Amount", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "destination", label: "Settlement account", minWidth: 150 },
    { id: "added", label: "Date", minWidth: 100, },
  ];

  const SettlementRowTab = useCallback(
    (amt, status, destination, added, id) => ({
      amt: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {amt}
        </p>
      ),
      status: (
        <p className={styles[statusFormatObj[getSettlementStatus(status)] || "pendingText"]}>
          {getSettlementStatus(status)}
        </p>
      ),
      destination: <p className={styles.tableBodyText}>{destination}</p>,
      added: (
        <p className={styles.tableBodyText}>
          {moment(added).format("MMM D YYYY")}
          <span className={styles.tableBodySpan}>
            {" "}
            {moment(added).format("h:mm A")}
          </span>
        </p>
      ),
      id: <p>{id}</p>,
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    settlements?.map((each: Settlement) =>
      newRowOptions.push(
        SettlementRowTab(
          each?.chargeamount,
          each?.responsecode,
          each?.settlementaccountname,
          each?.settlementdate,
          each?.settlementid
        )
      )
    );
    setRows(newRowOptions);
  }, [settlements, SettlementRowTab]);

  const getSettlements = async () => {
    dispatch(openLoader());
    try {
      const res = await getSettlementsService({
        page: pageNumber,
        perpage: rowsPerPage,
        search: stripSearch(search)
      });
      setSettlements(res?.settlements || []);
      setTotalRows(res?._metadata?.totalcount);
      dispatch(closeLoader());
    } catch (err: any) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: err?.response?.data?.message || "Failed to get settlements",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  };

  useEffect(() => {
    getSettlements();
  }, [pageNumber, rowsPerPage, search]);

  return (

    <div className={styles.container}>
      <Modal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        aria-labelledby="settlements filter modal"
      >
        <div className={styles.filterModalContainer}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px" }}>
            <h2>Filters</h2>
            <IconButton onClick={() => setIsFilterModalOpen(false)}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <hr />
          <div className={styles.modalContent}>
            <div>
              <p>Due date</p>
              <div>
                <p>Today</p>
                <p>Last 7 days</p>
                <p>30 days</p>
                <p>1 year</p>
              </div>
            </div>
            <div>
              <p>Custom date range</p>
              <div>
                <div>Start date</div>
                <ArrowRightAltIcon />
                <div>End date</div>
              </div>
            </div>
            <div>
              <p>Withheld amount</p>
              <input placeholder="NGN 0.00" />
            </div>
            <div>
              <p>Status</p>
              <input
                placeholder="Choose status"

              />
            </div>
          </div>
          <hr />
          <div className={modalBtnClasses.root}>
            <Button>Clear filter</Button>
            <Button>Apply filter</Button>
          </div>
        </div>
      </Modal>
      {/* <NavBar name='Settlements' />
      <hr /> */}


      <div className={styles.pageWrapper}>
        <Box mb={2} className={styles.historyTopContainer}>
          <div>
            <h2>19 Settlements</h2>
          </div>
          <div className={btnClasses.root}>
            <div>
              <Button onClick={() => setIsFilterModalOpen(true)}>
                <FilterAltOutlinedIcon /> Filter by:
              </Button>
            </div>
            <Button>
              <InsertDriveFileOutlinedIcon /> Download
            </Button>
          </div>
        </Box>
        <div className={styles.tableContainer}>
          <CustomClickTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
            clickable
            link="/balance/settlements"
            identifier="id"
            rowsData={settlements}
          />
        </div>
      </div>
    </div>

  );
};

export default Settlements;
