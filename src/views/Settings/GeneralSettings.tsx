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
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'object-to-formdata';
import { FetchProfileDetails } from '../../helpers/FetchProfileDetails'
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { InputLabel } from '@mui/material';
import { openModalAndSetContent, closeModal } from '../../redux/actions/modal/modalActions';
// import QrCode from '../Profile/QrCode';
import QRCode from 'react-qr-code';
import { saveMe } from '../../redux/actions/me/meActions'
import Navigation from '../../components/navbar/Navigation';

interface QrProps {
	code: string;
	message: string;
	qrcodeUrl: string

}


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
	// const [business, setBusiness] = useState(businessInit);
	const { me } = useSelector(state => state?.meReducer)

	const { user, business } = me
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

	// const getUserDetails = async () => {
	// 	try {
	// 		const res: { data: any } = await axios.get(`/v1/profile/me`);
	// 		setForm(res?.data?.business?.user?.[0]);
	// 		setBusiness({
	// 			tradingname: res?.data?.business?.tradingname,
	// 			email: res?.data?.business?.email,
	// 			phonenumber: res?.data?.business?.phonenumber,
	// 			chargebackemail: res?.data?.business?.meta[3].value,
	// 			supportemail: res?.data?.business?.meta[2].value,
	// 			country: '',
	// 			registeredaddress: res?.data?.business?.address[0] || '',
	// 			supportphonenumber: res?.data?.business?.phonenumber,
	// 			businesslogo: '',
	// 		});
	// 	} catch (error: any) {
	// 		if (error.response) {
	// 			const { message } = error.response.data;
	// 			dispatch(
	// 				openToastAndSetContent({
	// 					toastContent: message,
	// 					toastStyles: {
	// 						backgroundColor: 'red',
	// 					},
	// 				})
	// 			);
	// 		} else if (error.request) {
	// 			console.log('sorry, there was an error');
	// 		} else {
	// 			dispatch(
	// 				openToastAndSetContent({
	// 					toastContent: error.message,
	// 					toastStyles: {
	// 						backgroundColor: 'red',
	// 					},
	// 				})
	// 			);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	getUserDetails();
	// }, []);

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
	// const handleBizChange = (e: any) => {
	// 	const { name, value } = e.target;
	// 	setBusiness((prevState) => ({ ...prevState, [name]: value }));
	// };
	// const handleFileChange = (e: any) => {
	// 	const { files } = e.target;
	// 	setBusiness((prevState) => ({ ...prevState, businesslogo: files[0] }));
	// };




	// show 2fa box

	const showQr = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get<QrProps>(`/v1/profile/2fa/qrcode`);


			if (data?.qrcodeUrl) {
				dispatch(
					openModalAndSetContent({
						modalStyles: {
							padding: "10px",
							width: "350px !important",
							borderRadius: "20px"

						},
						modalContent: (
							<div className={Styles.modalDiv}>
								{/* <BoxComponent data={data?.qrcodeUrl} /> */}

								<div className={Styles.outerbox}>
									<div
										style={{
											width: '100%',
											// height: '400px',
											border: '1px solid black',
										}}>
										{data ? (
											<QRCode
												style={{ height: 'auto', width: '100%' }}
												value={data?.qrcodeUrl}
											/>
										) : (
											'Something went wrong'
										)}
									</div>
									<button
										onClick={enabledHandler}
										style={{
											fontFamily: "Avenir",
											textTransform: "inherit",
											fontSize: "20px",
											textAlign: 'center',
											border: 'none',
											height: "44px",
											outline: 'none',
											width: '100%',
											color: '#FFFFFF',
											padding: '13.39px 0',
											borderRadius: '20px',
											marginTop: '30px',
											cursor: 'pointer',
										}}>
										Enable
									</button>
								</div>
							</div>
						),
					})
				);
			}

			// setQr(data.qrcodeUrl);
			// console.log(data.qrcodeUrl, "PropsPropsPropsProps")
			// editConfigHandler();
			dispatch(closeLoader());
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}

	}


	useEffect(() => {
		fetchUserDetails()


	}, [])


	const fetchUserDetails = async () => {
		await axios
			.get(`/v1/profile/me`)
			.then((res) => {
				console.log(res, "res")
				dispatch(saveMe(res.data));
			})
			.catch((err) => console.log(err));
	};






	const enabledHandler = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.get<any>(`/v1/profile/2fa/enable`);
			dispatch(closeLoader());
			dispatch(
				openToastAndSetContent({
					toastContent: data?.message,
					toastStyles: {
						backgroundColor: 'green',
					},
				})
			);
			fetchUserDetails();
			dispatch(closeModal());
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}
	};


	// handle password change

	interface passwordProp {
		code: string;
		message: string;
	}
	const [passInput, setPassInput] = useState({
		currentPassword: "",
		password: ""
	})

	const handleChangePass = (e: any) => {
		setPassInput({ ...passInput, [e.target.name]: e.target.value })
	}
	console.log(passInput)
	const handlePassWordChange = async () => {
		try {
			const { data } = await axios.post<passwordProp>("/v1/profile/password/change", passInput)
			console.log(data)
			if (data?.code === "success") {
				setPassInput({
					currentPassword: "",
					password: ""
				})
				dispatch(
					dispatch(
						openToastAndSetContent({
							toastContent: data?.message,
							toastStyles: {
								backgroundColor: 'green',
							},
						})
					)
				);
			}
		} catch (error: any) {
			dispatch(closeLoader());
			const { message } = error.response.data;
			dispatch(
				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				)
			);
		}
		setPassInput({
			currentPassword: "",
			password: ""
		})
	}


	return (


		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			{/* <NavBar  /> */}
			<div className={Styles.container}>
				<div className={Styles.formHeader}>
					<p></p>
					<Button className='success' style={{ borderRadius: "20px" }} onClick={showQr}>Generate 2FA</Button>
				</div>
				<div className={Styles.formHeader}>
					<div>
						<h2>Profile</h2>
						<p>Personal information</p>
					</div>
					<Button

						loading={loader}
						className='success'
						onClick={updateUserDetails}
						style={{ borderRadius: "20px" }}

					>
						Save changes
					</Button>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='firstname'
						onChange={handleChange}
						defaultValue={user?.firstname}
						label='First name'
						placeholder='John'
					/>
					<Form.Input
						fluid
						name='lastname'
						defaultValue={user?.lastname}
						onChange={handleChange}
						label='Last name'
						placeholder='Doe'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='email'
						value={user?.email}
						onChange={handleChange}
						label='Email address'
						placeholder='email@email.com'
					/>
					<Form.Input
						fluid
						name='phonenumber'
						defaultValue={user?.phonenumber}
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
					<Button onClick={handlePassWordChange} className='success' style={{ borderRadius: "20px" }}>Save changes</Button>
				</div>

				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='currentPassword'
						label='Current password'
						onChange={handleChangePass}
						placeholder='***********'
						type='password'
						value={passInput?.currentPassword}
					/>
					<Form.Input
						fluid
						name='password'
						label='New password'
						onChange={handleChangePass}
						placeholder='***********'
						type='password'
						value={passInput?.password}
					/>
				</div>
				<div className={Styles.formHeader}>
					<div>
						<h2>Business information</h2>
						<p>Personal information</p>
					</div>
					<Button style={{ borderRadius: "20px" }} loading={loader} className='success' onClick={updateBusiness}>
						Save changes
					</Button>
				</div>


				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='tradingname'
						label='Business name'
						// onChange={handleBizChange}
						defaultValue={business?.tradingname}
						placeholder='Your company ltd.'
					/>
					<Form.Input
						fluid
						name='email'
						defaultValue={business?.email}
						label='Business email'
						// onChange={handleBizChange}
						placeholder='supportemail@email.com'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='phonenumber'
						defaultValue={business?.phonenumber}
						// onChange={handleBizChange}
						label='Business phone number'
						placeholder='+234 000 000 0000'
					/>
					<Form.Input
						fluid
						name='street'
						value={business?.registeredaddress}
						// onChange={handleBizChange}
						label='Address'
						placeholder='41 James street, lekki'
					/>
				</div>
				<div className={Styles.formField}>
					<Form.Input
						fluid
						name='supportemail'
						value={business?.supportemail}
						// onChange={handleBizChange}
						label='Support email'
						placeholder='support@yourcompany.com'
					/>
					<Form.Input
						fluid
						name='supportphonenumber'
						value={business?.supportphonenumber}
						// onChange={handleBizChange}
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
						// onChange={handleBizChange}
						label='Country'
						options={countryList}
						placeholder='Select country'
					/>
					<Form.Input
						fluid
						name='chargebackemail'
						value={business?.chargebackemail}
						// onChange={handleBizChange}
						label='Chargeback email'
						placeholder='chargebackemail@email.com'
					/>
				</div>
				<div className={Styles.formField} style={{ width: "465px", maxWidth: "100%" }}>
					<InputLabel className={Styles.label}>Business Logo </InputLabel>
					<Button variant="outlined" fullWidth component="label"
						style={{
							background: "#F6F9FD",
							fontSize: "14px", color: "#4F4F4F",
							height: 44,
							border: "1px dashed #7A9CC4",
							borderRadius: 4,
							fontWeight: 300,
							fontFamily: "Avenir",
							textTransform: "inherit",
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center"
						}}>
						<CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
						<input hidden accept="image/*" multiple type="file" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GeneralSettings;
