import React, { useState, useEffect } from 'react';
import styles from './BusinessModal.module.scss';
import { Formik, Form, Field, ErrorMessage, useFormik, validateYupSchema } from 'formik';
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
import { Box, MenuItem, Select, FormHelperText, Stack, FormControl, Grid, InputLabel, TextField, Button } from '@mui/material';
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
						msgType: "error"
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
				checkBusinessStatus && checkBusinessStatus()

			} catch (err: any) {
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.response?.data?.message,
						msgType: "error"
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
								msgType: "success",
							})
						);


						dispatch(
							openModalAndSetContent({
								modalStyles: {
									padding: 0,

								},

								modalContent: (
									<div className='modalDiv'>
										<SuccessModal />
									</div>
								),
							})
						);
						resetForm()
						closeModal()

						checkBusinessStatus()


					}

				}).catch((err) => {
					dispatch(closeLoader());
					setLoading(false)


					dispatch(
						openToastAndSetContent({
							toastContent: err?.response?.data?.message,
							msgType: "error",
						})
					);
				});
		}

	})

	let { accountNumber, bvn, otp, bankid } = values

	const validateBvn = () => {
		// if (bvn?.length === 11 && accountNumber?.length === 10) {

		dispatch(openLoader())
		axios
			.post('/v1/setup/account/validate', {

				bvn,
				accountNumber,
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
						msgType: "error"
					})
				);
			});
		// }
	}


	let check = bvn?.length === 11 && accountNumber?.length === 10
	useEffect(() => {
		if (check) {
			validateBvn()

		}
	}, [check]);



	// console.log(errors, "values")

	return (
		<div style={{ width: '100%', maxWidth: '400px', overflow: 'hidden' }}>

			<div style={{ width: '80%', margin: '0 auto', }}>
				<form onSubmit={handleSubmit} method="post">
					<Grid container style={{ paddingInline: "10px" }}>



						<Grid item xs={12} style={{ marginBottom: "17px" }}>
							<InputLabel className={styles.label}>Select currency</InputLabel>
							{/* <FormControl fullWidth variant="outlined"> */}

							<TextField
								select
								name='currency'
								placeholder='Type'
								size='small'
								onChange={handleChange}
								value={values.currency}
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.currency && errors?.currency}</span>}

							>
								{currencyList?.map((x: any) => (
									<MenuItem key={x?.id} placeholder='hello' value={x?.id}>{x?.currencyIso}</MenuItem>
								))}
							</TextField>
							{/* </FormControl> */}

						</Grid>


						<Grid item xs={12} style={{ marginBottom: "17px" }}>
							<InputLabel className={styles.label}>BVN</InputLabel>
							<TextField
								name='bvn'
								placeholder='Enter your BVN'
								variant='outlined'
								onChange={handleChange}
								defaultValue={values.bvn}
								size='small'
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.bvn && errors?.bvn}</span>}

							>
							</TextField>
						</Grid>

						<Grid item xs={12} style={{ marginBottom: "17px" }}>
							<InputLabel className={styles.label}>Bank name</InputLabel>
							{/* <FormControl fullWidth variant="outlined"> */}

							<TextField
								select

								name='bankid'
								placeholder='Type'
								size='small'
								onChange={handleChange}
								value={values.bankid}
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.bankid && errors?.bankid}</span>}

							>
								{bankList?.map((x: any) => (

									<MenuItem key={x?.id} placeholder='hello' value={x?.id}>{x?.bank}</MenuItem>
								))}
							</TextField>
							{/* </FormControl> */}
						</Grid>

						<Grid item xs={12} style={{ marginBottom: "17px" }}>
							<InputLabel className={styles.label}>Account Number</InputLabel>
							<TextField
								name='accountNumber'
								placeholder='Account Number'
								variant='outlined'
								onChange={handleChange}
								value={values.accountNumber}
								size='small'
								fullWidth
								helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.accountNumber && errors?.accountNumber}</span>}


							/>

						</Grid>

						<Grid item xs={12} style={{ marginBottom: "8px" }}>
							<InputLabel className={styles.label}>Otp</InputLabel>
							<TextField

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

						<Box>
							{accountName && <h2 style={{
								fontFamily: 'Avenir bold',
								fontWeight: "900",
								fontSize: "14px",
								lineHeight: "19px",
								marginBottom: "20px",
								color: "#333",
								background: 'rgba(39, 174, 96, 0.1)',
								borderRadius: 5,
								padding: "10px",
								width: "100%"
							}}>
								{accountName && accountName}


							</h2>}
							<Stack direction={"row"} alignItems="center" columnGap={2}>

								<ReactSVG src={WarningIcon} />
								<FormHelperText style={{
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
			</div>
		</div>
	);
};

export default BankAccount