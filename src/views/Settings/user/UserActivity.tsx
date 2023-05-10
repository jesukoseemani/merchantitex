import React from 'react'
import { useHistory } from 'react-router-dom';
import UseFetch from '../../../components/hooks/UseFetch';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import OperantTable from '../../../components/table/OperantTable';
import axios from 'axios';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { Box } from '@mui/material';





interface ActivityProps {
    activity: string;
    created: string;
    eventtype: string;
    id: number
    ipaddress: string;
    platform: string;
    useragent: string;
    userid: number
}

const UserActivity = () => {
    const history = useHistory<any>()
    const { id } = history?.location?.state
    const [rows, setRows] = useState<ActivityProps[]>([]);
    const [activities, setActivities] = useState<ActivityProps[]>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();


    // const [data, loading] = UseFetch(`/v1/users/${id}/activities`)




    const getUserActivities = () => {
        dispatch(openLoader());
        axios
            .get<any>(`/v1/users/${id}/activities?page=${pageNumber}&perpage=${rowsPerPage}`)
            .then((res: any) => {
                const { activities } = res?.data;
                // const { account } = business?.settlement;
                console.log(activities, "activities")
                setTotalRows(activities?.length);
                setActivities(activities);
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
                }
            });
    };

    useEffect(() => {
        getUserActivities();
    }, [pageNumber, rowsPerPage]);


    const changePage = (value: number) => {
        setPageNumber(value);
    };

    const limit = (value: number) => {
        setRowsPerPage(value);
    };

    interface Column {
        id:
        | "activity"
        | "userid"
        | "eventtype"
        | "id"
        | "ipaddress"
        | "platform"
        | "created"
        label: any;
        minWidth?: number;
        align?: "right" | "left" | "center";
    }
    const columns: Column[] = [
        { id: "userid", label: "Userid", minWidth: 100 },
        { id: "id", label: "Acct.id", minWidth: 100 },
        { id: "activity", label: "Activity", minWidth: 200 },
        { id: "eventtype", label: "Eventtype", minWidth: 200 },
        { id: "ipaddress", label: "ipaddress", minWidth: 100 },
        { id: "platform", label: "Platform", minWidth: 100 },
        { id: "created", label: "created", minWidth: 100 },
    ];


    const LoanRowTab = useCallback((
        userid: number,
        id: number,
        activity: string,
        created: string,
        eventtype: string,
        ipaddress: string,
        platform: string,
        useragent: string,


    ) => ({
        userid,
        id,
        activity,
        eventtype,
        ipaddress,
        platform,
        useragent,
        created,
    }),
        []
    );
    useEffect(() => {
        const newRowOptions: any[] = [];
        activities?.map((each: ActivityProps) =>
            newRowOptions.push(
                LoanRowTab(
                    each.userid,
                    each.id,
                    each.activity,
                    each.eventtype,
                    each.ipaddress,
                    each.platform,
                    each.useragent,
                    each.created

                )
            )
        );
        setRows(newRowOptions);
    }, [activities, LoanRowTab]);



    return (
        <Box mt={4}>
            <OperantTable
                columns={columns}
                rows={rows}
                totalRows={totalRows}
                changePage={changePage}
                limit={limit}
            />
        </Box>
    )
}

export default UserActivity

