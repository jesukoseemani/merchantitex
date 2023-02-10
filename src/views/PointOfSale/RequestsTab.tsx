import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { GetPosRequestsRes, PosRequestItem } from '../../types/PosTypes';
import { PosTabStateType } from './PointOfSale';
import styles from './PointOfSale.module.scss';
import TabPanel from './TabPanel';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { Button } from '@mui/material';
import CustomClickTable from '../../components/table/CustomClickTable';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
		},
		'& .MuiButton-root:nth-child(2)': {
			color: 'white',
			background: '#27AE60',
		},
	},
});

interface RequestsTabProps {
	value: PosTabStateType;
	index: PosTabStateType;
	openModal: () => void;
	closeModal: () => void;
}

const useBtnStyles = makeStyles({
	root: {
		fontFamily: `'Avenir', sans-serif`,
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

const RequestsTab = ({
	value,
	index,
	openModal,
	closeModal,
}: RequestsTabProps) => {
	const [requests, setRequests] = useState<PosRequestItem[]>([]);
	const [rows, setRows] = useState<PosRequestItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const btnClasses = useBtnStyles();
	const modalBtnClasses = useModalBtnStyles();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	const dispatch = useDispatch();

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
		id: 'reqId' | 'status' | 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'status', label: 'Delivery status', minWidth: 100 },
		{ id: 'reqId', label: 'Request ID', minWidth: 100 },
		{ id: 'added', label: 'Date requested', minWidth: 100, align: 'right' },
	];

	const RequestRowTab = useCallback(
		(reqId, status, added, qtyRequested, qtyAssigned, deliveryAddress) => ({
			status:
				status === 'Approved' ? (
					<p className={styles.greenText}>{status}</p>
				) : (
					<p className={styles.yellowText}>{status}</p>
				),
			reqId: <p className={styles.tableBodyText}>{reqId}</p>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
					<span className={styles.tableBodySpan}>
						{' '}
						{moment(added).format('h:mm A')}
					</span>
				</p>
			),
			qtyRequested: <p>{qtyRequested}</p>,
			qtyAssigned: <p>{qtyAssigned}</p>,
			deliveryAddress: <p>{deliveryAddress}</p>,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		requests?.map((each: PosRequestItem) =>
			newRowOptions.push(
				RequestRowTab(
					each?.reqId,
					each?.status,
					each?.added,
					each?.qtyRequested,
					each?.qtyAssigned,
					each?.deliveryAddress
				)
			)
		);
		setRows(newRowOptions);
	}, [requests, RequestRowTab]);

	const getPosRequests = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetPosRequestsRes>(
				'/mockData/posrequests.json',
				{ baseURL: '' }
			);
			const { requests, _metadata } = res?.data;
			if (requests.length) {
				setRequests(requests);
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
		getPosRequests();
	}, [pageNumber, rowsPerPage]);

	return (
		<TabPanel value={value} index={index}>
			<div className={styles.topContainer}>
				<h3>{totalRows} POS requests</h3>
				<div className={btnClasses.root}>
					<Button onClick={openModal}>Request new POS</Button>
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
					link='/point_of_sale/requests'
					identifier='reqId'
					rowsData={requests}
				/>
			</div>
		</TabPanel>
	);
};

export default RequestsTab;
