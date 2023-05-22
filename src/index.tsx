import React from 'react';
import ReactDOM from 'react-dom';
import './fonts/Avenir Roman.otf';
import './fonts/black.otf';
import './fonts/book.otf';
import './fonts/heavy.ttf';
import './fonts/light.otf';
import './fonts/medium.otf';
import './fonts/roman.otf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/storeConfig/store';
import { PersistGate } from 'redux-persist/integration/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader';
import { ThemeProvider } from '@mui/material';
import theme from './components/theme/Theme';
ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<PersistGate loading={<Loader />} persistor={persistor}>

					<App />
				</PersistGate>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
