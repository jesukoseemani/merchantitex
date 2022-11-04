import React, { useState, useEffect } from 'react';
import styles from './BusinessModal.module.scss';
import { InputLabel, TextField, Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../redux/actions/modal/modalActions';
import DocumentUpload from './DocumentUpload';
import RcDocument from './RcDocumentModal';
import RnDocument from './RnDocumentModal';
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

const BusinessContent = () => {
	const validate = Yup.object({
		registeredaddress: Yup.string()
			.max(50, 'Must be 50 characters or less')
			.required('Registered Address is required'),
		businesstype: Yup.string()
			.min(4, 'Must be at least 4 characters')
			.required('This is required'),
		bvn: Yup.string()
			.min(11, ' must be at least 11 characters')
			.required('BVN is required'),
		nin: Yup.string()
			.min(11, 'Must be at least 11 characters')
			.required('NIN is required'),
	
		supportemail: Yup.string()
			.email('Email is invalid')
			.required('This is required'),
	});

	const dispatch = useDispatch();
	const modalHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},

				modalContent: (
					<div className='modalDiv'>
						<DocumentUpload />
					</div>
				),
			})
		);
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Business Profile Setup</h3>
			</div>
			<div
				style={{
					margin: '2rem auto 0 auto',
					width: '90%',
					paddingBottom: '1rem',
				}}>
				<Formik
					initialValues={{
						registeredaddress: '',
						officeaddress: '',
						businesstype: '',
						businesslogo: '',
						supportemail: '',
						chargebackemail: '',
						websiteurl: '',
						bvn: '',
						nin: '',
						dateofbirth: '',
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
							<Grid container spacing={2}>
								<Grid item md={6}>
									<div>
										<InputLabel>Registered Address</InputLabel>
										<Field
											as={TextField}
											helperText={
												<ErrorMessage name='registeredaddress'>
													{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
												</ErrorMessage>
											}
											name='registeredaddress'
											placeholder='1James street, Lekki Phase 1, Lagos'
											variant='outlined'
											margin='normal'
											size='small'
											fullWidth
										/>
									</div>
								</Grid>

								<Grid item sm={12} md={6}>
									{' '}
									<InputLabel>Office Address</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='officeaddress'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='officeaddress'
										placeholder='1James street, Lekki Phase 1, Lagos'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={12}>
									{' '}
									<InputLabel>What does your business do?</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='businesstype'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='businesstype'
										placeholder='The business is a tech startup that builds enterprise software for businesses.'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>Support Email</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='supportemail'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='supportemail'
										placeholder='email@email.com'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>Chargeback email (Optional)</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='chargebackemail'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='chargebackemail'
										placeholder='chargeback@email.com'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>Website URL (Optional)</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='websiteurl'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='websiteurl'
										placeholder='www.website.com'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>Business Logo</InputLabel>

									<input
										style={{
											padding: '0.6rem',
											margin: '0.7rem 0 0.7rem 0',
											width: '100%',
											outline: 'none',
											borderRadius: '4px',
											border: '0.5px solid gray',
											color: 'black',
										}}
										type='file'
										name='businesslogo'
										id='businesslogo'
										accept='image/png,image/jpg,image/jpeg,application/pdf'
										onChange={(event: any) => {
											props.setFieldValue(
												'businesslogo',
												event?.target?.files[0]
											);
										}}
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>BVN</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='bvn'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='bvn'
										placeholder='1234567890'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>NIN</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='nin'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='nin'
										placeholder='1234567890'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel>Date of birth</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='dateofbirth'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='dateofbirth'
										placeholder='09-09-1980'
										variant='outlined'
										margin='normal'
										size='small'
										fullWidth
									/>
								</Grid>
								<Grid item md={6}>
									<InputLabel style={{ marginTop: '1rem' }}></InputLabel>
									<Button
										variant='contained'
										style={{
											background: 'rgba(39, 174, 96, 1)',
											color: 'white',
											marginTop: '0.8rem',
											padding: '0.9rem',
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

export default BusinessContent;
