import {
	Backdrop,
	Button,
	Modal,
	IconButton,
	SelectChangeEvent,
	Box,

} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { ArrowDropUp } from '@material-ui/icons';
import { Formik, Form } from "formik";
import { singleCharge } from '../../components/validation/payment/paymentValidation';
import { TextField } from '@mui/material';
import axios from 'axios';
import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomCurrency from '../../components/formUI/SelectCountry/CustomCurrency';
import useCustomUpload from '../../components/hooks/CustomUpload';
import useCurrency from '../../components/hooks/Usecurrency';
import useCountry from '../../components/hooks/UseCountry';
import CustomInputField from '../../components/customs/CustomInputField';
import styles from './PaymentLinks.module.scss';

import CustomInputDropdown from '../../components/customs/CustomInputDropdown';
import CustomPhoneNumber from '../../components/customs/CustomPhoneInput';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface SingleLinkModalProps {
	isOpen: boolean;
	handleClose: () => void;
}

interface Props {
	code: string;
	message: string;
}

function getStyles(currency: string, selectedCurrency: readonly string[]) {
	return {
		fontWeight: selectedCurrency.indexOf(currency) === -1 ? '600' : '400',
	};
}

const useStyles = makeStyles({
	root: {
		border: '1px solid #D5DAE1',
		boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
		borderRadius: '20px',
		backgroundColor: 'white',
		width: '400px',
		maxHeight: '700px',
		overflowY: 'scroll',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontFamily: `'Avenir', sans-serif`,
		padding: '0rem 21px 2rem',

		'& > div:nth-child(1)': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '0rem 2rem',
			'& .MuiIconButton-root': {
				padding: '6px',
				marginBottom: '3px',
			},
			'& p': {
				color: '#828282',
				fontSize: '1.125rem',
				fontWeight: '500',
				padding: "25px 0",
				fontFamily: 'Avenir',
				fontStyle: "normal",
				lineHeight: " 25px",
			},
		},
		'& hr': {
			background: '#E0E0E0',
			marginBottom: "2px"
		},
		'& > div:nth-child(3)': {
			display: 'grid',
			gridGap: '1rem',
			padding: '1rem 2rem',
		},
		'& > div:nth-child(4)': {
			padding: '0rem 2rem',
			marginTop: '1.5rem',
		},
	},
	formBox: {
		display: 'grid',
		// paddingInline:

		'& label': {
			color: '#333',
			fontWeight: '400',
			fontSize: '.875rem',
			fontFamily: 'Avenir',
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
		'&:hover': {
			opacity: '.75',
		},
	},
	removeBtn: {
		color: '#4f4f4f',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		'&:hover': {
			opacity: '.75',
		},
	},
	addView: {
		display: 'grid',
		gridGap: '1rem',
	},
	helperText: {
		fontSize: '0.75rem',
		fontWeight: 500,
		fontFamily: 'Avenir',
		marginTop: "10px",
		marginBottom: "1px",
		fontStyle: "normal",
		lineHeight: "16px",
		color: "#828282",
	}
});

const SingleLinkModal = ({ isOpen, handleClose }: SingleLinkModalProps) => {
	const classes = useStyles();

	const [linkName, setLinkName] = useState<string>('');
	const [amt, setAmt] = useState<number | undefined>(undefined);
	const [desc, setDesc] = useState<string>('');
	const [customLink, setCustomLink] = useState<string>('');
	const [redirect, setRedirect] = useState<string>('');
	const [fieldName, setFieldName] = useState<string>('');
	const [selectedCurrency, setSelectedCurrency] = useState<string[]>([]);
	const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

	const handleCurrencyChange = (
		event: SelectChangeEvent<typeof selectedCurrency>
	) => {
		const {
			target: { value },
		} = event;
		setSelectedCurrency(typeof value === 'string' ? value.split(',') : value);
	};

	const closeModal = () => {
		setLinkName('');
		setAmt(undefined);
		setDesc('');
		setCustomLink('');
		setRedirect('');
		setIsAddOpen(false);
		setSelectedCurrency([]);
		handleClose();
	};
	const dispatch = useDispatch()

	const [currencyList] = useCurrency()


	return (
		<Formik
			initialValues={{
				linkName: '',
				amount: '',
				redirectUrl: '',
				description: '',
				donationContact: '',
				currencyid: '',
				otp: '',
				fieldname: ""


			}}
			validationSchema={singleCharge}
			onSubmit={async ({ linkName, amount, currencyid, description, fieldname, redirectUrl, otp }, { resetForm }) => {
				dispatch(openLoader());

				try {
					const { data } = await axios.post<Props>('/v1/payment/create/link', {

						linkName,
						linkType: "single",
						currencyid,
						amount,
						description,
						redirectUrl,
						otp,
						"extraField": [
							{
								"label": fieldname
							}]


					})



					if (data.code === "success") {
						dispatch(
							openToastAndSetContent({
								toastContent: data?.message,
								toastStyles: {
									backgroundColor: "green",
								},
							})
						)

						dispatch(closeLoader());
						dispatch(closeModal())
						resetForm()
					}


				} catch (error: any) {
					dispatch(closeLoader());
					const { message } = error?.response.data;
					dispatch(
						openToastAndSetContent({
							toastContent: message,
							toastStyles: {
								backgroundColor: "red",
							},
						})
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
							<div className={styles.headerTitle}>
								<p>Create a payment link</p>
								<IconButton
									aria-label='close payment link modal'
									onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</div>


							<Box sx={{ paddingInline: "20px" }}>
								<div className={classes.formBox} style={{ marginBottom: "18px" }}>
									<CustomInputField
										as={TextField} className="hh" label={"Link name"} placeholder='Food Bank' name='linkName' type='text' />
								</div>
								<div className={classes.formBox}>

									<CustomInputDropdown as={TextField} label={"Amount"} placeholder='amount' name='amount' position="start" adornmentName='currencyid'
										adornmentOptions={currencyList} adornmentType={CustomCurrency}
									/>

									<CustomPhoneNumber as={TextField} label={"phone number"} placeholder="09069003426" name="phone" />

									<span className={classes.helperText}>Leave empty to allow customers enter desired amount</span>
								</div>




								<div className={classes.formBox}>


									<CustomInputField as={TextField} label={"Description"} placeholder='description' multiline={true} name='description' rows={3} />


								</div>
								<div>
									{isAddOpen ? (
										<div
											className={classes.removeBtn}
											onClick={() => setIsAddOpen(false)}>
											Additional details <ArrowDropUp />
										</div>
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

											<CustomInputField as={TextField} label={"Redirect after payment"} placeholder='https://donation.com' name='redirectUrl' />


										</div>
										<div className={classes.formBox}>

											<CustomInputField as={TextField} label={"RedCollect extra information"} placeholder='fieldname' name='fieldname' />


										</div>
										<div className={classes.formBox}>
											<CustomInputField as={TextField} label={"Otp"} placeholder='otp' type='number' name='otp' />



										</div>
									</div>
								) : null}
							</Box>
							<div>
								<Button type='submit' style={{ borderRadius: "20px" }} fullWidth className={classes.formBtn}>
									Create link
								</Button>
							</div>

						</div>
					</Form>
				</Modal>
			)}
		</Formik>

	);
};

export default SingleLinkModal;
