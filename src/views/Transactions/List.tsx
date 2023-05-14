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
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Box, Stack } from '@mui/material';
import { TransactionItem, Meta } from '../../types/Transaction';
import CustomClickTable from '../../components/table/CustomClickTable';
import { getTransactionsService } from '../../services/transaction';
import { getSettlementStatus, getTransactionStatus } from '../../utils/status';
import { stripEmpty, stripSearch } from '../../utils';
import useDownload from '../../hooks/useDownload';
import { BASE_URL } from '../../config';
import { TRANSACTION_FILTER_DATA } from '../../constant';
import { statusFormatObj } from '../../helpers';
import { ReactComponent as FileIcon } from "../../assets/images/file.svg"
import { ReactComponent as FilterIcon } from "../../assets/images/filter.svg"
import CustomStatus from '../../components/customs/CustomStatus';
import CustomCurrencyFormat from '../../components/customs/CustomCurrencyFormat';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import Navigation from '../../components/navbar/Navigation';
import LinkTypeModal from '../PaymentLinks/LinkTypeModal';
import SingleLinkModal from '../PaymentLinks/SingleLinkModal';
import RecurringLinkModal from '../PaymentLinks/RecurringLinkModal';
import DonationLinkModal from '../PaymentLinks/DonationLinkModal';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import CreateInvoice from '../../components/bills/invoice/CreateInvoice';

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

	const getTransactions = async ({ fromdate, todate, reference, paymentmethod, status } = TRANSACTION_FILTER_DATA) => {
		dispatch(openLoader());

		try {
			const data = await getTransactionsService(stripEmpty({
				perpage: rowsPerPage,
				page: pageNumber,
				fromdate,
				todate,
				reference,
				paymentmethod,
				search: stripSearch(search),
				status
			}));
			setTransactions(data?.transactions || []);
			setMeta(data?._metadata || {})
			dispatch(closeLoader());

		} catch (err: any) {
			dispatch(
				openToastAndSetContent({
					toastContent: err?.response?.data?.message || 'Failed to get transactions',
					msgType: "error"
				})
			);
		} finally {
			dispatch(closeLoader());

		}
	};

	useEffect(() => {
		getTransactions();
	}, [pageNumber, rowsPerPage, search]);

	const loadTransaction = (reference: string) => {
		history.push(`/transaction/${reference}`);
	};

	const modalFunc = () => {
		setIsFilterModalOpen(false)
		setReset(true);
	};



	const handleInvoce = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					borderRadius: "0.5rem",
					boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
					width: "753px",
					maxWidth: "100%"
				},
				modalTitle: "Create an Invoice",
				modalContent: (
					<div className="modalDiv">
						<CreateInvoice fetchInvoice={""} />
					</div>
				),
			})
		);
	}

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

	const LoanRowTab = useCallback(
		(currency, amt, responsecode, PaymentType, email, added, id) => ({
			amount: (
				<CustomCurrencyFormat amount={amt} currency={currency} />
			),
			status: (
				<CustomStatus text={getTransactionStatus(responsecode)} type={getTransactionStatus(responsecode)} />
			),
			email: (
				<p>{email}</p>
			),
			payment_type: (
				<p>{PaymentType}</p>
			),
			date: (
				<CustomDateFormat time={added} date={added} />

			),
			id: <p>{id}</p>

		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: TransactionItem) =>
			newRowOptions.push(
				LoanRowTab(each?.currency, each?.chargeamount, getTransactionStatus(each?.responsecode), each?.chargetype, each?.customer?.email, each.timein, each.paymentid)
			)
		);
		setRows(newRowOptions);
	}, [transactions, LoanRowTab]);

	const action = (form: typeof TRANSACTION_FILTER_DATA) => {
		getTransactions(form)
	}

	// console.log(transactions);


	//show paymentlink modal
	const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
	const [isSingleLinkModalOpen, setIsSingleLinkModalOpen] = useState<boolean>(false);
	const [isRecurringLinkModalOpen, setIsRecurringLinkModalOpen] = useState<boolean>(false);
	const [isDonationLinkModalOpen, setIsDonationLinkModalOpen] = useState<boolean>(false);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const [isUpdate, setIsUpdate] = useState<boolean>(false);
	const openSingleLinkModal = () => {
		setIsSingleLinkModalOpen(true);
		setIsLinkModalOpen(false);
	}

	const openRecurringLinkModal = () => {
		setIsRecurringLinkModalOpen(true);
		setIsLinkModalOpen(false);
	}

	const openDonationLinkModal = () => {
		setIsDonationLinkModalOpen(true);
		setIsLinkModalOpen(false);
	}

	return (

		<div className={Styles.container}>
			<LinkTypeModal
				isOpen={isLinkModalOpen} handleClose={() => setIsLinkModalOpen(false)}
				openDonationLinkModal={openDonationLinkModal}
				openRecurringLinkModal={openRecurringLinkModal}
				openSingleLinkModal={openSingleLinkModal}
			/>
			<SingleLinkModal isOpen={isSingleLinkModalOpen} handleClose={() => setIsSingleLinkModalOpen(false)} setIsUpdate={setIsUpdate} />
			<RecurringLinkModal isOpen={isRecurringLinkModalOpen} handleClose={() => setIsRecurringLinkModalOpen(false)} setIsUpdate={setIsUpdate} />
			<DonationLinkModal isOpen={isDonationLinkModalOpen} handleClose={() => setIsDonationLinkModalOpen(false)} setIsUpdate={setIsUpdate} />

			{/* <NavBar />  */}
			<FilterModal
				isOpen={isFilterModalOpen}
				handleClose={() => setIsFilterModalOpen(false)}
				action={action}
				clearHandler={clearHandler}
				name='transaction'
				filterFunction={modalFunc}
			/>
			<div className={Styles.wrapper}>
				<div className={Styles.transaction__btn}>

					<Stack direction={"row"} justifyContent={"space-between"} flexWrap="wrap">
						<Box>
							<h2>{meta?.totalcount || 0} transaction(s)</h2>
						</Box>
						<Box className={Styles.right__btn}>
							<button onClick={() => setIsFilterModalOpen(true)}>
								<FilterIcon />	Filter by:
							</button>
							<button onClick={calDownload}>
								<FileIcon />	Download
							</button>
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
									<button onClick={handleInvoce} className={Styles.primary}>Create an invoice</button>
								</div>
								<div>
									<LinkIcon />
									<h2>Start collecting payments using payment link</h2>
									<button onClick={() => setIsLinkModalOpen(true)} className={Styles.primary}>
										Create payment link
									</button>
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
