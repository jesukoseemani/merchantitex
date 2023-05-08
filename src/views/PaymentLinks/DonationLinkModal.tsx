import {
	Backdrop,
	Button,
	Modal,
	Box,
	IconButton,
	OutlinedInput,
	Grid,
	InputLabel,
	FormHelperText,
	InputAdornment,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import styles from './PaymentLinks.module.scss';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Formik, Field, ErrorMessage, Form } from "formik";
import { paymentDonation } from '../../components/validation/payment/paymentValidation';
import { TextField } from '@mui/material';
import axios from 'axios';
import { openLoader, closeLoader } from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CustomCurrency from '../../components/formUI/SelectCountry/CustomCurrency';
import useCustomUpload from '../../components/hooks/CustomUpload';
import useCurrency from '../../components/hooks/Usecurrency';
import useCountry from '../../components/hooks/UseCountry';
import CustomInputField from '../../components/customs/CustomInputField';
import CustomInputDropdown from '../../components/customs/CustomInputDropdown';


interface Props {
	code: string;
	message: string;
}


interface DonationLinkModalProps {
	isOpen: boolean;
	handleClose: () => void;
	setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}


const useStyles = makeStyles({
	root: {
		border: '1px solid #D5DAE1',
		boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
		borderRadius: '20px',
		backgroundColor: 'white',
		maxWidth: '786px',
		maxHeight: '95vh',
		overflowY: 'scroll',
		width: '100%',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontFamily: `'Avenir', sans-serif`,
		padding: '1rem 0 2rem',
		'@media screen and (max-width: 850px)': {
			maxWidth: '400px',
		},
		'& > div:nth-child(1)': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '0.3rem 3.45rem',
			'& .MuiIconButton-root': {
				// border: "2px solid red",
				padding: '6px',
			},
			'& p': {
				color: '#828282',
				fontSize: '1.125rem',
				fontWeight: '400',
				paddingBottom: "0.5rem"
			},
		},
		'& hr': {
			marginTop: '8px',
			background: '#E0E0E0',
		},
		'& > div:nth-child(4)': {
			padding: '0rem 2rem',
			marginTop: '1.5rem',
		},
	},

	formBtn: {
		color: 'white',
		fontWeight: 700,
		fontSize: '1rem',
		backgroundColor: '#27AE60',
		padding: '.5rem',
		borderRadius: '.25rem',
		textTransform: 'none',
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
	fileBox: {
		display: 'grid',
		'& label': {
			color: '#333',
			fontWeight: '400',
			fontSize: '.875rem',
		},
		'& p': {
			color: '#828282',
			fontWeight: '400',
			fontSize: '.75rem',
			marginTop: '.5rem',
		},
		'& input': {
			background: '#F9FBFF',
			border: '1px dashed #BDBDBD',
			borderRadius: '4px',
			marginTop: '.2rem',
			padding: '.75rem',
			fontSize: '.875rem',
			'&::placeholder': {
				color: '#B9B9B9',
			},
			'& .MuiOutlinedInput-root': {
				// border: '1px solid red',
				// maxHeight: '50px'
			},
			'& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
			{
				border: "2px solid red",
				WebkitAppearance: 'none',
				margin: '0',
			},
		},
	},
	downloadIcon: {
		marginRight: "10px",
	},
	helperText: {
		marginTop: "10px",
		fontFamily: 'Avenir',
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "12px",
		lineHeight: "16px",
		color: " #828282"
	},
	label: {
		fontFamily: 'Avenir',
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: "14px",
		lineHeight: "19px",
		color: "#333333",
	}
});

const DonationLinkModal = ({ isOpen, handleClose, setIsUpdate }: DonationLinkModalProps) => {

	const dispatch = useDispatch()
	const classes = useStyles();

	const [pageName, setPageName] = useState<string>('');
	const [amt, setAmt] = useState<number | undefined>(undefined);
	const [desc, setDesc] = useState<string>('');
	const [website, setWebsite] = useState<string>('');
	const [phoneNum, setPhoneNum] = useState<string>('');


	const closeModal = () => {
		setPageName('');
		setAmt(undefined);
		setDesc('');
		setWebsite('');
		setPhoneNum('');
		handleClose();
	};



	const { loading, imgUrl, handleUpload } = useCustomUpload()
	const [currencyList, loadingCurrency, currencyId] = useCurrency()
	const [loadingCountry, countryCode, countryList, countryId] = useCountry()


	return (
		<Formik
			initialValues={{
				linkName: '',
				amount: '',
				donationWebsite: '',
				description: '',
				donationContact: '',
				currencyid: '',
				redirectUrl: '',
				pageImage: ''

			}}
			validationSchema={paymentDonation}
			onSubmit={async ({ linkName, amount, currencyid, redirectUrl, description, donationWebsite, donationContact }, { resetForm }) => {
				dispatch(openLoader());

				try {
					const { data } = await axios.post<Props>('/v1/payment/create/link', {

						linkName,
						linkType: "donation",
						currencyid,
						amount,
						redirectUrl,
						description,
						donation: {
							donationWebsite,
							donationContact,
							pageImage: imgUrl
						},
					})
					if (data?.code === "success") {
						dispatch(
							openToastAndSetContent({
								toastContent: data?.message,
								toastStyles: {
									backgroundColor: "green",
								},
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
								toastStyles: {
									backgroundColor: "red",
								},
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
					<div className={classes.root}>
						<div className={styles.headerTitle}>
							<p>Create a donation link</p>
							<IconButton
								aria-label='close donation link modal'
								onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</div>


						<Box sx={{ padding: "23px 50px" }}>

							<Form>

								<Grid container spacing={3} rowGap={0} justifyContent="space-between">
									<Grid item xs={12} md={6} >

										<CustomInputField as={TextField} label={"Page name"} placeholder='Food Bank' name='linkName' />
									</Grid>

									<Grid item xs={12} md={6}>
										<CustomInputField as={TextField} label={"Donation website"} placeholder='https://donation.com' name='donationWebsite' />

									</Grid>
									<Grid item xs={12} md={6}>
										<CustomInputField as={TextField} label={"Redirect after payment"} placeholder='https://redirect.com' name='redirectUrl' />


									</Grid>
									<Grid item xs={12} md={6} alignItems="center">

										<CustomInputDropdown as={TextField} label={"Amount"} placeholder='amount' name='amount' position="start" adornmentName='currencyid'
											adornmentOptions={currencyList} adornmentType={CustomCurrency}
										/>





										<FormHelperText className={classes.helperText}>
											Leave empty to allow customers enter desired amount
										</FormHelperText>
									</Grid>



									<Grid item xs={12} md={6}>

										<CustomInputField as={TextField} label={"Description"} placeholder='description' name='description'
											multiline={true} rows={5}
										/>
									</Grid>

									<Grid item xs={12} md={6}>
										<Grid container>

											<Grid item xs={12} >

												<CustomInputField as={TextField} label={"Donation phone number"} placeholder='+23490902323' name='donationContact' />
												<FormHelperText className={classes.helperText}>
													This is the phone number which donors can reach you on
												</FormHelperText>
											</Grid>

											<Grid item xs={12} mt={3.5} mb={3.5}>
												<InputLabel className={classes.label}>Upload a featured image</InputLabel>


												<Button variant="outlined" fullWidth component="label"
													style={{
														background: "#F6F9FD",
														fontSize: "14px", color: "#4F4F4F",
														height: 44,
														border: "1px dashed #7A9CC4",
														borderRadius: 4,
														fontWeight: 300,
														fontFamily: "Avenir",
														textTransform: "inherit"
													}}>
													<CloudUploadOutlinedIcon className={classes.downloadIcon} />   choose file to upload
													<input hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG" onChange={handleUpload} type="file" />
												</Button>
												<FormHelperText id="component-helper-text" className={classes.helperText}>
													This image will be displayed on the social platforms where the
													link is shared.
												</FormHelperText>
											</Grid>
										</Grid>
									</Grid>

									<Grid item xs={12} md={6} justifyContent={"flex-end"} alignItems="flex-end" >
										<Box>
											<Button type="submit" style={{ borderRadius: "20px", height: "44px" }} fullWidth className={classes.formBtn}>
												{loading ? "uploading ...." : "Create link"}
											</Button>
										</Box>

									</Grid>

								</Grid>
							</Form>
						</Box>



					</div>
				</Modal >
			)}
		</Formik>

	);
};

export default DonationLinkModal;
