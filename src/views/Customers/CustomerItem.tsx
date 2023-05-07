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
  Customer as CustomerType,
  GetRecentCustomerRes,
  RecentCustomerItem,
} from "../../types/CustomerTypes";
import { useCallback, useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import Addtoblacklist from "./Addtoblacklist";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import { CustomerItem as Customer } from '../../types/CustomerTypes';
import { getCustomerById } from "../../services/customer";



interface customerProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  transNum: number;
  total: number;
}
const CustomerItem = () => {
  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();


  // const { desc, name, amt, linkType, url, added, website, img, frequency, chargeCount, phone } = formattedRowData;
  // transNum, total

  const [transactions, setTransactions] = useState<RecentCustomerItem[]>([]);
  const [customer, setCustomer] = useState<CustomerType | null>(null)
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
    { id: "amount", label: "Amount", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 100 },

    { id: "customerID", label: "Email address", minWidth: 300 },
    { id: "paymentType", label: "PaymentType", minWidth: 100 },
    { id: "added", label: "Date", minWidth: 100 },
  ];

  const TransactionRowTab = useCallback(
    (amount, customerId, paymentType, added, status) => ({
      amount: <p className={styles.tableBodyText}>NGN{amount} </p>,
      status: (
        <span
          className={status === "Successful" ? "success-status" : "warning-status"}
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


  const getSingleCustomer = async () => {
    dispatch(openLoader());
    try {
      const res = await getCustomerById(slug);
      setCustomer(res?.customer || {});
      setTransactions(res?.transactions || [])
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to get single customer",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  };

  useEffect(() => {
    if (slug) {
      getSingleCustomer()
    }
  }, [slug])



  const callback = () => {
    getSingleCustomer()
  }

  const handleBLacklist = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: "653px",
          height: "500px !important",
          borderRadius: '20px',
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"

        },
        modalTitle: "Blacklist customer",
        modalContent: (
          <div className='modalDiv'>
            <Addtoblacklist id={slug} callback={callback} />
          </div>
        ),
      })
    );
  };

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

        </div>

        <Box className={styles.layerOneWrapper}>
          <div className={styles.titleText}>
            <p>Customer Information</p>
            {!customer?.isblacklisted && <div onClick={handleBLacklist}>
              <p>Blacklist customer</p>
              <DoDisturbIcon />
            </div>}
          </div>
          <div className={styles.sectionTwo}>
            <div>
              <Avatar sx={{ bgcolor: "#2684ED", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {`${customer?.firstname.substring(0, 1)} ${customer?.lastname.substring(0, 1)}`}
              </Avatar>
              <div>
                <p>Name</p>
                <span>
                  <span>{`${customer?.firstname || ''} ${customer?.lastname || ''}`}</span>{" "}
                </span>
              </div>
            </div>


            <div>
              <p>Email</p>
              <span>{customer?.email ?? "N/A"}</span>
            </div>

            <div>
              <p>Phone</p>
              <span>{customer?.msisdn ?? "N/A"}</span>
            </div>
          </div>


        </Box>
        <Box className={styles.layerTwoWrapper}>

          <div className={styles.titleText}>
            <h3>Performance</h3>
          </div>
          <div className={styles.sectionTwo}>

            <div>
              <p>Number of transactions</p>
              <span>0</span>
            </div>

            <div>
              <p>Total spend</p>
              <span>NGN 0 </span>
            </div>
          </div>
        </Box>

        <div className={styles.sectionFour}>
          <div className={styles.transHeader}>
            <h3>Recent transactions</h3>
            <p>See all customer’s transactions</p>
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
