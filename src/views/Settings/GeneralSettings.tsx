import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Styles from './Settings.module.scss';
import { Button, Form } from 'semantic-ui-react';
import axios, { AxiosResponse } from 'axios';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useDispatch } from 'react-redux';
import { serialize } from 'object-to-formdata';
import {FetchProfileDetails} from '../../helpers/FetchProfileDetails'

const GeneralSettings = () => {
	interface formTypes {
		email: string;
		firstname: string;
		lastname: string;
		phonenumber: string;
		country: string;
	}
	interface userCheck {
		message: string;
	}
	const formInit = {
		email: '',
		firstname: '',
		lastname: '',
		phonenumber: '',
		country: '',
	};
	const businessInit = {
		tradingname: '',
		email: '',
		phonenumber: '',
		chargebackemail: '',
		supportemail: '',
		country: '',
		registeredaddress: '',
		supportphonenumber: '',
		businesslogo: '',
	};

	const [loader, setLoader] = useState(false);
	const [form, setForm] = useState<formTypes>(formInit);
	const [business, setBusiness] = useState(businessInit);

	const dispatch = useDispatch();
	// user profile update
	const updateUserDetails = async () => {
		setLoader(true);
		const payload = {
			user: [
				{
					email: form?.email,
					firstname: form?.firstname,
					lastname: form?.lastname,
					phonenumber: form?.phonenumber,
				},
			],
		};
		try {
			const res: { data: { message: string } } = await axios.post(
				`/merchant/account/update`,
				payload
			);
			setLoader(false);
			if (res?.data) {
				dispatch(
					openToastAndSetContent({
						toastContent: res?.data?.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
			}
		} catch (error: any) {
			setLoader(false);
			if (error.response) {
				const { message } = error.response.data;
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			} else if (error.request) {
				console.log('sorry, there was an error');
			} else {
				dispatch(
					openToastAndSetContent({
						toastContent: error.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
		}
	};
	// business details update
	const updateBusiness = async () => {
		console.log(business.businesslogo);
		setLoader(true);
		const payload = {
				...business,
		};
		const formData = serialize(payload);
		try {
			const res: { data: { message: string } } = await axios.post(
				`/merchant/account/updateform`,
				formData
			);
			setLoader(false);
			if (res?.data) {
				dispatch(
					openToastAndSetContent({
						toastContent: res?.data?.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
			}
		} catch (error: any) {
			setLoader(false);
			if (error.response) {
				const { message } = error.response.data;
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			} else if (error.request) {
				console.log('sorry, there was an error');
			} else {
				dispatch(
					openToastAndSetContent({
						toastContent: error.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
		}
	};

	const getUserDetails = async () => {
		try {
			const res: { data: any } = await axios.get(`/merchant/account/me`);
			setForm(res?.data?.business?.user?.[0]);
			setBusiness({
				tradingname: res?.data?.business?.tradingname,
				email: res?.data?.business?.email,
				phonenumber: res?.data?.business?.phonenumber,
				chargebackemail: res?.data?.business?.meta[3].value,
				supportemail: res?.data?.business?.meta[2].value,
				country: '',
				registeredaddress: res?.data?.business?.address[0] || '',
				supportphonenumber: res?.data?.business?.phonenumber,
				businesslogo: '',
			});
		} catch (error: any) {
			if (error.response) {
				const { message } = error.response.data;
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			} else if (error.request) {
				console.log('sorry, there was an error');
			} else {
				dispatch(
					openToastAndSetContent({
						toastContent: error.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	const countryList = [
		{
			key: 1,
			value: 'ng',
			text: 'Nigeria',
			flag: 'ng',
		},
		{
			key: 2,
			value: 'gh',
			text: 'Ghana',
			flag: 'gh',
		},
		{
			key: 3,
			value: 'us',
			text: 'United State of America',
			flag: 'us',
		},
	];
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setForm((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleBizChange = (e: any) => {
		const { name, value } = e.target;
		setBusiness((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleFileChange = (e: any) => {
		const { files } = e.target;
		setBusiness((prevState) => ({ ...prevState, businesslogo: files[0] }));
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='GeneralSettings' />
			<div className={Styles.container}>
				<div className={Styles.formHeader}>
					<div>
						<h2>Profile</h2>
						<p>Personal information</p>
					</div>
					<Button
						loading={loader}
						className='success'
						onClick={updateUserDetails}>
						Save changes
					</Button>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='firstname'
						onChange={handleChange}
						value={form.firstname}
						label='First name'
						placeholder='John'
					/>
					<Form.Input
						fluid
						name='lastname'
						value={form.lastname}
						onChange={handleChange}
						label='Last name'
						placeholder='Doe'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='email'
						value={form.email}
						onChange={handleChange}
						label='Email address'
						placeholder='email@email.com'
					/>
					<Form.Input
						fluid
						name='phonenumber'
						value={form.phonenumber}
						onChange={handleChange}
						label='Phone number'
						placeholder='+234 000 000 0000'
					/>
				</div>
				<div className={Styles.formHeader}>
					<div>
						<h2>Password</h2>
						<p>Personal information</p>
					</div>
					<Button className='success'>Save changes</Button>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='slot1'
						label='Current password'
						onChange={handleChange}
						placeholder='***********'
						type='password'
					/>
					<Form.Input
						fluid
						name='slot1'
						label='New password'
						onChange={handleChange}
						placeholder='***********'
						type='password'
					/>
				</div>
				<div className={Styles.formHeader}>
					<div>
						<h2>Business information</h2>
						<p>Personal information</p>
					</div>
					<Button loading={loader} className='success' onClick={updateBusiness}>
						Save changes
					</Button>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='tradingname'
						label='Business name'
						onChange={handleBizChange}
						value={business?.tradingname}
						placeholder='Your company ltd.'
					/>
					<Form.Input
						fluid
						name='email'
						value={business?.email}
						label='Business email'
						onChange={handleBizChange}
						placeholder='supportemail@email.com'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='phonenumber'
						value={business.phonenumber}
						onChange={handleBizChange}
						label='Business phone number'
						placeholder='+234 000 000 0000'
					/>
					<Form.Input
						fluid
						name='street'
						value={business?.registeredaddress}
						onChange={handleBizChange}
						label='Address'
						placeholder='41 James street, lekki'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='supportemail'
						value={business?.supportemail}
						onChange={handleBizChange}
						label='Support email'
						placeholder='support@yourcompany.com'
					/>
					<Form.Input
						fluid
						name='supportphonenumber'
						value={business?.supportphonenumber}
						onChange={handleBizChange}
						label='Support Phone'
						placeholder='+234 000 000 0000'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Select
						fluid
						search
						name='country'
						value={business?.country}
						onChange={handleBizChange}
						label='Country'
						options={countryList}
						placeholder='Select country'
					/>
					<Form.Input
						fluid
						name='chargebackemail'
						value={business?.chargebackemail}
						onChange={handleBizChange}
						label='Chargeback email'
						placeholder='chargebackemail@email.com'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='businesslogo'
						onChange={handleFileChange}
						label='Business Logo'
						type='file'
					/>
				</div>
			</div>
		</div>
	);
};

export default GeneralSettings;
