import { Box, Button, IconButton, Modal } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import styles from './Balance.module.scss';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  BalanceHistory as History,
} from '../../types/BalanceTypes';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  closeLoader,
  openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomClickTable from '../../components/table/CustomClickTable';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { getBalanceHistoryService } from '../../services/balance';
import FilterModal from '../../components/filterModals/BalanceHistoryFilter';
import { BALANCE_HISTORY_FILTER_DATA } from '../../constant';
import { stripEmpty } from '../../utils';
import { useLocation, useParams } from 'react-router-dom';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomCurrencyFormat from '../../components/customs/CustomCurrencyFormat';
import CustomDateFormat from '../../components/customs/CustomDateFormat';


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
      borderRadius: "20px",

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
    padding: '3rem 2rem',
    gap: '1.25rem',
    '& .MuiButton-root': {
      fontFamily: `'Avenir', sans-serif`,
      fontWeight: '500',
      fontSize: '.875rem',
      color: 'black',
      background: '#E0E0E0',
      borderRadius: '20px',
      textTransform: 'none',
      padding: '.35rem .85rem',
      // marginBottom: "1rem"
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

const BalanceHistory = () => {
  const btnClasses = useBtnStyles();
  const modalBtnClasses = useModalBtnStyles();
  const { id } = useParams<{ id: string }>();


  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [history, setHistory] = useState<History[]>([]);
  const [rows, setRows] = useState<History[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

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
    { id: 'init', label: 'Previous balance', minWidth: 150 },
    { id: 'amt', label: 'Transaction amount', minWidth: 150 },
    { id: 'after', label: 'Current balance', minWidth: 150 },
    { id: 'details', label: 'Details', minWidth: 150 },
    { id: 'added', label: 'Date', minWidth: 150 },
  ];

  const { search } = useLocation()

  const BalanceHistoryRowTab = useCallback(
    (currency, init, amt, after, details, added, id) => ({
      init: (
        <p className={styles.tableBodyText}>
          <span className={styles.tableBodySpan}>{currency} </span>
          {init}
        </p>
      ),
      amt: (
        <p className={styles.tableBodyText}>
          <span
            style={{
              color: amt?.startsWith?.("+") ? "#219653" : "#eb5757",
              fontWeight: "700",
            }}
          >
            {FormatToCurrency(amt)}
          </span>
        </p>
      ),
      after: (
        <CustomCurrencyFormat amount={after} currency={currency} />
      ),
      details: <p className={styles.tableBodyText}>{details}</p>,
      added: (
        <CustomDateFormat time={added} date={added} />

      ),
      id: <p>{id}</p>,
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    history?.map((each: History) =>
      newRowOptions.push(
        BalanceHistoryRowTab(
          each?.currency,
          each?.balancebefore || 0,
          each?.amount || 0,
          each?.balanceafter || 0,
          '---',
          each?.createdat,
          each?.id || ''
        )
      )
    );
    setRows(newRowOptions);
  }, [history, BalanceHistoryRowTab]);

  const getBalanceHistory = async (form = BALANCE_HISTORY_FILTER_DATA) => {
    dispatch(openLoader());
    try {
      const res = await getBalanceHistoryService(id, stripEmpty({ search, ...form }))
      setHistory(res?.balancehistory || []);
      setTotalRows(res?._metadata?.totalcount || 0);
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
  }, [pageNumber, rowsPerPage, search]);

  const action = (form: typeof BALANCE_HISTORY_FILTER_DATA) => {
    getBalanceHistory(form)
  }

  return (

    <div className={styles.container}>
      <FilterModal
        isOpen={isFilterModalOpen}
        handleClose={() => setIsFilterModalOpen(false)}
        action={action}
      />
      <div className={styles.pageWrapper}>
        <Box className={styles.historyTopContainer} mb={2}>
          <div>
            <h2 className={styles.history__title}>{totalRows} balance log(s)</h2>
          </div>
          <div className={btnClasses.root}>
            <div>
              <Button onClick={() => setIsFilterModalOpen(true)}>
                <FilterAltOutlinedIcon /> Filter by:
              </Button>
            </div>
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
