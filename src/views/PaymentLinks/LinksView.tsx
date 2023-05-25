import styles from './PaymentLinks.module.scss';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Grid, IconButton, Modal, OutlinedInput, TextField } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
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
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomCurrencyFormat from '../../components/customs/CustomCurrencyFormat';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import PaymentLinkFilter from './PaymentLinkFilter';
import { PAYMENTLINK_FILTER_DATA } from '../../constant';
import { stripSearch } from '../../utils';


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


	const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

	const [links, setLinks] = useState<LinkItem[]>([]);
	const [rows, setRows] = useState<LinkItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { search } = useLocation()
	const [reset, setReset] = useState<boolean>(false);
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [ref, setRef] = useState('');
	const [status, setStatus] = useState('');
	const [payment, setPayment] = useState('');
	const [event, setEvent] = useState('');

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
	const clearHandler = () => {
		setEvent('');
		setFromDate('');
		setToDate('');
		setStatus('');
		setRef('');
		setIsFilterModalOpen(false);
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
		(linkName, currency, amount, linkType, paymentUrl, createdAt, id, desc) => ({
			name: <p className={styles.tableBodyText}>{linkName}</p>,
			amt: (
				<CustomCurrencyFormat amount={amount} currency={currency} />
			),
			linkType: <p className={styles.tableBodyText}>{linkType}</p>,
			url: (
				<Box className={styles.tableBodyFlex} sx={{ border: "12px solid transparent", position: "relative" }}>
					<p className={styles.tableBodyText} style={{ marginRight: "3rem", marginLeft: "-1rem" }}>{paymentUrl?.substring(0, 20)}...</p>
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
				<CustomDateFormat date={createdAt} time={createdAt} />
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
					each?.currency,
					each?.amount,
					each?.linkType,
					each?.paymentUrl,
					each?.createdAt,
					each?.id,
					each?.desc
				)
			)
		);
		setRows(newRowOptions);
	}, [links, LinkRowTab]);

	const getPaymentLinks = async ({ fromdate, todate, reference, status } = PAYMENTLINK_FILTER_DATA) => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetLinksRes>(`/v1/payment/paymentlinks?search=${stripSearch(search)}&page=${pageNumber}&perpage=${rowsPerPage}&status=${status}&reference=${reference}&fromdate=${fromdate}&todate=${todate}`);
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
					msgType: "error"
				})
			);
		}
	};

	useEffect(() => {
		getPaymentLinks();
	}, [pageNumber, rowsPerPage, isUpdate, search]);
	const action = (form: typeof PAYMENTLINK_FILTER_DATA) => {
		getPaymentLinks(form)
	}
	const modalFunc = () => {
		setIsFilterModalOpen(false)
		setReset(true);
	};


	return (
		<>
			<PaymentLinkFilter
				isOpen={isFilterModalOpen}
				handleClose={() => setIsFilterModalOpen(false)}
				action={action}
				clearHandler={clearHandler}
				name='paymentlink'
				filterFunction={modalFunc}
			/>
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
