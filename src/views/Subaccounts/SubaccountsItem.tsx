import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import styles from './SubaccountsItem.module.scss';
import NavBar from '../../components/navbar/NavBar';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CustomClickTable from '../../components/table/CustomClickTable';
import {
	GetTransactionsRes,
	TransactionItem,
} from '../../types/MockTransactionTypes';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import { GetSubAcctsRes, SubAcctItem } from '../../types/SubaccountTypes';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import { Box, Button } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SettlementAccount from './SettlementAccount';
const useBtnStyles = makeStyles({
	root: {
		fontFamily: `'Avenir', sans-serif`,
		display: 'flex',
		gap: '1rem',
		'& .MuiButtonBase-root': {
			borderRadius: '.25rem',
			width: "58px",
			height: "34px",
			textTransform: 'none',
			padding: " 7.5px 16px",
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
			backgroundColor: '#eb5757',
			color: '#FFF',
			gap: '.5rem',
		},
		'& svg': {
			fontSize: '1rem',
			marginLeft: '.25rem',
		},
	},
});

const SubaccountsItem = () => {
	const btnClasses = useBtnStyles();

	const location = useLocation<{ rowData: string }>();
	const history = useHistory();
	const dispatch = useDispatch();

	const { slug } = useParams<{ slug: string }>();

	if (!location.state.rowData) {
		history.replace('/subaccounts');
	}

	const { rowData } = location.state;

	const formattedRowData: SubAcctItem = JSON.parse(rowData);

	const { name, details, acctId, acctShare, txnShare } = formattedRowData;

	const [isOverview, setIsOverview] = useState<boolean>(true);
	const [earned, setEarned] = useState<string>('0');
	const [paid, setPaid] = useState<string>('0');
	const [value, setValue] = useState<string>('0');

	const [txns, setTxns] = useState<TransactionItem[]>([]);
	const [rows, setRows] = useState<TransactionItem[]>([]);
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
		id: 'amt' | 'status' | 'txnType' | 'card' | 'bankName' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amt', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'txnType', label: 'Customer ID', minWidth: 100 },
		{ id: 'card', label: 'Subaccount’s share', minWidth: 100 },
		{ id: 'bankName', label: 'Payment type', minWidth: 100 },
		{ id: 'added', label: 'Date', minWidth: 100 },
	];

	const statusFormatObj: { [key: string]: string } = {
		successful: 'wonText',
		error: 'lostText',
		pending: 'pendingText',
	};

	const TransactionRowTab = useCallback(
		(amt, status, acctId, card, PaymentType, added) => ({
			amt: (
				<p className={styles.tableBodyText}>
					<span className={styles.tableBodySpan}>NGN </span>
					{amt}
				</p>
			),
			status: (
				<p style={{ borderRadius: "20px" }} className={styles[statusFormatObj[status] || 'pendingText']}>
					{status}
				</p>
			),
			txnType: <p className={styles.tableBodyCapital}>{acctId}</p>,
			card: <p className={styles.tableBodyText}>{amt}</p>,
			bankName: <p className={styles.tableBodyText}>{PaymentType}</p>,
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
		txns?.map((each: TransactionItem) =>
			newRowOptions.push(
				TransactionRowTab(
					each?.amt,
					each?.status,
					each?.acctId,
					each?.card,
					each?.PaymentType,
					each?.added
				)
			)
		);
		setRows(newRowOptions);
	}, [txns, TransactionRowTab]);

	const getTransactions = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetTransactionsRes>(
				'/mockData/transactions.json',
				{ baseURL: '' }
			);
			const { transactions, _metadata } = res?.data;
			if (transactions.length) {
				setTxns(transactions);
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

	useEffect(() => {
		getTransactions();
	}, [pageNumber, rowsPerPage]);

	const getSubAccts = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetSubAcctsRes>(
				'/mockData/subaccounts.json',
				{ baseURL: '' }
			);
			const { subaccounts, earned, paid, value } = res?.data;
			if (subaccounts.length) {
				setPaid(paid);
				setEarned(earned);
				setValue(value);
			}
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to get accounts',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		getSubAccts();
	}, []);

	return (

		<div className={styles.container}>
			{/* <NavBar name='Subaccounts' /> */}
			<hr />
			<div className={styles.pageWrapper}>
				<div className={styles.sectionOne}>
					<div>
						<Link to='/subaccounts'>
							<div>
								<ArrowLeftIcon />
								<p>Back to subaccounts</p>
							</div>
						</Link>
					</div>
				</div>
				{/* <hr /> */}

				<div className={styles.sectionOneWrapper}>
					<div className={styles.sectionTwo}>
						<div>
							<p className={styles.name}>{name}</p>
							<div></div>
							<p>{acctId}</p>
						</div>
						<div className={btnClasses.root}>
							<Button style={{ borderRadius: "20px" }}>Edit</Button>
							<Button style={{ borderRadius: "20px" }}>Delete</Button>
						</div>
					</div>
					{/* <div className={styles.spacedLine}>
						<hr />
					</div> */}
					<div className={styles.sectionThree}>
						<div>
							<p>Total commission paid</p>
							<p>{paid}</p>
						</div>
						<div>
							<p>Total commission earned</p>
							<p>{earned}</p>
						</div>
						<div>
							<p>Bank account</p>
							<p>{details}</p>
						</div>
						<div>
							<p>Your share</p>
							<p>{txnShare}</p>
						</div>
						<div>
							<p>Subaccount's share</p>
							<p>{acctShare}</p>
						</div>
					</div>

				</div>
				{/* <hr /> */}
				<div className={styles.sectionFour}>
					<div className={styles.tabBar}>
						<p
							style={{ color: isOverview ? '#27ae60' : '#828282' }}
							onClick={() => setIsOverview(true)}>
							OVERVIEW
						</p>
						<p
							style={{ color: isOverview ? '#828282' : '#27ae60' }}
							onClick={() => setIsOverview(false)}>
							SETTLEMENTS
						</p>
					</div>
					<div>
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<h3>{isOverview ? 'Transactions' : 'Settlements'}</h3>
							<Stack direction={"row"} spacing={2}>
								<Button variant='contained' className={styles.btn} style={{ borderRadius: "20px", padding: "7.5px 16px", height: "38px", width: "180px", textTransform: "inherit" }}>All Transaction <ArrowDropDownOutlinedIcon /></Button>


								<Button variant='outlined' className={styles.btn} style={{ borderRadius: "20px", height: "38px", border: "1px solid #27AE60", textTransform: "inherit" }}>Download   <CloudUploadOutlinedIcon sx={{ marginLeft: "10px" }} /></Button>
							</Stack>
						</Box>
						<br />


						{isOverview ? <div className={styles.tableContainer}>
							<CustomClickTable
								columns={columns}
								rows={rows}
								totalRows={totalRows}
								changePage={changePage}
								limit={limit}
							/>
						</div> : <SettlementAccount />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubaccountsItem;
