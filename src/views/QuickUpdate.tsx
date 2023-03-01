import React, { useEffect, useState } from 'react';
import BusinessUpdateSettings from '../components/BusinessUpdateSettings';
import NavBar from '../components/navbar/NavBar';
import styles from './Settings.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import IndividualUpdateSettings from '../components/IndividualUpdateSettings';
import axios from 'axios';
import { saveMe } from '../redux/actions/me/meActions';
import { onboardMe } from '../redux/actions/onboarding/onboardingActions';
import AccountSetUp from '../components/accountSetUp/AccountSetUp';
import { useParams } from 'react-router';
import { dataBusiness, dataIndividual } from '../helpers/Quickdatahelper';

interface AccountSetUpTypes {
	data: {
		title: string;
		id: string;
		button: string;
		icon: string;
		completed: boolean;
	};
}
type idParams = {
	id: string;
};


const QuickUpdate = () => {
	// const [data, setData] = useState<
	// 	{
	// 		title: string;
	// 		id: string;
	// 		button: string;
	// 		icon: string;
	// 		completed: boolean;
	// 	}[]
	// >([]);
	const dispatch = useDispatch();
	const { id } = useParams<idParams>();

	const { data } = useSelector((state) => state?.onboardStateReducer);

	useEffect(() => {
		if (id === 'individual') {
			// setData(dataIndividual);
			dispatch(onboardMe(dataIndividual));
		} else {
			// setData(dataBusiness);
			dispatch(onboardMe(dataBusiness));
		}
	}, [id]);

	useEffect(() => {
		axios
			.get(`/merchant/account/me`)
			.then((res) => {
				dispatch(saveMe(res.data));
			})
			.catch((err) => console.log(err));
	}, [dispatch]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<AccountSetUp data={data} />
		</div>
	);
};

export default QuickUpdate;
