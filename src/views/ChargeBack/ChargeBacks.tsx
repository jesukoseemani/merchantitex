import React, { useState, useCallback, useEffect } from 'react';
import Styles from './ChargeBacks.module.scss';
import { Button } from 'semantic-ui-react';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom';
import FilterModal from '../../components/FilterModal';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Box, Stack } from '@mui/material';
import { TransactionItem, Meta } from '../../types/Transaction';
import CustomClickTable from '../../components/table/CustomClickTable';
import { stripEmpty, stripSearch } from '../../utils';
import { CHARGEBACK_FILTER_DATA } from '../../constant';
import { chargebackItem } from '../../types/Chargeback';
import { getChargebackService } from '../../services/chargeback';

export default function ChargeBacks() {


	const history = useHistory();
	const { search } = useLocation()


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
	const [status, setStatus] = useState('');
	const [event, setEvent] = useState('');

	const [chargeback, setChargeback] = useState<chargebackItem[]>([]);
	const [meta, setMeta] = useState<Meta | null>(null)
	const [rows, setRows] = useState<TransactionItem[]>([]);
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

	const getChargeback = async ({ fromdate, todate, status } = CHARGEBACK_FILTER_DATA) => {
		dispatch(openLoader());

		try {
			const data = await getChargebackService(stripEmpty({
				perpage: rowsPerPage,
				page: pageNumber,
				fromdate,
				todate,
				search: stripSearch(search),
				status
			}));
			setChargeback(data?.chargebacks || []);
			setMeta(data?._metadata || {})
			dispatch(closeLoader());

		} catch (err: any) {
			dispatch(
				openToastAndSetContent({
					toastContent: err?.response?.data?.message || 'Failed to get chargebacks',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		} finally {
			dispatch(closeLoader());

		}
	};

	useEffect(() => {
		getChargeback();
	}, [pageNumber, rowsPerPage, search]);

	const loadTransaction = (reference: string) => {
		history.push(`/transaction/${reference}`);
	};

	const modalFunc = () => {
		setIsFilterModalOpen(false)
		setReset(true);
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
		{ id: 'added', label: 'Due date', minWidth: 100 },
	];
	const statusFormatObj: { [key: string]: string } = {
		approved: 'approved',
		declined: 'declined',
		pending: 'pending',
	};

	const LoanRowTab = useCallback(
		(
			amount,
			status,
			linkingreference,
			customeremail,
			duedate,
			id
		) => ({
			amt: (
				<p className={Styles.tableBodyText}>
					<span className={Styles.tableBodySpan}>NGN </span>
					{amount}
				</p>
			),
			status: (
				<p style={{ borderRadius: "20px" }} className={Styles[statusFormatObj[status] || 'pendingText']}>
					{status}
				</p>
			),
			txnRef: <p className={Styles.tableBodyText}>{linkingreference}</p>,
			email: <p className={Styles.tableBodyText}>{customeremail}</p>,
			added: (
				<p className={Styles.tableBodyText}>
					{moment(duedate).format('MMM D YYYY')}
				</p>
			),
			id: (
				<p className={Styles.tableBodyText}>
					{id}
				</p>
			)

		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		chargeback?.map((each: chargebackItem) =>
			newRowOptions.push(
				LoanRowTab(each?.amount,
					each?.status,
					each?.linkingreference,
					each?.customeremail,
					each?.duedate,
					each?.id,
				)
			)
		);
		setRows(newRowOptions);
	}, [chargeback, LoanRowTab]);

	const action = (form: typeof CHARGEBACK_FILTER_DATA) => {
		getChargeback(form)
	}

	return (
		<div className={Styles.container}>
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
							<Button onClick={() => setIsFilterModalOpen(true)}>
								<FilterAltOutlinedIcon />	Filter by:
							</Button>

						</Box>

					</Stack>
				</div>





				<CustomClickTable
					columns={columns}
					rows={rows}
					totalRows={meta?.totalcount || 0}
					changePage={changePage}
					limit={limit}
					// reset={reset}
					link="/chargebacks"
					clickable
					identifier="id"
					rowsData={chargeback}
				/>

			</div>
		</div>

	);
}
