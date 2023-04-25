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
import { Box, InputLabel, Tab, TextField } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TestHooks from '../../components/webhooks/TestHooks';
import LiveHook from '../../components/webhooks/LiveHook';

const WebHooks = () => {



	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

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

	const [value, setValue] = React.useState('1');




	return (

		<Box mt={2}>


			<Box sx={{
				padding: 0,
				'.css-13xfq8m-MuiTabPanel-root': {
					padding: 0
				}

			}}>

				<TestHooks />
			</Box>



		</Box>
	);
};

export default WebHooks;
