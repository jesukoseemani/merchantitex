import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import NavBar from '../../components/navbar/NavBar';
import { PosDeployedItem } from '../../types/PosTypes';
import styles from './DeployedItem.module.scss';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CustomClickTable from '../../components/table/CustomClickTable';
import { GetTransactionsRes, TransactionItem } from '../../types/MockTransactionTypes';
import moment from 'moment';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import { Box, Grid } from '@mui/material';
import { Button } from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';


const DeployedItem = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();

  if (!location.state.rowData) {
    history.replace('/point_of_sale');
  }

  const { rowData } = location.state;

  const formattedRowData: PosDeployedItem = JSON.parse(rowData);

  const { status, deviceType, terminalId, merchantCode, terminalSerial, bankName, added, txnValue, txnVolume } = formattedRowData;

  const [txns, setTxns] = useState<TransactionItem[]>([]);
  const [rows, setRows] = useState<TransactionItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
    id: "amt" | "status" | "txnType" | "card" | "bankName" | "added";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "amt", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "txnType", label: "Transaction Type", minWidth: 100 },
    { id: "card", label: "Card", minWidth: 100 },
    { id: "bankName", label: "Bank name", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const statusFormatObj: { [key: string]: string } = {
    'successful': 'wonText',
    'error': 'lostText',
    'pending': 'pendingText'
  }

  const TransactionRowTab = useCallback(
    (amt, status, txnType, card, bankName, added) => ({
      amt: <p className={styles.tableBodyText}>{amt}</p>,
      status: <p style={{ borderRadius: "20px" }} className={styles[statusFormatObj[status] || 'pendingText']}>{status}</p>,
      txnType: <p className={styles.tableBodyCapital}>{txnType}</p>,
      card: <p className={styles.tableBodyText}>{card}</p>,
      bankName: <p className={styles.tableBodyText}>{bankName}</p>,
      added: (
        <p className={styles.tableBodyText}>
          {moment(added).format("MMM D YYYY h:mm A")}
        </p>
      ),
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    txns?.map((each: TransactionItem) =>
      newRowOptions.push(
        TransactionRowTab(
          each?.amt, each?.status, each?.txnType, each?.card, each?.bankName, each?.added
        )
      )
    );
    setRows(newRowOptions);
  }, [txns, TransactionRowTab]);

  const getTransactions = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetTransactionsRes>('/mockData/deployrequest.json', { baseURL: '' });
      const { transactions, _metadata } = res?.data;
      if (transactions.length) {
        setTxns(transactions)
        setTotalRows(_metadata?.totalcount);
      }
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to get transactions",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  };

  useEffect(() => {
    getTransactions();
  }, [pageNumber, rowsPerPage]);

  return (

    <div className={styles.container}>
      {/* <NavBar name="Point Of Sale"/> */}
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to='/point_of_sale'>
              <div>
                <ArrowLeftIcon />
                <p style={{ color: " #4F4F4F", }}>Back to deployed POS</p>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.sectionTwoWrapper}>
          <div className={styles.terminalBox}>
            Terminal Status
            <p className={status === 'Active' ? styles.greenText : styles.yellowText}>
              {status}
            </p>
          </div>
          {/* <hr /> */}
          <div className={styles.sectionTwo}>
            <Grid container alignItems={"center"}>
              <Grid xs={6} sm={4} md={3}>
                <div className={styles.tableOne}>
                  <span>Bank name</span>
                  <p>{bankName}</p>

                </div>

              </Grid>
              <Grid xs={6} sm={4} md={3}>
                <div>
                  <span>Terminal ID</span>
                  <p>{terminalId}</p>

                </div>

              </Grid>
              <Grid xs={6} sm={4} md={3}>
                <div>
                  <span>Transactions volume</span>
                  <p>{txnVolume}</p>

                </div>

              </Grid>
              <Grid xs={6} sm={4} md={3}>
                <div>

                  <span>Transactions volume</span>
                  <p>{txnValue}</p>
                </div>
              </Grid>
            </Grid>

          </div>
        </div>
        <div className={styles.sectionThree}>
          <Box className={styles.headerTitle}>
            <h3>{totalRows} Transactions</h3>
            <button><InsertDriveFileOutlinedIcon /> Download</button>
          </Box>
          <div className={styles.tableContainer}>
            <CustomClickTable
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
              rowsData={txns}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default DeployedItem