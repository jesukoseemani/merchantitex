import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import styles from './Refund.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {
	DownloadRefundsRes,
	GetRefundsRes,
	RefundItem,
} from '../../types/RefundTypes';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import OperantTable from '../../components/table/OperantTable';
import SingleRefundModal from './SingleRefundModal';
import FilterModal from './FilterModal';
import BulkRefundModal from './BulkRefundModal';
import CustomClickTable from '../../components/table/CustomClickTable';
import ParentContainer from '../../components/ParentContainer/ParentContainer';

const Refund = () => {
	const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
	const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
	const [refunds, setRefunds] = useState<RefundItem[]>([]);
	const [rows, setRows] = useState<RefundItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const currentDate = moment(new Date()).format('YYYY-MM-DD');

	const [fixedToDate, setFixedToDate] = useState(currentDate);
	const [dateInterval, setDateInterval] = useState<string | undefined>();

	const [filters, setFilters] = useState({
		email: '',
		fromdate: '',
		todate: '',
		paymentmethod: '',
		responsecode: '',
	});

	const [refundLogged, setRefundLogged] = useState<boolean>(false);
	const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

	const history = useHistory();
	const dispatch = useDispatch();

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
			'& .MuiButtonBase-root:nth-child(1), & .MuiButtonBase-root:nth-child(2)':
			{
				backgroundColor: '#E0E0E0',
				color: '#333',
			},
			'& .MuiButtonBase-root:nth-child(3)': {
				backgroundColor: '#27AE60',
				color: '#FFF',
				gap: '.5rem',
			},
			'& svg': {
				fontSize: '1rem',
				marginLeft: '.3rem',
				marginBottom: '.05rem',
			},
		},
	});

	const btnClasses = useBtnStyles();

	const open = Boolean(anchorEl);

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const getRefunds = async () => {
		dispatch(openLoader());
		const filterKeys = Object.keys(filters);
		const filterValues = Object.values(filters);
		let filterString = '';

		if (dateInterval) {
			let fromDate = '';

			if (dateInterval === 'year') {
				fromDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
			} else {
				fromDate = moment()
					.subtract(Number(dateInterval), 'days')
					.format('YYYY-MM-DD');
			}

			filterString = `&todate=${fixedToDate}&fromdate=${fromDate}`;
		}

		filterKeys.forEach((keyString, index) => {
			if (filterValues[index] === '') return;
			filterString += `&${keyString}=${filterValues[index]}`;
		});

		try {
			const res = await axios.get<GetRefundsRes>(
				`/admin/refunds?page=${pageNumber}&perpage=${rowsPerPage}${filterString}`
			);
			const { transactions, _metadata } = res?.data;
			if (transactions.length) {
				setRefunds(transactions);
				setTotalRows(_metadata?.totalcount);
			}
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to get transactions',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	const downloadRefunds = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<DownloadRefundsRes>(
				`/admin/refunds/download`
			);
			const { transaction } = res?.data;
			if (transaction.redirecturl) {
				window.open(transaction.redirecturl, '_blank');
			}
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to download transactions',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	interface Column {
		id: 'amount' | 'code' | 'email' | 'linkingreference' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'code', label: 'Status', minWidth: 100 },
		{ id: 'email', label: 'Customer ID', minWidth: 100 },
		{ id: 'linkingreference', label: 'Transaction reference', minWidth: 100 },
		{ id: 'added', label: 'Date', minWidth: 100 },
	];

	const formatStatus = (val: string) => {
		if (val === '00') {
			return <p className={styles.successText}>Successful</p>;
		} else if (val === '09') {
			return <p className={styles.failText}>Failed</p>;
		} else {
			return <p className={styles.pendingText}>Pending</p>;
		}
	};

	const RefundRowTab = useCallback(
		(amount, code, email, linkingreference, added) => ({
			amount: <p className={styles.tableBodyText}>NGN{amount}</p>,
			code: formatStatus(code),
			email: <p className={styles.tableBodyText}>{email}</p>,
			linkingreference: (
				<p className={styles.tableBodyText}>{linkingreference}</p>
			),
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY h:mm A')}
				</p>
			),
		}),
		[]
	);

	const openSingleModal = () => {
		setIsSingleModalOpen(true);
		handleMenuClose();
	};

	const openBulkModal = () => {
		setIsBulkModalOpen(true);
		handleMenuClose();
	};

	useEffect(() => {
		getRefunds();
	}, [pageNumber, rowsPerPage, refundLogged, filtersApplied]);

	useEffect(() => {
		const newRowOptions: any[] = [];
		refunds?.map((each: RefundItem) =>
			newRowOptions.push(
				RefundRowTab(
					each?.order.amount,
					each?.code,
					each?.source.customer.email,
					each?.transaction.linkingreference,
					each?.transaction.added
				)
			)
		);
		setRows(newRowOptions);
	}, [refunds, RefundRowTab]);

	return (

			<div className={styles.container}>
				<FilterModal
					isOpen={isFilterModalOpen}
					handleClose={() => setIsFilterModalOpen(false)}
					filters={filters}
					setFilters={setFilters}
					setFiltersApplied={setFiltersApplied}
					fixedToDate={fixedToDate}
					dateInterval={dateInterval}
					setDateInterval={setDateInterval}
				/>
				<SingleRefundModal
					isOpen={isSingleModalOpen}
					handleClose={() => setIsSingleModalOpen(false)}
					setRefundLogged={setRefundLogged}
				/>
				<BulkRefundModal
					isOpen={isBulkModalOpen}
					handleClose={() => setIsBulkModalOpen(false)}
					setRefundLogged={setRefundLogged}
				/>

				<div className={styles.pageWrapper}>
					<div className={styles.historyTopContainer}>
						<div>
							<p>{totalRows} Refunds</p>
						</div>
						<div className={btnClasses.root}>
							<Button onClick={() => setIsFilterModalOpen(true)}>
								All refunds <ArrowDropDownIcon />
							</Button>
							<Button onClick={() => downloadRefunds()}>
								Download <CloudUploadOutlinedIcon />
							</Button>
							<Button
								id='log-refund-button'
								aria-controls={open ? 'refund-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={handleMenuClick}>
								+ Log a refund
							</Button>
							<Menu
								id='refund-menu'
								anchorEl={anchorEl}
								open={open}
								onClose={handleMenuClose}
								MenuListProps={{
									'aria-labelledby': 'log-refund-button',
								}}
								PaperProps={{
									style: {
										maxWidth: '150px',
										padding: '.25rem',
									},
								}}>
								<MenuItem onClick={openSingleModal}>
									<p style={{ padding: '.4rem' }}>Log a Single refund</p>
								</MenuItem>
								<MenuItem onClick={openBulkModal}>
									<p style={{ padding: '.4rem' }}>Log Bulk refunds</p>
								</MenuItem>
							</Menu>
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
							link='/transactions/refund'
							identifier='linkingreference'
							rowsData={refunds}
						/>
					</div>
				</div>
			</div>
	);
};

export default Refund;
