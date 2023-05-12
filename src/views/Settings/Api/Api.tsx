import { useState, useEffect } from 'react';
import { Button, Modal, Select, Label, Form } from 'semantic-ui-react';
import NavBar from '../../../components/navbar/NavBar';
import Styles from './styles.module.scss';
import { ReactComponent as CopyIcon } from '../../../assets/images/copyColor.svg';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
	closeLoader,
	openLoader,
} from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextTruncate from 'react-text-truncate';
import ParentContainer from '../../../components/ParentContainer/ParentContainer';
import { Box } from '@mui/material';
import { closeModal } from '../../../redux/actions/modal/modalActions';
import CustomModal from '../../../components/customs/CustomModal';


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
	const handleGenerateModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);



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
							msgType: "error"
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
						msgType: "success",
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
						msgType: "error"
					})
				);
			}
		}
	}

	const APIModal = () => {
		return (
			<div>

				<div className={Styles.modalList}>
					<p className={Styles.note}>
						Are you sure you want to generate new API keys? If you’ve integrated
						with current keys, you’ be required to change to the newly generated
						keys.
					</p>
				</div>
				<div className={Styles.modalFooter}>
					<div className={Styles.btnGroup}>
						<button onClick={() => setOpenModal(false)}>Cancel</button>
						<button onClick={generateKey}>Generate</button>
					</div>
				</div>
			</div>

		);
	};




	return (

		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

			<Box>
				<CustomModal
					title="Generate new API keys"
					isOpen={openModal}
					handleClose={handleCloseModal}
					close={() => setOpenModal(false)}>
					<APIModal />
				</CustomModal >

			</Box>
			{/* <NavBar name='API' /> */}
			<div className={Styles.container}>
				<div className={Styles.formHeader}>
					<div>
						<h2>API Keys</h2>
						<p>Manage your API Keys settings</p>
					</div>


				</div>
				<div className={Styles.apiWrapper}>
					<div className={Styles.apiListContainer}>
						<h3>Public key</h3>
						<div>
							<span>{key?.publicApiKey?.substring(0, 30)}</span>
							<CopyToClipboard text={key?.publicApiKey}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
					<div className={Styles.apiListContainer}>
						<h3>Secret key</h3>
						<div>
							<span>{key?.privateApiKey?.substring(0, 30)}</span>
							<CopyToClipboard text={key?.privateApiKey}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
					<div className={Styles.apiListContainer}>
						<h3>Encryption key </h3>
						<div>

							<span>{key?.encryptedPublicApiKey?.substring(0, 30)}</span>

							<CopyToClipboard text={key?.encryptedPublicApiKey}>
								<IconButton>
									<CopyIcon />
								</IconButton>
							</CopyToClipboard>
						</div>
					</div>
				</div>
				<button onClick={handleGenerateModal} className='success' style={{ padding: "10px 20px", borderRadius: "20px" }}>
					Generate new API keys
				</button>
			</div>
		</div>
	);
};

export default Api;
