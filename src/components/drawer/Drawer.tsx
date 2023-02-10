import React, { useEffect, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from './Drawer.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import CollapseIcon from '../../assets/images/collapse.svg';
import { useLocation } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ErrorIcon from '@mui/icons-material/Error';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import StoreIcon from '@mui/icons-material/Store';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ApiIcon from '@mui/icons-material/Api';
import WebhookIcon from '@mui/icons-material/Webhook';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import ComponentListItem from '../drawerListItem/ComponentListItem';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { ReactComponent as SettlementIcon } from '../../assets/images/settlement.svg';

const merchantOverview = [
	{
		id: uuidv4(),
		title: 'Merchant Overview',
		route: '/',
		icon: <HomeIcon />,
	},
];

const transactions = [
	{
		id: uuidv4(),
		title: 'Transactions',
		route: '/transactions',
		icon: <ArticleIcon />,
	},
	{
		id: uuidv4(),
		title: 'Refund',
		route: '/transactions/refund',
		icon: <CancelPresentationIcon />,
	},
];

const balance = [
	{
		id: uuidv4(),
		title: 'Balance',
		route: '/balance',
		icon: <FolderSpecialIcon />,
	},
	{
		id: uuidv4(),
		title: 'Balance History',
		route: '/balance/balance_history',
		icon: <HistoryIcon />,
	},
	{
		id: uuidv4(),
		title: 'Settlements',
		route: '/balance/settlements',
		icon: <SettlementIcon style={{ height: '20px', width: '20px' }} />,
	},
	{
		id: uuidv4(),
		title: 'Rolling Reserve',
		route: '/balance/rolling_reserve',
		icon: <AccountBalanceIcon />,
	},
];

const customers = [
	{
		id: uuidv4(),
		title: 'Customers',
		route: '/customers',
		icon: <PeopleIcon />,
	},
];

const payout = [
	{
		id: uuidv4(),
		title: 'Transfers',
		route: '/payout/transfers',
		icon: <ArrowUpwardIcon />,
	},
	{
		id: uuidv4(),
		title: 'Pending approval',
		route: '/payout/pending_approval',
		icon: <HistoryIcon />,
	},
	{
		id: uuidv4(),
		title: 'Beneficiaries',
		route: '/payout/beneficiaries',
		icon: <EventAvailableIcon />,
	},
	{
		id: uuidv4(),
		title: 'Funding History',
		route: '/payout/funding_history',
		icon: <HistoryIcon />,
	},
	// {
	// 	id: uuidv4(),
	// 	title: 'Transfer Balance',
	// 	route: '/payout/transfer_balance',
	// 	icon: <FolderSpecialIcon />,
	// },
];

const chargeBacks = [
	{
		id: uuidv4(),
		title: 'All chargebacks',
		route: '/chargebacks',
		icon: <FolderSpecialIcon />,
	},
	{
		id: uuidv4(),
		title: 'Pending',
		route: '/chargeback/pending',
		icon: <PendingIcon />,
	},
	{
		id: uuidv4(),
		title: 'Awaiting Response',
		route: '/chargeback/awaiting_response',
		icon: <ArrowUpwardIcon />,
	},
	{
		id: uuidv4(),
		title: 'Won',
		route: '/chargeback/won',
		icon: <EmojiEventsIcon />,
	},
	{
		id: uuidv4(),
		title: 'Lost',
		route: '/chargeback/lost',
		icon: <ErrorIcon />,
	},
	{
		id: uuidv4(),
		title: 'Assessments',
		route: '/chargeback/assessments',
		icon: <AssessmentIcon />,
	},
];

const subAccounts = [
	{
		id: uuidv4(),
		title: 'Subaccounts',
		route: '/subaccounts',
		icon: <PersonIcon />,
	},
];

const paymentLinks = [
	{
		id: uuidv4(),
		title: 'Payment Links',
		route: '/payment_links',
		icon: <LinkIcon />,
	},
];

// const itexStore = [
//   {
//     id: uuidv4(),
//     title: "Store",
//     route: "/store",
//     icon: <StoreIcon />,
//   },
// ];

const point_of_sale = [
	{
		id: uuidv4(),
		title: 'Point of Sale',
		route: '/point_of_sale',
		icon: <MapsHomeWorkIcon />,
	},
	// {
	// 	id: uuidv4(),
	// 	title: 'New Terminal Requests',
	// 	route: '/point_of_sale/terminal_requests',
	// 	icon: <WarehouseIcon />,
	// },
];

const bills = [
	{
		id: uuidv4(),
		title: 'Airtime and Bills',
		route: '/bills',
		icon: <AccountBalanceWalletIcon />,
	},
];

const settings = [
	{
		id: uuidv4(),
		title: 'General Settings',
		route: '/general_setting',
		icon: <SettingsIcon />,
	},

	{
		id: uuidv4(),
		title: 'Bank Accounts',
		route: '/general_setting/bank_accounts',
		icon: <BackupTableIcon />,
	},

	{
		id: uuidv4(),
		title: 'Users',
		route: '/general_setting/users',
		icon: <AdminPanelSettingsIcon />,
	},

	{
		id: uuidv4(),
		title: 'API',
		route: '/general_setting/api',
		icon: <ApiIcon />,
	},

	{
		id: uuidv4(),
		title: 'WebHooks',
		route: '/general_setting/web_hooks',
		icon: <WebhookIcon />,
	},

	{
		id: uuidv4(),
		title: 'Account Settings',
		route: '/general_setting/account_settings',
		icon: <PermContactCalendarIcon />,
	},
];

const drawerWidth = 269;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
	background: '#EBEBEB',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	background: '#EBEBEB',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [activeNav, setActiveNav] = React.useState(false);

	const { pathname } = useLocation();

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(!open);
	};

	const MuiListItem = withStyles({
		root: {
			display: 'flex',
			fontFamily: 'Avenir',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			padding: open ? '1px 0 1px 24px' : '1px 0 1px 10px',
		},
	})(ListItem);

	// const ComponentListItem = withStyles({
	//   root: {
	//     padding: open ? "1px 0 1px 24px" : "1px 0 1px 10px",
	//   },
	// });

	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [width]);

	useEffect(() => {
		if (width <= 850) {
			setOpen(false);
		} else if (width > 850) {
			setOpen(true);
		}
	}, [width]);

	if (
		pathname.toLowerCase() === '/signup' ||
		pathname.toLowerCase() === '/signin' ||
		pathname.toLowerCase() === '/individual_signup' ||
		pathname.toLowerCase() === '/email_verification' ||
		pathname.toLowerCase() === '/forgotpassword' ||
		pathname.toLowerCase() === '/newpassword'
	) {
		return <div></div>;
	}
	if (
		pathname.toLowerCase() === '/business/signup' ||
		pathname.toLowerCase() === '/ngo/signup'
	) {
		return <div></div>;
	}

	const styledH2 = {
		display: !open ? 'none' : 'block',
		fontFamily: 'Avenir',
	};

	const styledText = {
		display: !open ? 'none' : 'block',
		fontFamily: 'Avenir',
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}></AppBar>
			<Drawer variant='permanent' open={open}>
				<div className={styles.wrapperList}>
					<List>
						<div className={styles.logo}>
							<img src={Logo} alt='' className={styles.logoimg} />
						</div>

						{merchantOverview.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							TRANSACTIONS
						</h2>
						{transactions.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							BALANCE
						</h2>
						{balance.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							CUSTOMERS
						</h2>
						{customers.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							PAYOUT
						</h2>
						{payout.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							CHARGEBACKS
						</h2>
						{chargeBacks.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							SUBACCOUNTS
						</h2>
						{subAccounts.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							PAYMENT LINKS
						</h2>
						{paymentLinks.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						{/* <h2 style={styledH2} className={styles.sectionTitle}>
              STORE
            </h2>
            {itexStore.map(({ route, title, id, icon }) => (
              <ComponentListItem
                route={route}
                title={title}
                id={id}
                icon={icon}
                open={open}
              />
            ))} */}

						<h2 style={styledH2} className={styles.sectionTitle}>
							POINT OF SALE
						</h2>
						{point_of_sale.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							AIRTIME AND BILLS
						</h2>
						{bills.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}

						<h2 style={styledH2} className={styles.sectionTitle}>
							SETTINGS
						</h2>
						{settings.map(({ route, title, id, icon }) => (
							<ComponentListItem
								route={route}
								title={title}
								id={id}
								icon={icon}
								open={open}
							/>
						))}
					</List>
				</div>

				{/* <DrawerHeader>
          <IconButton></IconButton>
        </DrawerHeader> */}

				<List>
					{theme.direction === 'rtl' ? null : (
						<MuiListItem onClick={handleDrawerClose}>
							<div className={styles.drawerList}>
								<ListItemIcon>
									<img src={CollapseIcon} alt='icons' className={styles.icon} />
								</ListItemIcon>
								<ListItemText>
									{/* <img src={icon} alt="icons" /> */}
									<div style={styledText} className={styles.title}>
										Collapse SideBar
									</div>
								</ListItemText>
							</div>
						</MuiListItem>
					)}
				</List>
			</Drawer>
		</Box>
	);
}
