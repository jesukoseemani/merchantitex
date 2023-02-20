import { useState, useEffect } from 'react';
import { Button, Modal, Select, Label, Form } from 'semantic-ui-react';
import NavBar from '../../components/navbar/NavBar';
import Styles from './Settings.module.scss';
import { ReactComponent as CopyIcon } from '../../assets/images/copy-2.svg';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextTruncate from 'react-text-truncate';
import ParentContainer from '../../components/ParentContainer/ParentContainer';

const Api = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openModal, setOpenModal] = useState(false);
	const { userDetails } = useSelector((state) => state?.userDetailReducer);

	const dispatch = useDispatch();

	const authKeys = () => {
		dispatch(openLoader());
		axios
			.post(`/transaction/authenticate`, {
				publickey: userDetails?.key[0]?.publickey,
				privatekey: userDetails?.key[0]?.privatekey,
			})
			.then((res: any) => {
				const { customers, message } = res?.data;
				dispatch(closeLoader());
			})
			.catch((error) => {
				dispatch(closeLoader());
				if (error.response) {
					const { message } = error.response.data;
					dispatch(
						openToastAndSetContent({
							toastContent: message,
							toastStyles: {
								backgroundColor: 'red',
							},
						})
					);
				} else if (error.request) {
					dispatch(
						openToastAndSetContent({
							toastContent: 'Error occured',
							toastStyles: {
								backgroundColor: 'red',
							},
						})
					);
				} else {
					dispatch(
						openToastAndSetContent({
							toastContent: error.message,
							toastStyles: {
								backgroundColor: 'red',
							},
						})
					);
				}
			});
	};

	useEffect(() => {
		authKeys();
	}, []);

	const APIModal = () => {
		return (
			<Modal
				onClose={() => setOpenModal(false)}
				onOpen={() => setOpenModal(true)}
				open={openModal}
				className={Styles.modalContainer}>
				<div className={Styles.modalHeader}>
					<h2>Generate new API keys</h2>
					<IconButton onClick={() => setOpenModal(false)}>
						<CloseIcon />
					</IconButton>
				</div>
				<div className={Styles.modalList}>
					<p className={Styles.note}>
						Are you sure you want to generate new API keys? If you’ve integrated
						with current keys, you’ be required to change to the newly generated
						keys.
					</p>
				</div>
				<div className={Styles.modalFooter}>
					<div className={Styles.btnGroup}>
						<Button onClick={() => setOpenModal(false)}>Cancel</Button>
						<Button className='success'>Proceed</Button>
					</div>
				</div>
			</Modal>
		);
	};

	return (

		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<APIModal />
			{/* <NavBar name='API' /> */}
			<div className={Styles.container}>
				<div className={Styles.formHeader}>
					<div>
						<h2>API Keys</h2>
					</div>
				</div>
				<div className={Styles.apiWrapper}>
					<div className={Styles.apiListContainer}>
						<h3>Public key</h3>
						<div>
							<span>{userDetails?.key[0]?.publickey ?? '...'}</span>
							<CopyToClipboard text={userDetails?.key[0]?.publickey ?? '...'}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
					<div className={Styles.apiListContainer}>
						<h3>Secret key</h3>
						<div>
							<span>{userDetails?.key[0]?.privatekey ?? '...'}</span>
							<CopyToClipboard text={userDetails?.key[0]?.privatekey ?? '...'}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
					<div className={Styles.apiListContainer}>
						<h3>Encryption key</h3>
						<div style={{ maxWidth: '250px', width: '100%' }}>
							<TextTruncate
								line={1}
								element='span'
								truncateText='…'
								text={userDetails?.key[0]?.encryptionkey ?? '...'}
							/>
							<CopyToClipboard
								text={userDetails?.key[0]?.encryptionkey ?? '...'}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
				</div>
				<Button onClick={() => setOpenModal(true)} className='success'>
					Generate new API keys
				</Button>
			</div>
		</div>
	);
};

export default Api;
