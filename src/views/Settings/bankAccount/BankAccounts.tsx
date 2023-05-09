import React, { useState, useCallback, useEffect } from "react";
import NavBar from "../../../components/navbar/NavBar";
import Styles from "./bank.module.scss";
import {
  Dropdown,
  Menu,
  Button,
  Modal,
  Form,
  Select,
  Label,

} from "semantic-ui-react";
import OperantTable from "../../../components/table/OperantTable";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoader,
  openLoader,
} from "../../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../../redux/actions/toast/toastActions";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Checkbox, Stack } from "@mui/material";
import EditIcon from "../../../assets/images/editicon.svg"
import DeleteIcon from "../../../assets/images/delete.svg"
import { CircleFlag } from 'react-circle-flags'
import { ReactSVG } from "react-svg";
import { openModalAndSetContent } from "../../../redux/actions/modal/modalActions";
import AddBank from "./AddBank";
import { fetchBankAcct } from "../../../redux/actions/settings/BankAccount";
import Navigation from "../../../components/navbar/Navigation";
import CustomStatus from "../../../components/customs/CustomStatus";


interface TransactionsProps {
  id?: number;
  accountname: string;
  accountnumber: number;
  accounttype?: string;
  createdat?: string;
  swiftcode?: string;
  sortcode?: string;
  iban?: string;
  merchantaccountid?: number;
  merchantaccountsettlementaccountid?: number;
  bank: string;
  bankcode: number;
  currency: string;
  country: string;
  status: string;

}
const BankAccounts = () => {
  const [rows, setRows] = useState<TransactionsProps[]>([]);
  const [settlements, setSettlement] = useState<TransactionsProps[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();








  const getTransactions = () => {
    dispatch(openLoader());
    axios
      .get<any>(`/v1/setting/settlement/account?page=${pageNumber}&perpage=${rowsPerPage}`)
      .then((res: any) => {
        const { accounts } = res?.data;
        // const { account } = business?.settlement;
        console.log(accounts, "accounts")
        setTotalRows(accounts?.length);
        setSettlement(accounts);
        dispatch(fetchBankAcct(accounts))
        dispatch(closeLoader());
      })
      .catch((error: any) => {
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

  interface Column {
    id:
    | "accountnumber"
    | "accountname"
    | "bank"
    | "country"
    | "currency"
    | "status"
    | "action";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "accountname", label: "Beneficiary", minWidth: 200 },
    { id: "accountnumber", label: "Account number", minWidth: 100 },
    { id: "bank", label: "Beneficiary Bank", minWidth: 200 },
    { id: "country", label: "Country", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
    { id: "status", label: "Ranking", minWidth: 100 },
    { id: "action", label: "Action", align: "center", minWidth: 100 },
  ];
  const LoanRowTab = useCallback((
    accountname?: string,
    accountnumber?: number,
    bank?: string,
    country?: string,
    currency?: string,
    status?: string,
    bankcode?: number,
    id?: number,
    merchantaccountsettlementaccountid?: number,
    accounttype?: string,
    createdat?: string,
    swiftcode?: string,
    sortcode?: string,
    iban?: string,
    merchantaccountid?: number,


  ) => ({

    accountname: accountname?.toLowerCase(),
    accountnumber,
    bank: bank?.toLowerCase(),
    country: (<Box display={"flex"} alignItems={"center"} gap={1}><CircleFlag countryCode={`${country?.toLocaleLowerCase()}`} height="20" />{country}</Box>),
    currency,
    status: (

      <CustomStatus type={status} text={String(status)} />),
    id,
    bankcode,
    action: (<Stack direction={"row"}>
      <IconButton onClick={() => handleEditBAnk({ data: { id, accountnumber, currency, bank, accountname, country, bankcode } })}><ReactSVG src={EditIcon} /></IconButton>
      <IconButton><ReactSVG src={DeleteIcon} /></IconButton>

    </Stack>),
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
          each.bank,
          each.country,
          each.currency,
          each.status,
          each.bankcode,
          each.id,
          each.merchantaccountsettlementaccountid,
          each.createdat,
          each.sortcode,
          each.accounttype,
          each.iban,
          // each.merchantaccountid
        )
      )
    );
    setRows(newRowOptions);
  }, [settlements, LoanRowTab]);



  const handleEditBAnk = (data: any) => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: 20,
          minHeight: "600px"

        },
        modalTitle: 'Add/Edit Bank',
        modalContent: (
          <div className={Styles.modalDiv}>
            <AddBank data={data} getTransactions={getTransactions} />
          </div>
        ),
      })
    );
  }
  const showBankModal = (data: any) => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: 20,
          minHeight: "600px"

        },
        modalTitle: 'Add/Edit Bank',
        modalContent: (
          <div className={Styles.modalDiv}>
            <AddBank data="" title='Add/Edit Bank' getTransactions={getTransactions} />
          </div>
        ),
      })
    );
  }



  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>


      <div className={Styles.container}>
        <div className={Styles.formHeader}>
          <div>
            <h2>{settlements?.length} Settlement bank accounts </h2>
          </div>
          <button style={{ borderRadius: "20px" }} onClick={showBankModal} className="success">
            + Add bank account
          </button>
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
