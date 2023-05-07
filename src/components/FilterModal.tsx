import { Backdrop, Box, Button, IconButton, MenuItem, Modal, Select } from '@mui/material';
import styles from './FilterModal.module.scss';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import moment from 'moment';
import { TRANSACTION_FILTER_DATA } from '../constant';

const useModalBtnStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '33px 30px',
		gap: '1.25rem',
		'& .MuiButton-root': {
			fontFamily: `'Avenir', sans-serif`,
			lineHiieght: "19px",
			fontSize: '14px',
			color: 'black',
			background: '#E0E0E0',
			borderRadius: '20px',
			textTransform: 'none',
			padding: '.35rem 1.2rem',
			fontStyle: "normal",
			fontWeight: "400",
		},
		'& .MuiButton-root:nth-child(2)': {
			color: 'white',
			background: '#27AE60',
		},
		'& .MuiButton-root:nth-child(1)': {
			// color: 'white',
			background: 'transparent',
			border: "1px solid #095B2C",
			color: "#095B2C",
		},
	},
	selected: {
		border: '1px solid #27ae60 !important',
		color: '#27ae60 !important',

	},
	select: {
		minHeight: "32px !important",
		paddingLeft: "10px",

		'& .MuiSelect': { border: "3px solid green" }

	}
});

interface FilterModalProps {
	isOpen: boolean;
	handleClose: () => void;
	action?: (form: typeof TRANSACTION_FILTER_DATA) => void;
	setEvent?: React.Dispatch<React.SetStateAction<string>>;
	setFromDate?: React.Dispatch<React.SetStateAction<string>>;
	setToDate?: React.Dispatch<React.SetStateAction<string>>;
	setRef?: React.Dispatch<React.SetStateAction<string>>;
	setEmail?: React.Dispatch<React.SetStateAction<string>>;
	setStatus?: React.Dispatch<React.SetStateAction<string>>;
	eventDate?: string;
	clearHandler?: () => void;
	setBearer?: React.Dispatch<React.SetStateAction<boolean>>;
	name?: String;
	setPayment?: React.Dispatch<React.SetStateAction<string>>;
	status?: string;
	payment?: string;
	filterFunction?: () => void;
	changePage?: (value: number) => void;
}


// DATE CONVERTION
const now = new Date();
const dateNow = moment().format('YYYY-MM-DD');
const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

const FilterModal = ({
	isOpen,
	handleClose,
	action,
	setBearer,
	name,
	filterFunction,
}: FilterModalProps) => {
	const classes = useModalBtnStyles();
	const [form, setForm] = useState(TRANSACTION_FILTER_DATA);
	const [event, setEvent] = useState('');

	const applyHandler = () => {
		setBearer?.(true);
		filterFunction?.();
	};

	const handleChange = (value: string, key: string) => {
		setForm({
			...form,
			[key]: value
		})
	}

	const handleDateChange = (key: string) => {
		setEvent(key)
		let todate = '';
		let fromdate = '';

		if (key === 'today') {
			fromdate = dateNow;
			todate = dateNow;
		} else if (key === 'last7days') {
			fromdate = sevenDaysAgo;
			todate = dateNow;
		} else if (key === 'last30days') {
			fromdate = thirtyDaysAgo;
			todate = dateNow;
		} else if (key === 'oneyear') {
			fromdate = startOfYear;
			todate = endOfYear;
		} else {
			fromdate = '';
			todate = '';
		}

		setForm({
			...form,
			fromdate,
			todate
		})
	}

	const clear = () => {
		setForm(TRANSACTION_FILTER_DATA);
		handleClose?.();
	}

	const apply = () => {
		action?.(form);
		handleClose?.();
	}

	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<div className={styles.filterModalContainer}>
				<Box className={styles.filterHeader}>
					<h2>Filters</h2>
					<IconButton onClick={handleClose}>
						<CloseOutlined />
					</IconButton>
				</Box>
				<hr />
				<div className={styles.modalContent}>
					<div>
						<p>Due date</p>
						<div>
							<p
								style={{
									color: event === 'today' ? '#26AD60' : '',
									border: event === 'today' ? '1px solid #26AD60' : '',
								}}
								onClick={() => handleDateChange('today')}
								data-value='today'>
								Today
							</p>
							<p
								style={{
									color: event === 'last7days' ? '#26AD60' : '',
									border: event === 'last7days' ? '1px solid #26AD60' : '',
								}}
								onClick={() => handleDateChange('last7days')}
								data-value='last7days'>
								Last 7 days
							</p>
							<p
								style={{
									color: event === 'last30days' ? '#26AD60' : '',
									border: event === 'last30days' ? '1px solid #26AD60' : '',
								}}
								onClick={() => handleDateChange('last30days')}
								data-value='last30days'>
								30 days
							</p>
							<p
								style={{
									color: event === 'oneyear' ? '#26AD60' : '',
									border: event === 'oneyear' ? '1px solid #26AD60' : '',
								}}
								onClick={() => handleDateChange('oneyear')}
								data-value='oneyear'>
								1 year
							</p>
						</div>
					</div>
					<div>
						<p>Custom date range</p>

						<div>
							<input
								type='text'
								value={form.fromdate}
								onChange={(e) => handleChange(e.target.value, 'fromdate')}
								placeholder="Start date"
							/>
							<ArrowRightAltIcon />
							<input
								type='text'
								value={form.todate}
								onChange={(e) => handleChange(e.target.value, 'todate')}
								placeholder="End date"
							/>
						</div>
					</div>

					{name !== 'transaction' ? (
						<div>
							<p>Customer email</p>
							<input placeholder='e.g test@mail.com' onChange={(e) => handleChange(e.target.value, 'email')} value={form.email} />
						</div>
					) : (
						<div>
							<p>Transaction ref</p>
							<input
								placeholder='e.g ITXH0898383UY38383'
								onChange={(e) => handleChange(e.target.value, 'reference')}
								value={form.reference}
								className={styles.input}
							/>
						</div>
					)}

					{name !== 'transaction' ? (
						<div>
							<p>Status</p>
							<Select
								fullWidth
								className={classes.select}
								value={form.status}
								name='status'
								id='status'
								onChange={(e) => handleChange(e.target.value, 'status')}
								// className={styles.input}
								sx={{}}

							>
								<MenuItem value='' disabled selected hidden>
									Choose status
								</MenuItem>
								<MenuItem value='APPROVED'>APPROVED</MenuItem>
								<MenuItem value='PENDING_REVIEW'>PENDING</MenuItem>
								<MenuItem value='DECLINED'>DECLINED</MenuItem>
							</Select>
						</div>
					) : (
						<div>
							<p>Status</p>
							<Select
								fullWidth
								className={classes.select}
								value={form.status}
								name='status'
								id='status'
								onChange={(e) => handleChange(e.target.value, 'status')}

							>
								<MenuItem value='' disabled selected hidden>
									Choose status
								</MenuItem>
								<MenuItem value='00'>Approved</MenuItem>
								<MenuItem value='F9'>Abandoned</MenuItem>
								<MenuItem value='09'>Pending</MenuItem>
							</Select>
						</div>
					)}

					<div>
						<p>Payment type</p>
						<Select
							fullWidth
							value={form.paymentmethod}
							name='paymentmethod'
							id='paymentmethod'
							className={classes.select}
							onChange={(e) => handleChange(e.target.value, 'paymentmethod')}
						>
							<MenuItem value='' disabled selected hidden>
								Select payment type
							</MenuItem>
							<MenuItem value='card'>Card</MenuItem>
							<MenuItem value='ussd'>USSD</MenuItem>
							<MenuItem value='account'>Account</MenuItem>
							<MenuItem value='bank_transfer'>Bank Transfers</MenuItem>
							<MenuItem value='payvice'>Payvice</MenuItem>
						</Select>
					</div>
				</div>
				<hr style={{ border: "1px solid #f2f2f2" }} />
				<div className={classes.root}>
					<Button onClick={clear}>Clear filter</Button>
					<Button onClick={apply}>Apply filter</Button>
				</div>
			</div>
		</Modal>
	);
};

export default FilterModal;
