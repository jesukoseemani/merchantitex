import React from 'react';
import Mark from '../assets/images/MarkDefault.svg';
import AccountSetUp from '../components/accountSetUp/AccountSetUp';

const BusinessUpdateSettings = () => {
	const data = [
		{
			icon: Mark,
			title: 'Business Information',
			button: 'Continue',
			id: 'BBI',
			completed: false,
		},
		{
			icon: Mark,
			title: 'Business Documents',
			button: 'Continue',
			id: 'BBD',
			completed: false,
		},
		{
			icon: Mark,
			title: 'Add Bank Account',
			button: 'Continue',
			id: 'BAB',
			completed: false,
		},
	];
	return <AccountSetUp data={data} />;
};

export default BusinessUpdateSettings;
