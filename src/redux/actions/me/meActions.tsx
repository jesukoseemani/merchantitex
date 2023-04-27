import { ME, REMOVEME } from '../constants';
import { ReactNode } from 'react';

export const saveMe = (meDetails: any) => {
	console.log({ meDetails })
	return {
		type: ME,
		meDetails,
	};
};

export const removeMe = () => ({ type: REMOVEME });


