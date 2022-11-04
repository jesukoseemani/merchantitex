import React from 'react';
import { InputLabel, TextField, MenuItem } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './AccountSetup.module.scss';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch, useSelector } from 'react-redux';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal } from '../../redux/actions/modal/modalActions';
import SelectWrapperCountry from '../formUI/SelectCountry';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails';
import SelectWrapperAllCountry from '../../components/formUI/SelectAllCountry';

const AddBankAccount = () => {
	const validate = Yup.object({
		phonenumber: Yup.number()
			.integer()
			.typeError('Please enter a valid phone number')
			.required('Required'),
		bankcode: Yup.string().required('Required'),
		accountnumber: Yup.number()
			.integer()
			.typeError('Please enter a valid phone number')
			.required('Required'),
		type: Yup.string().required('Required'),
	});
	const dispatch = useDispatch();
	const bankData = useSelector((state) => state?.countryReducer?.country.banks);
	const settlementType = [
		{ name: 'Wallet', code: 'Wallet' },
		{ name: 'Account', code: 'Account' },
	];

	return (
		<Formik
			initialValues={{
				phonenumber: '',
				bankcode: '',
				accountnumber: '',
				type: '',
			}}
			validationSchema={validate}
			onSubmit={(values, { resetForm }) => {
				dispatch(openLoader());

				axios
					.post('/merchant/account/update', {
						business: {
							phonenumber: values.phonenumber,
						},
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
				<div className={styles.modalContainer}>
					<div className={styles.modalColumn}>
						<div className={styles.modalHeader}>
							<div>
								<span>Add a bank account</span>
							</div>
							<hr />
						</div>
						<Form>
							<InputLabel className={styles.mt1}>
								<span>Phone Number</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='phonenumber'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='phonenumber'
								placeholder='08107071726'
								variant='outlined'
								margin='normal'
								type='text/number'
								size='small'
								fullWidth
							/>
							<InputLabel>
								<span>Bank Name</span>
							</InputLabel>

							<Field
								as={SelectWrapperCountry}
								helperText={
									<ErrorMessage name='bankcode'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='bankcode'
								size='small'
								options={bankData}
								style={{
									marginTop: '1rem',
								}}
							/>

							<InputLabel>
								<span>Account Number</span>
							</InputLabel>
							<Field
								as={TextField}
								helperText={
									<ErrorMessage name='accountnumber'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='accountnumber'
								placeholder='0241593788'
								variant='outlined'
								margin='normal'
								type='text/number'
								size='small'
								fullWidth
							/>

							<InputLabel>
								<span>Settlement Type</span>
							</InputLabel>

							<Field
								as={SelectWrapperAllCountry}
								helperText={
									<ErrorMessage name='type'>
										{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
									</ErrorMessage>
								}
								name='type'
								size='small'
								options={settlementType}
								style={{
									marginTop: '1rem',
								}}
							/>

							<InputLabel></InputLabel>
							<button
								style={{
									backgroundColor: '#27AE60',
									padding: '0.7rem',
									marginTop: '1.5rem',
									width: '100%',
									color: '#fff',
									border: 'none',
									borderRadius: '4px',
								}}
								type='submit'
								color='primary'>
								Continue
							</button>
						</Form>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default AddBankAccount;
