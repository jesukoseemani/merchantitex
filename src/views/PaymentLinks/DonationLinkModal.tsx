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
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import styles from './PaymentLinks.module.scss';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
interface DonationLinkModalProps {
	isOpen: boolean;
	handleClose: () => void;
}


const useStyles = makeStyles({
	root: {
		border: '1px solid #D5DAE1',
		boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
		borderRadius: '20px',
		backgroundColor: 'white',
		maxWidth: '786px',
		maxHeight: '515px',
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

const DonationLinkModal = ({ isOpen, handleClose }: DonationLinkModalProps) => {


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

	return (
		<Modal
			open={isOpen}
			onClose={closeModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<div className={classes.root}>
				<div>
					<p>Create a donation link</p>
					<IconButton
						aria-label='close donation link modal'
						onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div>
				<hr />

				<Box sx={{ padding: "23px 50px" }}>

					<Grid container spacing={3} rowGap={0} justifyContent="space-between">
						<Grid item xs={12} md={6} >
							<InputLabel className={classes.label}>Page name</InputLabel>
							<OutlinedInput
								placeholder='Food Bank'
								value={pageName}
								fullWidth

								onChange={(e) => setPageName(e.target.value)}
								sx={{ height: "44px" }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<InputLabel className={classes.label}>Donation website</InputLabel>
							<OutlinedInput
								placeholder='Your website'
								value={website}
								onChange={(e) => setWebsite(e.target.value)}
								fullWidth
								sx={{ height: "44px" }}
							/>

						</Grid>
						<Grid item xs={12} md={6}>
							<InputLabel className={classes.label}>Amount</InputLabel>
							<OutlinedInput
								placeholder='0.00'
								value={amt}
								type='number'
								fullWidth
								sx={{ height: "44px" }}
								onChange={(e) => setAmt(Number(e.target.value))}
								startAdornment={
									<div className={classes.suffix}>
										<p>NGN</p>
									</div>
								}
							/>

							<FormHelperText className={classes.helperText}>
								Leave empty to allow customers enter desired amount
							</FormHelperText>
						</Grid>
						<Grid item xs={12} md={6} >
							<InputLabel className={classes.label} htmlFor='phoneNum'>Donation phone number</InputLabel>
							<OutlinedInput
								placeholder='+23490902323'
								value={phoneNum}
								fullWidth
								onChange={(e) => setPhoneNum(e.target.value)}
								sx={{ height: "44px" }}
							/>
							<FormHelperText className={classes.helperText}>
								This is the phone number which donors can reach you on
							</FormHelperText>
						</Grid>
						<Grid item xs={12} md={6} >
							<InputLabel className={classes.label}>Description</InputLabel>
							<OutlinedInput
								placeholder='email@email.com'
								value={pageName}
								fullWidth
								multiline
								rows={4}

								onChange={(e) => setPageName(e.target.value)}

							/>
						</Grid>
						<Grid item xs={12} md={6} >
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
								<input hidden accept="image/*" multiple type="file" />
							</Button>
							<FormHelperText id="component-helper-text" className={classes.helperText}>
								This image will be displayed on the social platforms where the
								link is shared.
							</FormHelperText>

						</Grid>
						<Grid item xs={12} md={6}></Grid>

						<Grid item xs={12} md={6} justifyContent={"flex-end"} alignItems="flex-end" >
							<Box sx={{ marginTop: "-2rem" }}>
								<Button style={{ borderRadius: "20px", height: "44px" }} fullWidth className={classes.formBtn}>
									Create link
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>



			</div>
		</Modal >
	);
};

export default DonationLinkModal;
