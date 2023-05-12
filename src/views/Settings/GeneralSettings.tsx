import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import styles from './generalsetting.module.scss';
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
import { Box, InputLabel, Tab, Tabs } from '@mui/material';
import { openModalAndSetContent, closeModal } from '../../redux/actions/modal/modalActions';
// import QrCode from '../Profile/QrCode';
import QRCode from 'react-qr-code';
import { saveMe } from '../../redux/actions/me/meActions'
import Navigation from '../../components/navbar/Navigation';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import BusinessInfo from './general/businessInfo/BusinessInfo';
import Profile from './general/profile/Profile';
import Security from './security/Security'
import { makeStyles } from '@material-ui/styles';


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
						msgType: "success"
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
						msgType: "error"
					})
				);
			} else if (error.request) {
				console.log('sorry, there was an error');
			} else {
				dispatch(
					openToastAndSetContent({
						toastContent: error.message,
						msgType: "error"
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
						msgType: "success"
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
						msgType: "error"
					})
				);
			} else if (error.request) {
				console.log('sorry, there was an error');
			} else {
				dispatch(
					openToastAndSetContent({
						toastContent: error.message,
						msgType: "error"
					})
				);
			}
		}
	};


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

	const [tabValue, setTabValue] = React.useState('1');

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue);
	};

	const useStyles = makeStyles({
		tab: {
			'& .MuiBox-root': {
				padding: '0px !important',
			},
		},
	});
	const classes = useStyles();
	return (




		<div className={styles.container}>
			<TabContext value={tabValue}>
				<Box>
					<TabList onChange={handleTabChange} aria-label="lab API tabs example">
						<Tab label="Business Information" value="1" />
						<Tab label="Profile" value="2" />
						<Tab label="Login & Security" value="3" />
					</TabList>
				</Box>
				<TabPanel value="1" sx={{ padding: 0 }}><BusinessInfo me={me} /></TabPanel>
				<TabPanel value="2" sx={{ padding: 0 }}><Profile me={me} /></TabPanel>
				<TabPanel value="3" sx={{ padding: 0 }}><Security fetchUserDetails={fetchUserDetails} me={me} /></TabPanel>
			</TabContext>
		</div>
	);
};

export default GeneralSettings;
