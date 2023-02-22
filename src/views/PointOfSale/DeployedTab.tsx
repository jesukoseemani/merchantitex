import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { GetPosDeployedRes, PosDeployedItem } from '../../types/PosTypes';
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

interface DeployedTabProps {
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

const DeployedTab = ({
	value,
	index,
	openModal,
	closeModal,
}: DeployedTabProps) => {
	const [deployed, setDeployed] = useState<PosDeployedItem[]>([]);
	const [rows, setRows] = useState<PosDeployedItem[]>([]);
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
		id:
		| 'status'
		| 'deviceType'
		| 'terminalId'
		| 'merchantCode'
		| 'terminalSerial'
		| 'bankName'
		| 'added';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'status', label: 'Status', minWidth: 100 },
		{ id: 'deviceType', label: 'Device type', minWidth: 100 },
		{ id: 'terminalId', label: 'Terminal ID', minWidth: 100 },
		{ id: 'merchantCode', label: 'Merchant code', minWidth: 100 },
		{ id: 'terminalSerial', label: 'Terminal serial', minWidth: 100 },
		{ id: 'bankName', label: 'Bank name', minWidth: 100 },
		{ id: 'added', label: 'Date deployed', minWidth: 100 },
	];

	const DeployedRowTab = useCallback(
		(
			status,
			deviceType,
			terminalId,
			merchantCode,
			terminalSerial,
			bankName,
			added,
			txnVolume,
			txnValue
		) => ({
			status:
				status === 'Active' ? (
					<p className={styles.greenText} style={{ width: '100%' }}>
						{status}
					</p>
				) : (
					<p className={styles.redText} style={{ width: '100%' }}>
						{status}
					</p>
				),
			deviceType: <p className={styles.tableBodyText}>{deviceType}</p>,
			terminalId: <p className={styles.tableBodyText}>{terminalId}</p>,
			merchantCode: <p className={styles.tableBodyText}>{merchantCode}</p>,
			terminalSerial: <p className={styles.tableBodyText}>{terminalSerial}</p>,
			bankName: <p className={styles.tableBodyText}>{bankName}</p>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
					<span className={styles.tableBodySpan}>
						{' '}
						{moment(added).format('h:mm A')}
					</span>
				</p>
			),
			txnVolume: <p>{txnVolume}</p>,
			txnValue: <p>{txnValue}</p>,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		deployed?.map((each: PosDeployedItem) =>
			newRowOptions.push(
				DeployedRowTab(
					each?.status,
					each?.deviceType,
					each?.terminalId,
					each?.merchantCode,
					each?.terminalSerial,
					each?.bankName,
					each?.added,
					each?.txnVolume,
					each?.txnValue
				)
			)
		);
		setRows(newRowOptions);
	}, [deployed, DeployedRowTab]);

	const getPosDeployed = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetPosDeployedRes>(
				'/mockData/posdeployed.json',
				{ baseURL: '' }
			);
			const { deployed, _metadata } = res?.data;
			if (deployed.length) {
				setDeployed(deployed);
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
		getPosDeployed();
	}, [pageNumber, rowsPerPage]);

	return (
		<TabPanel value={value} index={index}>
			<div className={styles.topContainer}>
				<h3>{totalRows} issued POS terminals</h3>
				<div className={btnClasses.root}>
					<Button style={{ borderRadius: "20px" }} onClick={openModal}>Request new POS</Button>
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
					link='/point_of_sale/deployed'
					identifier='terminalId'
					rowsData={deployed}
				/>
			</div>
		</TabPanel>
	);
};

export default DeployedTab;
