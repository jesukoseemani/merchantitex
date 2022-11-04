import React, { useState, useEffect } from 'react';
import SearchBar from '../search/searchBar';
import Styles from './Navbar.module.scss';
import { IconButton } from '@mui/material';
import UserMenu from '../menu/userMenu';
import { useSelector } from 'react-redux';

const NavBar = ({ name }: { name?: string }) => {
	const business = useSelector((state) => state?.meReducer?.me?.business);

	return (
		<div className={Styles.container}>
			<div className={Styles.flex}>
				{business?.status === 'IN-REVIEW' && (
					<button className={Styles.headerButton}>Test Mode</button>
				)}

				<div className={Styles.searchContainer}>
					<SearchBar />
				</div>
			</div>

			<UserMenu />
		</div>
	);
};

export default NavBar;
