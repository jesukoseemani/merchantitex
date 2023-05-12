import React from 'react';
import successsmall from '../../assets/successsmall.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './ComingSoon.module.scss'
import { changeNewNavbar } from '../../redux/actions/navbarNew/navbarNewActions';
import BellIcon from "../../assets/images/coming-soon.svg";

function ComingSoon() {
	const history = useHistory();
	const dispatch = useDispatch()
	const goHome = () => {
		dispatch(changeNewNavbar("HOME"))
		history.push('/')
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<img
					className={styles.wrapperimg}
					src={BellIcon}
					alt=''
				/>
				<h3 className={styles.wrapperh3}>
					This feature is coming soon
				</h3>
				<p className={styles.wrapperP}>
					The delivery of this feature is on the way. As soon as it becomes available, we will let you know.
				</p>

			</div>

		</div>
	);
}

export default ComingSoon;
