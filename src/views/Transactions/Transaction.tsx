import { useEffect, useState } from "react";
import { Button, Label } from "semantic-ui-react";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./transaction.module.scss";
import { ReactComponent as CancelIcon } from "../../assets/images/cancel.svg";
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import { ReactComponent as CheckIcon } from "../../assets/images/circle-check.svg";
import { ReactComponent as CheckColorIcon } from "../../assets/images/circle-check-color.svg";
import { IconButton } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
	closeLoader,
	openLoader,
} from "../../redux/actions/loader/loaderActions";
import moment from "moment";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

export default function Transaction() {
	let { id } = useParams<{ id: string }>();
	const [transaction, setTransaction] = useState<any>({});

	const history = useHistory();
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

	const status = "successful";
	const { amount, currency } = transaction?.order ?? "";
	const { added, reference } = transaction?.transaction ?? "";
	const { email, card } = transaction?.source?.customer ?? "";
	return (

			<div className={Styles.container}>
				{/* <NavBar /> */}
				<div className={Styles.header}>
					<span onClick={() => history.push('/transactions/list')}>
						<ArrowLeftIcon />
						Back to transactions
					</span>
					<div>
						<div>
							<h2>{`${currency ?? ''}${FormatToCurrency?.(amount) ?? 0}`}</h2>
							<Label
								className={
									transaction?.code === '00'
										? 'success'
										: transaction?.code === '09'
											? 'danger'
											: 'warning'
								}>
								{transaction?.code === '00'
									? 'Successful'
									: transaction?.code === '09'
										? 'Failed'
										: 'Pending'}
							</Label>
						</div>
						<Button>Refund customer</Button>
					</div>
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
							<h2>{email}</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Card type</span>
							<h2>{card?.type}</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Card number</span>
							<h2>{card?.number}</h2>
						</div>
					</div>
					<div className={Styles.cta}>
						<Button>
							Blacklist customer <CancelIcon />
						</Button>
					</div>
				</div>
				<div className={Styles.title}>
					<h2>Payment information</h2>
				</div>
				<div className={Styles.customerDetails}>
					<div>
						<div>
							<span>Payment reference</span>
							<h2>
								{reference}
								<IconButton>
									<CopyIcon />
								</IconButton>
							</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Transaction Fee</span>
							<h2>0</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Country/Region</span>
							<h2>Lagos, Nigeria</h2>
						</div>
					</div>
					<div>
						<div>
							<span>Bank name</span>
							<h2>Access Bank</h2>
						</div>
					</div>
					<div>
						<div>
							<span>ITEX Reference</span>
							<h2>ITEX-ab95cf961f454669a4</h2>
						</div>
					</div>
				</div>
				<div className={Styles.title}>
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
					<div>
						<CheckIcon />
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
						</div>
					</div>
				</div>
				<Link to='/'>Show breakdown</Link>
			</div>
	);
}
