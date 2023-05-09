import TabPanel from './TabPanel';
import styles from './Customers.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Stack } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
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
import { closeModal, openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AddNewCustomer from './AddNewCustomer';
import Addtoblacklist from './Addtoblacklist';
import { getBlacklistedCustomers, getCustomersService, getDownloadedCustomers } from '../../services/customer';
import { stripEmpty, stripSearch } from '../../utils';
import useDownload from '../../hooks/useDownload';
import { BASE_URL } from '../../config';
import FilterModal from '../../components/filterModals/SettlementsFilterModal';
import { SETTLEMENT_FILTER_DATA } from '../../constant';

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

	const { calDownload } = useDownload({ url: `${BASE_URL}/customer/download`, filename: 'customer' })


	const btnClasses = useBtnStyles();

	const dispatch = useDispatch();
	const history = useHistory();
	const [customers, setCustomers] = useState<CustomerItem[]>([]);
	const [rows, setRows] = useState<CustomerItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const { search } = useLocation();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	const addCallback = () => {
		dispatch(closeModal());
	}

	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	interface Column {
		id: 'name' | 'email' | 'msisdn' | "added" | 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 150 },
		{ id: 'email', label: 'Email', minWidth: 150 },
		{ id: 'msisdn', label: 'Phone number', minWidth: 150 },
		{ id: 'added', label: 'Date added', minWidth: 100 },
		{ id: 'actions', label: 'Actions', minWidth: 100 },
	];

	const handleBLacklist = (id: string) => {
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
						<Addtoblacklist id={id} fn={getCustomers} />
					</div>
				),
			})
		);
	};

	const handleClick = (event: React.MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>, id: string) => {
		event.stopPropagation();
		handleBLacklist(id)
	};

	const CustomerRowTab = useCallback(
		(firstname, lastname, email, msisdn, isblacklisted, createdat, id) => ({
			name: (
				<p className={styles.tableBodyText}>
					<span className={styles.capitalText}>{firstname}</span>{' '}
					<span className={styles.capitalText}>{lastname}</span>
				</p>
			),
			id: <p className={styles.tableBodyText}>{id}</p>,
			email: <p className={styles.tableBodyText}>{email}</p>,
			msisdn: <p className={styles.tableBodyText}>{msisdn}</p>,
			added: <p className={styles.tableBodyText}>{createdat}</p>,

			actions: (
				isblacklisted ? <div></div> : <p style={{ color: "red" }} onClickCapture={(e) => handleClick(e, id)}>Blacklist</p>
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
					each?.msisdn,
					each.createdat,
					each.isblacklisted,
					each?.id
				)
			)
		);
		setRows(newRowOptions);
	}, [customers, CustomerRowTab]);

	console.log(customers);

	const getCustomers = async (form = SETTLEMENT_FILTER_DATA) => {
		dispatch(openLoader());
		try {
			const res = await getCustomersService(stripEmpty({ page: pageNumber, perpage: rowsPerPage, search: stripSearch(search), ...form }));
			setCustomers(res?.customers || []);
			setTotalRows(res?._metadata?.totalcount);
			dispatch(closeLoader());
		} catch (err: any) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: err?.response?.data?.message || 'Failed to get customers',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		getCustomers();
	}, [pageNumber, rowsPerPage, search]);

	const AddCustomer = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					width: "419px",
					minHeight: "475px",
					borderRadius: '20px',
					boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
				},
				modalTitle: "Add a new customer",
				modalContent: (
					<div className='modalDiv'>

						<AddNewCustomer callback={addCallback} fn={getCustomers} />
					</div>
				),
			})
		);
	};

	const action = (form = SETTLEMENT_FILTER_DATA) => {
		getCustomers(form)
	}

	return (

		<Box mt={"31px"}>
			<FilterModal
				isOpen={isFilterModalOpen}
				handleClose={() => setIsFilterModalOpen(false)}
				action={action}
			/>

			<Box>
				<Stack direction={"row"} flexWrap="wrap" justifyContent="space-between" gap={3}>
					<h2>{totalRows} customer(s)</h2>
					<Box className={styles.headerBox}>
						<button onClick={() => setIsFilterModalOpen(true)}><FilterAltOutlinedIcon />Filter by:</button>
						<button onClick={calDownload}> <InsertDriveFileOutlinedIcon />Download</button>
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
					link="/customers"
					identifier={"id"}
					rowsData={customers}
				/>
			</div>
		</Box>

	);
};

export default CustomersTab;
