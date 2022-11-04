import NavBar from "../../components/navbar/NavBar";
import styles from "./CustomerItem.module.scss";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import moment from "moment";
import CustomClickTable from "../../components/table/CustomClickTable";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { GetTransactionsRes, TransactionItem } from "../../types/CustomerTypes";
import { useCallback, useEffect, useState } from "react";


const CustomerItem = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();

  if(!location.state.rowData) {
    history.replace('/customers');
  }

  const { rowData } = location.state; 
  // console.log(rowData)

  const formattedRowData = JSON.parse(rowData);

  const { firstname, lastname, email, msisdn } = formattedRowData;
  
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [rows, setRows] = useState<TransactionItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  interface Column {
    id: "amount" | "email" | "added" | "paymentmethod" | "code";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }

  const columns: Column[] = [
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "code", label: "Status", minWidth: 100 },
    { id: "email", label: "Customer ID", minWidth: 100 },
    { id: "paymentmethod", label: "Payment Type", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const formatStatus = (val: string) => {
    if(val === '00') {
      return <p className={styles.successText}>Successful</p>
    } else if(val === '09') {
      return <p className={styles.failText}>Failed</p>
    } else {
      return <p className={styles.pendingText}>Pending</p>
    }
  }

  const TransactionRowTab = useCallback(
    (email, added, amount, code, paymentmethod) => ({
      amount: <p className={styles.tableBodyText}>NGN{amount}</p>,
      code: formatStatus(code),
      email: <p className={styles.tableBodyText}>{email}</p>,
      paymentmethod: (
        <p className={styles.tableBodyText}>
          <span className={styles.capitalize}>{paymentmethod}</span>
        </p>
      ),
      added: <p className={styles.tableBodyText}>{moment(added).format('MMM D YYYY h:mm A')}</p>,
    }),
    []
  );

  const getTransactions = async() => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetTransactionsRes>(`/merchant/transactions?email=${slug}&page=${pageNumber}&perpage=${rowsPerPage}`);
      const { transactions, _metadata } = res?.data;
      if (transactions.length) {
        setTransactions(transactions);
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
  }

  const getAllTransactions = async() => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetTransactionsRes>(`/merchant/transactions?email=${slug}`);
      const { transactions, _metadata } = res?.data;
      if (transactions.length) {
        const total = transactions.reduce((sum, current) => sum + Number(current.order.amount), 0);
        setTotalAmt(total);
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
  }

  useEffect(() => {
    getAllTransactions();
  }, [slug])

  useEffect(() => {
    getTransactions();
  }, [pageNumber, rowsPerPage]);

  useEffect(() => {
    const newRowOptions: any[] = [];
    transactions?.map((each: TransactionItem) =>
      newRowOptions.push(
        TransactionRowTab(
          each?.source.customer.email,
          each?.transaction.added,
          each?.order.amount,
          each?.code,
          each?.transaction.paymentmethod,
        )
      )
    );
    setRows(newRowOptions);
  }, [transactions, TransactionRowTab]);

  return (
    <div className={styles.container}>
      <NavBar name="Customers"/>
      <hr />
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to='/customers'>
              <div>
                <ArrowLeftIcon />
                <p>Back to customers</p>
              </div>
            </Link>
          </div>
          <div>
            <p>Customer Information</p>
            <div>
              <p>Blacklist customer</p>
              <DoDisturbIcon />
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.sectionTwo}>
          <div>
            <p>Name</p>
            <p><span>{firstname}</span>{' '}<span className={styles.capitalize}>{lastname}</span></p>
          </div>
          <div></div>
          <div>
            <p>Email</p>
            <p>{email ?? 'N/A'}</p>
          </div>
          <div></div>
          <div>
            <p>Phone</p>
            <p>{msisdn ?? 'N/A'}</p>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <div>
            <h3>Performance</h3>
          </div>
          <div>
            <div>
              <p>Number of transactions</p>
              <p>{totalRows}</p>
            </div>
            <div>
              <p>Total spend</p>
              <p>NGN {totalAmt}</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionFour}>
          <div>
            <h3>Recent transactions</h3>
          </div>
          <div className={styles.tableContainer}>
            <CustomClickTable
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerItem