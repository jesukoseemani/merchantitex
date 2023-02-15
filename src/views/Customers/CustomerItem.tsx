import NavBar from "../../components/navbar/NavBar";
import styles from "./CustomerItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import moment from "moment";
import CustomClickTable from "../../components/table/CustomClickTable";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import {
  GetRecentCustomerRes,
  RecentCustomerItem,
} from "../../types/CustomerTypes";
import { useCallback, useEffect, useState } from "react";

interface customerProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  transNum: number;
  total: number;
}
const CustomerItem = () => {
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  console.log("state", state);
  // if (!location?.state?.rowData) {
  //   history.replace("/customers");
  // }

  // console.log(lo);

  // const formattedRowData = JSON.parse(rowData);
  // transNum, total
  const { firstname, lastname, email, phone, total, transNum }: any = state;

  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [transactions, setTransactions] = useState<RecentCustomerItem[]>([]);
  const [rows, setRows] = useState<RecentCustomerItem[]>([]);
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
    id: "amount" | "status" | "customerID" | "added" | "paymentType";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }

  const columns: Column[] = [
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "status", label: "", minWidth: 100 },

    { id: "customerID", label: "Customer ID", minWidth: 100 },
    { id: "paymentType", label: "PaymentType", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const TransactionRowTab = useCallback(
    (amount, customerId, paymentType, added, status) => ({
      amount: <p className={styles.tableBodyText}>NGN{amount} </p>,
      status: (
        <span
          className={status === "Successful" ? styles.status : styles.pending}
        >
          {" "}
          {status}
        </span>
      ),
      customerID: <p className={styles.tableBodyText}>{customerId}</p>,

      paymentType: (
        <p className={styles.tableBodyText}>
          <span className={styles.capitalize}>{paymentType}</span>
        </p>
      ),
      added: (
        <p className={styles.tableBodyText}>
          {moment(added).format("MMM D YYYY h:mm A")}
        </p>
      ),
    }),
    []
  );

  const getTransactions = async () => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetRecentCustomerRes>(
        `/mockData/recentcustomerinfo.json?customerId=${id}`,
        { baseURL: "" }
      );
      const { transactions, _metadata } = res?.data;
      console.log(res);
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
  };

  // const getAllTransactions = async () => {
  //   dispatch(openLoader());
  //   try {
  //     const res = await axios.get<GetRecentCustomerRes>(
  //       `/mockData/recentcustomerinfo.json?customerId=${slug}`,
  //       { baseURL: "" }
  //     );
  //     console.log(res);
  //     const { transactions, _metadata } = res?.data;
  //     console.log(transactions);
  //     if (transactions.length) {
  //       // const total = transactions.reduce(
  //       //   (sum, current) => sum + Number(current.order.amount),
  //       //   0
  //       // );
  //       // setTotalAmt(total);
  //     }
  //     dispatch(closeLoader());
  //   } catch (err) {
  //     console.log(err);
  //     dispatch(closeLoader());
  //     dispatch(
  //       openToastAndSetContent({
  //         toastContent: "Failed to get transactions",
  //         toastStyles: {
  //           backgroundColor: "red",
  //         },
  //       })
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getAllTransactions();
  // }, [slug]);

  useEffect(() => {
    getTransactions();
  }, [pageNumber, rowsPerPage]);

  useEffect(() => {
    const newRowOptions: any[] = [];
    transactions?.map((each: RecentCustomerItem) =>
      newRowOptions.push(
        TransactionRowTab(
          each?.amount,
          each?.customerId,
          each?.paymentType,
          each?.added,
          each?.status
        )
      )
    );
    setRows(newRowOptions);
  }, [transactions, TransactionRowTab]);

  return (
    <div className={styles.container}>
      <NavBar name="Customers" />
      <hr />
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to="/customers">
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
            <p>
              <span>{firstname}</span>{" "}
              <span className={styles.capitalize}>{lastname}</span>
            </p>
          </div>
          <div></div>
          <div>
            <p>Email</p>
            <p>{email ?? "N/A"}</p>
          </div>
          <div></div>
          <div>
            <p>Phone</p>
            <p>{phone ?? "N/A"}</p>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <div>
            <h3>Performance</h3>
          </div>
          <div>
            <div>
              <p>Number of transactions</p>
              <p>{transNum}</p>
            </div>
            <div>
              <p>Total spend</p>
              <p>NGN {total}</p>
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
  );
};

export default CustomerItem;
