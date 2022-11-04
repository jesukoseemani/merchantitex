const initialAuthState = {
	loadingState: false,
};

export const loadingStateReducer = (state = initialAuthState, action:any) => {
	switch (action.type) {
		case 'LOADINGSTATE': {
			return {
				...state,

				loadingState: action.loadingState,
			};
		}

		default: {
			return state;
		}
	}
};

export default loadingStateReducer;
