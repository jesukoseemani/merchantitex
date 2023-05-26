import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import React, { SyntheticEvent, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import styles from './Customers.module.scss';
import { makeStyles } from '@material-ui/styles';
import CustomersTab from './CustomersTab';
import ParentContainer from '../../components/ParentContainer/ParentContainer';

export const useTableStyles = makeStyles({
	root: {
		marginTop: '1rem',
		'& .MuiTableRow-head': {
			fontSize: '.875rem',
			padding: '1rem',
			backgroundColor: '#F4F6F8',
		},
		'& .MuiTableCell-head': {
			fontSize: '.875rem',
			color: '#333',
			fontWeight: '500',
			textTransform: 'capitalize',
		},
		'& .MuiTableCell-root': {
			borderBottom: 'none',
		},
		'& .MuiTableCell-body': {
			fontFamily: `'Avenir', san-serif`,
			fontWeight: '400',
			fontSize: '.875rem',
			color: '#333',
			borderBottom: '1px solid #E0E0E0',
			cursor: 'pointer',
		},
		'& .darkText': {
			color: '#333',
			fontSize: '.875rem',
			fontWeight: '700',
		},
		'& .redText': {
			color: '#EB5757',
			fontSize: '.875rem',
			fontWeight: '700',
		},
		'& .greenText': {
			color: '#219653',
			fontSize: '.875rem',
			fontWeight: '700',
		},
		'& .lightText': {
			color: '#828282',
			fontSize: '.875rem',
		},
	},
});

const Customers = () => {
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (


		<div className={styles.container}>


			<Box sx={{ width: '100%', marginInline: 'auto', typography: 'body1' }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label='lab API tabs example'>
							<Tab label='Customers' value='1' />
							<Tab label='Blacklist' value='2' />
						</TabList>
					</Box>
					<TabPanel value='1'>
						<CustomersTab />
					</TabPanel>

				</TabContext>
			</Box>
		</div>
	);
};

export default Customers;
