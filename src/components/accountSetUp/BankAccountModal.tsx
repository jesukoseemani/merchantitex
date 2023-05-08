import React, { useState, useEffect } from 'react';
import styles from './BusinessModal.module.scss';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage, useFormik, validateYupSchema } from 'formik';
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
import { Box, MenuItem, Select, FormHelperText, Stack, FormControl } from '@mui/material';
import CustomDropdown from '../customs/CustomInputDropdown';
import CustomCurrency from '../formUI/SelectCountry/CustomCurrency';
import WarningIcon from "../../assets/images/warningIcon.svg";
import { ReactSVG } from 'react-svg';
import SuccessModal from './business/SuccessModal';
import CustomInputField from '../customs/CustomInputField';





interface BankProps {


	id: String;
	bank: string;
	countryIso: number



}

const BankAccount = ({ checkBusinessStatus }: any) => {
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state?.authReducer)
	const [bankList, setBankList] = useState<any>()
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
				checkBusinessStatus()

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
		bankid: Yup.number().required(),
		accountNumber: Yup.string().required(),
		currency: Yup.string().required(),
		bvn: Yup.string().required(),
		otp: Yup.string().required(),

	});

	const StyledTextField = styled(TextField, {
		name: "StyledTextField",
	})({

		"& .MuiInputBase-root": {
			height: 44,
			marginBottom: "18px",
		}
	});





	const { resetForm, values, errors, handleChange, touched, handleSubmit } = useFormik({
		initialValues: {
			bankid: "",
			accountNumber: '',
			bvn: '',
			currency: "",
			otp: ""
		},
		validationSchema: validate,
		onSubmit: (values: any) => {
			axios
				.post('/v1/setup/account', {

					bvn: values.bvn,
					accountNumber: values.accountNumber,
					bankid: values.bankid,
					accountName: accountName,
					otp: values.otp


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






	let { accountNumber, bvn, otp, bankid } = values
	if (bvn?.length >= 11 || accountNumber?.length >= 10) {
		axios
			.post('/v1/setup/account/validate', {

				bvn,
				accountNumber: accountNumber,
				bankid


			},
			)

			.then((res: any) => {
				console.log(res, "bvnnnnnnnn")
				dispatch(closeLoader());

				if (res?.data?.code === "Account validated successfully") {
					setAccountName(res?.data?.accountName)
					console.log(res?.data?.accountName);

				}
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
	}



	// console.log(errors, "values")

	return (
		<div style={{ width: '100%', maxWidth: '400px', overflow: 'hidden' }}>

			<div style={{ width: '80%', margin: '0 auto', }}>
				<form onSubmit={handleSubmit} method="post">
					<Grid container style={{ paddingInline: "10px" }}>
						<Grid item xs={12}>
							<FormControl sx={{ m: 1, marginBottom: "18px" }} fullWidth variant="outlined">

								<InputLabel className={styles.label}>Select currency</InputLabel>
								<Select

									labelId="demo-customized-select-label"
									id="demo-customized-select"
									// as={SelectWrapperCountry}
									// helperText={
									// 	<ErrorMessage name='bankid'>
									// 		{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									// 	</ErrorMessage>
									// }
									name='currency'
									placeholder='Type'
									size='small'
									// options={bankList}
									onChange={handleChange}
									value={values.currency}
									fullWidth

								>

									{currencyList?.map((x: any) => (
										<MenuItem placeholder='hello' value={x?.id}>{x?.currencyIso}</MenuItem>

									))}
								</Select>
							</FormControl>
							<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.currency && errors?.currency}</span>

						</Grid>
						<Grid item xs={12}>
							<br />
							<InputLabel className={styles.label}>BVN</InputLabel>
							<StyledTextField

								// helperText={
								// 	<ErrorMessage name='bvn'>
								// 		{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
								// 	</ErrorMessage>
								// }
								name='bvn'
								placeholder='Enter your BVN'
								variant='outlined'
								onChange={handleChange}
								defaultValue={values.bvn}
								size='small'
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.bvn && errors?.bvn}</span>}

							// error={touched?.bvn && errors?.bvn}
							>
							</StyledTextField>
						</Grid>
						<Grid item xs={12}>
							<FormControl sx={{ m: 1, marginBottom: "18px" }} fullWidth variant="outlined">

								<InputLabel className={styles.label}>Bank name</InputLabel>
								<Select

									labelId="demo-customized-select-label"
									id="demo-customized-select"
									// as={SelectWrapperCountry}
									// helperText={
									// 	<ErrorMessage name='bankid'>
									// 		{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									// 	</ErrorMessage>
									// }
									name='bankid'
									placeholder='Type'
									size='small'
									// options={bankList}
									onChange={handleChange}
									value={values.bankid}
									fullWidth

								>

									{bankList?.map((x: any) => (

										<MenuItem placeholder='hello' value={x?.id}>{x?.bank}</MenuItem>
									))}
								</Select>

							</FormControl>
							<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.bankid && errors?.bankid}</span>

						</Grid>

						<Grid item xs={12}>
							<br />

							<InputLabel className={styles.label}>Account Number</InputLabel>
							<StyledTextField
								// as={StyledTextField}
								// helperText={
								// 	<ErrorMessage name='accountNumber'>
								// 		{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
								// 	</ErrorMessage>
								// }
								name='accountNumber'
								placeholder='Account Number'
								variant='outlined'
								onChange={handleChange}
								defaultValue={values.accountNumber}
								size='small'
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.accountNumber && errors?.accountNumber}</span>}

							/>

						</Grid>
						<Grid item xs={12}>
							<InputLabel className={styles.label}>Otp</InputLabel>
							<StyledTextField
								// as={StyledTextField}
								// helperText={
								// 	<ErrorMessage name='otp'>
								// 		{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
								// 	</ErrorMessage>
								// }
								name='otp'
								placeholder='Enter otp'
								variant='outlined'
								onChange={handleChange}
								value={values.otp}
								size='small'
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.otp && errors?.otp}</span>}


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
				</form>
				{/* // )} */}
				{/* </Formik> */}
			</div>
		</div>
	);
};

export default BankAccount