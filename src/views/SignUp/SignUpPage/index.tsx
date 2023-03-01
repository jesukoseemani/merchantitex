import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';

import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import Logo from '../../../assets/images/white_bg_logo.svg';

import { ReactSVG } from "react-svg";


import { useHistory } from 'react-router-dom';
const SignUp = () => {
	const accountTypes = [
		{
			id: 'individual',
			title: 'Individual',
			description: 'Enter your details to create an account.',
		},
		{
			id: 'business',
			title: 'Business',
			description:
				'Start accepting payment using our infrastructure from customers anywhere in the world.',
		},
		{
			id: 'ngo',
			title: 'NGO',
			description: 'Accept credit / debit cards, USSD, Bank transfer and more.',
		},
	];
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		'individual'
	);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};
	const history = useHistory();
	const handleSubmit = () => {
		selectedValue &&
			selectedValue === 'individual' &&
			history.push('/individual_signup');
		selectedValue &&
			selectedValue === 'business' &&
			history.push('/business/signup');
		selectedValue && selectedValue === 'ngo' && history.push('/ngo/signup');
	};
	const handleSignin = () => {
		history.push('/signin');
	};

	const theme = {
		overrides: {
			MuiRadio: {
				colorSecondary: {


					padding: 0,

					width: 20,
					height: 20,
					marginLeft: 32,
					marginRight: 25,
					'&$checked': {
						color: 'green',
					},
				},
			},
		},
	};

	// const theme = {
	// 	overrides: {
	// 		MuiRadio: {
	// 			root: {
	// 				color: 'green',
	// 			},
	// 			colorSecondary: {
	// 				'&$checked': {
	// 					color: 'green',
	// 				},
	// 			},
	// 		},
	// 	},
	// };

	const muiTheme = createTheme(theme);

	return (
		<div className={styles.signupContainer}>
			<div className={styles.logo}>
				<ReactSVG src={Logo} />
			</div>
			<div className={styles.signupDiv}>
				<div className={styles.signUpContent}>
					<FormControl>
						<h4 className={styles.signupHeader}>Select Account Type</h4>
						<RadioGroup
							aria-labelledby='demo-radio-buttons-group-label'
							name='controlled-radio-buttons-group'
							value={selectedValue}
							onChange={handleChange}>
							{accountTypes.map(({ id, title, description }, i) => (
								<div key={i} id='divRadioGroup' className={styles.divRadioGroup}>
									<ThemeProvider theme={muiTheme}>
										<FormControlLabel
											value={id}
											control={<Radio />}
											label={
												<ListItemText>
													<div className={styles.ml}>
														<h5 className={styles.title}>{title}</h5>
														<p className={styles.desc}>{description}</p>
													</div>
												</ListItemText>
											}
										/>
									</ThemeProvider>
								</div>
							))}
						</RadioGroup>
						<div className={styles.buttonDiv}>
							<button
								style={{
									backgroundColor: '#27AE60',
									// padding: '1rem',
									fontFamily: "Avenir Bold",
									width: '100%',
									color: '#fff',
									border: 'none',
									borderRadius: '20px',
									cursor: 'pointer',
									fontSize: "16px",
									height: "44px",
									fontWeight: "bold"
								}}
								type='submit'
								color='primary'
								onClick={handleSubmit}>
								Continue
							</button>
						</div>
					</FormControl>
				</div>
			</div>
			<div className={styles.sub}>
				<div className={styles.mt}>
					<p className={styles.signinAnchor} onClick={handleSignin}>
						<span className={styles.subP}>Already have an account? </span>
						Log in
					</p>
				</div>
			</div>
		</div>
	);
};
export default SignUp;
