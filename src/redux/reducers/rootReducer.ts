import { combineReducers } from 'redux';

import toast from './toast/index';
import modal from './modal/index';
import loader from './loader/index';
import products from './products/index';
import planReducer from './plans/index';
import drawerReducer from './selectedDrawer/index';
import menuReducer from './selectedMenu/index';
import authReducer from './auth/index';
import meReducer from './me/index';
import menuValueReducer from './menuValue';
import userDetailReducer from './userDetails/index';
import transactionDetailReducer from './transactionDetails/index';
import loadingStateReducer from './loadingState/index';
import onboardStateReducer from './onboarding/index';
import countryReducer from './country/index';
import navbarReducer from './navbar/index';

const rootReducer = combineReducers({
	// customizer,
	// auth,
	// navbar,
	transactionDetailReducer,
	userDetailReducer,
	loadingStateReducer,
	onboardStateReducer,
	countryReducer,
	planReducer,
	menuValueReducer,
	authReducer,
	meReducer,
	menuReducer,
	drawerReducer,
	toast,
	modal,
	loader,
	products,
	navbarReducer,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
