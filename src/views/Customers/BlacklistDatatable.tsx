import { Box, makeStyles, Stack } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import CustomClickTable from '../../components/table/CustomClickTable';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	CustomerItem,
	GetBlacklistCustomerRes,
} from '../../types/CustomerTypes';
import Addtoblacklist from './Addtoblacklist';
import styles from './blacklist.module.scss';
import RemoveBlacklist from './RemoveBlacklist';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { getBlacklistedCustomers } from '../../services/customer';

const BlacklistDatatable = () => {
	const theme = useTheme();


	const dispatch = useDispatch();
	const history = useHistory();
	const [transactions, setTransactions] = useState<CustomerItem[]>([]);
	const [rows, setRows] = useState<CustomerItem[]>([]);
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
		id: 'name' | 'email' | 'msisdn' | 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 150 },
		{ id: 'email', label: 'Email', minWidth: 150 },
		{ id: 'msisdn', label: 'MSISDN', minWidth: 150 },
		{ id: 'actions', label: 'Actions', minWidth: 100 },
	];

	const handleBLacklist = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					height: "254px",
					width: "653px",
					maxWidth: "97%",
					borderRadius: '20px',
					boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
				},
				modalContent: (
					<div className='modalDiv'>
						<RemoveBlacklist />
					</div>
				),
			})
		);
	};

	const CustomerRowTab = useCallback(
		(firstname, lastname, email, msisdn, id) => ({
			name: (
				<p className={styles.tableBodyText}>
					<span className={styles.capitalText}>{firstname}</span>{' '}
					<span className={styles.capitalText}>{lastname}</span>
				</p>
			),
			id: <p className={styles.tableBodyText}>{id}</p>,
			email: <p className={styles.tableBodyText}>{email}</p>,
			msisdn: <p className={styles.tableBodyText}>{msisdn}</p>,

			actions: (
				<button onClick={handleBLacklist} className={styles.ActionBtn}>
					Remove
				</button>
			),

		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: CustomerItem) =>
			newRowOptions.push(
				CustomerRowTab(
					each?.firstname,
					each?.lastname,
					each?.email,
					each?.msisdn,
					each?.id
				)
			)
		);
		setRows(newRowOptions);
	}, [transactions, CustomerRowTab]);

	const getCustomers = async () => {
		dispatch(openLoader());
		try {
			const res = await getBlacklistedCustomers();
			setTransactions(res?.customers || []);
			setTotalRows(res?._metadata?.totalcount || 0)
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to get customers',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		getCustomers();
	}, [pageNumber, rowsPerPage]);


	return (
		<Box py={"27px"}>


			<Box>
				<Stack direction={"row"} flexWrap="wrap" justifyContent="space-between" gap={3}>
					<h2 className={styles.blacklistHeader}>{transactions?.length} blacklisted customers</h2>
					<Box className={styles.headerBox}>
						<button ><FilterAltOutlinedIcon />Filter by:</button>
						{/* <button> <InsertDriveFileOutlinedIcon />Download</button> */}

					</Box>
				</Stack>
			</Box>
			<div className={styles.tableContainer} style={{ position: 'relative', marginTop: "17px" }}>
				<CustomClickTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
					// clickable
					// link="/customers"
					identifier='email'
					rowsData={transactions}
				/>
			</div>
		</Box>
	);
};

export default BlacklistDatatable;
