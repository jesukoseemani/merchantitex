import React, { useState } from 'react';
import styles from './BusinessModal.module.scss';
import { Grid } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import { InputLabel } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { closeModal } from '../../redux/actions/modal/modalActions';
import { serialize } from 'object-to-formdata';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails';

const RcDocument = () => {
	const validate = Yup.object({
		rcnumber: Yup.string().required('field is required'),
		caccertificate: Yup.string().required('field is required'),
		otherdocument: Yup.string().required('field is required'),
		firstdirectorid: Yup.string().required('field is required'),
		seconddirectorid: Yup.string().required('field is required'),
		seconddirectorbvn: Yup.string()
			.min(11, ' must be 11 characters')
			.max(11, ' must be 11 characters')
			.required('BVN is required'),
	});

	const dispatch = useDispatch();
	// const modalHandler = () => {
	// 	dispatch(
	// 		openModalAndSetContent({
	// 			modalStyles: {
	// 				padding: 0,
	// 			},

	// 			modalContent: (
	// 				<div className='modalDiv'>
	// 					<RnDocument />
	// 				</div>
	// 			),
	// 		})
	// 	);
	// };
	return (
		<div style={{ padding: '1rem' }}>
			<div className={styles.header}>
				<h3>Business document upload</h3>
			</div>
			<div className={styles.wrapper}>
				<Formik
					initialValues={{
						rcnumber: '',
						caccertificate: '',
						otherdocument: '',
						firstdirectorid: '',
						seconddirectorid: '',
						seconddirectorbvn: '',
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
							<Grid>
								<Grid container spacing={2} item md={12}>
									<Grid item md={6}>
										<InputLabel>RC Number</InputLabel>

										<input
											className={styles.inputFileText}
											type='text'
											name='rcnumber'
											placeholder='1234567890'
											onChange={(event: any) => {
												props.setFieldValue('rcnumber', event?.target?.value);
											}}
										/>
										<ErrorMessage name='rcnumber'>
											{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
										</ErrorMessage>
									</Grid>
									<Grid item md={6}>
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
									<Grid item md={6}>
										<InputLabel>Any other revelant document</InputLabel>
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
								</Grid>
								<div className={styles.header}></div>
								<Grid container spacing={2} item md={12}>
									<Grid item md={6}>
										<InputLabel>ID for first Director</InputLabel>
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

									<Grid item md={6}>
										<InputLabel>ID for second Director</InputLabel>
										<input
											className={styles.inputFile}
											type='file'
											name='seconddirectorid'
											id='file'
											accept='image/png,image/jpg,image/jpeg'
											onChange={(event: any) => {
												props.setFieldValue(
													'seconddirectorid',
													event?.target?.files[0]
												);
											}}
										/>
										<ErrorMessage name='seconddirectorid'>
											{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
										</ErrorMessage>
									</Grid>
									<Grid item md={6}>
										<InputLabel>BVN for the second Director</InputLabel>
										<input
											className={styles.inputFileText}
											type='text'
											name='seconddirectorbvn'
											placeholder='12345678901'
											onChange={(event: any) => {
												props.setFieldValue(
													'seconddirectorbvn',
													event?.target?.value
												);
											}}
										/>
										<ErrorMessage name='seconddirectorbvn'>
											{(msg) => <div style={{ color: 'red' }}>{msg}</div>}
										</ErrorMessage>
									</Grid>
									<Grid item md={6}>
										<button
											style={{
												background: 'rgba(39, 174, 96, 1)',
												color: 'white',
												marginTop: '20px',
												padding: '0.9rem',
												outline: 'none',
												border: 'none',
												width: '100%',
												borderRadius: '4px',
											}}
											type='submit'>
											Continue
										</button>
									</Grid>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RcDocument;
