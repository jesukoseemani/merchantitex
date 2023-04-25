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
import { Box } from '@mui/material';
import { closeModal } from '../../redux/actions/modal/modalActions';


interface Props {
	code: string;
	message: string;
}

const Api = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openModal, setOpenModal] = useState(false);
	const { userDetails } = useSelector((state) => state?.userDetailReducer);
	const [key, setKey] = useState<any>()
	const dispatch = useDispatch();




	const getKey = () => {
		dispatch(openLoader());
		axios.get<any>(`/v1/developer/api`)
			.then((res: any) => {
				console.log(res, 'KEYS');
				const { keys } = res?.data;
				// const { account } = business?.settlement;

				setKey(keys);
				dispatch(closeLoader());
			})
			.catch((error: any) => {
				dispatch(closeLoader());
				if (error.response) {
					const { message } = error.response.data;
					dispatch(
						openToastAndSetContent({
							toastContent: message,
							toastStyles: {
								backgroundColor: "red",
							},
						})
					);
				}
			});
	}
	useEffect(() => {
		getKey()
	}, [])


	// generate key

	const generateKey = async () => {
		dispatch(openLoader());
		try {
			const { data } = await axios.post<Props>(`/v1/developer/api/generate`)
			console.log(data);
			if (data?.code === "success") {
				dispatch(closeLoader());

				setOpenModal(false)
				dispatch(
					openToastAndSetContent({
						toastContent: data?.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);



			}

		} catch (error: any) {
			if (error) {
				const { message } = error.response.data;
				dispatch(closeLoader());
				setOpenModal(false)


				dispatch(
					openToastAndSetContent({
						toastContent: message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			}
		}
	}

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
						<button style={{ padding: "10px 20px", borderRadius: "20px" }} onClick={() => setOpenModal(false)}>Cancel</button>
						<button onClick={generateKey} style={{ padding: "10px 20px", borderRadius: "20px" }} className='success'>Proceed</button>
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
							<span>{key?.publicApiKey}</span>
							<CopyToClipboard text={key?.publicApiKey.substring(0, 50)}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
					<div className={Styles.apiListContainer}>
						<h3>Secret key</h3>
						<div>
							<span>{key?.privateApiKey}</span>
							<CopyToClipboard text={key?.privateApiKey.substring(0, 50)}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
					<div className={Styles.apiListContainer}>
						<h3>Encryption key </h3>
						<div style={{ maxWidth: '250px', width: '100%' }}>
							{/* <TextTruncate
								line={1}
								element='span'
								truncateText='…'
								text={key?.encryptedPublicApiKey}
							/> */}
							<span>{key?.encryptedPublicApiKey?.substring(0, 50)}</span>

							<CopyToClipboard text={key?.encryptedPublicApiKey}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
				</div>
				<button onClick={() => setOpenModal(true)} className='success' style={{ padding: "10px 20px", borderRadius: "20px" }}>
					Generate new API keys
				</button>
			</div>
		</div>
	);
};

export default Api;
