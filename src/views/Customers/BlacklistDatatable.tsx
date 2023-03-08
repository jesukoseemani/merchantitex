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
	BlacklistCustomerItem,
	GetBlacklistCustomerRes,
} from '../../types/CustomerTypes';
import Addtoblacklist from './Addtoblacklist';
import styles from './blacklist.module.scss';
import RemoveBlacklist from './RemoveBlacklist';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const BlacklistDatatable = () => {
	const theme = useTheme();


	const dispatch = useDispatch();
	const history = useHistory();
	const [transactions, setTransactions] = useState<BlacklistCustomerItem[]>([]);
	const [rows, setRows] = useState<BlacklistCustomerItem[]>([]);
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
		id: 'name' | 'email' | 'phone' | 'added' | 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';

	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 150 },
		{ id: 'email', label: 'Email', minWidth: 150 },
		{ id: 'phone', label: 'Phone Numbers', minWidth: 150 },
		{ id: 'added', label: 'Date Added', minWidth: 150, align: 'left' },
		{ id: 'actions', label: 'Actions', minWidth: 100, align: 'left' },
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
		(firstname, lastname, email, added, phone) => ({
			name: (
				<p className={styles.tableBodyText}>
					<span className={styles.capitalText}>{firstname}</span>{' '}
					<span className={styles.capitalText}>{lastname}</span>
				</p>
			),
			email: <p className={styles.tableBodyText}>{email}</p>,
			phone: <p className={styles.tableBodyText}>{phone}</p>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
					<span className={styles.tableBodySpan}>
						{' '}
						{moment(added).format('h:mm A')}
					</span>
				</p>
			),
			actions: (
				<button onClick={handleBLacklist} className={styles.ActionBtn}>
					Removes from BlackList
				</button>
			),
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: BlacklistCustomerItem) =>
			newRowOptions.push(
				CustomerRowTab(
					each?.firstname,
					each?.lastname,
					each?.email,
					each?.added,
					each?.phone
				)
			)
		);
		setRows(newRowOptions);
	}, [transactions, CustomerRowTab]);

	const getCustomers = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetBlacklistCustomerRes>(
				'/mockData/blacklistcustomer.json',
				{ baseURL: '' }
			);
			console.log(res?.data);
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
				<Stack direction={"row"} justifyContent="space-between" gap={3}>
					<h2>{transactions?.length} blacklisted customers</h2>
					<Box className={styles.headerBox}>
						<button><FilterAltOutlinedIcon />Filter by:</button>
						<button> <InsertDriveFileOutlinedIcon />Download</button>

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
