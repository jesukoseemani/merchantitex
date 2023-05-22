import react, { useEffect, useState } from 'react';
import styles from './SignIn.module.scss';
import Logo from '../../assets/images/white_bg_logo.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { Link } from 'react-router-dom';
import { saveUserDetail } from '../../redux/actions/userDetail/userDetailActions';
import { saveCountry } from '../../redux/actions/country/countryActions';
// import { makeStyles } from '@material-ui/core';
import { ReactSVG } from "react-svg";
import { Box, styled, InputAdornment, IconButton, InputLabel, Typography, Button, TextField, FormControl, OutlinedInput } from '@mui/material';
import TwoFaAuth from './TwoFaAuth';
import { saveMe } from '../../redux/actions/me/meActions';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { CustomToast } from '../../components/customs/CustomToast';

const SignIn = () => {

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};


	useEffect(() => {
		dispatch(openLoader());
		const fetchCountry = async () => {

			try {

				const { data } = await axios.get<any>("/resource/countries")
				if (data) {
					dispatch(saveCountry(data?.countries))


					dispatch(closeLoader());
				}

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



	const dispatch = useDispatch();
	const history = useHistory();

	interface Props {
		email: string;
		password: string;
	}



	const validate = Yup.object({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		password: Yup.string()
			.required('Password is required'),
	});

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validate}
			onSubmit={(values) => {
				dispatch(openLoader());
				axios
					.post('/auth/authenticate', values)
					.then((res: any) => {
						console.log(res?.data)

						if (res?.data?.code === "success") {
							dispatch(saveAuth(res?.data));

							history.push({
								pathname: "/signin/2fa",
								state: res?.data?.twofa_token
							})

							if (res?.data?.twofa_token !== null) {
								console.log(res?.data?.twofa_token);
								dispatch(closeLoader());

								dispatch(
									openToastAndSetContent({
										toastContent: res?.data?.message,
										msgType: "success"
									})
								)


							} else {

								history.push('/');

								dispatch(saveUserDetail(res?.data?.user));
								dispatch(closeLoader());

								dispatch(
									openToastAndSetContent({
										toastContent: 'Login Successful',
										msgType: "success"
									})
								);
							}
						}
						// dispatch(saveLoading(true));


						// if (res.data.business.status === 'IN-REVIEW') {
						// 	history.push(`/quickupdate/${res.data.business.account.type}`);
						// } else {
						// 	history.push('/');
						// }
					})
					.catch((err) => {
						console.log(err);
						dispatch(closeLoader());
						dispatch(saveLoading(false));

						dispatch(
							openToastAndSetContent({
								toastContent: err?.response?.data?.message,
								msgType: "error"
							})
						);
					});
			}}>
			{(props) => (
				<div className={styles.signinContainer}>
					<div className={styles.logo}>

						<ReactSVG src={Logo} />
					</div>
					<div>
						<div className={styles.signinDiv}>
							<h2 className={styles.signinHeader}>Sign in to your account</h2>
							<div className={styles.formBody}>
								<Form>
									<div>

										<div className={styles.inputDiv}>
											<InputLabel className={styles.formTitle}>
												Email Address
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
												placeholder="Enter Email Address"
												type='email'
												size='small'
												fullWidth


											/>
										</div>
										{/* <FormControl fullWidth> */}

										<div className={styles.inputDiv}>

											<InputLabel className={styles.formTitle}>
												Password
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name='password'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='password'
												placeholder="Enter Password"
												variant='outlined'

												type={showPassword ? 'text' : 'password'}
												InputProps={{
													endAdornment: <InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
															sx={{ paddingRight: "14px" }}
														>
															{showPassword ? <VisibilityOff /> : <Visibility />}
														</IconButton>
													</InputAdornment>,
												}}

												size='small'
												fullWidth


											/>
										</div>
										{/* </FormControl> */}

									</div>




									<button
										style={{
											backgroundColor: '#27AE60',
											// padding: '1rem',
											fontFamily: "Avenir Bold",
											width: '100%',
											color: '#fff',
											border: 'none',
											borderRadius: '20px',
											cursor: 'pointer',
											fontSize: "16px",
											height: "44px",
											marginTop: "20px",
											marginBottom: "31px",
											fontWeight: "bold",
											display: "block"
										}}
										type='submit'
										color='primary'>
										Sign In
									</button>
									<InputLabel>
										<div className={styles.sub}>
											<p className={styles.formSub}>
												<span onClick={() => history.push("/reset/password")}>Forgot password?</span>
											</p>
										</div>
									</InputLabel>
								</Form>
							</div>
						</div>
					</div>

					<div className={styles.signinAnchor_box}>
						<Link to='/signup' className={styles.signinAnchor}>
							<span className={styles.desc}>Don't have an account? </span>
							<span id={styles.signupText}>Sign up</span>
						</Link>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default SignIn;
