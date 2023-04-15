import { Grid, InputLabel, Typography, Button, TextField, MenuItem } from '@mui/material';
import styles from './style.module.scss';
import Logo from '../../../assets/images/white_bg_logo.svg';

import { ReactSVG } from "react-svg";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
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
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useEffect, useState } from 'react';
import { ValidateIndividual } from '../../../components/validation/OnboadingValidate';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomCategory from '../../../components/customs/CustomCategory';
import ReactCountryFlag from "react-country-flag"

const createAccount = [
	{
		id: 'FF',
		title: 'Fast and free sign up',
		description: 'Enter your details to create an account.',
		icon: <CheckCircleIcon sx={{ color: '#60C090', height: 20, width: 20 }} />,
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



interface Props {
	code: string;
	message: string;
	email: string;
	fullname: string
}


interface countryProp {
	id: number;
	country: string;
	currencyCode: number;
	currencyIso: string;
	countryIso: string;
	dialCode: string;


}
const IndividualSignUp = () => {
	const [phone, setPhone] = useState<unknown>()
	const [country, setCountry] = useState<any>()
	const [businessCategory, setBusinessCategory] = useState([])

	const handleOnChange = (value: any) => {
		setPhone(value)
		console.log(phone)
	}


	useEffect(() => {
		dispatch(openLoader());
		const fetchCountry = async () => {

			try {

				const { data } = await axios.get<any>("/resource/countries")
				setCountry(data?.countries)


				dispatch(closeLoader());

			} catch (error: any) {
				dispatch(closeLoader());
				const { message } = error.response.data;
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
		}


		fetchCountry()
	}, [])





	useEffect(() => {
		dispatch(openLoader());
		const FetchBusinessCate = async () => {

			try {

				const { data } = await axios.get<any>("/resource/business/categories")
				setBusinessCategory(data?.categories)


				dispatch(closeLoader());

			} catch (error: any) {
				dispatch(closeLoader());
				const { message } = error.response.data;
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
		}


		FetchBusinessCate()
	}, [])


	console.log(country)

	const dispatch = useDispatch();

	const history = useHistory();

	const handleSignin = () => {
		history.push('/signin');
	};





	return (
		<Formik
			initialValues={{
				firstname: "",
				lastname: "",
				email: "",
				businessname: "",
				phonenumber: "",
				password: "",
				businessCategoryId: "",
				countryid: "",

			}}
			validationSchema={ValidateIndividual}
			onSubmit={async ({ firstname, businessCategoryId, businessname, countryid, email, lastname, password, phonenumber }) => {

				try {
					dispatch(closeLoader());
					const { data } = await axios.post<Props>("/auth/register", {

						"accounttype": "individual",
						"firstname": firstname,
						"lastname": lastname,
						"email": email,
						"phonenumber": phonenumber,
						"password": password,
						"countryid": countryid,
						"business": {
							"businessName": businessname,
							"businessCategoryId": businessCategoryId
						}


					})


					if (data?.code === "success") {
						history.push(`/email_verification/${data?.email}`)
					} else {

					}

				} catch (error: any) {
					dispatch(closeLoader());

					dispatch(
						openToastAndSetContent({
							toastContent: error.message,
							toastStyles: {
								backgroundColor: 'red',
							},
						})
					);
				}
				// console.log(values, "values")



			}}
		>
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

												<div className={styles.textBox} >
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
							<div className={styles.formBox}>
								<Form >
									<Grid container justifyContent="space-between" >
										<Grid item xs={12} md={5.6} mb="18px">
											<InputLabel>
												<span className={styles.formTitle}>Country</span>
											</InputLabel>
											<Field
												as={CustomSelect}
												helperText={
													<ErrorMessage name='countryid'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='countryid'

												options={country}


											/>



										</Grid>
										<Grid item xs={12} md={5.6} mb="18px">
											<InputLabel className={styles.formTitle}>Phone number</InputLabel>
											{/* <MuiPhoneNumber variant='outlined' name='phonenumber'
												fullWidth defaultCountry={'us'} value={phone} onChange={(e) => setPhone(e)}
												helperText={
													<ErrorMessage name='phonenumber'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
											/> */}


											<Grid container>
												{/* <Grid item xs={4}>
													<TextField select fullWidth>
														{country?.map((x: countryProp) => (
															<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", width: "100%" }}>
																<MenuItem key={x?.id} defaultValue={x?.dialCode}>

																	<ReactCountryFlag
																		className="emojiFlag"
																		countryCode={x?.countryIso}
																		style={{
																			fontSize: '2em',
																			lineHeight: '2em',
																		}}
																		svg
																		defaultValue={x?.countryIso}
																	/>{x?.dialCode}

																</MenuItem>

															</Box>

														))}
													</TextField>
												</Grid> */}
												<Grid item xs={12}>
													<Field
														as={TextField}
														helperText={
															<ErrorMessage name="phonenumber">
																{(msg) => <span style={{ color: "red" }}>{msg}</span>}
															</ErrorMessage>
														}
														value={country?.dialCode}
														name="phonenumber"
														placeholder="phonenumber"
														// margin="normal"
														type="text"
														size="small"
														fullWidth
													// defaultValue={id}

													/>
												</Grid>
											</Grid>

										</Grid>

										{country?.id}

										<Grid item xs={12} md={5.6} mb="18px">
											<InputLabel>
												<span className={styles.formTitle}>First name</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name="firstname">
														{(msg) => <span style={{ color: "red" }}>{msg}</span>}
													</ErrorMessage>
												}
												name="firstname"
												placeholder="firstname"
												// margin="normal"
												type="text"
												size="small"
												fullWidth
											// defaultValue={id}

											/>
										</Grid>
										<Grid item xs={12} md={5.6} mb="18px">
											<InputLabel>
												<span className={styles.formTitle}>Trading/Business name</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name='businessname'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='businessname'
												variant='outlined'

												type='text'

												fullWidth
											/>
										</Grid>
										<Grid item xs={12} md={5.6} mb="18px">
											<InputLabel>
												<span className={styles.formTitle}>Last name</span>
											</InputLabel>
											<Field
												as={TextField}


												helperText={
													<ErrorMessage name='lastname'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='lastname'
												variant='outlined'
												fullWidth

											/>
										</Grid>
										<Grid item xs={12} md={5.6} mb="18px">
											<InputLabel>
												<span className={styles.formTitle}>Business category</span>
											</InputLabel>
											<Field
												as={CustomCategory}
												helperText={
													<ErrorMessage name='businessCategoryId'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='businessCategoryId'

												options={businessCategory}


											/>
										</Grid>
										<Grid item xs={12} md={5.6} >
											<InputLabel>
												<span className={styles.formTitle}>Email</span>
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
												placeholder='Email'
												type='email'

												fullWidth

											/>
										</Grid>
										<Grid item xs={12} md={5.6} >
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
												placeholder='password'
												type='password'

												fullWidth

											/>

										</Grid>
										{/* <InputLabel className={styles.mt}></InputLabel> */}
										<Grid item xs={12} md={5.6}></Grid>
										<Grid item xs={12} md={5.6} mt={"30px"}>
											<button
												style={{
													backgroundColor: '#27AE60',
													height: "44px",
													width: '100%',
													color: '#fff',
													border: 'none',
													fontSize: "16px",
													fontWeight: 800,
													borderRadius: '20px',
													cursor: 'pointer',
													margin: "16px 0px ",
													fontFamily: 'Avenir',
												}}
												type='submit'
												color='primary'>
												Create Account
											</button>

										</Grid>

										<Grid item xs={12} md={5.6}></Grid>
										<Grid item xs={12} md={5.6}>
											<p className={styles.formSub}>
												By clicking the “Create account” button, you agree to have read and accept the terms and conditions in the <a href="#">ITEX’s Terms of Use, Merchant Service Agreement and Privacy Policy</a>
											</p>
										</Grid>


									</Grid>



								</Form>
							</div>
						</div>
					</div>

					<div className={styles.sub}>
						<div className={styles.mt}>
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
