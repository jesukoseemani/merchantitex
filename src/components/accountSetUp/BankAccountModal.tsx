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
import { closeModal } from '../../redux/actions/modal/modalActions';
// import { saveCountry } from '../../redux/actions/country/countryActions';
import * as Yup from 'yup';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails';
import { styled } from '@mui/system';
import { MenuItem, Select } from '@mui/material';



const BankAccount = () => {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	axios
	// 		.get(`/transaction/banks`)
	// 		.then((res) => {
	// 			dispatch(saveCountry(res.data));
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [dispatch]);
	const bankData = useSelector((state) => state?.countryReducer?.country.banks);

	const validate = Yup.object({
		bankcode: Yup.string().required('Required'),
		accountnumber: Yup.number().required('Required'),
		type: Yup.string().required('Required'),
	});

	const StyledTextField = styled(TextField, {
		name: "StyledTextField",
	})({

		"& .MuiInputBase-root": {
			height: 44,
			marginBottom: "18px",
		}
	});
	const settlementType = [
		{ name: 'Wallet', code: 'Wallet' },
		{ name: 'Account', code: 'Account' },
	];
	return (
		<div style={{ width: '100%', maxWidth: '400px', overflow: 'hidden' }}>
			<div className={styles.header}>
				<h3>Add a bank account</h3>
			</div>
			<div style={{ width: '80%', margin: '0 auto', }}>
				<Formik
					initialValues={{
						bankcode: '',
						accountnumber: '',
						type: '',
					}}
					validationSchema={validate}
					onSubmit={(values, { resetForm }) => {
						console.log(values);
						dispatch(openLoader());

						axios
							.post('/merchant/account/update', {
								settlement: {
									account: [
										{
											type: values.type,
											accountnumber: values.accountnumber,
											bankcode: values.bankcode,
										},
									],
								},
							})

							.then((res: any) => {
								dispatch(closeLoader());

								dispatch(
									openToastAndSetContent({
										toastContent: res.data.message,
										toastStyles: {
											backgroundColor: 'green',
										},
									})
								);
								dispatch(FetchProfileDetails());
								resetForm();
								dispatch(closeModal());
							})

							.catch((err) => {
								dispatch(closeLoader());

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
									<InputLabel className={styles.label}>Phone Number</InputLabel>
									<StyledTextField
										helperText={
											<ErrorMessage name='type'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='phone'
										placeholder='Phone'
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
											<ErrorMessage name='bankcode'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='bankcode'
										placeholder='Type'
										size='small'
										options={bankData}

									/>
								</Grid>

								<Grid item xs={12}>
									<InputLabel className={styles.label}>Corporate Bank Account Number</InputLabel>
									<StyledTextField
										helperText={
											<ErrorMessage name='accountnumber'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='accountnumber'
										placeholder='Account Number'
										variant='outlined'

										size='small'
										fullWidth
									/>
								</Grid>
								<h6 className={styles.resolve}>Resolved Account name</h6>

								<Grid item xs={12}>
									<InputLabel className={styles.label}>Settlement type</InputLabel>
									<Select
										sx={{

											height: 44,
											marginBottom: "18px"
										}}
										fullWidth
									>
										{settlementType?.map(({ name, code }) => (
											<MenuItem key={code} value={name}>{name}</MenuItem>
										))}
									</Select>
								</Grid>

								<Grid item xs={12}>
									<Button
										variant='contained'
										style={{
											background: 'rgba(39, 174, 96, 1)',
											color: 'white',
											marginTop: '47px',
											height: '44px',
											marginBottom: '2.4rem',
											borderRadius: 20
										}}
										fullWidth
										type='submit'>
										Continue
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
