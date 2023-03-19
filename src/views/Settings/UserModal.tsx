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
import { Divider, MenuItem, styled, Select, Stack, Link } from '@mui/material';
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



	// resizing textfiels
	const StyledTextField = styled(TextField, {
		name: "StyledTextField",
	})({

		"& .MuiInputBase-root": {
			height: 44,
			marginBottom: "10px",
		}
	});

	const funcIn = (values: ResponseData) => {
		onclick && onclick(values);
	};

	return (
		<div>

			<Formik
				initialValues={{
					email: '',
					position: '',
				}}
				validationSchema={validate}
				onSubmit={(values) => funcIn(values)}>
				{(props) => (
					<div className={styles.userContainer}>
						<div className={styles.user_wrap}>
							<h2>{title}</h2>
						</div>
						<div className={styles.userDiv}>
							<div className={styles.userContent}>
								<Form>
									<InputLabel className={styles.label}>
										Email Address
									</InputLabel>
									<StyledTextField
										helperText={
											<ErrorMessage name='email'>
												{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
											</ErrorMessage>
										}
										name='email'
										variant='outlined'

										type='email'
										size='small'
										fullWidth
									/>
									<InputLabel className={styles.label}>
										User Role
									</InputLabel>


									<Select
										sx={{

											height: 44,
										}}
										fullWidth
									>
										{settlementOptions?.map(({ name }, i) => (
											<MenuItem key={i} value={name}>{name}</MenuItem>
										))}
									</Select>

									<InputLabel className={styles.mt1}></InputLabel>
									<button
										style={{
											backgroundColor: '#27AE60',
											height: '44px',
											width: '100%',
											color: '#fff',
											border: 'none',
											borderRadius: '20px',
											cursor: 'pointer',
											marginTop: "23px",
											fontFamily: 'Avenir',
											fontStyle: "normal",
											fontWeight: 800,
											fontSize: 16,
											display: "flex",
											justifyContent: "center",
											alignItems: "center"
										}}
										type='submit'
										color='primary'>
										{title === 'Edit user' ? 'Save changes' : 'Send invite'}
									</button>
								</Form>
							</div>
							<div className={styles.user}>
								<Stack direction={"row"} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #F2F2F2" pb={"18px"}>
									<h2>Permissions</h2>
									<Link href={"#"}>View all permissions</Link>
								</Stack>

								{accountTypes.map(({ id, title, description }) => (
									<div className={styles.user_content} key={id}>
										<h3 className={styles.user_h3}>{title}</h3>
										<p className={styles.user_p}>{description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default UserModal;
