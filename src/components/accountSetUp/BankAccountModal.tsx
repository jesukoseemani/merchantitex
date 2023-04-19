import React, { useState, useEffect } from 'react';
import styles from './BusinessModal.module.scss';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputLabel, TextField, Button } from '@material-ui/core';
import SelectWrapperCountry from '../formUI/SelectCountry';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch, useSelector } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal, openModalAndSetContent } from '../../redux/actions/modal/modalActions';
// import { saveCountry } from '../../redux/actions/country/countryActions';
import * as Yup from 'yup';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails';
import { styled } from '@mui/system';
import { Box, MenuItem, Select, FormHelperText, Stack } from '@mui/material';
import CustomDropdown from '../customs/CustomDropdown';
import CustomCurrency from '../formUI/SelectCountry/CustomCurrency';
import WarningIcon from "../../assets/images/warningIcon.svg";
import { ReactSVG } from 'react-svg';
import SuccessModal from './business/SuccessModal';





interface BankProps {


	id: String;
	bank: string;
	countryIso: number



}

const BankAccount = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state?.authReducer)
	const [bankList, setBankList] = useState<BankProps[]>()
	const [currencyList, setCurrencyList] = useState<any>()
	const [accountName, setAccountName] = useState("")
	const [loading, setLoading] = useState(false)



	useEffect(() => {
		const fetchBanks = async () => {
			try {
				const { data } = await axios.get<any>(`/resource/banks/${auth?.user?.country}`)
				console.log(data, "banks")
				setBankList(data?.banks)

			} catch (err: any) {
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.response?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
		}

		fetchBanks()
	}, [])


	// fwtch currency
	useEffect(() => {
		const fetchCurrency = async () => {
			try {
				const { data } = await axios.get<any>(`resource/currencies`)
				console.log(data, "currency")
				setCurrencyList(data?.currencies)

			} catch (err: any) {
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.response?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
		}

		fetchCurrency()
	}, [])


	const validate = Yup.object({
		bankid: Yup.number().required('Required'),
		accountNumber: Yup.string().required('Required'),
		currency: Yup.string().required('Required'),
		bvn: Yup.string().required('Required'),
	});

	const StyledTextField = styled(TextField, {
		name: "StyledTextField",
	})({

		"& .MuiInputBase-root": {
			height: 44,
			marginBottom: "18px",
		}
	});

	return (
		<div style={{ width: '100%', maxWidth: '400px', overflow: 'hidden' }}>
			<div className={styles.header}>
				<h3>Add a bank account</h3>
			</div>
			<div style={{ width: '80%', margin: '0 auto', }}>
				<Formik
					initialValues={{
						bankid: '',
						accountNumber: '',
						bvn: '',
						currency: ""
					}}
					validationSchema={validate}
					onSubmit={(values, { resetForm }) => {
						console.log(values);
						dispatch(openLoader());
						setLoading(true)
						axios
							.post('/v1/setup/account/validate', {

								bvn: values.bvn,
								accountNumber: values.accountNumber,
								bankid: values.bankid,

							},
							)

							.then((res: any) => {
								console.log(res, "bvnnnnnnnn")
								dispatch(closeLoader());

								if (res?.data?.code === "Account validated successfully") {
									setAccountName(res?.data?.accountName)


									axios
										.post('/v1/setup/account', {

											bvn: values.bvn,
											accountNumber: values.accountNumber,
											bankid: values.bankid,
											accountName: res?.data?.accountName


										}).then((resp: any) => {
											console.log(resp)
											if (resp?.data?.code === "success") {
												setLoading(false)
												dispatch(
													openToastAndSetContent({
														toastContent: resp?.data?.message,
														toastStyles: {
															backgroundColor: 'green',
														},
													})
												);


												dispatch(
													openModalAndSetContent({
														modalStyles: {
															padding: 0,
															maxHeight: "400px",

														},

														modalContent: (
															<div className='modalDiv' style={{ height: "300px" }}>
																<SuccessModal />
															</div>
														),
													})
												);
												resetForm()
												closeModal()




											}

										}).catch((err) => {
											dispatch(closeLoader());
											setLoading(false)


											dispatch(
												openToastAndSetContent({
													toastContent: err?.response?.data?.message,
													toastStyles: {
														backgroundColor: 'red',
													},
												})
											);
										});



								}

								// resetForm();
								// dispatch(closeModal());
							})

							.catch((err) => {
								dispatch(closeLoader());
								setLoading(false)


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
						<Form>
							<Grid container style={{ paddingInline: "10px" }}>
								<Grid item xs={12}>
									<InputLabel className={styles.label}>Select currency</InputLabel>
									<Field
										as={CustomCurrency}
										helperText={
											<ErrorMessage name='currency'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='currency'
										placeholder='Type'
										size='small'
										options={currencyList}

									/>
								</Grid>
								<Grid item xs={12}>
									<InputLabel className={styles.label}>BVN</InputLabel>
									<Field
										as={StyledTextField}
										helperText={
											<ErrorMessage name='bvn'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='bvn'
										placeholder='Enter your BVN'
										variant='outlined'

										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<InputLabel className={styles.label}>Bank name</InputLabel>
									<Field
										as={SelectWrapperCountry}
										helperText={
											<ErrorMessage name='bankid'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='bankid'
										placeholder='Type'
										size='small'
										options={bankList}

									/>

								</Grid>

								<Grid item xs={12}>
									<InputLabel className={styles.label}>Account Number</InputLabel>
									<Field
										as={StyledTextField}
										helperText={
											<ErrorMessage name='accountNumber'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='accountNumber'
										placeholder='Account Number'
										variant='outlined'

										size='small'
										fullWidth
									/>
								</Grid>

								{/* <h6 className={styles.resolve}> Account name</h6> */}
								<Box>
									<h2 style={{
										fontFamily: 'Avenir',
										fontWeight: "900",
										fontSize: "14px",
										lineHeight: "19px",
										marginTop: "-7px",
										marginBottom: "17px",
										color: "#333"
									}}>
										{accountName && accountName}


									</h2>
									<Stack direction={"row"} alignItems="center" columnGap={2}>

										<ReactSVG src={WarningIcon} />
										<FormHelperText sx={{
											fontFamily: 'Avenir',
											fontStyle: "italic",
											fontWeight: 400,
											fontSize: "12px",
											lineHeight: "16px",
											color: "rgba(74, 82, 106, 0.990517)"
										}}>
											Ensure your bank account name is same as your business name.
										</FormHelperText>
									</Stack>
								</Box>


								<Grid item xs={12}>
									<Button
										variant='contained'
										style={{
											background: 'rgba(39, 174, 96, 1)',
											color: 'white',
											marginTop: '30px',
											height: '44px',
											marginBottom: '2.4rem',
											borderRadius: 20
										}}
										fullWidth
										type='submit'>
										{loading ? "Please wait" : "Continue"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default BankAccount;
