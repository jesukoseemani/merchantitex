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
	AssessmentItem,
	ChargebackBalanceItem,
	GetAssessmentsRes,
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

const Assessments = () => {
	const btnClasses = useBtnStyles();
	const modalBtnClasses = useModalBtnStyles();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [isOverview, setIsOverview] = useState<boolean>(true);
	const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
	const [rows, setRows] = useState<AssessmentItem[]>([]);
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
		id: 'amt' | 'reason' | 'wallet' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'amt', label: 'Amount', minWidth: 100 },
		{ id: 'reason', label: 'Reason for assessment', minWidth: 100 },
		{ id: 'wallet', label: 'Wallet debited', minWidth: 100 },
		{ id: 'added', label: 'Date', minWidth: 100 },
	];

	const AssessmentRowTab = useCallback(
		(amt, reason, wallet, added, id, refId) => ({
			amt: (
				<p className={styles.tableBodyText}>
					<span className={styles.tableBodySpan}>NGN </span>
					{amt}
				</p>
			),
			reason: <p className={styles.tableBodyText}>{reason}</p>,
			wallet: <p className={styles.tableBodyCapital}>{wallet}</p>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
				</p>
			),
			id: <p>{id}</p>,
			refId: <p>{refId}</p>,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		assessments?.map((each: AssessmentItem) =>
			newRowOptions.push(
				AssessmentRowTab(
					each?.amt,
					each?.reason,
					each?.wallet,
					each?.added,
					each?.id,
					each?.refId
				)
			)
		);
		setRows(newRowOptions);
	}, [AssessmentRowTab, assessments]);

	const dispatch = useDispatch();

	const getAssessments = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetAssessmentsRes>(
				'/mockData/assessments.json',
				{ baseURL: '' }
			);
			const { assessments, _metadata, count, value, threshold, balances } =
				res?.data;
			if (assessments.length) {
				setAssessments(assessments);
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
					toastContent: 'Failed to get assessments',
					msgType: "error"
				})
			);
		}
	};

	useEffect(() => {
		getAssessments();
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
			{/* <NavBar name='Assessments' /> */}
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
						<p>{totalRows} Assessments</p>
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
							link='/chargeBack/assessments'
							identifier='id'
							rowsData={assessments}
						/>
					</div>
				</div>
			</div>
		</div>


	);
};

export default Assessments;
