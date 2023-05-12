import { Grid, InputLabel, TextField } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './AccountSetup.module.scss';
import axios from 'axios';
import {
	openLoader,
	closeLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch } from 'react-redux';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { serialize } from 'object-to-formdata';
import { closeModal } from '../../redux/actions/modal/modalActions';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails';
import SelectWrapperAllCountry from '../../components/formUI/SelectAllCountry';
import { categoryList } from '../../helpers/CategoryList';

const AddBusinessSetup = () => {
	const dispatch = useDispatch();

	const validate = Yup.object({
		tradingname: Yup.string().required('Required'),
		registeredaddress: Yup.string().required('Required'),
		businesstype: Yup.string().required('Required'),
		supportemail: Yup.string().email('Email is invalid'),
		chargebackemail: Yup.string().email('Email is invalid'),
		nin: Yup.string()
			.required()
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(11, 'NIN is exactly 11 digits')
			.max(11, 'NIN is exactly 11 digits')
			.required('Required'),
		intpassport: Yup.string().required('Required'),
	});

	return (
		<Formik
			initialValues={{
				tradingname: '',
				registeredaddress: '',
				businesstype: '',
				businessindustrycategory: '',
				websiteurl: '',
				supportemail: '',
				chargebackemail: '',
				intpassport: '',
				nin: '',
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
				<div className={styles.modalBusinessContainer}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12}>
							<InputLabel>
								<span>Business profile set up</span>
							</InputLabel>
							<hr />
						</Grid>

						<Grid item xs={12} md={6}>
							<InputLabel>
								<span>Trading name</span>
							</InputLabel>
							<Form>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='tradingname'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='tradingname'
									placeholder='Food Bank'
									variant='outlined'
									margin='normal'
									type='text/number'
									size='small'
									fullWidth
								/>
								<InputLabel>
									<span>Business address</span>
								</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='registeredaddress'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='registeredaddress'
									placeholder='your address'
									variant='outlined'
									margin='normal'
									type='text'
									size='small'
									fullWidth
								/>

								<InputLabel>
									<span>Business description</span>
								</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='businesstype'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='businesstype'
									placeholder='Description'
									variant='outlined'
									margin='normal'
									type='text/number'
									size='small'
									fullWidth
								/>

								<InputLabel>
									<span>What's your business category?</span>
								</InputLabel>

								{/* <Field
									as={Select}
									helperText={
										<ErrorMessage name='busCategory'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='busCategory'
									size='small'
									options={businessCategory}
									defaultValue={businessCategory[0]}
									fullWidth
									style={{
										marginTop: '1rem',
									}}
								/> */}

								<Field
									as={SelectWrapperAllCountry}
									helperText={
										<ErrorMessage name='businessindustrycategory'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='businessindustrycategory'
									size='small'
									options={categoryList}
									style={{
										marginTop: '1rem',
									}}
								/>
								<InputLabel>
									<span>Website URL</span>
								</InputLabel>

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
									type='text/number'
									size='small'
									fullWidth
								/>
							</Form>
						</Grid>
						<Grid item xs={12} md={6}>
							<Form>
								<InputLabel>
									<span>Support email</span>
								</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='supportemail'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='supportemail'
									placeholder='supportemail@email.com'
									variant='outlined'
									margin='normal'
									type='text/number'
									size='small'
									fullWidth
								/>
								<InputLabel>
									<span>Charge Email</span>
								</InputLabel>
								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='chargebackemail'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='chargebackemail'
									placeholder='chargebackemail@email.com'
									variant='outlined'
									margin='normal'
									type='text'
									size='small'
									fullWidth
								/>

								<InputLabel>
									<span>NIN</span>
								</InputLabel>

								<Field
									as={TextField}
									helperText={
										<ErrorMessage name='nin'>
											{(msg) => <span style={{ color: 'red' }}>{msg}</span>}
										</ErrorMessage>
									}
									name='nin'
									placeholder='12345678912'
									variant='outlined'
									margin='normal'
									type='text/number'
									size='small'
									fullWidth
								/>

								<InputLabel>
									<span>Upload an ID</span>
								</InputLabel>
								<div>
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
										name='intpassport'
										id='intpassport'
										accept='image/png,image/jpg,image/jpeg,application/pdf'
										onChange={(event: any) => {
											props.setFieldValue(
												'intpassport',
												event?.target?.files[0]
											);
										}}
									/>
								</div>

								<InputLabel></InputLabel>
								<button
									style={{
										backgroundColor: '#27AE60',
										padding: '0.7rem',
										marginTop: '1rem',
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
						</Grid>
					</Grid>
				</div>
			)}
		</Formik>
	);
};

export default AddBusinessSetup;

function setFieldValue(arg0: string, arg1: File) {
	throw new Error('Function not implemented.');
}
