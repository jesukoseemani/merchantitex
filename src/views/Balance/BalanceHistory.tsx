import { Box, Button, Modal, OutlinedInput } from '@mui/material';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import styles from './Balance.module.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  BalanceHistoryItem,
  GetBalanceHistoryRes,
} from '../../types/BalanceTypes';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  closeLoader,
  openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomClickTable from '../../components/table/CustomClickTable';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';


const useBtnStyles = makeStyles({
  root: {
    fontFamily: `'Avenir', sans-serif`,
    display: 'flex',
    gap: '1rem',
    '& .MuiButtonBase-root': {
      borderRadius: '.25rem',
      padding: '.5rem 1rem',
      textTransform: 'none',
      fontSize: '.875rem',
      fontWeight: '400',
      alignItem: 'center',
      display: 'flex',
    },
    '& .MuiButtonBase-root:nth-child(1)': {
      backgroundColor: '#E0E0E0',
      color: '#333',
      height: "32px",
      borderRadius: "20px"
    },
    '& .MuiButtonBase-root:nth-child(2)': {
      gap: '.5rem',
      borderRadius: "20px",
      background: "transparent",
      color: "#27AE60",
      height: "32px",
      border: "1px solid #27AE60"


    },
    '& svg': {
      fontSize: '1rem',
    },
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
      textTransform: 'capitalize',
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none',
    },
    '& .MuiTableCell-body': {
      fontFamily: `'Avenir', san-serif`,
      fontWeight: '400',
      fontSize: '.875rem',
      color: '#333',
      borderBottom: '1px solid #E0E0E0',
    },
    '& .darkText': {
      color: '#333',
      fontSize: '.875rem',
      fontWeight: '700',
    },
    '& .redText': {
      color: '#EB5757',
      fontSize: '.875rem',
      fontWeight: '700',
    },
    '& .greenText': {
      color: '#219653',
      fontSize: '.875rem',
      fontWeight: '700',
    },
    '& .lightText': {
      color: '#828282',
      fontSize: '.875rem',
    },
  },
});

const useModalBtnStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem 1.5rem 0',
    gap: '1.25rem',
    '& .MuiButton-root': {
      fontFamily: `'Avenir', sans-serif`,
      fontWeight: '500',
      fontSize: '.875rem',
      color: 'black',
      background: '#E0E0E0',
      borderRadius: '3px',
      textTransform: 'none',
    },
    '& .MuiButton-root:nth-child(2)': {
      color: 'white',
      background: '#27AE60',
    },
  },
});

const BalanceHistory = () => {
  const btnClasses = useBtnStyles();
  const tableClasses = useTableStyles();
  const modalBtnClasses = useModalBtnStyles();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [history, setHistory] = useState<BalanceHistoryItem[]>([]);
  const [rows, setRows] = useState<BalanceHistoryItem[]>([]);
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
    id: 'init' | 'amt' | 'after' | 'details' | 'added';
    label: any;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
  }
  const columns: Column[] = [
    { id: 'init', label: 'Previous balance', minWidth: 100 },
    { id: 'amt', label: 'Transaction amount', minWidth: 100 },
    { id: 'after', label: 'Current balance', minWidth: 100 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'added', label: 'Date', minWidth: 100 },
  ];

  const BalanceHistoryRowTab = useCallback(
    (init, amt, after, details, added, id) => ({
      init: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {init}
        </p>
      ),
      amt: (
        <p className={styles.tableBodyText}>
          <span
            style={{
              color: amt.startsWith("+") ? "#219653" : "#eb5757",
              fontWeight: "700",
            }}
          >
            {amt}
          </span>
        </p>
      ),
      after: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>NGN </span>
          {after}
        </p>
      ),
      details: <p className={styles.tableBodyText}>{details}</p>,
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
    history?.map((each: BalanceHistoryItem) =>
      newRowOptions.push(
        BalanceHistoryRowTab(
          each?.init,
          each?.amt,
          each?.after,
          each?.details,
          each?.added,
          each?.id
        )
      )
    );
    setRows(newRowOptions);
  }, [history, BalanceHistoryRowTab]);

  const getBalanceHistory = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetBalanceHistoryRes>(
        "/mockData/balancehistory.json",
        { baseURL: "" }
      );
      const { history, _metadata } = res?.data;
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
          toastContent: "Failed to get history",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  };

  useEffect(() => {
    getBalanceHistory();
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
              <OutlinedInput placeholder="NGN 0.00" size="small" fullWidth />
            </div>
            <div>
              <p>Status</p>
              <OutlinedInput
                placeholder="Choose status"
                size="small"
                fullWidth
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



      <div className={styles.pageWrapper}>
        <Box className={styles.historyTopContainer} mb={2}>
          <div>
            <h2 className={styles.history__title}>19 balance logs</h2>
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
            link="/balance/balance_history"
            identifier="id"
            rowsData={history}
          />
        </div>
      </div>
    </div>

  );
};

export default BalanceHistory;
