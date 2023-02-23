const initialNavbarState = {
	navbarRoute: 'Home',
};

export const navbarReducer = (state = initialNavbarState, action: any) => {
	switch (action.type) {
		case 'CHANGE_NEW_NAVBAR': {
			return {
				...state,
				navbarRoute: action.navbarRoute,
			};
		}
		default: {
			return state;
		}
	}
};

export default navbarReducer;
