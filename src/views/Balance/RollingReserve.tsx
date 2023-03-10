import {
  Button,
  Box,
  Modal,
  Input,
  OutlinedInput,
  Stack,
  Grid,
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

import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import CustomClickTable from "../../components/table/CustomClickTable";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useBtnStyles = makeStyles({
  root: {
    fontFamily: `'Avenir', sans-serif`,
    display: "flex",
    gap: "1rem",
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
    marginInline: "24px",
    marginTop: "10px",
    "& .MuiButton-root": {
      fontFamily: `'Avenir', sans-serif`,
      fontWeight: "500",
      fontSize: ".875rem",

      color: "black",
      background: "#E0E0E0",
      borderRadius: "20px",
      textTransform: "none",
      padding: ".5rem 1rem",
      height: 40,
      width: 120
    },
    "& .MuiButton-root:nth-child(2)": {
      color: "white",
      background: "#27AE60",
      borderRadius: "20px",

    },
  },
});

const RollingReserve = () => {
  const btnClasses = useBtnStyles();
  const tableClasses = useTableStyles();
  const modalBtnClasses = useModalBtnStyles();

  const history = useHistory();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [reserves, setReserves] = useState<RollingReserveItem[]>([]);
  const [rows, setRows] = useState<RollingReserveItem[]>([]);
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
    id: "amt" | "Month" | "added" | "settlementAmt" | 'rolling' | "dueDate";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Monthly transaction amount", minWidth: 100 },
    { id: "Month", label: "Month", minWidth: 100 },
    { id: "added", label: "Settlement Date", minWidth: 100 },
    { id: "settlementAmt", label: "Settlement amount", minWidth: 100 },
    { id: "rolling", label: "Rolling reserve", minWidth: 100 },
    { id: "dueDate", label: "Date withheld", minWidth: 100 },
  ];

  const ReserveRowTab = useCallback(
    (monthlyamt, month, settlementDate, settlementAmt, rollingReserve, id, dueDate) => ({
      amt: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {monthlyamt}
        </p>
      ),
      Month: (
        <p className={styles.tableBodyText}>
          {month}
        </p>
      ),
      rolling: (
        <p className={styles.tableBodyText}>
          {rollingReserve}
        </p>
      ),
      added: (
        <p className={styles.tableBodyText}>
          {moment(settlementDate).format("MMM D YYYY")}
          <span className={styles.tableBodySpan}>
            {" "}
            {moment(settlementDate).format("h:mm A")}
          </span>
        </p>
      ),
      settlementAmt: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {settlementAmt}
        </p>
      ),
      dueDate: (
        <p className={styles.tableBodyText}>
          {moment(dueDate).format("MMM D YYYY")}
          <span className={styles.tableBodySpan}>
            {" "}
            {moment(dueDate).format("h:mm A")}
          </span>
        </p>
      ),
      id: <p>{id}</p>,
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    reserves?.map((each: RollingReserveItem) =>
      newRowOptions.push(
        ReserveRowTab(
          each?.monthlyamt,
          each?.month,
          each?.settlementDate,
          each?.settlementAmt,
          each?.rollingReserve,
          each?.dueDate,
          each?.id
        )
      )
    );
    setRows(newRowOptions);
  }, [reserves, ReserveRowTab]);

  const getRollingReserves = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetRollingReservesRes>(
        "/mockData/rollingreserve.json",
        { baseURL: "" }
      );
      const { reserves, _metadata } = res?.data;
      if (reserves.length) {
        setReserves(reserves);
        setTotalRows(_metadata?.totalcount);
      }
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to get reserves",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
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
          <p>Filters</p>
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
                <OutlinedInput
                  placeholder="Choose status"
                  size="small"
                  type="date"
                  fullWidth
                  sx={{ height: "44px" }}
                />
                <ArrowRightAltIcon />
                <OutlinedInput
                  placeholder="Choose status"
                  size="small"
                  type="date"
                  fullWidth
                  sx={{ height: "44px" }}
                />
              </div>
            </div>
            <div>
              <p>Withheld amount</p>
              <OutlinedInput placeholder="NGN 0.00" size="small" fullWidth sx={{ height: "44px" }} />
            </div>
            <div>
              <p>Status</p>
              <OutlinedInput
                placeholder="Choose status"
                size="small"
                fullWidth
                sx={{ height: "44px" }}
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


      <Box className={styles.rolling__reserve__top__box} mb={"26px"}>

        <Grid container justifyContent={"space-between"} alignItems="center" flexWrap={"wrap"}>
          <Grid item xs={12} sm={12} md={4} spacing={2}>
            <Box className={styles.left__box}>
              <p>Rolling reserve balance (USD)</p>
              <h3>NGN 300,000.00</h3>
              <Link to="/">View USD chargeback history</Link>
            </Box>
          </Grid>


          <Grid item xs={12} sm={12} md={1} sx={{ display: { xs: "none", sm: "none", md: "block" } }}><Box sx={{ borderRight: "1px solid #E0E0E0", height: "40px" }}></Box></Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Box className={styles.right__box}>
              <ErrorOutlineIcon />  <p>The rolling reserve is 10% of a merchant’s monthly transaction volume. The rolling reserve is applied to International transactions only.</p>
            </Box></Grid>
        </Grid>


      </Box>
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
