import { makeStyles } from '@material-ui/styles';
import {
	Backdrop,
	IconButton,
	Modal,
	OutlinedInput,
	Button,
	Grid,
	Select,
	MenuItem,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { State } from '../../helpers/State';
import { CodeOutlined } from '@material-ui/icons';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';
import PosSuccess from './PosSuccess';

interface PosModalProps {
	isOpen: boolean;
	handleClose: () => void;
}

const useStyles = makeStyles({
	root: {
		border: '1px solid #D5DAE1',
		boxShadow: '0px 10px 10px rgba(6, 44, 82, 0.92)',
		borderRadius: '20px',
		backgroundColor: 'white',
		maxWidth: '768px',
		maxHeight: '634px',
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
				// border: "2px solid red",
				paddingTop: "15px",
				paddingBottom: "17px",
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
		marginBottom: "17px",
		'& label': {
			color: '#333',
			fontFamily: 'Avenir',
			fontStyle: "normal",
			fontWeight: 400,
			fontSize: "14px",
			lineHeight: "19px",

		},
		'& input, & textarea, & .MuiSelect-select': {
			background: 'white',
			borderRadius: '4px',
			// marginTop: '.2rem',
			height: "11px",
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
		height: '44px',
		width: "316px",
		borderRadius: '.25rem',
		textTransform: 'none',
		marginTop: "20px",
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
	formCont: {
		marginTop: "35px"
	}
});

const PosModal = ({ isOpen, handleClose }: PosModalProps) => {
	const classes = useStyles();
	const dispatch = useDispatch()
	const [revenue, setRevenue] = useState<string>('');
	const [sales, setSales] = useState<string>('');
	const [numDevices, setNumDevices] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [state, setState] = useState<string>('');
	const [city, setCity] = useState<string>('');

	const closeModal = () => {
		setRevenue('');
		setSales('');
		setNumDevices('');
		setLocation('');
		setState('');
		setCity('');
		handleClose();
	};


	const handleSubmitForm = () => {
		closeModal()
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					width: '416px',
					// minHeight: '450px',

					height: '478px',

					borderRadius: "20px"
				},
				modalContent: (
					<div>
						<PosSuccess />
					</div>
				),
			})
		);
	}
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
					<p style={{ paddingLeft: "15px" }}>POS Request form</p>
					<IconButton
						aria-label='close add subaccount modal'
						onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div>
				<hr />
				<div>
					<Grid container columnSpacing={4} px={2} className={classes.formCont}>
						<Grid item xs={12} md={6}>
							<div className={classes.formBox}>
								<label htmlFor='revenue'>
									What is your average monthly revenue?
								</label>
								<OutlinedInput
									placeholder='John Doe'
									value={revenue}
									onChange={(e) => setRevenue(e.target.value)}
								/>
							</div>

						</Grid>
						<Grid item xs={12} md={6}>
							<div className={classes.formBox}>
								<label htmlFor='sales'>How many sales do you make daily</label>
								<OutlinedInput
									placeholder='john@mail.com'
									value={sales}
									onChange={(e) => setSales(e.target.value)}
								/>
							</div>

						</Grid>

						<Grid item xs={12} md={6}>
							<div className={classes.formBox}>
								<label htmlFor='numDevices'>How many POS devices do you need</label>
								<OutlinedInput
									placeholder='Nigeria'
									value={numDevices}
									onChange={(e) => setNumDevices(e.target.value)}
								/>
							</div>

						</Grid>

						<Grid item xs={12}>

							<div className={classes.formBox}>
								<label htmlFor='location'>
									Where should the POS devices be delivered
								</label>
								<OutlinedInput
									placeholder='Access Bank'
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									rows={3}
									multiline
								/>
							</div>
						</Grid>


						<Grid item xs={12} sm={12} md={6}>

							<div className={classes.formBox}>
								<label htmlFor='state'>State</label>
								{/* <OutlinedInput
									placeholder='0723371427'
									value={state}
									onChange={(e) => setState(e.target.value)}
								/> */}
								<Select
									sx={{

										height: 44,
									}}
									fullWidth
								>
									{State?.map(({ name, code }) => (
										<MenuItem key={code} value={name}>{name}</MenuItem>
									))}
								</Select>
							</div>
						</Grid>

						<Grid item xs={12} md={6}>

							<div className={classes.formBox}>
								<label htmlFor='city'>City</label>
								<OutlinedInput
									placeholder='10%'
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<div>
								<button style={{ borderRadius: "20px" }} className={classes.formBtn} onClick={handleSubmitForm}>
									Submit request
								</button>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</Modal>
	);
};

export default PosModal;
