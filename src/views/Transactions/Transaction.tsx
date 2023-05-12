import { useEffect, useState } from "react";
import { Button, Label } from "semantic-ui-react";
import Styles from "./transaction.module.scss";
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import { ReactComponent as LinkIcon } from "../../assets/images/ext-link.svg";
// import { ReactComponent as VisaIcon } from "../../assets/images/visa.svg";
import { ReactComponent as BlaklistIcon } from "../../assets/images/blacklistIcon.svg";
import { ReactComponent as CheckColorIcon } from "../../assets/images/circle-check-color.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	closeLoader,
	openLoader,
} from "../../redux/actions/loader/loaderActions";
import moment from "moment";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { TransactionResponse } from "../../types/Transaction";
import { Box, Grid, IconButton, Avatar } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { getTransactionStatus } from "../../utils/status";
import { getTransactionByPaymentId } from "../../services/transaction";
import { statusFormatObj } from "../../helpers";
import CopyText from '../../helpers/CopyId';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CustomToast } from "../../components/customs/CustomToast";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import TransBreakDown from "./TransBreakDown";
import CustomStatus from "../../components/customs/CustomStatus";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Addtoblacklist from "../Customers/Addtoblacklist";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import Navigation from "../../components/navbar/Navigation";
import CustomDateFormat from "../../components/customs/CustomDateFormat";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";


export default function Transaction() {

	let { id } = useParams<{ id: string }>();
	const [transaction, setTransaction] = useState<TransactionResponse | null>(null);
	const [activeStep, setActiveStep] = useState(0);
	const history = useHistory();

	const dispatch = useDispatch();

	const getTransactions = async () => {
		try {
			dispatch(openLoader())

			const res = await getTransactionByPaymentId(id);
			setTransaction(res || null)
			dispatch(closeLoader())
		} catch (error: any) {
			dispatch(closeLoader())

			dispatch(
				openToastAndSetContent({
					toastContent: error?.response?.data?.message || 'Failed to get transactions',
					msgType: "error"
				})
			);
		}
	};

	useEffect(() => {
		getTransactions();
	}, [id]);
	console.log(transaction, "transitem");


	if (!transaction) return null;





	const handleBreakDown = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					width: "448px",
					minHeight: "638px",
					borderRadius: '20px',
					boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
				},
				modalTitle: "Transaction Event",
				modalContent: (
					<div className='modalDiv'>

						<TransBreakDown />
					</div>
				),
			})
		);

	}

	// const callback = () => {
	// 	getSingleCustomer()
	// }
	const handleBLacklist = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					width: "653px",
					height: "500px !important",
					borderRadius: '20px',
					boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"

				},
				modalTitle: "Blacklist customer",
				modalContent: (
					<div className='modalDiv'>
						<Addtoblacklist id={id} />
					</div>
				),
			})
		);
	};
	return (

		<Navigation title="Transactions">
			<div className={Styles.container}>
				{/* <NavBar /> */}
				<div className={Styles.header}>
					<span onClick={() => history.push('/transactions')} style={{
						display: "flex",
						alignItems: "center"
					}}>
						<ArrowLeftIcon />
						Back to transactions
					</span>
				</div>
				<Box className={Styles.sectionOne}>
					<div className={Styles.headerTitle}>
						<div className={Styles.leftText}>
							<div className={Styles.amt_box}>
								<p>NGN{FormatToCurrency(transaction?.transaction?.amount) ?? 0}</p>
							</div>

							<div>

								<CustomStatus text={getTransactionStatus(transaction?.transaction?.responsecode)} type={getTransactionStatus(transaction?.transaction?.responsecode)} />
							</div>
						</div>
						<div className={Styles.btn__group}>
							<Button className={Styles.refundBtn}>Resend Receipt</Button>
							<Button className={Styles.resendBtn}>Refund customer</Button>
						</div>
					</div>

					<div className={Styles.customerDetails}>
						<div>
							<div>
								<span>Date / Time</span>
								<h2>{moment(transaction?.transaction?.timein).format('LLL')}</h2>
							</div>
						</div>
						<div>
							<div>
								<span>Customer</span>
								<h2>{transaction?.transaction?.customer?.email || ''}</h2>
							</div>
						</div>
						<div>
							<div>
								<span>Card type</span>
								<h2>{transaction?.transaction?.chargetype}</h2>
							</div>
						</div>
						<div>
							<div>
								<span>Card number</span>
								<h2>{transaction?.transaction?.mask}</h2>
							</div>
						</div>

					</div>


				</Box>

				<Box className={Styles.sectionTwo} >
					<div className={Styles.headerTitle}>
						<h2>Payment information</h2>
					</div>
					<Box className={Styles.containerBox}>
						<Grid container spacing={2} justifyContent="flex-start" alignItems={"center"}>
							<Grid item xs={12} sm={4} md={3.4}>
								<span>Payment reference</span>
								<h2>
									{transaction?.transaction?.paymentlinkreference?.substring(0, 22)}
									<CopyToClipboard text={transaction?.transaction?.paymentlinkreference}>
										<IconButton>
											<CopyIcon />
										</IconButton>
									</CopyToClipboard>
								</h2>
							</Grid>

							<Grid item xs={12} sm={3} md={1.8}>
								<span className={Styles.timeline}>Transaction Fee</span>
								<h2>{FormatToCurrency(transaction?.transaction?.fee) || 0}</h2>
							</Grid>
							<Grid item xs={12} sm={3} md={1.8}>
								<span>Country/Region</span>
								<h2>{transaction?.transaction?.paylocationcountry}</h2>
							</Grid>
							<Grid item xs={12} sm={3} md={1.8}>
								<span>Bank name</span>
								{/* <h2>Access Bank</h2> */}
							</Grid>
							<Grid item xs={12} sm={5} md={5} lg={3}>
								<span>ITEX Reference</span>
								<h2>{transaction?.transaction?.paymentid}</h2>
							</Grid>
						</Grid>
					</Box>
					<div className={Styles.naration}>
						<span>Narration</span>
						<h2>{transaction?.transaction?.narration}</h2>

					</div>

				</Box>





				<div className={Styles.payment_wrapper}>

					<div className={Styles.paymentStage}>
						<div className={Styles.last__section__header}>
							<h2>Transaction Event</h2>

						</div>
						<div className={Styles.stepWrapper}>
							{!transaction?.events.length ? (
								<p>No transaction Event</p>
							) : <Stepper activeStep={transaction?.events?.length} orientation="vertical" >
								{
									transaction?.events?.map((x: any, i: number) => (
										<Step>
											<StepLabel icon={<CheckColorIcon />} key={i}>
												<div className={Styles.labelBox}>
													<div>
														<h6>{x?.activity}</h6>
														<p><CustomDateFormat date={x?.timein} time={x?.timein} />
														</p>
													</div>
													<div>
														<p className={Styles.success}>1 min 05secs <span>Time spent making payment</span></p>

													</div>
												</div>
											</StepLabel>

										</Step>
									))}


							</Stepper>}

						</div>



						{transaction?.events?.length > 0 && <div className={Styles.link}>

							<div onClick={handleBreakDown}><p>Show breakdown</p></div>
						</div>}
					</div>

					<div>
						<div className={Styles.last__section__header}>
							<h2>Customer Information</h2>

						</div>

						<div className={Styles.customerInfo}>
							<div className={Styles.customerInfo_left}>
								<Avatar sx={{ bgcolor: "#2684ED", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
									{`${transaction?.transaction?.customer?.firstname?.slice(0, 1)} ${transaction?.transaction?.customer?.lastname?.slice(0, 1)}`}
								</Avatar>
								<div>
									<p>{`${transaction?.transaction?.customer?.firstname} ${transaction?.transaction?.customer?.lastname}`}</p>
									<span>{transaction?.transaction?.customer?.email}</span>
								</div>
							</div>
							<div className={Styles.blacklist} onClick={handleBLacklist}>
								<p>Blacklist customer  <DoDisturbIcon /></p>
							</div>
							<br />
							<div className={Styles.profile}>
								<p>See customer profile </p>
								<IconButton>
									<LinkIcon />
								</IconButton>
							</div>
						</div>
					</div>
				</div>



			</div >

		</Navigation >
	);
}
