import React, { useCallback, useEffect, useState } from 'react';
import styles from './PaymentLinksItem.module.scss';
import NavBar from '../../components/navbar/NavBar';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Box, Button, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CustomClickTable from '../../components/table/CustomClickTable';
import { GetTransactionsRes, TransactionItem } from '../../types/CustomerTypes';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import { GetLinksRes, LinkItem } from '../../types/PaymentlinkTypes';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ReactComponent as ExtLinkIcon } from '../../assets/images/ext-link.svg';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DisableInvoice from '../../components/bills/invoice/DisableInvoice';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';



const useBtnStyles = makeStyles({
	root: {
		fontFamily: `'Avenir', sans-serif`,
		display: 'flex',
		gap: '1rem',
		'& .MuiButtonBase-root': {
			borderRadius: '.25rem',
			padding: '.25rem .75rem',
			textTransform: 'none',
			fontSize: '.875rem',
			fontWeight: '400',
			alignItem: 'center',
			display: 'flex',
			backgroundColor: '#E0E0E0',
			color: '#333',
		},
		'& .MuiButtonBase-root:nth-child(3)': {
			backgroundColor: '#eb5757',
			color: '#FFF',
			gap: '.5rem',
		},
		'& svg': {
			fontSize: '1rem',
			marginLeft: '.25rem',
		},
	},
});

const PaymentLinksItem = () => {
	const btnClasses = useBtnStyles();

	const [transactions, setTransactions] = useState<TransactionItem[]>([]);
	const [rows, setRows] = useState<TransactionItem[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [linkItem, setLinkItem] = useState<any>();

	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [totalAmt, setTotalAmt] = useState<number>(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const location = useLocation<{ rowData: string }>();
	const history = useHistory();
	const dispatch = useDispatch();

	const { id } = useParams<{ id: string }>();

	// if (!location.state.rowData) {
	// 	history.replace('/payment_links');
	// }





	// fetch payment link by id

	const getPaymentLinkById = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get<any>(`/v1/payment/paymentlinks/${id}`);

			if (data?.paymentlink) {
				setLinkItem(data?.paymentlink);
			}
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
		getPaymentLinkById();

		return () => setLinkItem("")
	}, [id]);

	console.log(linkItem, "linkitemsmsms");
	console.log(typeof linkItem, "linkitemsmsms");



	// const { linkName, amount, linkType, paymentUrl, added, website, pageImage, frequency, chargeCount, donationContact } = linkItem;
	interface Column {
		id: 'amount' | 'email' | 'added' | 'paymentmethod' | 'code';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{ id: 'amount', label: 'Amount', minWidth: 100 },
		{ id: 'code', label: 'Status', minWidth: 100 },
		{ id: 'email', label: 'Customer ID', minWidth: 100 },
		{ id: 'paymentmethod', label: 'Payment Type', minWidth: 100 },
		{ id: 'added', label: 'Date', minWidth: 100 },
	];

	const formatStatus = (val: string) => {
		if (val === '00') {
			return <p className={styles.successText}>Successful</p>;
		} else if (val === '09') {
			return <p className={styles.failText}>Failed</p>;
		} else {
			return <p className={styles.pendingText}>Pending</p>;
		}
	};

	const TransactionRowTab = useCallback(
		(email, added, amount, code, paymentmethod) => ({
			amount: <p className={styles.tableBodyText}>NGN{amount}</p>,
			code: formatStatus(code),
			email: <p className={styles.tableBodyText}>{email}</p>,
			paymentmethod: (
				<p className={styles.tableBodyText}>
					<span className={styles.capitalize}>{paymentmethod}</span>
				</p>
			),
			added: (
				<p className={styles.tableBodyText}>
					{moment(added).format('MMM D YYYY h:mm A')}
				</p>
			),
		}),
		[]
	);

	const getTransactions = async () => {
		dispatch(openLoader());
		try {
			const res = await axios.get<GetTransactionsRes>(
				`/merchant/transactions?email=o@k.com&page=${pageNumber}&perpage=${rowsPerPage}`
			);
			const { transactions, _metadata } = res?.data;
			if (transactions.length) {
				setTransactions(transactions);
				setTotalRows(_metadata?.totalcount);
			}
			dispatch(closeLoader());
		} catch (err) {
			console.log(err);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: 'Failed to get transactions',
					toastStyles: {
						backgroundColor: 'red',
					},
				})
			);
		}
	};

	useEffect(() => {
		getTransactions();
	}, [pageNumber, rowsPerPage]);

	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: TransactionItem) =>
			newRowOptions.push(
				TransactionRowTab(
					each?.source.customer.email,
					each?.transaction.added,
					each?.order.amount,
					each?.code,
					each?.transaction.paymentmethod
				)
			)
		);
		setRows(newRowOptions);
	}, [transactions, TransactionRowTab]);





	const handleDisable = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					borderRadius: 20
				},

				modalTitle: "Disable Invoice",
				modalContent: (
					<div className='modalDiv'>
						<DisableInvoice id={id} />
					</div>
				),
			})
		);
	}




	return (


		<div className={styles.container}>

			<div className={styles.pageWrapper}>
				<div className={styles.sectionOne}>
					<div>
						<Link to='/payment_links'>
							<div>
								<ArrowLeftIcon />
								<p>Back to payment links</p>
							</div>
						</Link>
					</div>
				</div>
				<div className={styles.sectionWrapper}>
					<div className={styles.sectionTwo}>
						<div>
							<p className={styles.nameText}>{linkItem?.linkName}</p>
							<p style={{ borderRadius: "20px" }}>Active</p>
						</div>
						<div className={btnClasses.root}>
							<Button style={{ borderRadius: "20px", height: "34px" }}>Edit</Button>
							<Button onClick={handleDisable} style={{ borderRadius: "20px", height: "34px" }}>Disable</Button>
							<Button style={{ borderRadius: "20px", height: "34px" }}>Delete</Button>
						</div>
					</div>
					<div className={styles.sectionThree}>
						<div>
							<div>
								<p>Payment Link URL</p>
								<p>
									{linkItem?.paymentUrl} <ContentCopyIcon style={{ color: "#2F80ED", fontSize: "50px" }} fontSize={"large"} /> <ExtLinkIcon style={{ color: "#2F80ED" }} />
								</p>
							</div>
							<div>
								<p>Date created</p>
								<p>{moment(linkItem?.added).format('MMM D YYYY h:mm A')}</p>
							</div>
							<div>
								<p>Link type</p>
								<p>{linkItem?.linkType}</p>
							</div>
							<div>
								<p>Amount</p>
								<p>NGN {linkItem?.amount}</p>
							</div>
							{linkItem?.donationWebsite && <div>
								<p>Donation websites</p>
								<Link to={linkItem?.donationWebsite}> {linkItem?.donationWebsite}</Link>
							</div>}
							{linkItem?.redirectUrl && <div>
								<p>RedirectUrl</p>
								<p> {linkItem?.redirectUrl}</p>
							</div>}
							{linkItem?.chargeCount && <div>
								<p>Charge count</p>
								<p> {linkItem?.chargeCount}</p>
							</div>}
							{linkItem?.donationContact && <div>
								<p>Contact phone number</p>
								<p> {linkItem?.donationContact && linkItem?.donationContact}</p>
							</div>}
						</div>

						<div className={styles.box}>

							<div className={styles.descBox}>
								<p>Description</p>
								<p>{linkItem?.description}</p>
							</div>

							{linkItem?.pageImage &&
								<div className={styles.img}>
									<p>Image</p>
									<img src={linkItem?.pageImage} alt={linkItem?.linkItempageImage} width="117px" height={"55px"} />
								</div>
							}
						</div>
					</div>
				</div>

			</div>
			{/* <hr /> */}
			<div className={styles.sectionFour}>
				<div>
					<Stack direction={"row"} spacing={1} justifyContent="space-between" flexWrap={"wrap"} alignItems={"center"}>
						<h3>30 Transactions</h3>
						<Box className={styles.buttonGroup}>
							<button> <FilterAltOutlinedIcon />filter by</button>
							<button> <InsertDriveFileOutlinedIcon />Download</button>
						</Box>

					</Stack>
					<div className={styles.tableContainer}>
						<CustomClickTable
							columns={columns}
							rows={rows}
							totalRows={totalRows}
							changePage={changePage}
							limit={limit}
						/>
					</div>
				</div>
			</div>
		</div>


	);
};

export default PaymentLinksItem;
