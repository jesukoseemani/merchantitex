import styles from './PaymentLinks.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Grid, IconButton, Modal, OutlinedInput, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import OperantTable from '../../components/table/OperantTable';
import moment from 'moment';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import CustomClickTable from '../../components/table/CustomClickTable';
import { GetLinksRes, LinkItem } from '../../types/PaymentlinkTypes';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ReactComponent as ExtLinkIcon } from '../../assets/images/ext-link.svg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CustomArray from '../../components/customs/CustomArray';
import useCurrency from '../../components/hooks/Usecurrency';
import useCountry from '../../components/hooks/UseCountry';
import CustomPhoneNumber from '../../components/customs/CustomPhoneInput';
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useModalBtnStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '33px 30px',
		gap: '1.25rem',
		'& .MuiButton-root': {
			fontFamily: `'Avenir', sans-serif`,
			lineHiieght: "19px",
			fontSize: '14px',
			color: 'black',
			background: '#E0E0E0',
			borderRadius: '20px',
			textTransform: 'none',
			padding: '.35rem 1.2rem',
			fontStyle: "normal",
			fontWeight: "400",
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

interface LinksViewProps {
	openLinkModal: () => void;
	setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
	isUpdate: boolean
}


const LinksView = ({ openLinkModal, isUpdate, setIsUpdate }: LinksViewProps) => {
	const theme = useTheme();
	const history = useHistory()

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

	const dispatch = useDispatch();

	const modalBtnClasses = useModalBtnStyles();
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [links, setLinks] = useState<LinkItem[]>([]);
	const [rows, setRows] = useState<LinkItem[]>([]);
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
		id: 'name' | 'amt' | 'linkType' | 'url' | 'added' | 'copy' | 'send';
		label: any;
		minWidth?: number;
		maxWidth?: number;
		align?: 'right' | 'left' | 'center';
		paddingLeft?: number
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Link name', minWidth: 100, paddingLeft: 39 },
		{ id: 'amt', label: 'Amount', minWidth: 100 },
		{ id: 'linkType', label: 'Link type', minWidth: 100 },
		{ id: 'url', label: 'Link URL', minWidth: 170 },
		// { id: "copy", label: "", maxWidth: 5 },
		// { id: "send", label: "", maxWidth: 10 },
		{ id: 'added', label: 'Date Created', minWidth: 100 },
	];

	const LinkRowTab = useCallback(
		(linkName, amount, linkType, paymentUrl, added, id, desc) => ({
			name: <p className={styles.tableBodyText}>{linkName}</p>,
			amt: (
				<p className={styles.tableBodyText}>
					<span className={styles.tableBodySpan}>NGN </span>
					{amount}
				</p>
			),
			linkType: <p className={styles.tableBodyText}>{linkType}</p>,
			url: (
				<Box className={styles.tableBodyFlex} sx={{ border: "12px solid transparent", position: "relative" }}>
					<p className={styles.tableBodyText} style={{ marginRight: "3rem", marginLeft: "-1rem" }}>{paymentUrl?.substring(0, 20)}</p>
					<Box sx={{ position: "absolute", right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>

						<Box onClick={(e) => e.preventDefault()}>
							<CopyToClipboard text={paymentUrl}>

								<IconButton>

									<CopyIcon />
								</IconButton>
							</CopyToClipboard>


						</Box>
						<Box className={styles.copyLink}>
							<IconButton onClick={() => history.push(`/payment_links/${id}`)}>

								<OpenInNewIcon sx={{ color: '#2F80ED', fontSize: 'large', mt: '6px' }}
								/>
							</IconButton>
						</Box>
					</Box>
				</Box>
			),
			// copy: <div style={{ border: '1px solid red'}}><ContentCopyIcon sx={{ color: '#27ae60', fontSize: '.85rem', mt: '6px' }} /></div>,
			// send: <div style={{ border: '1px solid red'}}><ExtLinkIcon /></div>,
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY')}
					<span className={styles.tableBodySpan}>
						{' '}
						{moment(added).format('h:mm A')}
					</span>
				</p>
			),
			id: <p className={styles.tableBodyText}>{id}</p>,
			desc: <p className={styles.tableBodyText}>{desc}</p>,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		links?.map((each: LinkItem) =>
			newRowOptions.push(
				LinkRowTab(
					each?.linkName,
					each?.amount,
					each?.linkType,
					each?.paymentUrl,
					each?.added,
					each?.id,
					each?.desc
				)
			)
		);
		setRows(newRowOptions);
	}, [links, LinkRowTab]);

	const getPaymentLinks = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetLinksRes>('/v1/payment/paymentlinks');
			const { paymentlinks, _metadata } = res?.data;
			if (paymentlinks.length) {
				setLinks(paymentlinks);
				setTotalRows(_metadata?.totalcount);
				console.log(paymentlinks, "links")
			}
			setIsUpdate(false)
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to get links',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		getPaymentLinks();
	}, [pageNumber, rowsPerPage, isUpdate]);



	return (
		<>
			<Modal
				open={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
				aria-labelledby='chargebacks filter modal'>
				<div className={styles.filterModalContainer}>
					<Box className={styles.filterHeader}>
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
			<div className={styles.topContainer}>
				<div>
					<p>{totalRows} payment links</p>
				</div>
				<div className={btnClasses.root}>
					<Button style={{ borderRadius: "20px" }} onClick={() => setIsFilterModalOpen(true)}>
						<FilterAltOutlinedIcon />Filter by:
					</Button>
					<Button style={{ borderRadius: "20px" }} onClick={openLinkModal}>+ New payment link</Button>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<CustomClickTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
					// clickable
					// link='/payment_links'
					identifier='id'
					rowsData={links}
				/>
			</div>


		</>
	);
};

export default LinksView;
