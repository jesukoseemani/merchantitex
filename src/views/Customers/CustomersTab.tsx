import { TabStateType } from './Customers';
import TabPanel from './TabPanel';
import styles from './Customers.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import OperantTable from '../../components/table/OperantTable';
import moment from 'moment';
import { CustomerItem, GetCustomersRes } from '../../types/CustomerTypes';
import CustomClickTable from '../../components/table/CustomClickTable';

interface CustomersTabProps {
	value: TabStateType;
	index: TabStateType;
}

const CustomersTab = ({ value, index }: CustomersTabProps) => {
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

	const [customers, setCustomers] = useState<CustomerItem[]>([]);
	const [rows, setRows] = useState<CustomerItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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
		id: 'name' | 'email' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 100 },
		{ id: 'email', label: 'Email', minWidth: 100 },
		{ id: 'added', label: 'Date Added', minWidth: 100, align: 'right' },
	];

	const CustomerRowTab = useCallback(
		(firstname, lastname, email, added) => ({
			name: (
				<p className={styles.tableBodyText}>
					<span className={styles.capitalText}>{firstname}</span>{' '}
					<span className={styles.capitalText}>{lastname}</span>
				</p>
			),
			email: <p className={styles.tableBodyText}>{email}</p>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
					<span className={styles.tableBodySpan}>
						{' '}
						{moment(added).format('h:mm A')}
					</span>
				</p>
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
					each?.added
				)
			)
		);
		setRows(newRowOptions);
	}, [customers, CustomerRowTab]);

	const getCustomers = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetCustomersRes>(
				`/merchant/customers?page=${pageNumber}&perpage=${rowsPerPage}`
			);
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

	return (
		<TabPanel value={value} index={index}>
			<>
				<div className={styles.topContainer}>
					<div>
						<p>{totalRows} Customers</p>
					</div>
					<div className={btnClasses.root}>
						<Button>
							Download <FileDownloadOutlinedIcon />
						</Button>
						<Button>+ Add customer</Button>
					</div>
				</div>
				<div className={styles.tableContainer}>
					<CustomClickTable
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
						clickable
						link='/customers'
						identifier='email'
						rowsData={customers}
					/>
				</div>
			</>
		</TabPanel>
	);
};

export default CustomersTab;
