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

	useEffect(() => {
		axios
			.get(`/merchant/account/webhook`)
			.then((res: any) => {
				setUrl(res.data.url);
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
					{/* <Form.Input
						className={Styles.quarterField}
						name='slot1'
						label='http://'
						placeholder='Enter URL'
					/> */}

					<Input
						type='url'
						className={Styles.quarterField}
						label='Url'
						placeholder='https://mysite.com/'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</div>
				{/* <div className={Styles.formField}>
          <Form.Input
            fluid
            className={Styles.quarterField}
            name="slot1"
            label="Secret hash"
            placeholder="Secret hash"
          />
        </div> */}
				{/* <div className={Styles.note}>
          <p>
            Secret harsh is used to verify your webhook requests. Verify webhook
            requests with the secretharsh returned as verify hash from ITEX Pay
          </p>
        </div> */}
				<div className={Styles.checkboxField}>
					<Checkbox label='Receive webhook response in JSON format' />
					<Checkbox label='Enable Webhook retries' />
					<Checkbox label='Enable failed transactions webhook' />
					{/* <div className={Styles.formField}>
						<Form.Input
							fluid
							className={Styles.quarterField}
							name='slot1'
							placeholder='Enter a custom hook URL'
						/>
					</div> */}
				</div>
				<Button onClick={webhookHandler} className='success'>
					Save webhook settings
				</Button>
			</div>
		</div>
	);
};

export default WebHooks;
