import React, { useState } from 'react';
import styles from './BusinessModal.module.scss';
import { Grid } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputLabel, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import BankAccount from './BankAccountModal';
import * as Yup from 'yup';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal } from '../../redux/actions/modal/modalActions';
import { serialize } from 'object-to-formdata';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails';

const RnDocument = () => {
	const dispatch = useDispatch();
	const modalHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},

				modalContent: (
					<div className='modalDiv'>
						<BankAccount />
					</div>
				),
			})
		);
	};
	const validate = Yup.object({
		bnnumber: Yup.string().required('This is required'),
		caccertificate: Yup.string().required('This is required'),
		otherdocument: Yup.string().required('This is required'),
		firstdirectorid: Yup.string().required('This is required'),
	});
	return (
		<div style={{ width: '100%', maxWidth: '400px' }}>
			<div className={styles.header}>
				<h3>Business document upload</h3>
			</div>
			<div style={{ width: '80%', margin: '0 auto' }}>
				<Formik
					initialValues={{
						bnnumber: '',
						caccertificate: '',
						otherdocument: '',
						firstdirectorid: '',
					}}
					validationSchema={validate}
					onSubmit={(values, { resetForm }) => {
						dispatch(openLoader());
						const formData = serialize(values);

						axios
							.post('/merchant/account/updateform', formData)

							.then((res: any) => {
								dispatch(closeLoader());

								dispatch(
									openToastAndSetContent({
										toastContent: res.data.message,
										msgType: "success"
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
										msgType: "error"
									})
								);
							});
					}}>
					{(props) => (
						<Form>
							<Grid container spacing={2}>
								<Grid item md={12}>
									<InputLabel>BN Number</InputLabel>
									<input
										className={styles.inputFileText}
										type='text'
										name='bnnumber'
										placeholder='1234567890'
										onChange={(event: any) => {
											props.setFieldValue('bnnumber', event?.target?.value);
										}}
									/>
									<ErrorMessage name='bnnumber'>
										{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
									</ErrorMessage>
								</Grid>
								<Grid item md={12}>
									<InputLabel>CAC Certificate</InputLabel>
									<input
										className={styles.inputFile}
										type='file'
										name='caccertificate'
										id='file'
										accept='image/png,image/jpg,image/jpeg'
										onChange={(event: any) => {
											props.setFieldValue(
												'caccertificate',
												event?.target?.files[0]
											);
										}}
									/>
									<ErrorMessage name='caccertificate'>
										{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
									</ErrorMessage>
								</Grid>
								<Grid item md={12}>
									<InputLabel>Any other relevant document</InputLabel>
									<input
										className={styles.inputFile}
										type='file'
										name='otherdocument'
										id='file'
										accept='image/png,image/jpg,image/jpeg'
										onChange={(event: any) => {
											props.setFieldValue(
												'otherdocument',
												event?.target?.files[0]
											);
										}}
									/>
									<ErrorMessage name='otherdocument'>
										{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
									</ErrorMessage>
								</Grid>
								<Grid item md={12}>
									<InputLabel>Valid ID for one Director</InputLabel>
									<input
										className={styles.inputFile}
										type='file'
										name='firstdirectorid'
										id='file'
										accept='image/png,image/jpg,image/jpeg'
										onChange={(event: any) => {
											props.setFieldValue(
												'firstdirectorid',
												event?.target?.files[0]
											);
										}}
									/>
									<ErrorMessage name='firstdirectorid'>
										{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
									</ErrorMessage>
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

export default RnDocument;
