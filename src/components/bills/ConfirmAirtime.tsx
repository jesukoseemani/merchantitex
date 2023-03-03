import { Box, IconButton, Stack } from '@mui/material'
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { ConfirmEntryRequestItem, GetConfirmEntryRes } from '../../types/BiilsTypes';
import CustomClickTable from '../table/CustomClickTable';
import Styles from "./payment.module.scss";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import EditIcon from "../../assets/images/edit-2.png"
import DeleteIcon from "../../assets/images/trash.png"
import { ReactSVG } from 'react-svg';
const ConfirmAirtime = () => {

    const [history, setHistory] = useState<ConfirmEntryRequestItem[]>([]);
    const [rows, setRows] = useState<ConfirmEntryRequestItem[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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
        id: "country" | "phone" | "amount" | "frequency";
        label: any;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "country", label: "Country", minWidth: 100 },
        { id: "phone", label: "Phone number", minWidth: 100 },
        { id: "amount", label: "Amount", minWidth: 100 },
        { id: "frequency", label: "How often do you want to recharge", minWidth: 100 },

    ];

    const billhistoryRowTab = useCallback(
        (country, phone, amount, frequency, id) => ({
            country: (
                <p className={Styles.tableBodyText}>

                    {country}
                </p>
            ),
            amount: (
                <p className={Styles.tableBodyText}>
                    <span className={Styles.tableBodySpan}>NGN </span>
                    {amount}
                </p>
            ),
            phone: (
                <p className={Styles.tableBodyText}>
                    <span>{phone}</span>
                </p>
            ),
            frequency: <Stack direction={"row"} justifyContent="space-between" alignItems={"center"} flexWrap="wrap">
                <p className={Styles.tableBodyText}>{frequency}</p>
                <Box sx={{ display: "flex", gap: "20px" }} >
                    <IconButton sx={{ background: "#fff" }}><img src={EditIcon} /></IconButton>
                    <IconButton><img src={DeleteIcon} /></IconButton>
                </Box>
            </Stack>


            // id: <p>{id}</p>,
        }),
        []
    );
    useEffect(() => {
        const newRowOptions: any[] = [];
        history?.map((each: ConfirmEntryRequestItem) =>
            newRowOptions.push(
                billhistoryRowTab(
                    each?.country,
                    each?.phone,
                    each?.amount,
                    each?.frequency,
                    each?.id,


                )
            )
        );
        setRows(newRowOptions);
    }, [history, billhistoryRowTab]);

    const getBillRequests = async () => {
        dispatch(openLoader());
        console.log();
        try {
            const res = await axios.get<GetConfirmEntryRes>(
                "/mockData/confirmairtime.json",
                { baseURL: "" }
            );
            const { history, _metadata } = res?.data;
            console.log(res?.data);
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
                    toastContent: "Failed to get items",
                    toastStyles: {
                        backgroundColor: "red",
                    },
                })
            );
        }
    };

    useEffect(() => {
        getBillRequests();
    }, [pageNumber, rowsPerPage]);


    const handleClickAirtime = () => { }
    return (
        <Box my={"50px"} className={Styles.comfirmEntries}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems="center">
                {" "}
                <h3 className={Styles.headerTitle}>1 Airtime purchase entries</h3>

                <button className={Styles.confirmBtn} onClick={handleClickAirtime}>Confirm airtime purchase</button>

            </Stack>

            <Box sx={{ my: "21px" }}>
                <CustomClickTable
                    columns={columns}
                    rows={rows}
                    totalRows={totalRows}
                    changePage={changePage}
                    limit={limit}
                    // clickable
                    // link="/bill/requests"
                    identifier="id"
                    rowsData={history}
                />
            </Box>
        </Box>
    )
}

export default ConfirmAirtime