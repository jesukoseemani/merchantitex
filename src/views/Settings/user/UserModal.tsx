import React, { useEffect, useState } from 'react';
import styles from './user.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import {
	openLoader,
	closeLoader,
} from '../../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { InputLabel, TextField } from '@mui/material';
import { Divider, MenuItem, styled, Select, Stack, Link, Grid } from '@mui/material';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomCategory from '../../../components/customs/CustomCategory';
import 'yup-phone-lite'



interface Props {
	roles: {
		id: string;
		decription: string;
		roleName: string;
	}[]

}


interface UserProps {
	code: string;
	message: string;
}

function UserModal({ getUsers }: any) {

	const validate = Yup.object({
		email: Yup.string()
			.email('Email is invalid')
			.required('Email Address is required'),
		firstname: Yup.string()
			.required('firstname is required'),
		lastname: Yup.string()
			.required('lastname is required'),
		countryid: Yup.string()
			.required('countryid is required'),
		phonenumber: Yup.string().phone(["NG", "US", "AM"], 'Phone number is not valid')
			.required('phonenumber is required'),
		roleid: Yup.string()
			.required('Role is required'),
	});










	const [roles, setRoles] = useState<any>()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(openLoader());
		const fetchPermission = async () => {

			try {

				const { data } = await axios.get<Props>("/v1/setting/roles")
				console.log(data)
				setRoles(data?.roles)


				dispatch(closeLoader());

			} catch (error: any) {
				dispatch(closeLoader());
				const { message } = error.response.data;
				dispatch(
					dispatch(
						openToastAndSetContent({
							toastContent: message,
							toastStyles: {
								backgroundColor: "red",
							},
						})
					)
				);
			} finally {
				dispatch(closeLoader());
			}
		}


		fetchPermission()
	}, [])




	const [country, setCountry] = useState([])




	useEffect(() => {
		dispatch(openLoader());
		const fetchCountry = async () => {

			try {

				const { data } = await axios.get<any>("/resource/countries")
				setCountry(data?.countries)


				dispatch(closeLoader());

			} catch (error: any) {
				dispatch(closeLoader());
				const { message } = error.response.data;
				dispatch(
					dispatch(
						openToastAndSetContent({
							toastContent: message,
							toastStyles: {
								backgroundColor: "red",
							},
						})
					)
				);
			} finally {
				dispatch(closeLoader());
			}
		}


		fetchCountry()
	}, [])



	return (
		<div>

			<Formik
				initialValues={{
					email: '',
					roleid: "",
					countryid: "",
					firstname: "",
					lastname: "",
					phonenumber: ""
				}}
				validationSchema={validate}
				onSubmit={async (values) => {
					try {
						dispatch(closeLoader());
						const { data } = await axios.post<UserProps>("/v1/users/add", values)


						if (data?.code === "success") {
							console.log(data)
							dispatch(
								openToastAndSetContent({
									toastContent: data?.message,
									toastStyles: {
										backgroundColor: 'green',
									},
								})
							);
							dispatch(closeModal())
							getUsers()
						} else {

							console.log(data, "dataerrr")
						}
						console.log(data, "data");

					} catch (error: any) {
						dispatch(closeLoader());

						dispatch(
							openToastAndSetContent({
								toastContent: error?.response?.data?.message,
								toastStyles: {
									backgroundColor: 'red',
								},
							})
						);
					}
				}}>
				{(props) => (
					<div className={styles.userContainer}>

						<div className={styles.userDiv}>
							<div className={styles.userContent}>
								<Form>

									<Grid container columnSpacing={3} justifyContent="space-between" alignItems={"center"} >
										<Grid item xs={12} md={6} mb="18px">
											<InputLabel className={styles.label}>
												<span className={styles.formTitle}>Country</span>
											</InputLabel>
											<Field
												as={CustomSelect}
												helperText={
													<ErrorMessage name='countryid'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='countryid'

												options={country}


											/>
										</Grid>
										<Grid item xs={12} md={6} mb="18px">
											<InputLabel className={styles.label}>
												<span className={styles.formTitle}>User Role</span>
											</InputLabel>
											<Field
												as={CustomCategory}
												helperText={
													<ErrorMessage name='roleid'>
														{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
													</ErrorMessage>
												}
												name='roleid'

												options={roles}


											/>



										</Grid>


										<Grid item xs={12} md={6} mb="18px">
											<InputLabel className={styles.label}>
												<span className={styles.formTitle}>First name</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name="firstname">
														{(msg) => <span style={{ color: "red" }}>{msg}</span>}
													</ErrorMessage>
												}
												name="firstname"
												placeholder="firstname"
												// margin="normal"
												type="text"
												size="small"
												fullWidth
											// defaultValue={id}

											/>
										</Grid>
										<Grid item xs={12} md={6} mb="18px">
											<InputLabel className={styles.label}>
												<span className={styles.formTitle}>last name</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name="lastname">
														{(msg) => <span style={{ color: "red" }}>{msg}</span>}
													</ErrorMessage>
												}
												name="lastname"
												placeholder="lastname"
												// margin="normal"
												type="text"
												size="small"
												fullWidth
											// defaultValue={id}

											/>
										</Grid>
										<Grid item xs={12} md={6} mb="18px">
											<InputLabel className={styles.label}>
												<span className={styles.formTitle}>Email</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name="email">
														{(msg) => <span style={{ color: "red" }}>{msg}</span>}
													</ErrorMessage>
												}
												name="email"
												placeholder="email"
												// margin="normal"
												type="text"
												size="small"
												fullWidth
											// defaultValue={id}

											/>
										</Grid>
										<Grid item xs={12} md={6} mb="18px">
											<InputLabel className={styles.label}>
												<span className={styles.formTitle}>Phone Number</span>
											</InputLabel>
											<Field
												as={TextField}
												helperText={
													<ErrorMessage name="phonenumber">
														{(msg) => <span style={{ color: "red" }}>{msg}</span>}
													</ErrorMessage>
												}
												name="phonenumber"
												placeholder="phonenumber"
												// margin="normal"
												type="text"
												size="small"
												fullWidth
											// defaultValue={id}

											/>
										</Grid>


										<button
											style={{
												backgroundColor: '#27AE60',
												height: '44px',
												width: '100%',
												margin: "26px 0px 30px 20px",
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
											{/* {title === 'Edit user' ? 'Save changes' : 'Send invite'} */}
											create
										</button>
									</Grid>
								</Form>
							</div>
							<div className={styles.user_permission}>
								<Stack direction={"row"} mb={2} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #F2F2F2" pb={"18px"} >
									<h2>Permissions</h2>
									<Link href={"#"}>View all permissions</Link>
								</Stack>

								{roles?.map(({ id, roleName, description }: any) => (
									<div className={styles.user_content} key={id}>
										<p className={styles.user_h3}>{roleName}</p>
										<span className={styles.user_p}>{description}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)
				}
			</Formik >
		</div >
	);
}

export default UserModal;
