import axios from 'axios';
import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../../components/navbar/NavBar';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	ChargebackBalanceItem,
	ChargebackItem,
	GetChargebacksRes,
} from '../../types/ChargebackTypes';
import styles from './ChargeBacks.module.scss';
import moment from 'moment';
import CustomClickTable from '../../components/table/CustomClickTable';
import { Button, Modal, OutlinedInput } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ParentContainer from '../../components/ParentContainer/ParentContainer';

const useBtnStyles = makeStyles({
	root: {
		fontFamily: `'Avenir', sans-serif`,
		display: 'flex',
		gap: '1rem',
		'& .MuiButtonBase-root': {
			borderRadius: '.25rem',
			padding: '.5rem 1rem',
			textTransform: 'none',
			fontSize: '.875rem',
			fontWeight: '400',
			alignItem: 'center',
			display: 'flex',
			backgroundColor: '#E0E0E0',
			color: '#333',
		},
		'& svg': {
			fontSize: '1rem',
			marginLeft: '.25rem',
		},
	},
});

const useModalBtnStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '1rem 1.5rem 0',
		gap: '1.25rem',
		'& .MuiButton-root': {
			fontFamily: `'Avenir', sans-serif`,
			fontWeight: '500',
			fontSize: '.875rem',
			color: 'black',
			background: '#E0E0E0',
			borderRadius: '3px',
			textTransform: 'none',
			padding: '.5rem 1rem',
		},
		'& .MuiButton-root:nth-child(2)': {
			color: 'white',
			background: '#27AE60',
		},
	},
});

const AwaitingResponse = () => {
	const btnClasses = useBtnStyles();
	const modalBtnClasses = useModalBtnStyles();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [isOverview, setIsOverview] = useState<boolean>(true);
	const [chargebacks, setChargebacks] = useState<ChargebackItem[]>([]);
	const [rows, setRows] = useState<ChargebackItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [count, setCount] = useState<string>('0');
	const [threshold, setThreshold] = useState<string>('0');
	const [value, setValue] = useState<string>('0');
	const [balances, setBalances] = useState<ChargebackBalanceItem[]>([]);

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
		id: 'amt' | 'status' | 'txnRef' | 'email' | 'due' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amt', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'txnRef', label: 'Transaction reference', minWidth: 100 },
		{ id: 'email', label: 'Customer email', minWidth: 100 },
		{ id: 'due', label: 'Due', minWidth: 100 },
		{ id: 'added', label: 'Date', minWidth: 100 },
	];

	const statusFormatObj: { [key: string]: string } = {
		won: 'wonText',
		lost: 'lostText',
		pending: 'pendingText',
	};

	const ChargebackRowTab = useCallback(
		(
			amt,
			status,
			txnRef,
			email,
			due,
			added,
			id,
			cardType,
			cardNum,
			txnFee,
			bank,
			country
		) => ({
			amt: <p className={styles.tableBodyText}>{amt}</p>,
			status: (
				<p className={styles[statusFormatObj[status] || 'pendingText']}>
					{status}
				</p>
			),
			txnRef: <p className={styles.tableBodyText}>{txnRef}</p>,
			email: <p className={styles.tableBodyText}>{email}</p>,
			due: <p className={styles.dueText}>{due}</p>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
				</p>
			),
			id: <p>{id}</p>,
			cardType: <p>{cardType}</p>,
			cardNum: <p>{cardNum}</p>,
			txnFee: <p>{txnFee}</p>,
			bank: <p>{bank}</p>,
			country: <p>{country}</p>,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		chargebacks?.map((each: ChargebackItem) =>
			newRowOptions.push(
				ChargebackRowTab(
					each?.amt,
					each?.status,
					each?.txnRef,
					each?.email,
					each?.due,
					each?.added,
					each?.id,
					each?.cardType,
					each.cardNum,
					each?.txnFee,
					each?.bank,
					each?.country
				)
			)
		);
		setRows(newRowOptions);
	}, [ChargebackRowTab, chargebacks]);

	const dispatch = useDispatch();

	const getChargebacks = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetChargebacksRes>(
				'/mockData/chargebacks.json',
				{ baseURL: '' }
			);
			const { chargebacks, _metadata, count, value, threshold, balances } =
				res?.data;
			if (chargebacks.length) {
				const filtered = chargebacks.filter(
					(chargeback) => chargeback.status === 'awaiting response'
				);
				setChargebacks(filtered);
				setTotalRows(filtered.length);
				setThreshold(threshold);
				setCount(count);
				setValue(value);
				setBalances(balances);
			}
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to get chargebacks',
					msgType: "error"
				})
			);
		}
	};

	useEffect(() => {
		getChargebacks();
	}, [pageNumber, rowsPerPage]);

	return (


		<div className={styles.container}>
			<Modal
				open={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
				aria-labelledby='chargebacks filter modal'>
				<div className={styles.filterModalContainer}>
					<p>Filters</p>
					<hr />
					<div className={styles.modalContent}>
						<div>
							<p>Due date</p>
							<div>
								<p>Today</p>
								<p>Last 7 days</p>
								<p>30 days</p>
								<p>1 year</p>
							</div>
						</div>
						<div>
							<p>Custom date range</p>
							<div>
								<div>Start date</div>
								<ArrowRightAltIcon />
								<div>End date</div>
							</div>
						</div>
						<div>
							<p>Withheld amount</p>
							<OutlinedInput placeholder='NGN 0.00' size='small' fullWidth />
						</div>
						<div>
							<p>Status</p>
							<OutlinedInput
								placeholder='Choose status'
								size='small'
								fullWidth
							/>
						</div>
					</div>
					<hr />
					<div className={modalBtnClasses.root}>
						<Button>Clear filter</Button>
						<Button>Apply filter</Button>
					</div>
				</div>
			</Modal>

			<div className={styles.pageWrapper}>
				<div className={styles.topSection}>
					<div>
						<p
							style={{ color: isOverview ? '#27ae60' : '#828282' }}
							onClick={() => setIsOverview(true)}>
							OVERVIEW
						</p>
						<p
							style={{ color: !isOverview ? '#27ae60' : '#828282' }}
							onClick={() => setIsOverview(false)}>
							HOLDING BALANCE
						</p>
					</div>
					<div>
						<p>This is the chargeback overview information</p>
					</div>
					<div>
						{isOverview ? (
							<>
								<div>
									<p>Remaining of your threshold</p>
									<p>{threshold}%</p>
								</div>
								<div>
									<p>Chargeback value</p>
									<p>NGN {value}</p>
								</div>
								<div>
									<p>Chargeback count</p>
									<p>{count}</p>
								</div>
							</>
						) : (
							<>
								{balances.map((balance) => (
									<div key={balance.currency}>
										<p>{balance.currency}</p>
										<p>{balance.sum}</p>
									</div>
								))}
							</>
						)}
					</div>
				</div>
				<div className={styles.tableSection}>
					<div>
						<p>{totalRows} chargebacks awaiting response</p>
						<div className={btnClasses.root}>
							<Button onClick={() => setIsFilterModalOpen(true)}>
								Filter <ArrowDropDownIcon />
							</Button>
							<Button>
								Download <CloudUploadOutlinedIcon />
							</Button>
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
							link='/chargeBacks'
							identifier='id'
							rowsData={chargebacks}
						/>
					</div>
				</div>
			</div>
		</div>

	);
};

export default AwaitingResponse;
