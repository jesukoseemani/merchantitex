import { makeStyles } from '@material-ui/styles';
import {
	Backdrop,
	IconButton,
	Modal,
	OutlinedInput,
	Button,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface AddAcctModalProps {
	isOpen: boolean;
	handleClose: () => void;
}

const useStyles = makeStyles({
	root: {
		border: '1px solid #D5DAE1',
		boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
		borderRadius: '3px',
		backgroundColor: 'white',
		maxWidth: '400px',
		maxHeight: '500px',
		overflowY: 'scroll',
		width: '100%',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontFamily: `'Avenir', sans-serif`,
		padding: '1rem 0 2rem',
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
		'& > div:nth-child(2)': {
			display: 'grid',
			gridGap: '1rem',
			padding: '1rem 2rem',
		},
		'& > div:nth-child(3)': {
			padding: '0rem 2rem',
			marginTop: '1.25rem',
		},
	},
	formBox: {
		display: 'grid',
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
});

const AddAcctModal = ({ isOpen, handleClose }: AddAcctModalProps) => {
	const classes = useStyles();

	const [acctName, setAcctName] = useState<string>('');
	const [acctEmail, setAcctEmail] = useState<string>('');
	const [acctCountry, setAcctCountry] = useState<string>('');
	const [acctNum, setAcctNum] = useState<string>('');
	const [bankName, setBankName] = useState<string>('');
	const [txnShare, setTxnShare] = useState<string>('');
	const [acctTxnShare, setAcctTxnShare] = useState<string>('');

	const closeModal = () => {
		setAcctName('');
		setAcctEmail('');
		setAcctCountry('');
		setAcctNum('');
		setBankName('');
		setTxnShare('');
		setAcctTxnShare('');
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
					<p>Add a Subaccount</p>
					<IconButton
						aria-label='close add subaccount modal'
						onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div>
				<div>
					<div className={classes.formBox}>
						<label htmlFor='acctName'>Subaccount Name</label>
						<OutlinedInput
							placeholder='John Doe'
							value={acctName}
							onChange={(e) => setAcctName(e.target.value)}
						/>
					</div>
					<div className={classes.formBox}>
						<label htmlFor='acctEmail'>Subaccount Email</label>
						<OutlinedInput
							placeholder='john@mail.com'
							value={acctEmail}
							onChange={(e) => setAcctEmail(e.target.value)}
						/>
					</div>
					<div className={classes.formBox}>
						<label htmlFor='acctCountry'>Subaccount Country</label>
						<OutlinedInput
							placeholder='Nigeria'
							value={acctCountry}
							onChange={(e) => setAcctCountry(e.target.value)}
						/>
					</div>
					<div className={classes.formBox}>
						<label htmlFor='bankName'>Bank name</label>
						<OutlinedInput
							placeholder='Access Bank'
							value={bankName}
							onChange={(e) => setBankName(e.target.value)}
						/>
					</div>
					<div className={classes.formBox}>
						<label htmlFor='acctNum'>Account number</label>
						<OutlinedInput
							placeholder='0723371427'
							value={acctNum}
							onChange={(e) => setAcctNum(e.target.value)}
						/>
					</div>
					<div className={classes.formBox}>
						<label htmlFor='txnShare'>Your share per transaction</label>
						<OutlinedInput
							placeholder='10%'
							value={txnShare}
							onChange={(e) => setTxnShare(e.target.value)}
						/>
					</div>
					<div className={classes.formBox}>
						<label htmlFor='acctTxnShare'>
							Subaccount's share per transaction
						</label>
						<OutlinedInput
							placeholder='90%'
							value={acctTxnShare}
							onChange={(e) => setAcctTxnShare(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<Button fullWidth className={classes.formBtn} onClick={closeModal}>
						Create account
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default AddAcctModal;
