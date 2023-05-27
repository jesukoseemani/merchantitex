import React, { useCallback, useEffect, useState } from 'react';
import styles from './PaymentLinksItem.module.scss';
import NavBar from '../../components/navbar/NavBar';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CustomClickTable from '../../components/table/CustomClickTable';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import moment from 'moment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ReactComponent as ExtLinkIcon } from '../../assets/images/ext-link.svg';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DisableInvoice from '../../components/bills/invoice/DisableInvoice';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import CustomStatus from '../../components/customs/CustomStatus';

import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomCurrencyFormat from '../../components/customs/CustomCurrencyFormat';
import { Paymentlink, PaymentLinkItem, TransactionRes } from '../../types/PaymentItemType';
import { Transaction } from '../../types/Transaction';

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

	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [rows, setRows] = useState<Transaction[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [linkItem, setLinkItem] = useState<Paymentlink>();

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

	const dispatch = useDispatch();

	const { id } = useParams<{ id: string }>();







	// fetch payment link by id

	const getPaymentLinkById = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get<any>(`/v1/payment/paymentlinks/${id}`);
			console.log(data);

			if (data?.paymentlink) {
				setLinkItem(data?.paymentlink);
				setTransactions(data?.transactions?.transactions)
			}
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
		getPaymentLinkById();

		// return () => setLinkItem("")
	}, [id]);

	console.log(linkItem, "linkitemsmsms");



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
		(currency, amount, email, responsemessage, chargetype, timein, id) => ({
			amount: <p className={styles.tableBodyText}><CustomCurrencyFormat amount={amount} currency={currency} /></p>,
			code: <CustomStatus text={responsemessage} type={responsemessage} />,
			email: <p className={styles.tableBodyText}>{email}</p>,
			paymentmethod: (
				<p className={styles.tableBodyText}>
					<span className={styles.capitalize}>{chargetype ? chargetype : "N/a"}</span>
				</p>
			),
			added: (
				<p className={styles.tableBodyText}>
					{moment(timein).format('MMM D YYYY h:mm A')}
				</p>
			),
			id: <p>{id}</p>
		}),
		[]
	);



	// console.log(linkItem)


	useEffect(() => {
		const newRowOptions: any[] = [];
		transactions?.map((each: Transaction) =>
			newRowOptions.push(
				TransactionRowTab(
					each?.currency,
					each?.amount,
					each?.customer?.email,
					each?.responsemessage,
					each?.chargetype,
					each?.timein,
					each?.id
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
						<Link to='/payment_links' style={{ textDecoration: "none" }}>
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
							<h2 className={styles.nameText}>{linkItem?.linkName}</h2>

							<CustomStatus text={linkItem?.status} type={linkItem?.status} />
						</div>
						<div>
							{/* <button>Edit</button> */}
							<button onClick={handleDisable}>Disable</button>
							{/* <button>Delete</button> */}
						</div>
					</div>
					<div className={styles.sectionThree}>

						<div>
							<span>Payment Link URL</span>
							<p>
								{linkItem?.paymenturl?.substring(0, 25)}
								<CopyToClipboard text={String(linkItem?.paymenturl)}>
									<IconButton>
										<CopyIcon />
									</IconButton>

								</CopyToClipboard>


								<IconButton onClick={() => window.location.href = String(linkItem?.paymenturl)} className={styles.urlBox}>

									<ExtLinkIcon style={{ color: "#2F80ED" }} />
								</IconButton>


							</p>
						</div>
						<div>
							<span>Date created</span>
							<p className={styles.tableBodyText}>
								{moment(linkItem?.createdAt).format('MMM D YYYY')}
								<span className={styles.tableBodySpan}>
									{' '}
									{moment(linkItem?.createdAt).format('h:mm A')}
								</span>
							</p>
						</div>
						<div>
							<span>Link type</span>
							<p>{linkItem?.linkType}</p>
						</div>
						<div>
							<span>Amount</span>
							<p>NGN {FormatToCurrency(Number(linkItem?.amount))}</p>
						</div>
						{linkItem?.donationWebsite && <div>
							<span>Donation websites</span>
							<Link to={linkItem?.donationWebsite}> {linkItem?.donationWebsite}</Link>
						</div>}
						{linkItem?.redirectUrl && <div>
							<span>RedirectUrl</span>
							<p> {linkItem?.redirectUrl}</p>
						</div>}
						{linkItem?.subChargeCount && <div>
							<span>Charge count</span>
							<p> {linkItem?.subChargeCount}</p>
						</div>}
						{linkItem?.donationContact && <div>
							<span>Contact phone number</span>
							<p> {linkItem?.donationContact && linkItem?.donationContact}</p>
						</div>}

					</div>

					<div className={styles.sectionThree_box2}>

						<div className={styles.descBox}>
							<span>Description</span>
							<p>{linkItem?.description}</p>
						</div>

						{linkItem?.pageImage &&
							<div className={styles.img}>
								<span>Image</span>
								<img src={linkItem?.pageImage} alt={linkItem?.linkName} width="117px" height={"55px"} />
							</div>
						}
					</div>
				</div>

			</div>
			{/* <hr /> */}
			<div className={styles.sectionFour}>
				<div>
					<Stack direction={"row"} spacing={1} justifyContent="space-between" flexWrap={"wrap"} alignItems={"center"}>
						<h3>{totalRows && totalRows} Transactions</h3>
						{/* <Box className={styles.buttonGroup}>
							<button> <FilterAltOutlinedIcon />filter by</button>
							<button> <InsertDriveFileOutlinedIcon />Download</button>
						</Box> */}

					</Stack>
					<div className={styles.tableContainer}>
						<CustomClickTable
							columns={columns}
							rows={rows}
							totalRows={totalRows}
							changePage={changePage}
							limit={limit}
							clickable
							link="/transaction"
							identifier="id"
						/>
					</div>
				</div>
			</div>
		</div>


	);
};

export default PaymentLinksItem;
