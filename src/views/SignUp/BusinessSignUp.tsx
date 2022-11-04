import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InputLabel, Typography, TextField, Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import styles from './BusinessSignUp.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import Mark from '../../assets/images/mark.svg';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Select from '../../components/formUI/Select';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useHistory } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelectWrapperAllCountry from '../../components/formUI/SelectAllCountry';
import { countryListAllIsoData } from '../../helpers/Countries';
import { HearFromUs } from '../../helpers/HearFromUs';
import { categoryList } from '../../helpers/CategoryList';

const BusinessSignUp = () => {
	const history = useHistory();

	const createAccount = [
		{
			id: 1,
			title: 'Fast and free sign up',
			description: 'Enter your details to create an account.',
			icon: <CheckCircleIcon sx={{ color: '#60C090' }} />,
		},

		{
			id: 2,
			title: 'Start accepting payments .',
			description:
				'Start accepting payment using our infrastructure from customers anywhere in the world.',
			icon: <CheckCircleIcon sx={{ color: '#60C090' }} />,
		},

		{
			id: 3,
			title: 'Multiple payment options',
			description: 'Accept credit / debit cards, USSD, Bank transfer and more.',
			icon: <CheckCircleIcon sx={{ color: '#60C090' }} />,
		},
	];
	const businessCategory = [{ name: 'Technology' }, { name: 'Education' }];

	const useStyles = makeStyles({
		root: {
			position: 'absolute',
			left: '-8% !important',
		},
		list: {
			backgroundColor: '#383838',
			width: '15rem',
			overflow: 'hidden',
			color: '#fff',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
		menuItem: {
			width: '100%',
			height: '44px',
			padding: '12px',
			margin: '4px 0px',
			borderRadius: '8px !important',
			'&:hover': {
				background: 'rgba(255, 255, 255, 0.12) !important',
			},
		},
		selectedItem: {
			background: 'rgba(255, 255, 255, 0.12)',
		},
		select: {
			'& ul': {
				backgroundColor: '#cccccc',
			},
			'& li': {
				fontSize: 14,
			},
			'& .MuiInputLabel-root': {
				color: 'rgba(255, 255, 255, 0.81) !important',
			},
		},
		control: {
			position: 'relative',
			color: '#fff',
		},
		searchInput: {
			backgroundColor: 'rgba(255, 255, 255, 0.09)',
			height: '40px',
			borderRadius: '8px',
			fontFamily: 'Geometria !important',
			fontSize: '12px',
			boxShadow: 'none',
		},
	});

	const validate = Yup.object({
		fullName: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Full Name is required'),
		businessName: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Business Name is required'),
		busCategory: Yup.string()
			.max(30, 'Must be 30 characters or less')
			.required('Business Name is required'),
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		phoneNumber: Yup.string()
			.min(6, 'Phonenumber must be at least 11 charaters')
			.required('Phonenumber is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 charaters')
			.required('Password is required'),
		country: Yup.string()
			.max(15, 'Must be 15 characters or less')
			.required('Country is required'),
		hearAbout: Yup.string()
			.max(30, 'Must be 15 characters or less')
			.required('This is required'),
	});

	const classes = useStyles();

	const dispatch = useDispatch();

	return (
		<>
			<div className={styles.container}>
				<div className={styles.logo} onClick={() => history.push('/signin')}>
					<img src={Logo} alt='logo' />
				</div>
				<div className={styles.signUpWrapper}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<h2 className={styles.header}>Create Account</h2>
							{createAccount.map(({ title, id, icon, description }) => (
								<div key={id}>
									<List key={id}>
										<div className={styles.signupList}>
											<div className={styles.iconchecked}>
												<ListItemIcon>{icon}</ListItemIcon>
											</div>

											<div>
												<ListItemText>
													<h5 className={styles.title}>{title}</h5>
													<p className={styles.desc}>{description}</p>
												</ListItemText>
											</div>
										</div>
									</List>
								</div>
							))}
						</Grid>
						<Formik
							initialValues={{
								fullName: '',
								email: '',
								password: '',
								country: '',
								businessName: '',
								hearAbout: '',
								phoneNumber: '',
								busCategory: '',
							}}
							validationSchema={validate}
							onSubmit={(values) => {
								const dataValues = {
									...values,
								};
								const firstName = dataValues?.fullName.split(' ')[0];
								const lastName = dataValues?.fullName.split(' ')[1];
								console.log(dataValues);
								dispatch(openLoader());

								axios
									.post('/merchant/account/register', {
										business: {
											email: dataValues?.email,
											account: {
												type: 'business',
												subtype: 'soleprop',
											},
											country: dataValues?.country,
											businessindustrycategory: dataValues?.busCategory,
										},
										user: [
											{
												email: dataValues?.email,
												password: dataValues?.password,
												firstname: firstName,
												middlename: '',
												lastname: lastName,
												country: dataValues?.country,
											},
										],

										meta: [
											{
												name: 'howyouheardaboutus',
												value: dataValues?.hearAbout,
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
								<Grid item xs={12} md={6}>
									<Form>
										<Grid container spacing={2}>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													Full Name
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='fullName'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='fullName'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													Business name
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='businessName'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='businessName'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<FormControl
													classes={{ root: classes.control }}
													fullWidth>
													<InputLabel className={styles.label}>
														Business category
													</InputLabel>

													<Field
														as={SelectWrapperAllCountry}
														helperText={
															<ErrorMessage name='busCategory'>
																{(msg) => (
																	<span style={{ color: 'red' }}>{msg}</span>
																)}
															</ErrorMessage>
														}
														name='busCategory'
														size='small'
														options={categoryList}
														style={{
															marginTop: '1rem',
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													Your position in the business
												</InputLabel>
												{
													<TextField
														placeholder='position'
														variant='outlined'
														margin='normal'
														size='small'
														fullWidth
													/>
												}
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>Email</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='email'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='email'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													Phone number
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='phoneNumber'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='phoneNumber'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													Password
												</InputLabel>
												<Field
													as={TextField}
													helperText={
														<ErrorMessage name='password'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='password'
													type='password'
													variant='outlined'
													margin='normal'
													size='small'
													fullWidth
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													Country
												</InputLabel>
												<Field
													as={SelectWrapperAllCountry}
													helperText={
														<ErrorMessage name='country'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='country'
													size='small'
													options={countryListAllIsoData}
													style={{
														marginTop: '1rem',
													}}
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.label}>
													How did you hear about us?
												</InputLabel>

												<Field
													as={SelectWrapperAllCountry}
													helperText={
														<ErrorMessage name='hearAbout'>
															{(msg) => (
																<span style={{ color: 'red' }}>{msg}</span>
															)}
														</ErrorMessage>
													}
													name='hearAbout'
													size='small'
													options={HearFromUs}
													style={{
														marginTop: '1rem',
													}}
												/>
											</Grid>
											<Grid item xs={10} md={6}>
												<InputLabel className={styles.emptyLabel}></InputLabel>
												<button
													style={{
														backgroundColor: '#27AE60',
														padding: '0.4rem',
														textTransform: 'none',
														cursor: 'pointer',
														color: '#ffffff',
														width: '100%',
														outline: 'none',
														border: 'none',
														borderRadius: '4px',
													}}
													type='submit'>
													Create Account
												</button>
												<p className={styles.terms}>
													{' '}
													By clicking the “Create account” button, you agree to
													Itex’s terms and conditions.
												</p>
											</Grid>
										</Grid>
									</Form>
								</Grid>
							)}
						</Formik>
					</Grid>
				</div>

				<div className={styles.sub}>
					<div className={styles.mt1}>
						<p onClick={() => history.push('/signin')}>
							<span className={styles.subP}>Already have an account? </span>
							Log in
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default BusinessSignUp;
