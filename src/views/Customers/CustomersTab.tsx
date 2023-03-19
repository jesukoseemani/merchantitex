import TabPanel from './TabPanel';
import styles from './Customers.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import { CustomerItem, GetCustomersRes } from '../../types/CustomerTypes';
import CustomClickTable from '../../components/table/CustomClickTable';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AddNewCustomer from './AddNewCustomer';
import Addtoblacklist from './Addtoblacklist';

const CustomersTab = ({ value, index }: any) => {
	const theme = useTheme();

	const useBtnStyles = makeStyles({
		root: {
			fontFamily: `'Avenir', sans-serif`,
			display: 'flex',
			gap: '1rem',
			[theme.breakpoints.down('sm')]: {
				flexDirection: 'column',
			},
			'& .MuiButtonBase-root': {
				borderRadius: '.25rem',
				padding: '.5rem 1rem',
				textTransform: 'none',
				fontSize: '.875rem',
				fontWeight: '400',
				alignItem: 'center',
				display: 'flex',
			},
			'& .MuiButtonBase-root:nth-child(1)': {
				backgroundColor: '#E0E0E0',
				color: '#333',
			},
			'& .MuiButtonBase-root:nth-child(2)': {
				backgroundColor: '#27AE60',
				color: '#FFF',
				gap: '.5rem',
			},
			'& svg': {
				fontSize: '1rem',
				marginLeft: '.25rem',
			},
		},
	});

	const btnClasses = useBtnStyles();

	const dispatch = useDispatch();
	const history = useHistory();
	const [customers, setCustomers] = useState<CustomerItem[]>([]);
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
		{ id: 'actions', label: 'Actions', minWidth: 250, align: 'right' },
	];

	const handleBLacklist = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					width: "653px",
					height: "254px",
					borderRadius: '20px',
					boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
				},
				modalContent: (
					<div className='modalDiv'>
						<Addtoblacklist />
					</div>
				),
			})
		);
	};

	const CustomerRowTab = useCallback(
		(firstname, lastname, email, added, phone, transNum, total) => ({
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
				<Stack
					direction={'row'}
					spacing={2}
					justifyContent='flex-end'
					className={styles.ActionBtn}>
					<button
						onClick={() =>
							history.push({
								pathname: `/customers/${email}`,
								state: {
									firstname,
									lastname,
									email,
									added,
									phone,
									transNum,
									total,
								},
							})
						}>
						View Details
					</button>
					<button onClick={handleBLacklist}>BlackList</button>
				</Stack>
			),
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		customers?.map((each: CustomerItem) =>
			newRowOptions.push(
				CustomerRowTab(
					each?.firstname,
					each?.lastname,
					each?.email,
					each?.added,
					each?.phone,
					each?.total,
					each?.transNum
				)
			)
		);
		setRows(newRowOptions);
	}, [customers, CustomerRowTab]);

	const getCustomers = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetCustomersRes>(
				'/mockData/customerRequest.json',
				{ baseURL: '' }
			);
			console.log(res?.data);
			const { customers, _metadata } = res?.data;
			if (customers.length) {
				setCustomers(customers);
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

	const AddCustomer = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					width: "419",
					height: "475px",
					borderRadius: '20px',
					boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
				},
				modalContent: (
					<div className='modalDiv'>
						<AddNewCustomer />
					</div>
				),
			})
		);
	};
	return (

		<Box mt={"27px"}>


			<Box>
				<Stack direction={"row"} flexWrap="wrap" justifyContent="space-between" gap={3}>
					<h2>19 transfers</h2>
					<Box className={styles.headerBox}>
						<button><FilterAltOutlinedIcon />Filter by:</button>
						<button> <InsertDriveFileOutlinedIcon />Download</button>
						<button onClick={AddCustomer}>+ Add customer</button>
					</Box>
				</Stack>
			</Box>

			<div className={styles.tableContainer} style={{ position: 'relative' }}>
				<CustomClickTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
					clickable
					link="/customers/3"
					// identifier={"id"}
					identifier="email"
				// rowsData={customers}
				/>
			</div>
		</Box>

	);
};

export default CustomersTab;
