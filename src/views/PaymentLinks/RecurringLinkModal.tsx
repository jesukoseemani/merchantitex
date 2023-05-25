import {
	Backdrop,
	Button,
	Modal,
	IconButton,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Box,
	Chip,
	MenuItem,
	TextField,
	InputLabel,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { ArrowDropUp } from '@material-ui/icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { paymentDonation, subscriptionSchema } from '../../components/validation/payment/paymentValidation';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomInputField from '../../components/customs/CustomInputField';
import styles from './PaymentLinks.module.scss';
import CustomInputDropdown from '../../components/customs/CustomInputDropdown';
import useCurrency from '../../components/hooks/Usecurrency';
import CustomCurrency from '../../components/formUI/SelectCountry/CustomCurrency';
import CustomSelect from '../../components/customs/CustomSelect';
import CustomInterval from '../../components/customs/CustomInterval';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface RecurringLinkModalProps {
	isOpen: boolean;
	handleClose: () => void;
	setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
	code: string;
	message: string;
}




const useStyles = makeStyles({
	root: {
		border: '1px solid #D5DAE1',
		boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
		borderRadius: '20px',
		backgroundColor: 'white',
		maxWidth: '400px',
		maxHeight: '700px',
		overflowY: 'scroll',
		width: '100%',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontFamily: `'Avenir', sans-serif`,


		'& > div:nth-child(1)': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '1.4rem 3.58rem',
			'& .MuiIconButton-root': {
				padding: '6px',
				marginBottom: '3px',
			},
			'& p': {
				color: '#828282',
				fontSize: '1.125rem',
				fontWeight: '400',
			},
		},
		'& hr': {
			background: '#E0E0E0',
		},
		'& > div:nth-child(3)': {
			display: 'grid',
			gridGap: '1rem',
		},
		'& > div:nth-child(4)': {
			padding: '0rem 2rem',
			marginTop: '1.5rem',
		},
	},
	formBox: {
		display: 'grid',
		paddingInline: "3.55rem !important",
		'& label': {
			color: '#333',
			fontWeight: '400',
			fontSize: '.875rem',
		},
		'& input, & textarea, & .MuiSelect-select': {
			background: 'white',
			borderRadius: '4px',
			marginTop: '.2rem',
			padding: '.75rem',
			fontSize: '.875rem',
			resize: 'none',
			'&::placeholder': {
				color: '#B9B9B9',
			},
		},
		'& textarea': {
			padding: '0rem',
		},
		'& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
		{
			WebkitAppearance: 'none',
			margin: '0',
		},
	},
	formBtn: {

		fontFamily: 'Avenir',
		color: 'white',
		fontWeight: 700,
		fontSize: '1rem',
		backgroundColor: '#27AE60',
		padding: '.5rem',
		borderRadius: '.25rem',
		textTransform: 'none',
		height: "44px",
		'&:hover': {
			opacity: '.75',
			backgroundColor: '#27AE60',
		},
		'&:disabled': {
			opacity: '.75',
		},
	},
	suffix: {
		display: 'grid',
		placeItems: 'center',
		height: '92%',
		marginTop: '3px',
		fontSize: '.875rem',
		borderRight: '1px solid #ddd',
		'& p': {
			marginTop: '-1px',
			marginRight: '12px',
			whiteSpace: 'nowrap',
		},
	},
	addBtn: {
		color: '#27ae60',
		cursor: 'pointer',
		padding: " 0.55rem 3.5rem !important",
		fontFamily: 'Avenir',
		lineHeight: "22px",
		fontWeight: 400,
		fontSize: '1rem',
		'&:hover': {
			opacity: '.75',
		},
	},
	removeBtn: {
		color: '#4f4f4f',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		borderBottom: "1px solid #E0E0E0",
		padding: " 0.55rem 3.5rem !important",
		'&:hover': {
			opacity: '.75',
		},
	},
	addView: {
		display: 'grid',
		gridGap: '1rem',
	},
	headerTitle: {
		padding: "2rem",

	},
	form_container: {
		// padding: '1rem 2rem',


	}
});


const RecurringLinkModal = ({
	isOpen,
	handleClose,
	setIsUpdate
}: RecurringLinkModalProps) => {
	const classes = useStyles();

	const [linkName, setLinkName] = useState<string>('');
	const [amt, setAmt] = useState<number | undefined>(undefined);
	const [desc, setDesc] = useState<string>('');
	const [userInterval, setUserInterval] = useState<string>('');
	const [numCharge, setNumCharge] = useState<number | undefined>(undefined);
	const [customLink, setCustomLink] = useState<string>('');
	const [redirect, setRedirect] = useState<string>('');
	const [fieldName, setFieldName] = useState<string>('');
	const [selectedCurrency, setSelectedCurrency] = useState<string[]>([]);
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);



	const dispatch = useDispatch()
	const { currencyList } = useCurrency()


	const closeModal = () => {
		setLinkName('');
		setAmt(undefined);
		setNumCharge(undefined);
		setDesc('');
		setUserInterval('');
		setCustomLink('');
		setRedirect('');
		setIsAddOpen(false);
		setSelectedCurrency([]);
		handleClose();
	};


	const interValList = [
		{
			id: 1,
			time: "10"
		},
		{
			id: 2,
			time: "20"
		},
		{
			id: 3,
			time: "30"
		},
		{
			id: 4,
			time: "40"
		},
		{
			id: 5,
			time: "50"
		},
	]


	return (
		<Formik
			initialValues={{
				linkName: '',
				amount: '',
				subChargeCount: '',
				description: '',
				currencyid: '',
				redirectUrl: '',
				fieldname: ""
			}}
			validationSchema={subscriptionSchema}
			onSubmit={async ({ linkName, amount, currencyid, redirectUrl, fieldname, description, subChargeCount }, { resetForm }) => {
				dispatch(openLoader());

				try {
					const { data } = await axios.post<Props>('/v1/payment/create/link', {

						linkName,
						linkType: "subscription",
						currencyid,
						amount,
						redirectUrl,
						description,
						subChargeCount,
						"extraField": [
							{
								"label": fieldname
							}]
					})
					if (data?.code === "success") {
						dispatch(
							openToastAndSetContent({
								toastContent: data?.message,
								msgType: "success"
							})
						)
						setIsUpdate(true)
						dispatch(closeLoader());
						dispatch(closeModal())
						resetForm()
					}
				} catch (error: any) {
					dispatch(closeLoader());
					const { message } = error?.response.data;
					dispatch(
						dispatch(
							openToastAndSetContent({
								toastContent: message,
								msgType: "error"
							})
						)
					);
				} finally {
					dispatch(closeLoader());
				}

			}}>
			{(props) => (
				<Modal
					open={isOpen}
					onClose={closeModal}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}>
					<Form>
						<div className={classes.root}>
							<Box className={styles.headerTitle}>
								<p>Create a subscription link</p>
								<IconButton
									aria-label='close payment link modal'
									onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</Box>
							<hr />
							<div className={classes.form_container}>
								<div className={classes.formBox}>
									<CustomInputField
										as={TextField} className="hh" label={"Link name"} placeholder='Food Bank' name='linkName' type='text' />



								</div>
								<div className={classes.formBox}>
									<CustomInputDropdown as={TextField} label={"Amount"} placeholder='amount' name='amount' position="start" adornmentName='currencyid'
										adornmentOptions={currencyList} adornmentType={CustomCurrency}
									/>
								</div>
								<div className={classes.formBox}>

									<CustomInputField as={TextField} label={"Description"} placeholder='description' multiline={true} name='description' rows={3} />

								</div>
								<div className={classes.formBox}>

									{/* interValList */}
									<InputLabel>Interval</InputLabel>

									<Field
										as={CustomInterval}
										options={interValList}
										name='subInterval'
										helperText={
											<ErrorMessage name={"subInterval"}>
												{(msg) => <span style={{ color: "red" }}>{msg}</span>}
											</ErrorMessage>
										}

									/>

								</div>
								<div className={classes.formBox}>
									<CustomInputField as={TextField} label={"Number of times to charge a subscriber"} placeholder='subChargeCount' name='subChargeCount' />

								</div>
								<div>
									{isAddOpen ? (
										<Box sx={{}}
											className={classes.removeBtn}
											onClick={() => setIsAddOpen(false)}>
											Additional details <ArrowDropUp />

										</Box>
									) : (
										<div
											className={classes.addBtn}
											onClick={() => setIsAddOpen(true)}>
											+ Add additional details
										</div>
									)}
								</div>
								{isAddOpen ? (
									<div className={classes.addView}>


										<div className={classes.formBox}>

											<CustomInputField as={TextField} label={"Redirect after payment"} placeholder='https://redirect.com' name='redirectUrl' />

										</div>
										<div className={classes.formBox}>
											<label htmlFor='fieldName'>Collect extra information</label>
											<CustomInputField as={TextField} label={" Field Name"} placeholder='fieldname' name='fieldname' />
										</div>

									</div>
								) : null}
								<Box sx={{ paddingInline: "3rem", marginBottom: "37px" }}>
									<Button type='submit' style={{ borderRadius: "20px" }} fullWidth className={classes.formBtn}>
										Create link
									</Button>
								</Box>
							</div>
						</div>
					</Form>
				</Modal>
			)}
		</Formik>
	);
};

export default RecurringLinkModal;
