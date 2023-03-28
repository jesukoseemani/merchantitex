import { useEffect, useState } from "react";
import { Button, Label } from "semantic-ui-react";
import Styles from "./transaction.module.scss";
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import { ReactComponent as CheckIcon } from "../../assets/images/circle-check.svg";
import { ReactComponent as VisaIcon } from "../../assets/images/visa.svg";
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

import { TransactionItem } from "../../types/Transaction";
import { Box, Grid, IconButton } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function Transaction() {




	let { id } = useParams<{ id: string }>();
	const [transaction, setTransaction] = useState<any>({});
	const [activeStep, setActiveStep] = useState(0);

	const location = useLocation<{ rowData: string }>();
	const history = useHistory();
	if (!location.state.rowData) {
		history.replace("/bills/invoice");
	}

	const { rowData } = location.state;

	const formattedRowData: TransactionItem = JSON.parse(rowData);

	const {
		amt, PaymentType, acctId, status, added, cardType,
		cardNumber, reference, transfee } = formattedRowData;

	const dispatch = useDispatch();

	const getTransactions = () => {
		dispatch(openLoader());
		axios
			.get(`/merchant/transactions?merchantreference=${id}`)
			.then((res: any) => {
				const {
					transactions,
					_metadata: { totalcount },
				} = res?.data;
				setTransaction(transactions[0]);
				dispatch(closeLoader());
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());

			});
	};

	useEffect(() => {
		getTransactions();
	}, [id]);

	// const status = "successful";
	// const { amount, currency } = transaction?.order ?? "";
	// const { added, reference } = transaction?.transaction ?? "";

	// const { email, card } = transaction?.source?.customer ?? "";

	const statusFormatObj: { [key: string]: string } = {
		successful: "wonText",
		failed: "lostText",
		pending: "pendingText",
	};
	return (

		<div className={Styles.container}>
			{/* <NavBar /> */}
			<div className={Styles.header}>
				<span onClick={() => history.push('/transactions/list')} style={{
					display: "flex",
					alignItems: "center"
				}}>
					<ArrowLeftIcon />
					Back to transactions
				</span>
			</div>
			<Box className={Styles.sectionOne}>
				<div className={Styles.headerTitle}>
					<div className={Styles.amt_box}>
						<p>NGN{amt ?? 0}</p>

						<Label className={Styles[statusFormatObj[status] || "pendingText"]}>{status}</Label>
					</div>
					<Button className={Styles.refundBtn}>Refund customer</Button>
				</div>

				<div className={Styles.customerDetails}>
					<div>
						<div>
							<span>Date / Time</span>
							<h2>{moment(added).format('LLL')}</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Customer</span>
							<h2>{acctId}</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Card type</span>
							<h2>{<VisaIcon />}</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Card number</span>
							<h2>{cardNumber}</h2>
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
								{reference}
								<IconButton>
									<CopyIcon />
								</IconButton>
							</h2>
						</Grid>
						<Grid item xs={12} sm={4} md={1.8}>
							<span className={Styles.timeline}>Transaction Fee</span>
							<h2>{transfee ?? 0}</h2>
						</Grid>
						<Grid item xs={12} sm={4} md={1.8}>
							<span>Country/Region</span>
							<h2>Lagos, Nigeria</h2>
						</Grid>
						<Grid item xs={12} sm={4} md={1.8}>
							<span>Bank name</span>
							<h2>Access Bank</h2>
						</Grid>
						<Grid item xs={12} sm={4} md={3.2}>
							<span>ITEX Reference</span>
							<h2>ITEX-ab95cf961f454669a4</h2>
						</Grid>
					</Grid>

				</Box>
			</Box>

			<Box className={Styles.sectionOne}>
				<div className={Styles.last__section__header}>
					<h2>Transaction timeline</h2>
					<div>
						<h2 className={Styles.success}>1 min 05secs</h2>
						<span>Time spent making payment</span>
					</div>
					<div>
						<h2 className={Styles.danger}>1 Error</h2>
						<span>While making payment</span>
					</div>
				</div>


				<div className={Styles.paymentStage}>
					{/* <div>
						<CheckColorIcon />

						<div>
							<h2>Payment started</h2>
							<p>
								Aug 13 2020 <span>2:21 PM</span>
							</p>
						</div>
					</div>
					<div>
						<CheckColorIcon />
						<div>
							<h2>Payment started</h2>
							<p>
								Aug 13 2020 <span>2:21 PM</span>
							</p>
						</div> */}




					<Box className={Styles.paymentStage}>
						<Stepper activeStep={2} orientation="vertical" sx={{
							".css-iprrf9-MuiStepConnector-line": {
								height: "70px",
								marginTop: "-30px"
							}
						}}>
							<Step >
								<StepLabel className={Styles.steplabel} icon={<CheckColorIcon />} optional={<p>
									Aug 13 2020 <span>2:21 PM</span>
								</p>}>
									<h2>Payment started</h2>
								</StepLabel>
							</Step>
							<Step sx={{ marginTop: "-30px" }}>
								<StepLabel className={Styles.steplabel} icon={<CheckColorIcon />} optional={<p>
									Aug 13 2020 <span>2:21 PM</span>
								</p>}>
									<h2>Payment Completed</h2>
								</StepLabel>
							</Step>
						</Stepper>
					</Box>
					<div className={Styles.link}>

						<Link to='/'>Show breakdown</Link>
					</div>
					{/* </div> */}
				</div>

			</Box>
		</div>
	);
}
