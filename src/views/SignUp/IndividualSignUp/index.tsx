import { InputLabel, Typography, Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from './style.module.scss';
import Logo from '../../../assets/images/white_bg_logo.svg';

import { ReactSVG } from "react-svg";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../../redux/actions/auth/authActions';
import { saveLoading } from '../../../redux/actions/loadingState/loadingStateActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import SelectWrapperAllCountry from '../../../components/formUI/SelectAllCountry';
import { countryListAllIsoData } from '../../../helpers/Countries';
import { HearFromUs } from '../../../helpers/HearFromUs';

const createAccount = [
	{
		id: 'FF',
		title: 'Fast and free sign up',
		description: 'Enter your details to create an account.',
		icon: <CheckCircleIcon sx={{ color: '#60C090' }} />,
	},

	{
		id: 'SA',
		title: 'Start accepting payments .',
		description:
			'Start accepting payment using our infrastructure from customers anywhere in the world.',
		icon: <CheckCircleIcon sx={{ color: '#60C090' }} />,
	},

	{
		id: 'MP',
		title: 'Multiple payment options',
		description: 'Accept credit / debit cards, USSD, Bank transfer and more.',
		icon: <CheckCircleIcon sx={{ color: '#60C090' }} />,
	},
];

const IndividualSignUp = () => {
	const validate = Yup.object({
		fullName: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Full Name is required'),
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 charaters')
			.required('Password is required'),
		country: Yup.string()
			.max(15, 'Must be 15 characters or less')
			.required('Country is required'),
		optional: Yup.string().max(15, 'Must be 15 characters or less'),
	});

	const dispatch = useDispatch();

	const history = useHistory();

	const handleSignin = () => {
		history.push('/signin');
	};

	return (
		<Formik
			initialValues={{
				fullName: '',
				email: '',
				password: '',
				country: '',
				optional: '',
				// confirmPassword: "",
			}}
			validationSchema={validate}
			onSubmit={(values) => {
				dispatch(openLoader());

				const inputValue = {
					...values,
				};
				const firstName = inputValue?.fullName.split(' ')[0];
				const lastName = inputValue?.fullName.split(' ')[1];
				console.log('values: ', values);

				axios
					.post('/merchant/account/register', {
						business: {
							email: inputValue?.email,
							account: {
								type: 'individual',
								subtype: 'soleprop',
							},
							country: inputValue?.country,
						},
						user: [
							{
								email: inputValue?.email,
								password: inputValue?.password,
								firstname: firstName,
								middlename: '',
								lastname: lastName,
								country: inputValue?.country,
							},
						],
					})

					.then((res) => {
						dispatch(closeLoader());
						dispatch(saveAuth(res.data));
						dispatch(saveLoading(true));
						console.log(res.data);

						dispatch(
							openToastAndSetContent({
								toastContent: 'Signup Successful',
								toastStyles: {
									backgroundColor: 'green',
								},
							})
						);

						history.push('/email_verification');
					})

					.catch((err) => {
						console.log(err);
						dispatch(closeLoader());
						dispatch(saveLoading(false));

						dispatch(
							openToastAndSetContent({
								toastContent: err.response.data.message,
								toastStyles: {
									backgroundColor: 'red',
								},
							})
						);
					});
			}}>
			{(props) => (
				<div className={styles.signupContainer}>
					<div className={styles.logo}>
						<ReactSVG src={Logo} onClick={() => history.push('/signin')} />
					</div>
					<div className={styles.signupDiv}>
						<div className={styles.signupDiv_flex}>
							<div>
								<h4 className={styles.header}>Create Account</h4>
								{createAccount.map(({ id, title, description, icon }) => (
									<div key={id}>
										<List key={id}>
											<div className={styles.signupList}>
												<div className={styles.iconchecked}>
													<ListItemIcon>{icon}</ListItemIcon>
												</div>

												<div >
													<ListItemText>
														<h5 className={styles.title}>{title}</h5>
														<p className={styles.desc}>{description}</p>
													</ListItemText>
												</div>
											</div>
										</List>
									</div>
								))}
							</div>
							<div>
								<Form>
									<InputLabel>
										<span className={styles.formTitle}>Full Name</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='fullName'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='fullName'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
										required

									/>
									<InputLabel>
										<span className={styles.formTitle}>Email Address</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='email'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='email'
										variant='outlined'
										margin='normal'
										type='email'
										size='small'
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>Password</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='password'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='password'
										variant='outlined'
										margin='normal'
										type='password'
										size='small'
										fullWidth

									/>
									<InputLabel>
										<span className={styles.formTitle}>Country</span>
									</InputLabel>
									<Field
										as={SelectWrapperAllCountry}
										helperText={
											<ErrorMessage name='country'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='country'
										size='small'
										options={countryListAllIsoData}
										style={{
											marginTop: '1rem',
										}}
									/>

									<InputLabel>
										<span className={styles.formTitle}>
											How did you hear about us? (Optional)
										</span>
									</InputLabel>
									<Field
										as={SelectWrapperAllCountry}
										helperText={
											<ErrorMessage name='optional'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='optional'
										size='small'
										options={HearFromUs}
										style={{
											marginTop: '1rem',
										}}
									/>
									<InputLabel className={styles.mt}></InputLabel>
									<button
										style={{
											backgroundColor: '#27AE60',
											padding: '0.7rem',
											width: '100%',
											color: '#fff',
											border: 'none',
											borderRadius: '20px',
											cursor: 'pointer',
											margin: "20px 0px ",
										}}
										type='submit'
										color='primary'>
										Create Account
									</button>
									<InputLabel>
										<p className={styles.formSub}>
											By clicking the “Create account” button, you agree to
											Itex’s terms and conditions.
										</p>
									</InputLabel>
								</Form>
							</div>
						</div>
					</div>

					<div className={styles.sub}>
						<div className={styles.mt1}>
							<p onClick={handleSignin}>
								<span className={styles.subP}>Already have an account? </span>
								Log in
							</p>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default IndividualSignUp;
