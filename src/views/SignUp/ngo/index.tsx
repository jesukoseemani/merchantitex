import { Grid, InputLabel, Typography, Button, TextField, MenuItem } from '@mui/material';
import styles from '../IndividualSignUp/style.module.scss';
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
import { ValidateNgo } from '../../../components/validation/OnboadingValidate';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomCategory from '../../../components/customs/CustomCategory';


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

const NgoSignUp = () => {
	const [phone, setPhone] = useState<unknown>()
	const [country, setCountry] = useState([])
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
							msgType: "error"
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
							msgType: "error"
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
				organizationName: "",
				phonenumber: "",
				password: "",
				countryid: "",

			}}
			validationSchema={ValidateNgo}
			onSubmit={async ({ firstname, organizationName, countryid, email, lastname, password, phonenumber }) => {
				try {
					dispatch(closeLoader());
					const { data } = await axios.post<Props>("/auth/register", {

						"accounttype": "ngo",
						"firstname": firstname,
						"lastname": lastname,
						"email": email,
						"phonenumber": phonenumber,
						"password": password,
						"countryid": countryid,
						"business": {
							"businessName": organizationName,

						}





					})


					if (data?.code === "success") {
						history.push(`/email_verification/${data?.email}`)
					} else {

						console.log(data, "dataerrr")
					}
					console.log(data, "data");

				} catch (error: any) {
					dispatch(closeLoader());

					dispatch(
						openToastAndSetContent({
							toastContent: error?.response?.data?.message,
							msgType: "error"
						})
					);
				}
				// console.log(values, "values")



			}}
		>
			{(props) => (
				<div className={styles.signupContainer} style={{ height: "530px" }}>
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

											<Field
												as={TextField}
												helperText={
													<ErrorMessage name="phonenumber">
														{(msg) => <span style={{ color: "red" }}>{msg}</span>}
													</ErrorMessage>
												}
												name="phonenumber"
												placeholder="phonenumber"
												// margin="normal"
												type="text"
												size="small"
												fullWidth
											// defaultValue={id}

											/>
										</Grid>



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
												<span className={styles.formTitle}>Organization name</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name='organizationName'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='organizationName'
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
										{/* <Grid item xs={12} md={5.6} ></Grid> */}

										{/* <InputLabel className={styles.mt}></InputLabel> */}
										{/* <Grid item xs={12} md={5.6}></Grid> */}
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
													marginTop: "3px"
												}}
												type='submit'
												color='primary'>
												Create Account
											</button>

										</Grid>

										<Grid item xs={12} md={5.6}></Grid>
										<Grid item xs={12} md={5.6} mb={5}>
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
								<span id={styles.logText}>Log in</span>
							</p>
						</div>
					</div>
				</div>

			)}
		</Formik>
	);
};

export default NgoSignUp;
