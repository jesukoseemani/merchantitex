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
import { Box, Button, Grid, IconButton, Modal } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseOutlined from '@mui/icons-material/CloseOutlined';



const useModalBtnStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingInline: '30px',
		marginTop: "30px",
		gap: '1.25rem',
		height: "44px",
		'& .MuiButton-root': {
			fontFamily: `'Avenir', sans-serif`,
			fontWeight: '500',
			fontSize: '.875rem',
			color: 'black',
			background: '#E0E0E0',
			borderRadius: '20px',
			textTransform: 'none',
			padding: '.35rem .85rem',
			marginBottom: "2rem"
		},
		'& .MuiButton-root:nth-child(2)': {
			color: 'white',
			background: '#27AE60',
		},
		'& .MuiButton-root:nth-child(1)': {
			// color: 'white',
			background: 'transparent',
			border: "1px solid #095B2C",
			color: "#095B2C",
		},
	},
	selected: {
		border: '1px solid #27ae60 !important',
		color: '#27ae60 !important',


	},
});


const ChargeBacks = () => {
	const theme = useTheme();

	const useBtnStyles = makeStyles({
		root: {
			fontFamily: `'Avenir', sans-serif`,
			display: 'flex',
			gap: '10px',

			[theme.breakpoints.down('sm')]: {
				// flexDirection: 'column',
				flexWrap: "wrap",
			},
			'& .MuiButtonBase-root': {
				borderRadius: '.25rem',
				padding: '.5rem 1rem',
				textTransform: 'none',
				fontSize: '.875rem',
				fontWeight: '400',
				alignItem: 'center',
				display: 'flex',
				height: "32px"

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
	const modalBtnClasses = useModalBtnStyles();

	const [isOverview, setIsOverview] = useState<boolean>(true);
	const [chargebacks, setChargebacks] = useState<ChargebackItem[]>([]);
	const [rows, setRows] = useState<ChargebackItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
		id: 'amt' | 'status' | 'txnRef' | 'email' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amt', label: 'Amount', minWidth: 100 },
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'txnRef', label: 'Transaction reference', minWidth: 100 },
		{ id: 'email', label: 'Customer email', minWidth: 100 },
		{ id: 'added', label: 'Due d ate', minWidth: 100 },
	];

	const statusFormatObj: { [key: string]: string } = {
		approved: 'approved',
		declined: 'declined',
		pending: 'pending',
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
			txnRef: <p className={styles.tableBodyText}>{txnRef}</p>,
			email: <p className={styles.tableBodyText}>{email}</p>,
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
				setChargebacks(chargebacks);
				setTotalRows(_metadata?.totalcount);
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
					toastStyles: {
						backgroundColor: 'red',
					},
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
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px" }}>
						<h2>Filters</h2>
						<IconButton onClick={() => setIsFilterModalOpen(false)}>
							<CloseOutlined />
						</IconButton>
					</Box>
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
							<Box>
								<Grid container justifyContent={"space-between"} alignItems="center">
									<Grid item xs={5}>
										<input placeholder='Start date' />
									</Grid>
									<Grid item xs={2} justifyContent="center" display={"flex"} alignItems="center"><ArrowRightAltIcon /></Grid>
									<Grid item xs={5}>


										<input placeholder='end date' />
									</Grid>

								</Grid>

							</Box>
						</div>
						<div>
							<p>Withheld amount</p>
							<input placeholder='NGN 0.00' />
						</div>
						<div>
							<p>Status</p>
							<input
								placeholder='Choose status'

							/>
						</div>
					</div>
					<hr />
					<div className={modalBtnClasses.root}>
						<Button style={{ borderRadius: "20px" }}>Clear filter</Button>
						<Button style={{ borderRadius: "20px" }}>Apply filter</Button>
					</div>
				</div>
			</Modal>

			<div className={styles.pageWrapper}>

				<div className={styles.tableSection}>
					<div>
						<p>{totalRows} chargebacks</p>
						<div className={btnClasses.root}>
							<Button style={{ borderRadius: "20px" }} onClick={() => setIsFilterModalOpen(true)}>
								Filter <ArrowDropDownIcon />
							</Button>
							<Button style={{ borderRadius: "20px", background: "" }}>
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
							link='/chargebacks'
							identifier='id'
							rowsData={chargebacks}
						/>
					</div>
				</div>
			</div>
		</div>

	);
};

export default ChargeBacks;
