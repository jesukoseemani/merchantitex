import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Styles from './Settings.module.scss';
import { Button, Form, Checkbox, Input } from 'semantic-ui-react';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import { FormHelperText } from '@material-ui/core';
import { Box, InputLabel, TextField } from '@mui/material';

const WebHooks = () => {
	// const countryList = [
	// 	{
	// 		key: 1,
	// 		value: 'nigeria',
	// 		text: 'Nigeria',
	// 		flag: 'ng',
	// 	},
	// 	{
	// 		key: 2,
	// 		value: 'ghana',
	// 		text: 'Ghana',
	// 		flag: 'gh',
	// 	},
	// 	{
	// 		key: 3,
	// 		value: 'us',
	// 		text: 'United State of America',
	// 		flag: 'us',
	// 	},
	// ];
	const [url, setUrl] = useState('');
	const [SecreteHash, setSecreteHash] = useState('');

	useEffect(() => {
		axios
			.get(`/merchant/account/webhook`)
			.then((res: any) => {
				setUrl(res.data.url);
				setSecreteHash(res?.data?.setSecreteHash)
				console.log(res?.data)
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
				dispatch(
					openToastAndSetContent({
						// toastContent: "Login Failed",
						toastContent: err?.response?.data?.message,

						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	}, []);

	const dispatch = useDispatch();
	const webhookHandler = () => {
		dispatch(openLoader());
		axios
			.post(`/merchant/account/webhook`, { url })
			.then((res: any) => {
				console.log('heris:', res);
				dispatch(closeLoader());
				dispatch(
					openToastAndSetContent({
						// toastContent: "Login Failed",
						toastContent: res?.data?.message,

						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
			})
			.catch((err) => {
				console.log(err);
				dispatch(closeLoader());
				dispatch(
					openToastAndSetContent({
						// toastContent: "Login Failed",
						toastContent: err?.response?.data?.message,

						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};
	return (

		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			{/* <NavBar /> */}
			<div className={Styles.container}>
				<div className={Styles.formHeader}>
					<div>
						<h2>Webhooks</h2>
					</div>
				</div>
				<div className={Styles.formField}>
					<InputLabel>URL</InputLabel>
					<br />
					<Input
						type='url'
						className={Styles.quarterField}
						// label='Url'
						placeholder='https://mysite.com/'
						value={url}
						onChange={(e) => setUrl(e.target.value)}

					/>
					{/* <TextField placeholder=''/> */}

				</div>

				<div className={Styles.formField}>
					<InputLabel>Secrete Hash</InputLabel>
					<br />

					<Input
						type='Secrete Hash'
						className={Styles.quarterField}
						// label='Secrete Hash'
						placeholder='Secrete hash'
						// value={SecreteHash}
						onChange={(e) => setUrl(e.target.value)}
					/>


					<br />

					<FormHelperText id="component-helper-text" style={{ width: "350px", maxWidth: "90%" }}>


						Secret harsh is used to verify your webhook requests. Verify webhook requests with the secretharsh returned as verify hash from ITEX Pay
					</FormHelperText>
				</div>

				<div className={Styles.checkboxField}>
					<Checkbox label='Receive webhook response in JSON format' />
					<Checkbox label='Enable Webhook retries' />
					<Checkbox label='Enable failed transactions webhook' />


					<Box sx={{
						width: "300px",
						marginLeft: "20px",
						'& > *': {
							width: "100%",
							maxWidth: "100%"
						}
					}}>
						<Input placeholder="Enter a custom hook URL" />
					</Box>
				</div>
				<Button onClick={webhookHandler} style={{ borderRadius: "20px", height: "39px" }} className='success'>
					Save webhook settings
				</Button>
			</div>
		</div>
	);
};

export default WebHooks;
