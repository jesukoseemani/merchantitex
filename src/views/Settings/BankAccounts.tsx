import React, { useState, useCallback, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./Settings.module.scss";
import {
  Dropdown,
  Menu,
  Button,
  Modal,
  Form,
  Select,
  Label,
  Checkbox,
} from "semantic-ui-react";
import OperantTable from "../../components/table/OperantTable";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import ParentContainer from "../../components/ParentContainer/ParentContainer";


const BankAccounts = () => {
  interface TransactionsProps {
    accountname: string;
    accountnumber: number;
    bankname: string;
    currency: string;
    status: string;
  }
  const [rows, setRows] = useState<TransactionsProps[]>([]);
  const [settlements, setSettlement] = useState<TransactionsProps[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const bankData = useSelector((state) => state?.countryReducer?.country.banks);


  const countryOptions = [{ key: 1, value: "nigeria", text: "Nigeria" }];
  const currencyOptions = [
    { key: 1, value: "ngn", text: "NGN" },
    { key: 2, value: "usd", text: "USD" },
  ];

  const bankOptions = [
    { key: 1, value: "Access bank", text: "Access bank" },
    { key: 2, value: "GTB", text: "GTBank" },
  ];

  const getTransactions = () => {
    dispatch(openLoader());
    axios
      .get(`/merchant/account/me?page=${pageNumber}&perpage=${rowsPerPage}`)
      .then((res: any) => {
        const { business } = res?.data;
        const { account } = business?.settlement;
        setTotalRows(account?.length);
        setSettlement(account);
        dispatch(closeLoader());
      })
      .catch((error) => {
        dispatch(closeLoader());
        if (error.response) {
          const { message } = error.response.data;
          dispatch(
            openToastAndSetContent({
              toastContent: message,
              toastStyles: {
                backgroundColor: "red",
              },
            })
          );
        } else if (error.request) {
          dispatch(
            openToastAndSetContent({
              toastContent: "Error occured",
              toastStyles: {
                backgroundColor: "red",
              },
            })
          );
        } else {
          dispatch(
            openToastAndSetContent({
              toastContent: error.message,
              toastStyles: {
                backgroundColor: "red",
              },
            })
          );
        }
      });
  };

  useEffect(() => {
    getTransactions();
  }, [pageNumber, rowsPerPage]);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const paymentOption = [
    { key: 1, value: "card", text: "Card" },
    { key: 2, value: "transfer", text: "Transfer" },
  ];
  interface Column {
    id:
    | "account_name"
    | "account_number"
    | "bank_name"
    | "currency"
    | "status"
    | "action";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "account_name", label: "Account name", minWidth: 100 },
    { id: "account_number", label: "Account number", minWidth: 100 },
    { id: "bank_name", label: "Bank name", minWidth: 200 },
    { id: "currency", label: "Currency", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", align: "right", minWidth: 100 },
  ];
  const LoanRowTab = useCallback(
    (
      account_name: string,
      account_number: number,
      bank_name: string,
      currency: string,
      status: string
    ) => ({
      account_name,
      account_number,
      bank_name,
      currency: 'NGN',
      status: (
        <Label
          className={
            status?.toLowerCase() === 'primary'
              ? 'success'
              : status?.toLowerCase() === 'new'
                ? 'warning'
                : 'danger'
          }>
          {status}
        </Label>
      ),
      action: <IconButton className='action text-success'>Edit</IconButton>,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    settlements?.map((each: TransactionsProps) =>
      newRowOptions.push(
        LoanRowTab(
          each.accountname,
          each.accountnumber,
          each.bankname,
          each.currency,
          each.status
        )
      )
    );
    setRows(newRowOptions);
  }, [settlements, LoanRowTab]);

  const AccountModal = () => {
    return (
      <Modal
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
        className={Styles.modalContainer}
      >
        <div className={Styles.modalHeader}>
          <h2>Add a bank account</h2>
          <IconButton onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Form.Field className={Styles.inputWrapper}>
          <label>Country</label>
          <Select placeholder="Select country" options={countryOptions} />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Account currency</label>
          <Select placeholder="Select currency" options={currencyOptions} />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Bank name</label>
          <Select placeholder="" options={bankData} />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Account number</label>
          <input placeholder="1234567890" />
        </Form.Field>
        <p>Resolved Account name</p>
        <Checkbox
          className={Styles.checkmark}
          label="Make my profile visible"
        />
        <div className={Styles.modalFooter}>
          <Button>Continue</Button>
        </div>
      </Modal>
    );
  };

  return (

    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <AccountModal />

      <div className={Styles.container}>
        <div className={Styles.formHeader}>
          <div>
            <h2>Settlement bank accounts</h2>
          </div>
          <Button onClick={() => setOpenModal(true)} className="success">
            + Add bank account
          </Button>
        </div>
        <div className={Styles.tableWrapper}>
          <OperantTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
