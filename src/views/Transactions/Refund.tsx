import React, { useCallback, useEffect, useState } from 'react';
import styles from './Refund.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {
	DownloadRefundsRes,
	// GetRefundsRes,
	// RefundItem,
} from '../../types/RefundTypes';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import SingleRefundModal from './SingleRefundModal';
import FilterModal from './FilterModal';
import BulkRefundModal from './BulkRefundModal';
import CustomClickTable from '../../components/table/CustomClickTable';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { RefundItem } from '../../types/RefundTypes';
import BeneficiaryMenu from '../Payout/BeneficiaryMenu';
import { getRefundsService } from '../../services/refund';




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
	const { search } = useLocation()

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

	const theme = useTheme();
	const [refundLogged, setRefundLogged] = useState<boolean>(false);
	const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
	const [refundMenu, setRefundMenu] = React.useState<null | HTMLElement>(null);
	const history = useHistory();
	const dispatch = useDispatch();

	// refund deopdown menu
	const openRefundMenu = Boolean(refundMenu);

	const handleClickRefundMenu = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setRefundMenu(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setRefundMenu(null);
	};
	const openSingleModal = () => {
		setIsSingleModalOpen(true);
		handleMenuClose();
	};

	const openBulkModal = () => {
		setIsBulkModalOpen(true);
		handleMenuClose();
	};

	const data = [
		{
			id: 1,
			name: "Log a Single refund",
			func: openSingleModal,
		},
		{
			id: 2,
			name: "Log Bulk refunds",
			func: openBulkModal,
		},


	];


	const useBtnStyles = makeStyles({
		root: {
			fontFamily: `'Avenir', sans-serif`,
			display: 'flex',
			gap: '1rem',
			flexWrap: "wrap",
			[theme.breakpoints.down('sm')]: {
				// flexDirection: 'column',
				marginTop: "20px"
			},
			'& .MuiButtonBase-root': {
				borderRadius: '20px',
				padding: '.5rem 1rem',
				height: "32px",
				textTransform: 'none',
				fontSize: '.875rem',
				fontWeight: '400',
				alignItem: 'center',
				display: 'flex',
			},
			'& .MuiButtonBase-root:nth-child(1)':
			{
				backgroundColor: '#E0E0E0',
				color: '#333',
			},

			'& .MuiButtonBase-root:nth-child(2)':
			{
				backgroundColor: 'transparent',
				color: '#095B2C',
				border: "1px solid #27AE60",
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
		// const filterKeys = Object.keys(filters);
		// const filterValues = Object.values(filters);
		// let filterString = '';

		// if (dateInterval) {
		// 	let fromDate = '';

		// 	if (dateInterval === 'year') {
		// 		fromDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
		// 	} else {
		// 		fromDate = moment()
		// 			.subtract(Number(dateInterval), 'days')
		// 			.format('YYYY-MM-DD');
		// 	}

		// 	filterString = `&todate=${fixedToDate}&fromdate=${fromDate}`;
		// }

		// filterKeys.forEach((keyString, index) => {
		// 	if (filterValues[index] === '') return;
		// 	filterString += `&${keyString}=${filterValues[index]}`;
		// });

		try {
			const res = await getRefundsService({
				page: pageNumber,
				perpage: rowsPerPage,
				search
			});
			console.log(res, 'res');
			setRefunds(res?.refunds || []);
			setTotalRows(res?._metadata?.totalcount || 0)
			// if (history.length) {
			// 	setRefunds(res?.transactions);
			// 	setTotalRows(_metadata?.totalcount);
			// }
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
		id: 'amount' | 'status' | 'email' | 'linkingreference' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 80 },
		{ id: 'status', label: 'Status', minWidth: 70 },
		{ id: 'email', label: 'Email address', minWidth: 100 },
		{ id: 'linkingreference', label: 'Transaction reference', minWidth: 250 },
		{ id: 'added', label: 'Date', minWidth: 170 },
	];

	const statusFormatObj: { [key: string]: string } = {
		successful: "wonText",
		failed: "lostText",
		pending: "pendingText",
	};


	const RefundRowTab = useCallback(
		(amt, status, reference, acctId, added, id) => ({
			amount: <div className={styles.amount}>					<h2>
				<span
					style={{ color: "#828282", paddingRight: "1px" }}
				>NGN</span>{amt}</h2></div>,
			// code: formatStatus(code),
			email: <p className={styles.tableBodyText}>{acctId}</p>,
			status: (
				<p className={styles[statusFormatObj[status] || "pendingText"]} >{status}</p>
			),
			linkingreference: (
				<p className={styles.tableBodyText}>{reference}</p>
			),
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY h:mm A')}
				</p>
			),
			id: <p>{id}</p>
		}),
		[]
	);



	useEffect(() => {
		getRefunds();
	}, [pageNumber, rowsPerPage, refundLogged, filtersApplied, search]);

	useEffect(() => {
		const newRowOptions: any[] = [];
		// refunds?.map((each: RefundItem) =>
		// 	newRowOptions.push(
		// 		RefundRowTab(
		// 			each?.amt,
		// 			each?.status,
		// 			each?.reference,
		// 			each?.acctId,
		// 			each?.added,
		// 			each?.id,
		// 		)
		// 	)
		// );
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
			// setToDate={setToDate}
			// setRef={setRef}
			// setStatus={setStatus}
			// setPayment={setPayment}
			// eventDate={event}
			// clearHandler={clearHandler}
			// status={status}
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
						<p>{refunds?.length} Refunds</p>
					</div>
					<div className={btnClasses.root}>
						<Button onClick={() => setIsFilterModalOpen(true)}>
							<FilterAltOutlinedIcon />Filter by:
						</Button>
						<Button onClick={() => downloadRefunds()}>
							<InsertDriveFileOutlined />Download
						</Button>
						<Button
							id='log-refund-button'
							aria-controls={open ? 'refund-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClickRefundMenu}>
							+ Log a refund
						</Button>

						<BeneficiaryMenu
							openBeneficiary={openRefundMenu}
							handleCloseMenu={handleCloseMenu}
							beneficiary={refundMenu}
							data={data}
							style={{
								width: "max-content",
								borderRadius: "10px",
								boxShadow: "0px 0px 0px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15)",
								marginTop: "5px",
							}}

						/>

					</div>
				</div>
				<div className={styles.tableContainer}>
					<CustomClickTable
						columns={columns}
						rows={rows}
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
						// clickable
						// link='/transactions/refund'
						// identifier='linkingreference'
						rowsData={refunds}
					/>
				</div>
			</div>
		</div>
	);
};

export default Refund;
