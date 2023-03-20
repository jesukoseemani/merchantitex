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
import { useHistory } from 'react-router-dom';
import { subDays } from 'date-fns';
import { CSVLink } from 'react-csv';
import FilterModal from '../../components/FilterModal';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import { Box, Stack } from '@mui/material';
import { GetTransactionRes, TransactionItem } from '../../types/Transaction';
import CustomClickTable from '../../components/table/CustomClickTable';

export default function TransactionsList() {
	const [download, setDownload] = useState([]);
	const [change, setChange] = useState(true);

	const history = useHistory();
	// const { merchantcode } = useSelector(
	// 	(state) => state?.meReducer?.me?.business
	// );

	useEffect(() => {
		axios
			.get(
				`https://staging.itex-pay.com/ipg/api/v1/merchant/transactions/download`
			)
			.then((res: any) => {
				setDownload(res.data);
			})
			.catch((err) => {
				console.log(err);
				dispatch(
					openToastAndSetContent({
						toastContent: 'No data founds',
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	}, []);

	interface TransactionsProps {
		order: {
			amount: number;
			description: string;
			currency: string;
			country: string;
			fee: {
				merchantbearsfee: string;
			};
		};
		code: string;
		source: {
			customer: {
				firstname: string;
				lastname: string;
				email: string;
				msisdn: string;
				card: {
					number: string;
					first6: string;
					last4: string;
					type: string;
				};
				device: {
					fingerprint?: string;
					ip: string;
				};
				address: [];
			};
		};
		transaction: {
			merchantreference: string;
			reference: string;
			authoption: string;
			paymentmethod: string;
			added: string;
			authcode: string;
			acquirer: string;
		};
		date: {
			format: string;
			time: string;
		};
	}

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
	const [count, setCounter] = useState(null);
	const [rows, setRows] = useState<TransactionItem[]>([]);
	const [showNoTransaction, setShowNoTransaction] = useState(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
	const [query, setquery] = useState(false);
	const [bearer, setBearer] = useState(false);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
		setBearer(true);
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

	// const getTransactions = () => {
	// 	dispatch(openLoader());
	// 	axios
	// 		.get(
	// 			`/merchant/transactions?perpage=${rowsPerPage}&page=${pageNumber}&fromdate=${fromDate}&todate=${toDate}&transaction_reference=${ref}&responsecode=${status}&paymentmethod=${payment}`
	// 		)
	// 		.then((res: any) => {
	// 			const {
	// 				transactions,
	// 				_metadata: { totalcount },
	// 			} = res?.data;
	// 			setTotalRows(totalcount);

	// 			if (totalcount <= 0) {
	// 				setShowNoTransaction(true);
	// 			} else {
	// 				setShowNoTransaction(false);
	// 			}
	// 			setTransactions(transactions);
	// 			setCounter(totalcount);
	// 			setBearer(false);
	// 			dispatch(closeLoader());
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			dispatch(closeLoader());
	// 			dispatch(
	// 				openToastAndSetContent({
	// 					// toastContent: "Login Failed",
	// 					toastContent: err?.response?.data?.message,

	// 					toastStyles: {
	// 						backgroundColor: 'red',
	// 					},
	// 				})
	// 			);
	// 		})
	// 		.finally(() => {
	// 			setIsFilterModalOpen(false);
	// 		});
	// };

	const getTransactions = async () => {
		dispatch(openLoader());

		try {
			const res = await axios.get<GetTransactionRes>(
				'/mockData/transactionrequest.json',
				{ baseURL: '' }
			);
			const { transactions, _metadata } = res?.data;
			console.log(history);
			if (history.length) {
				setTransactions(transactions);
				setTotalRows(_metadata?.totalcount);
			}
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

	useEffect(() => {
		getTransactions();
	}, [pageNumber, rowsPerPage]);


	const loadTransaction = (reference: string) => {
		history.push(`/transaction/${reference}`);
	};

	useEffect(() => {
		getTransactions();
	}, [pageNumber, rowsPerPage, bearer]);

	const modalFunc = () => {
		setReset(true);
	};
	interface Column {
		id: 'amount' | 'status' | 'acctId' | 'payment_type' | 'date';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';

	}
	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'acctId', label: 'Email address', minWidth: 200 },
		{ id: 'payment_type', label: 'Payment type', minWidth: 150 },
		{ id: 'date', label: 'Date', minWidth: 150 },
	];


	const statusFormatObj: { [key: string]: string } = {
		successful: "wonText",
		failed: "lostText",
		pending: "pendingText",
	};

	const LoanRowTab = useCallback(
		(amt, status, PaymentType, acctId, added, id) => ({
			amount: (
				<div
					// onClick={() => loadTransaction(transaction?.merchantreference)}
					className={Styles.amount}>
					<h2>
						<span
							style={{ color: "#828282", paddingRight: "1px" }}
						>NGN</span>{amt}</h2>
					{/* <h2>{FormatToCurrency?.(amt)}</h2> */}
				</div>
			),
			status: (
				// <Label
				// 	// onClick={() => loadTransaction(transaction?.merchantreference)}
				// 	className={
				// 		code === '00' ? 'success' : code === '09' ? 'danger' : 'warning'
				// 	}>
				// 	{code === '00' ? 'Successful' : code === '09' ? 'Failed' : 'Pending'}
				// </Label>

				<p className={Styles[statusFormatObj[status] || "pendingText"]} >{status}</p>
			),
			acctId: (
				// <div onClick={() => loadTransaction(transaction?.merchantreference)}>
				<p>{acctId}</p>
				// </div>
			),
			payment_type: (
				// <div onClick={() => loadTransaction(transaction?.merchantreference)}>
				// 	{transaction?.paymentmethod?.[0]?.toUpperCase() +
				// 		transaction?.paymentmethod?.slice(1)}
				// </div>
				<p>{PaymentType}</p>
			),
			date: (
				<p>	{moment(added)?.format('LL')}</p>
				// <div onClick={() => loadTransaction(transaction?.merchantreference)}>
				// 	{moment(transaction?.added)?.format('LL')}
				// </div>
			),
			id: <p>{id}</p>

		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: TransactionItem) =>
			newRowOptions.push(
				LoanRowTab(each.amt, each.status, each.PaymentType, each.acctId, each.added, each.id)
			)
		);
		setRows(newRowOptions);
	}, [transactions, LoanRowTab]);
	const useStyles = makeStyles({
		container: {
			width: '407px',
			height: 'auto',
			minHeight: '571px',
			background: '#ffffff',
			border: '1px solid #d5dae1',
			boxShadow: ' 0px 10px 10px rgba(219, 219, 219, 0.92)',
			borderRadius: '3px',
		},
	});
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
				setBearer={setBearer}
				status={status}
				payment={payment}
				name='transaction'
				filterFunction={modalFunc}
				changePage={changePage}
			/>
			<div className={Styles.wrapper}>
				{/* {transactions.length > 0 ? ( */}
				<div className={Styles.transaction__btn}>

					<Stack direction={"row"} justifyContent={"space-between"} flexWrap="wrap">
						<Box>
							<h2>{transactions?.length ?? 0} transactions</h2>
						</Box>
						<Box className={Styles.right__btn}>
							<Button onClick={() => setIsFilterModalOpen(true)}>
								<FilterAltOutlinedIcon />	Filter by:

							</Button>
							<CSVLink
								data={download}
								filename={'transactionmerchant.csv'}
								className={Styles.button_business_button}>
								<InsertDriveFileOutlined />
								Download &nbsp;
							</CSVLink>
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
						totalRows={totalRows}
						changePage={changePage}
						limit={limit}
						// reset={reset}
						link="/transaction"
						clickable
						identifier={"id"}
						rowsData={transactions}
					/>
				)}
			</div>
		</div>

	);
}
