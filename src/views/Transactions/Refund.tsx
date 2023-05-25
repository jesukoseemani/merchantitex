import React, { useCallback, useEffect, useState } from 'react';
import styles from './Refund.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';

import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import SingleRefundModal from './SingleRefundModal';
import BulkRefundModal from './BulkRefundModal';
import CustomClickTable from '../../components/table/CustomClickTable';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { RefundItem } from '../../types/RefundTypes';
import BeneficiaryMenu from '../Payout/beneficiary/BeneficiaryMenu';
import { getDownloadedRefunds, getRefundsService } from '../../services/refund';
import { stripSearch } from '../../utils';
import useDownload from '../../hooks/useDownload';
import { BASE_URL } from '../../config';
import { capitalize } from 'lodash';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import FilterModal from '../../components/filterModals/RefundFilterModal';
import { REFUND_FILTER_DATA } from '../../constant';
import CustomStatus from '../../components/customs/CustomStatus';
import CustomCurrencyFormat from '../../components/customs/CustomCurrencyFormat';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import Navigation from '../../components/navbar/Navigation';




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
	const { calDownload } = useDownload({ url: `${BASE_URL}/refund/download/`, filename: 'refund' })

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
			marginBottom: "5px",
			flexWrap: "wrap",
			[theme.breakpoints.down('sm')]: {
				// flexDirection: 'column',
				marginTop: "20px",

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

	const getRefunds = async (form = REFUND_FILTER_DATA) => {
		dispatch(openLoader());

		try {
			const res = await getRefundsService({
				page: pageNumber,
				perpage: rowsPerPage,
				search: stripSearch(search),
				...form
			});
			setRefunds(res?.refunds || []);
			setTotalRows(res?._metadata?.totalcount || 0)
			dispatch(closeLoader());
		} catch (err: any) {
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: err?.response?.data?.message || 'Failed to get refunds',
					msgType: "error"
				})
			);
		}
	};

	interface Column {
		id: 'amount' | 'status' | 'type' | 'linkingreference' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 80 },
		{ id: 'status', label: 'Status', minWidth: 70 },
		{ id: 'type', label: 'Refund type', minWidth: 100 },
		{ id: 'linkingreference', label: 'Transaction reference', minWidth: 250 },
		{ id: 'added', label: 'Date', minWidth: 170 },
	];




	const RefundRowTab = useCallback(
		(currency, amt, status, reference, type, added, id, paymentid) => ({
			amount: <CustomCurrencyFormat amount={amt} currency={currency} />,
			type: <p className={styles.tableBodyText}>{type}</p>,
			status: (
				<CustomStatus type={status} text={status} />
			),
			linkingreference: (
				<p className={styles.tableBodyText}>{reference}</p>
			),
			added: (
				<CustomDateFormat time={added} date={added} />

			),
			id: <p>{paymentid}</p>
		}),
		[]
	);



	useEffect(() => {
		getRefunds();
	}, [pageNumber, rowsPerPage, refundLogged, search]);

	useEffect(() => {
		const newRowOptions: any[] = [];
		refunds?.map((each: any) =>
			newRowOptions.push(
				RefundRowTab(
					each?.currency,
					each?.amount,
					each?.status,
					each?.reference,
					capitalize(each?.refundtype) || '',
					each?.added,
					each?.id,
					each?.paymentid
				)
			)
		);
		setRows(newRowOptions);
	}, [refunds, RefundRowTab]);

	const action = (form: typeof REFUND_FILTER_DATA) => {
		getRefunds(form)
	}




	return (

		<Navigation title="Refund">
			<div className={styles.container}>
				<FilterModal
					isOpen={isFilterModalOpen}
					handleClose={() => setIsFilterModalOpen(false)}
					action={action}
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
							<Button onClick={calDownload}>
								<InsertDriveFileOutlined />Download
							</Button>
							<Button
								id='log-refund-button'
								aria-controls={open ? 'refund-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={() => setIsSingleModalOpen(true)}>
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
							clickable
							link='/transactions/refund'
							identifier='id'
							rowsData={refunds}
						/>
					</div>
				</div>
			</div>

		</Navigation>
	);
};

export default Refund;
