const initialProductsState = {
	data: [],
};

export const onboardReducer = (state = initialProductsState, action: any) => {
	switch (action.type) {
		case 'FETCH_ONBOARD_PROCESS': {
			return {
				...state,
				data: action.onboardDetails,
			};
		}
		default: {
			return state;
		}
	}
};

export default onboardReducer;
