import {
	Backdrop,
	Button,
	Modal,
	Box,
	IconButton,
	OutlinedInput,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import styles from './PaymentLinks.module.scss';

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
			padding: '0rem 2rem',
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
		'& > div:nth-child(4)': {
			padding: '0rem 2rem',
			marginTop: '1.5rem',
		},
	},
	formBox: {
		display: 'grid',
		'& label': {
			color: '#333',
			fontWeight: '400',
			fontSize: '.875rem',
		},
		'& .subText': {
			color: '#828282',
			fontWeight: '400',
			fontSize: '.75rem',
			marginTop: '.5rem',
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
		'& .MuiOutlinedInput-root': {
			// border: '1px solid red',
			// maxHeight: '50px'
		},
		'& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
		{
			WebkitAppearance: 'none',
			margin: '0',
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
		},
	},
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
				<div className={styles.donationModalContainer}>
					<div>
						<div className={classes.formBox}>
							<label htmlFor='pageName'>Page name</label>
							<OutlinedInput
								placeholder='Food Bank'
								value={pageName}
								onChange={(e) => setPageName(e.target.value)}
							/>
						</div>
						<div className={classes.formBox}>
							<label htmlFor='amount'>Amount</label>
							<OutlinedInput
								placeholder='0.00'
								value={amt}
								type='number'
								onChange={(e) => setAmt(Number(e.target.value))}
								startAdornment={
									<div className={classes.suffix}>
										<p>NGN</p>
									</div>
								}
							/>
							<p className='subText'>
								Leave empty to allow customers enter desired amount
							</p>
						</div>
						<div className={classes.formBox}>
							<label htmlFor='amount'>Description</label>
							<OutlinedInput
								placeholder='email@email.com'
								rows={3}
								multiline
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<div className={classes.formBox}>
							<label htmlFor='website'>Donation website</label>
							<OutlinedInput
								placeholder='Your website'
								value={website}
								onChange={(e) => setWebsite(e.target.value)}
							/>
						</div>
						<div className={classes.formBox}>
							<label htmlFor='phoneNum'>Donation phone number</label>
							<OutlinedInput
								placeholder='+23490902323'
								value={phoneNum}
								onChange={(e) => setPhoneNum(e.target.value)}
							/>
							<p className='subText'>
								This is the phone number which donors can reach you on
							</p>
						</div>
						<div className={classes.fileBox}>
							<label>Upload a featured image</label>
							<input type='file' id='img' name='img' accept='image/*' />
							<p className='subText'>
								This image will be displayed on the social platforms where the
								link is shared.
							</p>
						</div>
						<div>
							<Button style={{ borderRadius: "20px" }} fullWidth className={classes.formBtn}>
								Create link
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default DonationLinkModal;
