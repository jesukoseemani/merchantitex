import React, { useState, useCallback, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Styles from './list.module.scss';
import { Button, Dropdown, Label, Input } from 'semantic-ui-react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import OperantTable from '../../components/table/OperantTable';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as ArrowRightIcon } from '../../assets/images/arrowRight.svg';
import { ReactComponent as InvoiceIcon } from '../../assets/images/invoice.svg';
import { ReactComponent as LinkIcon } from '../../assets/images/link.svg';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom';
import { subDays } from 'date-fns';
import { CSVLink } from 'react-csv';
import FilterModal from '../../components/FilterModal';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import { Box, Stack } from '@mui/material';
import { TransactionItem, Meta } from '../../types/Transaction';
import CustomClickTable from '../../components/table/CustomClickTable';
import { getTransactionsService } from '../../services/transaction';
import { getTransactionStatus } from '../../utils/status';
import { stripEmpty } from '../../utils';
import useDownload from '../../hooks/useDownload';
import { BASE_URL } from '../../config';

export default function TransactionsList() {

	const { calDownload } = useDownload({ url: `${BASE_URL}/transaction/download`, filename: 'transaction' })

	const history = useHistory();
	const { search } = useLocation()

	interface sortTypes {
		dateCustom: string | number;
		startDate: string;
		endDate: string;
		email: string;
		status: string;
		paymentType: string;
	}
	// DATE CONVERTION
	const now = new Date();
	const dateNow = moment().format('YYYY-MM-DD');
	const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
	const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
	const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
	const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

	// FOR FILTER METHOD

	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [ref, setRef] = useState('');
	const [status, setStatus] = useState('');
	const [payment, setPayment] = useState('');
	const [event, setEvent] = useState('');

	const [transactions, setTransactions] = useState<TransactionItem[]>([]);
	const [meta, setMeta] = useState<Meta | null>(null)
	const [count, setCounter] = useState(null);
	const [rows, setRows] = useState<TransactionItem[]>([]);
	const [showNoTransaction, setShowNoTransaction] = useState(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
	const [query, setquery] = useState(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [reset, setReset] = useState<boolean>(false);


	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	useEffect(() => {
		if (event === 'today') {
			setFromDate(dateNow);
			setToDate(dateNow);
		} else if (event === 'last7days') {
			setFromDate(sevenDaysAgo);
			setToDate(dateNow);
		} else if (event === 'last30days') {
			setFromDate(thirtyDaysAgo);
			setToDate(dateNow);
		} else if (event === 'oneyear') {
			setFromDate(startOfYear);
			setToDate(endOfYear);
		} else {
			setFromDate('');
			setToDate('');
		}
	}, [event]);

	const clearHandler = () => {
		setEvent('');
		setFromDate('');
		setToDate('');
		setStatus('');
		setRef('');
		setIsFilterModalOpen(false);
	};

	const changePage = (value: number) => {
		setPageNumber(value);
		setReset(false);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
		setReset(false);
	};

	const dispatch = useDispatch();

	const getTransactions = async () => {
		dispatch(openLoader());

		try {
			const data = await getTransactionsService(stripEmpty({
				perpage: rowsPerPage,
				page: pageNumber,
				fromdate: fromDate,
				todate: toDate,
				reference: ref,
				paymentmethod: payment,
				search,
				status
			}));
			setTransactions(data?.transactions || []);
			setMeta(data?._metadata || {})
		} catch (err: any) {
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: err?.response?.data?.message || 'Failed to get transactions',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		getTransactions();
	}, [pageNumber, rowsPerPage, fromDate, toDate, ref, payment, status, search]);

	const loadTransaction = (reference: string) => {
		history.push(`/transaction/${reference}`);
	};

	const modalFunc = () => {
		setIsFilterModalOpen(false)
		setReset(true);
	};
	interface Column {
		id: 'amount' | 'status' | 'email' | 'payment_type' | 'date';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';

	}
	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'email', label: 'Email address', minWidth: 200 },
		{ id: 'payment_type', label: 'Payment type', minWidth: 150 },
		{ id: 'date', label: 'Date', minWidth: 150 },
	];


	const statusFormatObj: { [key: string]: string } = {
		successful: "wonText",
		failed: "lostText",
		pending: "pendingText",
	};

	const LoanRowTab = useCallback(
		(amt, status, PaymentType, email, added, id) => ({
			amount: (
				<div
					// onClick={() => loadTransaction(transaction?.merchantreference)}
					className={Styles.amount}>
					<h2>
						<span
							style={{ color: "#828282", paddingRight: "1px" }}
						>NGN</span>{amt || 0}</h2>
				</div>
			),
			status: (
				<p className={Styles[statusFormatObj[status] || "pendingText"]} >{status}</p>
			),
			email: (
				<p>{email}</p>
			),
			payment_type: (
				<p>{PaymentType}</p>
			),
			date: (
				<p>	{added}</p>
			),
			id: <p>{id}</p>

		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: TransactionItem) =>
			newRowOptions.push(
				LoanRowTab(each.chargeamount, getTransactionStatus(each.responsecode), each.chargetype, each?.customer?.email, each.timein, each.paymentid)
			)
		);
		console.log(newRowOptions, 'rows')
		setRows(newRowOptions);
	}, [transactions, LoanRowTab]);

	return (
		<div className={Styles.container}>
			{/* <NavBar />  */}
			<FilterModal
				isOpen={isFilterModalOpen}
				handleClose={() => setIsFilterModalOpen(false)}
				setEvent={setEvent}
				setFromDate={setFromDate}
				setToDate={setToDate}
				setRef={setRef}
				setStatus={setStatus}
				setPayment={setPayment}
				eventDate={event}
				clearHandler={clearHandler}
				status={status}
				payment={payment}
				name='transaction'
				filterFunction={modalFunc}
				changePage={changePage}
			/>
			<div className={Styles.wrapper}>
				<div className={Styles.transaction__btn}>

					<Stack direction={"row"} justifyContent={"space-between"} flexWrap="wrap">
						<Box>
							<h2>{transactions?.length ?? 0} transactions</h2>
						</Box>
						<Box className={Styles.right__btn}>
							<Button onClick={() => setIsFilterModalOpen(true)}>
								<FilterAltOutlinedIcon />	Filter by:

							</Button>
							<Button onClick={calDownload}>
								Download
							</Button>
						</Box>

					</Stack>
				</div>


				{showNoTransaction && (
					<Box className={Styles.empty__tranasction}>
						<div
							style={{ display: `${query ? 'none' : 'flex'}` }}
							className={Styles.containerNew}>
							<Box className={Styles.header}>
								<h2>You don’t have any transactions, yet.</h2>
								<p>
									But, you can change that. Your customers might be looking for
									ways to pay, so go ahead and create a payment link or send
									them an invoice to be able to pay you.
								</p>
							</Box>
							<div
								className={Styles.panel}
							// onClick={() => history.push('/transactions/list')}
							>
								<div>
									<InvoiceIcon />
									<h2>Start collecting payments using invoice</h2>
									<Button className={Styles.primary}>Create an invoice</Button>
								</div>
								<div>
									<LinkIcon />
									<h2>Start collecting payments using payment link</h2>
									<Button className={Styles.primary}>
										Create payment link
									</Button>
								</div>
							</div>
						</div>
						<div
							style={{ display: `${query ? 'block' : 'none'}` }}
							className={Styles.header}>
							<p>THERE IS NO DATA FOR THIS QUERY</p>
						</div>
					</Box>
				)}

				{!showNoTransaction && (
					<CustomClickTable
						columns={columns}
						rows={rows}
						totalRows={meta?.totalcount || 0}
						changePage={changePage}
						limit={limit}
						// reset={reset}
						link="/transaction"
						clickable
						identifier="id"
						rowsData={transactions}
					/>
				)}
			</div>
		</div>

	);
}
