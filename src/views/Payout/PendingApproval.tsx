import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Checkbox, Icon, Label, Dropdown } from "semantic-ui-react";

import Styles from "./pending.module.scss";

import { Box, Stack } from "@mui/material";

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CustomClickTable from "../../components/table/CustomClickTable";
import moment from "moment";
import axios from "axios";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import { useDispatch } from "react-redux";
import { GetPendingApprovalRes, pendingApprovalRequestItem } from "../../types/pendingAprovalTypes";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";

const PendingApproval = () => {

  interface TransactionsProps {
    id: number,
    amount: number;
    status: string;
    receipient: string;
    date: {
      format: string;
      time: string;
    };
  }
  const status = [
    "Successful",
    "Pending",
    "Error",
    "Successful",
    "Successful",
    "Error",
  ];



  const [rows, setRows] = useState<pendingApprovalRequestItem[]>([]);
  const [history, setHistory] = useState<pendingApprovalRequestItem[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch()
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  // useEffect(() => {
  //   setTotalRows(history.length);
  // }, []);

  const statusOption = [
    { key: 1, value: "online", text: "Online" },
    { key: 2, value: "offline", text: "Offline" },
  ];
  const paymentOption = [
    { key: 1, value: "card", text: "Card" },
    { key: 2, value: "transfer", text: "Transfer" },
  ];
  interface Column {
    id: "checkbox" | "amount" | "status" | "receipient" | "date" | "action";
    label?: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    {
      id: "checkbox",
      label: <Checkbox />,
    },
    { id: "amount", label: "Amount", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "receipient", label: "Receipient", minWidth: 200 },
    { id: "date", label: "Date", minWidth: 100 },
    { id: "action", label: "Actions" },
  ];
  const LoanRowTab = useCallback(
    (amount, status, receipient, date, id) => ({
      checkbox: <Checkbox />,
      amount: (
        <div className={Styles.amount}>
          <span>NGN</span>
          <h2>{amount}</h2>
        </div>
      ),
      status: (
        <p className={Styles.pending}>{status}</p>
      ),
      receipient,
      date: (
        <div className={Styles.date}>
          <p>	{moment(date).format('h:mm A')}</p>

        </div>
      ),
      id: <p>{id}</p>,
      action: (
        <Dropdown text="" icon={"ellipsis horizontal"}>
          <Dropdown.Menu className={Styles.menuContainer}>
            <Dropdown.Item text="Approve" />
            <Dropdown.Item text="Decline" className="text-danger" />
            <Dropdown.Item text="Modify transfer" />
          </Dropdown.Menu>
        </Dropdown>
      ),
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    history?.map((each: pendingApprovalRequestItem) =>
      newRowOptions.push(
        LoanRowTab(each.amount, each.status, each.receipient, each.date, each.id)
      )
    );
    setRows(newRowOptions);
  }, [history, LoanRowTab]);


  const GetPendingRequest = async () => {
    dispatch(openLoader());

    try {
      const res = await axios.get<GetPendingApprovalRes>(
        '/mockData/pendingapproval.json',
        { baseURL: '' }
      );
      const { history, _metadata } = res?.data;
      console.log(history);
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
          toastContent: 'Failed to get items',
          toastStyles: {
            backgroundColor: 'red',
          },
        })
      );
    }
  };

  useEffect(() => {
    GetPendingRequest();
  }, [pageNumber, rowsPerPage]);
  const useStyles = makeStyles({
    container: {
      width: "407px",
      height: "auto",
      minHeight: "571px",
      background: "#ffffff",
      border: "1px solid #d5dae1",
      boxShadow: " 0px 10px 10px rgba(6, 44, 82, 0.92)",
      borderRadius: "3px",
    },
  });
  const classes = useStyles();
  const handleOpenDownloadMenu = () => {

  }
  const handleClickBeneficiary = () => {

  }

  return (

    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

      <div className={Styles.tableContainer}>
        <Box>
          <Box>
            <Stack direction={"row"} justifyContent="space-between" flexWrap={"wrap"} gap={3}>
              <h2>19 pending transfers</h2>
              <Box className={Styles.headerBox}>
                <button><FilterAltOutlinedIcon />Filter by:</button>
                <button onClick={handleOpenDownloadMenu}> <InsertDriveFileOutlinedIcon />Download</button>
                <button onClick={handleClickBeneficiary}>Aprove all</button>
              </Box>
            </Stack>
          </Box>
        </Box>
        <div className={Styles.wrapper}>

          <CustomClickTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
            clickable
            link="/payout/pending_approval/details"
            identifier={"id"}
            rowsData={history}
          />
        </div>
      </div>
    </div>

  );
}

export default PendingApproval;
