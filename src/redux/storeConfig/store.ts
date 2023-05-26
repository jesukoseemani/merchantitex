import { createStore, applyMiddleware, compose } from "redux";
import createDebounce from "redux-debounced";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers/rootReducer";
import storageSession from 'redux-persist/lib/storage/session';

const middlewares = [thunk, createDebounce()];
const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: [
		'authReducer',
		'meReducer',
		'loadingStateReducer',
		'userDetailReducer',
		'onboardStateReducer',
		'countryReducer',
		'navbarReducer',
		'setupReducer',
		'menuReducer',
		"bankAcctReducer"
	],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//Added this line so that App can run in browsers without Redux Dev tools in development mode
// const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const composeEnhancers =
	(typeof window !== "undefined" &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	persistedReducer,
	{},
	composeEnhancers(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
