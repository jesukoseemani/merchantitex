import react, { useEffect } from 'react';
import { InputLabel, Typography, Button, TextField } from '@material-ui/core';
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
import { Box, styled } from '@mui/material';
import TwoFaAuth from './TwoFaAuth';

const SignIn = () => {

	const StyledTextField = styled(TextField, {
		name: "StyledTextField",
	})({

		"& .MuiInputBase-root": {
			height: 44,
			// marginBottom: "18px",
		}
	});
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
						dispatch(closeLoader());
						dispatch(saveAuth(res?.data));
						if (res?.data?.code === "success") {

							if (res?.data?.twofa_token !== null) {
								console.log(res?.data?.twofa_token);

								dispatch(
									openToastAndSetContent({
										toastContent: res?.data?.message,
										toastStyles: {
											backgroundColor: 'green',
										},
									})
								)

								dispatch(
									openModalAndSetContent({
										modalStyles: {
											// boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
											backgroundColor: "transparent !important"
										},
										modalContent: (
											<div className='modalDiv' >
												<TwoFaAuth token={res?.data?.twofa_token} />
											</div>
										),
									})
								);
							} else {
								history.push('/');
								dispatch(saveUserDetail(res?.data?.user));
								dispatch(
									openToastAndSetContent({
										toastContent: 'Login Successful',
										toastStyles: {
											backgroundColor: 'green',
										},
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
								toastStyles: {
									backgroundColor: 'red',
								},
							})
						);
					});
			}}>
			{(props) => (
				<div className={styles.signinContainer}>
					<div className={styles.logo}>

						<ReactSVG src={Logo} />
					</div>
					<div className={styles.mt1}>
						<div className={styles.signinDiv}>
							<h5 className={styles.signinHeader}>Sign in to your account</h5>
							<div className={styles.formBody}>
								<Form>
									<Box py={3}>

										<InputLabel>
											<span className={styles.formTitle}>Email Address</span>
										</InputLabel>
										<Field
											as={StyledTextField}
											helperText={
												<ErrorMessage name='email'>
													{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
												</ErrorMessage>
											}
											name='email'
											variant='outlined'

											type='email'
											size='small'
											fullWidth
										/>


										<InputLabel style={{ marginTop: "17px" }}>
											<span className={styles.formTitle}>Password</span>
										</InputLabel>
										<Field
											as={StyledTextField}
											helperText={
												<ErrorMessage name='password'>
													{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
												</ErrorMessage>
											}
											name='password'
											variant='outlined'

											type='password'

											size='small'
											fullWidth

										/>

									</Box>

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
											fontWeight: "bold"
										}}
										type='submit'
										color='primary'>
										Sign In
									</button>
									<InputLabel>
										<div className={styles.sub}>
											<p className={styles.formSub}>
												<span onClick={() => history.push("/reset/password")}>Forgot Password?</span>
											</p>
										</div>
									</InputLabel>
								</Form>
							</div>
						</div>
					</div>

					<div className={styles.sub}>
						<p className={styles.mt2}>
							<span className={styles.subP}>
								<Link to='/signup' className={styles.signinAnchor}>
									<span className={styles.desc}>Don't have an account? </span>
									Sign up
								</Link>
							</span>
						</p>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default SignIn;
