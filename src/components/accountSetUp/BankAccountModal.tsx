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

	const settlementOptions = [
		{
			name: 'Bank Account',
		},
	];
	return (
		<div style={{ width: '100%', maxWidth: '400px', overflow: 'hidden' }}>
			<div className={styles.header}>
				<h3>Add a bank account</h3>
			</div>
			<div style={{ width: '80%', margin: '0 auto' }}>
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
							<Grid container spacing={2}>
								<Grid item md={12}>
									<InputLabel>Phone Number</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='type'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='phone'
										placeholder='Phone'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={12}>
									<InputLabel>Bank name</InputLabel>
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
										style={{
											marginTop: '1rem',
										}}
									/>
								</Grid>
								<Grid item md={12}>
									<InputLabel>Corporate Bank Account Number</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='accountnumber'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='accountnumber'
										placeholder='Account Number'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<div
									style={{
										color: 'rgba(130, 130, 130, 1)',
										marginLeft: '8px',
									}}>
									<h6>Resolved Account name</h6>
								</div>
								<Grid item md={12}>
									<InputLabel>Settlement type</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='type'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='type'
										placeholder='Type'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
										select
									/>
								</Grid>

								<Grid item md={12}>
									<Button
										variant='contained'
										style={{
											background: 'rgba(39, 174, 96, 1)',
											color: 'white',
											marginTop: '0.8rem',
											padding: '0.9rem',
											marginBottom: '2rem',
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
