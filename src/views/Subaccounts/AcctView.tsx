import styles from './Subaccounts.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CustomClickTable from '../../components/table/CustomClickTable';
import { GetSubAcctsRes, SubAcctItem } from '../../types/SubaccountTypes';
import { Container } from '../SignUp/SignUpElements';

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

interface AcctViewProps {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AcctView = ({ setIsModalOpen }: AcctViewProps) => {
	const btnClasses = useBtnStyles();

	const dispatch = useDispatch();

	const [subaccounts, setSubaccounts] = useState<SubAcctItem[]>([]);
	const [rows, setRows] = useState<SubAcctItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [earned, setEarned] = useState<string>('0');
	const [paid, setPaid] = useState<string>('0');
	const [value, setValue] = useState<string>('0');

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
		id: 'name' | 'details' | 'acctId' | 'txnShare' | 'acctShare';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 100 },
		{ id: 'details', label: 'Bank account details', minWidth: 100 },
		{ id: 'acctId', label: 'Account ID', minWidth: 100 },
		{ id: 'txnShare', label: 'Your share (per transaction)', minWidth: 100 },
		{ id: 'acctShare', label: "Subaccount's share", minWidth: 100 },
	];

	const AcctRowTab = useCallback(
		(name, details, acctId, txnShare, acctShare) => ({
			name: <p className={styles.tableBodyText}>{name}</p>,
			details: <p className={styles.tableBodyText}>{details}</p>,
			acctId: <p className={styles.tableBodyText}>{acctId}</p>,
			txnShare: <p className={styles.tableBodyText}>{txnShare}</p>,
			acctShare: <p className={styles.tableBodyText}>{acctShare}</p>,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		subaccounts?.map((each: SubAcctItem) =>
			newRowOptions.push(
				AcctRowTab(
					each?.name,
					each?.details,
					each?.acctId,
					each?.txnShare,
					each?.acctShare
				)
			)
		);
		setRows(newRowOptions);
	}, [AcctRowTab, subaccounts]);

	const getSubAccts = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetSubAcctsRes>(
				'/mockData/subaccounts.json',
				{ baseURL: '' }
			);
			const { subaccounts, _metadata, earned, paid, value } = res?.data;
			if (subaccounts.length) {
				setSubaccounts(subaccounts);
				setTotalRows(_metadata?.totalcount);
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
	}, [pageNumber, rowsPerPage]);

	return (
		<>
			<Box>
				<Grid container justifyContent={"center"} alignItems={"center"} className={styles.sectionOneBox} px={"42px"}>
					<Grid xs={12} sm={6} md={3}>
						<p>{totalRows} Subaccounts</p>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<p>Total commission earned</p>
						<p>NGN {earned}</p>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<p>Total commission PAID</p>
						<p>NGN {paid}</p>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<p>Total transactions value</p>
						<p>{value}</p>
					</Grid>
				</Grid>

			</Box>
			{/* <div className={styles.topContainer}> */}
			<Stack direction={"row"} justifyContent="space-between" alignItems={"center"} sx={{ marginTop: "25px" }}>
				<div>
					<p className={styles.subAcctText}>{totalRows} Subaccounts</p>
				</div>
				<div className={btnClasses.root}>
					<Button style={{ borderRadius: "20px" }} onClick={() => setIsModalOpen(true)}>+ New Subaccount</Button>
				</div>

			</Stack>
			{/* </div> */}
			<div className={styles.tableContainer}>
				<CustomClickTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
					clickable
					link='/subaccounts'
					identifier='acctId'
					rowsData={subaccounts}
				/>
			</div>
		</>
	);
};

export default AcctView;
