import { FETCH_ONBOARD_PROCESS } from '../constants';
import { ReactNode } from 'react';

export const onboardMe = (onboardDetails: any) => {
	return {
		type: FETCH_ONBOARD_PROCESS,
		onboardDetails,
	};
};
