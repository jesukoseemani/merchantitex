import React from 'react';
import successsmall from '../../assets/successsmall.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './ComingSoon.module.scss'
import { changeNewNavbar } from '../../redux/actions/navbarNew/navbarNewActions';

function ComingSoon() {
	const history = useHistory();
	const dispatch = useDispatch()
	const goHome = () => {
		dispatch(changeNewNavbar("HOME"))
		history.push('/')
	}
	return (
		<div className={styles.wrapper}>
			<h3 className={styles.wrapperh3}>
				Coming soon!
			</h3>
			<p className={styles.wrapperP}>
				This feature is being worked on. We will let you know when we are done.
			</p>
			<img
				className={styles.wrapperimg}
				src={successsmall}
				alt=''
			/>
			<button
				onClick={goHome}
				className={styles.goHome}>
				Go back home
			</button>
		</div>
	);
}

export default ComingSoon;
