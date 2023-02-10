import React, { useState } from 'react';
import styles from './Settings.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { InputLabel, TextField } from '@material-ui/core';
import Select from '../../components/formUI/Select';
import { Divider } from '@mui/material';
import { closeModal } from '../../redux/actions/modal/modalActions';

function UserModal({
	title,
	onclick,
}: {
	title: string;
	onclick?: (values: { email: string; position: string }) => void | undefined;
}) {
	const dispatch = useDispatch();
	interface ResponseData {
		email: string;
		position: string;
	}

	const validate = Yup.object({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		position: Yup.string().required('Role is required'),
	});
	const settlementOptions = [{ name: 'Administrator' }, { name: 'Operations' }];

	const accountTypes = [
		{
			id: 1,
			title: 'Administrator',
			description: 'This is best for the business owners and executives.',
		},

		{
			id: 2,
			title: 'Operations',
			description: 'For operational staffs.',
		},

		{
			id: 3,
			title: 'Customer support',
			description:
				'Best for staff that perform actions like refunds, disputes management.',
		},
		{
			id: 4,
			title: 'Developer',
			description:
				'This is best for developers working with the ITEX Pay APIs.',
		},
		{
			id: 5,
			title: 'Viewers',
			description: 'This is best for team members who just need to view data.',
		},
	];

	const funcIn = (values: ResponseData) => {
		onclick && onclick(values);
	};

	return (
		<div
			style={{
				color: 'rgba(0, 0, 0, 1)',
				backgroundColor: '#ffffff',
				overflowY: 'hidden',
				height: '650px',
			}}>
			
			<Formik
				initialValues={{
					email: '',
					position: '',
				}}
				validationSchema={validate}
				onSubmit={(values) => funcIn(values)}>
				{(props) => (
					<div className={styles.signinContainer}>
						<div className={styles.account_wrap}>
							<h1 className={styles.account_h1}>{title}</h1>
						</div>
						<div className={styles.signupDiv}>
							<div className={styles.signUpContent}>
								<Form>
									<InputLabel>
										<span className={styles.formTitle}>Email Address</span>
									</InputLabel>
									<Field
										as={TextField}
										helperText={
											<ErrorMessage name='email'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='email'
										variant='outlined'
										margin='normal'
										type='email'
										size='small'
										fullWidth
									/>
									<InputLabel>
										<span className={styles.formTitle}>User Role</span>
									</InputLabel>

									<Field
										as={Select}
										helperText={
											<ErrorMessage name='role'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='position'
										variant='outlined'
										margin='normal'
										type='text'
										size='small'
										options={settlementOptions}
										fullWidth
									/>

									<InputLabel className={styles.mt1}></InputLabel>
									<button
										style={{
											backgroundColor: '#27AE60',
											padding: '0.7rem',
											width: '100%',
											color: '#fff',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer',
										}}
										type='submit'
										color='primary'>
										{title === 'Edit user' ? 'Save changes' : 'Send invite'}
									</button>
								</Form>
							</div>
						</div>
						<div className={styles.listType}>
							<h3 className={styles.listType_h2}>Roles</h3>
							<Divider />
							{accountTypes.map(({ id, title, description }) => (
								<div className={styles.listType_wrap} key={id}>
									<h3 className={styles.listType_h3}>{title}</h3>
									<p className={styles.listType_p}>{description}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default UserModal;
