import {
  Button,
  Box,
  Modal,
  Input,
  OutlinedInput,
  Stack,
  Grid,
  IconButton,
} from "@mui/material";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import styles from "./Balance.module.scss";
import { makeStyles } from "@material-ui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, useHistory } from "react-router-dom";
import {
  GetRollingReservesRes,
  RollingReserveItem,
} from "../../types/BalanceTypes";
import moment from "moment";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import CustomClickTable from "../../components/table/CustomClickTable";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getRollingReserve } from "../../services/rolling-reserve";
import useDownload from "../../hooks/useDownload";
import { BASE_URL } from "../../config";
import { RollingReserveType } from "../../types/RollingReserveTypes";
import FormatToCurrency from "../../helpers/NumberToCurrency";

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
    padding: "1rem 1.5rem 0rem",
    gap: "1.25rem",
    // border: "2px solid red",
    // marginInline: "24px",
    '& .MuiButton-root': {
      fontFamily: `'Avenir', sans-serif`,
      fontWeight: '500',
      fontSize: '.875rem',
      color: 'black',
      background: '#E0E0E0',
      borderRadius: '20px',
      textTransform: 'none',
      padding: '.35rem .85rem',
      marginBottom: "1rem",
      marginTop: "2rem"
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

const RollingReserve = () => {
  const btnClasses = useBtnStyles();
  const tableClasses = useTableStyles();
  const modalBtnClasses = useModalBtnStyles();

  const history = useHistory();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [reserves, setReserves] = useState<RollingReserveType[]>([]);
  const [rows, setRows] = useState<RollingReserveType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { calDownload } = useDownload({ url: `${BASE_URL}/rollingreserve/download`, filename: 'rollingreserve' })

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
    id: "amount" | "balanceBefore" | "balanceAfter" | "created" | "duedate";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "balanceBefore", label: "Balance Before", minWidth: 100 },
    { id: "balanceAfter", label: "Balance After", minWidth: 100 },
    { id: "created", label: "Created Date", minWidth: 100 },
    { id: "duedate", label: "Due Date", minWidth: 100 },
  ];

  const ReserveRowTab = useCallback(
    (amount, balanceBefore, balanceAfter, created, duedate, id) => ({
      amount: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {FormatToCurrency(amount)}
        </p>
      ),
      balanceBefore: (
        <p className={styles.tableBodyText}>
          {FormatToCurrency(balanceBefore)}
        </p>
      ),
      balanceAfter: (
        <p className={styles.tableBodyText}>
          {FormatToCurrency(balanceAfter)}
        </p>
      ),
      created: (
        <p className={styles.tableBodyText}>
          {created}
        </p>
      ),
      duedate: (
        <p className={styles.tableBodyText}>
          {duedate}
        </p>
      ),
      id: <p>{id}</p>,
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    reserves?.map((each: RollingReserveType) =>
      newRowOptions.push(
        ReserveRowTab(
          each?.amount,
          each?.balanceBefore,
          each?.balanceAfter,
          each?.createdat,
          each?.duedate,
          each?.id
        )
      )
    );
    setRows(newRowOptions);
  }, [reserves, ReserveRowTab]);

  const getRollingReserves = async () => {
    dispatch(openLoader());
    try {
      const res = await getRollingReserve()
      setReserves(res?.rollingreserves || []);
      setTotalRows(res?._metadata?.totalcount || 0);

    } catch (err: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: err?.response?.data?.message || "Failed to get reserves",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    } finally {
      dispatch(closeLoader());

    }
  };

  useEffect(() => {
    getRollingReserves();
  }, [pageNumber, rowsPerPage]);

  return (


    <div className={styles.container}>
      <Modal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        aria-labelledby="balance history filter modal"
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
            <div className={styles.dates}>
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
                <input
                  placeholder="Start date"


                />
                <ArrowRightAltIcon />
                <input
                  placeholder="End Date"

                />
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
          <Box className={modalBtnClasses.root} px={3}>
            <Button>Clear filter</Button>
            <Button>Apply filter</Button>
          </Box>
        </div>
      </Modal>

      <div className={styles.pageWrapper}>
        <Box mb={2} className={styles.historyTopContainer}>
          <div>
            <h2>{totalRows} Rolling Reserve(s)</h2>
          </div>
          <div className={btnClasses.root}>
            <div>
              <Button onClick={() => setIsFilterModalOpen(true)}>
                <FilterAltOutlinedIcon /> Filter by:
              </Button>
            </div>
            <Button onClick={calDownload}>
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
            // clickable
            link="/balance/rolling_reserve"
            identifier="id"
            rowsData={reserves}
          />
        </div>
      </div>
    </div>

  );
};

export default RollingReserve;
