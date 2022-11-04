import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Modal, Input, OutlinedInput } from "@mui/material";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Balance.module.scss";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { makeStyles } from "@material-ui/styles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useHistory } from "react-router-dom";
import { GetRollingReservesRes, RollingReserveItem } from "../../types/BalanceTypes";
import moment from "moment";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import CustomClickTable from "../../components/table/CustomClickTable";

const useBtnStyles = makeStyles({
  root: {
    fontFamily: `'Roboto', sans-serif`,
    display: 'flex',
    gap: '1rem',
    '& .MuiButtonBase-root': {
      borderRadius: '.25rem',
      padding: '.5rem 1rem',
      textTransform: 'none',
      fontSize: '.875rem',
      fontWeight: '400',
      alignItem: 'center',
      display: 'flex'
    },
    '& .MuiButtonBase-root:nth-child(1)': {
      backgroundColor: '#E0E0E0',
      color: '#333'
    },
    '& .MuiButtonBase-root:nth-child(2)': {
      backgroundColor: '#27AE60',
      color: '#FFF',
      gap: '.5rem',
    },
    '& svg': {
      fontSize: '1rem'
    }
  },
});

const useTableStyles = makeStyles({
  root: {
    marginTop: '1rem',
    '& .MuiTableRow-head': {
      fontSize: '.875rem',
      padding: '1rem',
      backgroundColor: '#F4F6F8',
    },
    '& .MuiTableCell-head': {
      fontSize: '.875rem',
      color: '#333',
      fontWeight: '500',
      textTransform: 'capitalize'
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none'
    },
    '& .MuiTableCell-body': {
      fontFamily: `'Roboto', san-serif`,
      fontWeight: '400',
      fontSize: '.875rem',
      color: '#333',
      borderBottom: '1px solid #E0E0E0',
      cursor: 'pointer'
    },
    '& .darkText': {
      color: '#333',
      fontSize: '.875rem',
      fontWeight: '700',
    },
    '& .redText': {
      color: '#EB5757',
      fontSize: '.875rem',
      fontWeight: '700'
    },
    '& .greenText': {
      color: '#219653',
      fontSize: '.875rem',
      fontWeight: '700'
    },
    '& .lightText': {
      color: '#828282',
      fontSize: '.875rem',
    },
  }
})

const useModalBtnStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem 1.5rem 0',
    gap: '1.25rem',
    '& .MuiButton-root': {
      fontFamily: `'Roboto', sans-serif`,
      fontWeight: '500',
      fontSize: '.875rem',
      color: 'black',
      background: '#E0E0E0',
      borderRadius: '3px',
      textTransform: 'none',
      padding: '.5rem 1rem'
    },
    '& .MuiButton-root:nth-child(2)': {
      color: 'white',
      background: '#27AE60'
    }
  }
})

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

  const statusFormatObj: {[key: string]: string} = {
    'successful': 'wonText',
    'error': 'lostText',
    'pending': 'pendingText'
  }
  interface Column {
    id: "amt" | "status" | "added" | "witheldAmt" | "dueDate";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Settlement Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "added", label: "Settlement Date", minWidth: 100 },
    { id: "witheldAmt", label: "Witheld amount", minWidth: 100 },
    { id: "dueDate", label: "Due date", minWidth: 100 },
  ];

  const ReserveRowTab = useCallback(
    (amt, status, added, witheldAmt, dueDate, id) => ({
      amt: <p className={styles.tableBodyText}><span className={styles.tableBodySpan}>NGN{' '}</span>{amt}</p>,
      status: <p className={styles[statusFormatObj[status] || 'pendingText']}>{status}</p>,
      added: (
        <p className={styles.tableBodyText}>
          {moment(added).format("MMM D YYYY")}<span className={styles.tableBodySpan}>{' '}{moment(added).format("h:mm A")}</span>
        </p>
      ),
      witheldAmt: <p className={styles.tableBodyText}><span className={styles.tableBodySpan}>NGN{' '}</span>{witheldAmt}</p>,
      dueDate: (
        <p className={styles.tableBodyText}>
          {moment(dueDate).format("MMM D YYYY")}<span className={styles.tableBodySpan}>{' '}{moment(dueDate).format("h:mm A")}</span>
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
          each?.amt,
          each?.status,
          each?.added,
          each?.witheldAmt,
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
      const res = await axios.get<GetRollingReservesRes>('/mockData/rollingreserve.json', { baseURL: '' });
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
        open={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}
        aria-labelledby='balance history filter modal'
      >
        <div className={styles.filterModalContainer}>
          <p>Filters</p>
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
              <OutlinedInput 
                placeholder="NGN 0.00" size="small" fullWidth
              />
            </div>
            <div>
              <p>Status</p>
              <OutlinedInput placeholder="Choose status" size="small" fullWidth />
            </div>
          </div>
          <hr />
          <div className={modalBtnClasses.root}>
            <Button>Clear filter</Button>
            <Button>Apply filter</Button>
          </div>
        </div>
      </Modal>
      <NavBar name="Rolling reserve"/>
      <hr />
      <div className={styles.pageWrapper}>
        <div className={styles.historyTopContainer}>
          <div>
            <h2>Rolling reserve</h2>
          </div>
          <div className={btnClasses.root}>
            <div>
              <Button onClick={() => setIsFilterModalOpen(true)}>
                All <ArrowDropDownIcon />
              </Button>
            </div>
            <Button>
              Download <CloudUploadOutlinedIcon />
            </Button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <CustomClickTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
            clickable
            link='/balance/rolling_reserve'
            identifier='id'
            rowsData={reserves}
          />
        </div>
      </div>
    </div>
  );
};

export default RollingReserve;
