import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import Styles from './menu.module.scss';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/styles';
import Fade from '@mui/material/Fade';
import SettingsIcon from '../../assets/images/settings.svg';
import HelpIcon from '../../assets/images/help.svg';
import PrivacyIcon from '../../assets/images/privacy.svg';
import SignOutIcon from '../../assets/images/signout.svg';
import { useHistory } from 'react-router-dom';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';
import { removeMe } from '../../redux/actions/me/meActions';
// import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/actions/auth/authActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import Switch from '../switch/Switch';


export default function UserMenu() {
	const [user, setUser] = useState<any>({});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [checked, setChecked] = useState<boolean>(true);
	const open = Boolean(anchorEl);

	const dispatch = useDispatch();

	const getUserDetails = async () => {
		try {
			const res: { data: any } = await axios.get(`/merchant/account/me`);
			setUser(res?.data?.business?.user?.[0]);
			console.log(res?.data?.business?.user?.[0]);
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

	const history = useHistory();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const useStyles = makeStyles({
		root: {
			'&:hover': {
				background: 'none',
			},
		},
		list: {
			backgroundColor: '#ffffff',
			// width: '10rem',
			overflow: 'hidden',
			color: 'rgba(0, 40, 65, 0.8)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'center',
			padding: '1rem .5rem',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
		menuItemUser: {
			width: '100%',
			height: '0',
			padding: '30px 10px',
			margin: '0px',
			borderRadius: '8px !important',
			'&:hover': {
				background: '#eee !important',
			},
		},
		menuItem: {
			width: '100%',
			height: '0',
			padding: '18px 10px',
			margin: '0px',
			borderRadius: '8px !important',
			'&:hover': {
				background: '#eee !important',
			},
		},
		selectedItem: {
			background: 'rgba(255, 255, 255, 0.12)',
		},
	});
	const classes = useStyles();

	const handleCloseAccount = () => {
		history.push('/account');
		setAnchorEl(null);
	};

	const signOutHandler = () => {
		localStorage.clear();
		dispatch(logOut());
		history.push('/signIn');
		dispatch(saveLoading(false));
		dispatch(removeMe());
		setAnchorEl(null);
	};

	// const handleChecked = () => {
	// 	setChecked(!checked);
	// };

	const SwitchToggle = () => {
		return (
			<div className={Styles.switchtoggle}>
				{/* <Switch
					checked={checked}
					onChange={handleChecked}
					offColor='#d80a0a'
					height={24}
					width={48}
					uncheckedIcon={false}
					checkedIcon={false}
					onColor='#19943C'
				/> */}
				{/* <p className={Styles.switchtoggle_p}>{checked ? 'Live' : 'Test'}</p> */}

				<Switch />
			</div>
		);
	};
	return (
		<div className={Styles.menuContainer}>

			<Menu
				id='fade-menu'
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
				classes={{
					list: classes.list,
					paper: classes.paper,
					root: classes.root,
				}}>
				<MenuItem
					classes={{
						root: classes.menuItemUser,
						selected: classes.selectedItem,
					}}
					onClick={handleClose}>
					<div className={Styles.userdetails}>
						<div className={Styles.username}>
							{user?.firstname} {user?.lastname}
						</div>
						<div className={Styles.usermail}>{user?.email}</div>
					</div>
				</MenuItem>
				<MenuItem
					classes={{
						root: classes.menuItem,
						selected: classes.selectedItem,
					}}>
					<div className={Styles.account} onClick={handleCloseAccount}>
						<div>
							<img src={SettingsIcon} alt='' />
						</div>
						<div className={Styles.accountDetail} onClick={() => history.push("/general_setting/account_settings")}>My Account</div>
					</div>
				</MenuItem>
				<MenuItem
					classes={{
						root: classes.menuItem,
						selected: classes.selectedItem,
					}}
					onClick={handleClose}>
					<div className={Styles.account}>
						<div>
							<img src={HelpIcon} alt='help icon' />
						</div>
						<div className={Styles.accountDetail}>Help</div>
					</div>
				</MenuItem>
				<MenuItem
					classes={{
						root: classes.menuItem,
						selected: classes.selectedItem,
					}}
					onClick={handleClose}>
					<div className={Styles.account}>
						<div>
							<img src={PrivacyIcon} alt='privacy icon' />
						</div>
						<div className={Styles.accountDetail}>Privacy</div>
					</div>
				</MenuItem>

				<MenuItem
					classes={{
						root: classes.menuItem,
						selected: classes.selectedItem,
					}}>
					<div onClick={signOutHandler} className={Styles.account}>
						<div>
							<img src={SignOutIcon} alt='auth icon' />
						</div>
						<div className={Styles.signOut}>Sign Out</div>
					</div>
				</MenuItem>
			</Menu>
			<IconButton>
				<NotificationsNoneOutlinedIcon sx={{ fontSize: "30px" }} className={Styles.menuIcon} />
			</IconButton>
			<IconButton
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={Styles.iconGroup}>
				<AccountCircleOutlinedIcon sx={{ fontSize: "30px" }} className={Styles.menuIcon} />
				<ArrowDropDownOutlinedIcon className={Styles.menuIcon} />
			</IconButton>
		</div>
	);
}
