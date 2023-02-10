import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import styles from './ComponentListItem.module.scss';

interface drawerlisttypes {
	route: string;
	id: string | number;
	title: string;
	icon: React.ReactElement;
	open: Boolean;
}

const ComponentListItem = ({
	route,
	title,
	id,
	icon,
	open,
}: drawerlisttypes) => {
	const MuiListItem = withStyles({
		root: {
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			padding: open ? '1px 0 1px 24px' : '1px 0 1px 14px',
			fontFamily: 'Avenir',
		},
	})(ListItem);

	const [activeNav, setActiveNav] = React.useState(false);

	return (
		<MuiListItem style={{ height: '40px' }} key={id}>
			<NavLink
				to={route}
				key={id}
				exact={true}
				className={styles.drawerList}
				style={{
					background: activeNav && title === 'My Account' ? '#D7E0EB' : '',
					width: activeNav && title === 'My Account' ? '100%' : '',
					fontFamily: 'Avenir',
				}}
				activeStyle={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					background: '#e0e0e0',
					borderLeftColor: '#27ae60',
					// border: 4px,
					// paddingLeft: "rem",
					width: '100%',
				}}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText>
					{' '}
					<div
						style={{ display: open ? 'flex' : 'none', fontFamily: 'Avenir' }}
						className={styles.title}>
						{title}
					</div>
				</ListItemText>
			</NavLink>
		</MuiListItem>
	);
};

export default ComponentListItem;
