import { ME, REMOVEME } from '../constants';
import { ReactNode } from 'react';

export const saveMe = (meDetails: any) => {
	return {
		type: ME,
		meDetails,
	};
};

export const removeMe = () => ({ type: REMOVEME });
