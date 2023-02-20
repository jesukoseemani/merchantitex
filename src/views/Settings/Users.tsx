import React, { useState, useCallback, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Styles from './Settings.module.scss';
import { Button, Modal, Form } from 'semantic-ui-react';
import OperantTable from '../../components/table/OperantTable';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import {
	openModalAndSetContent,
	closeModal,
} from '../../redux/actions/modal/modalActions';
import UserModal from './UserModal';
import ParentContainer from '../../components/ParentContainer/ParentContainer';

const Users = () => {
	interface UserProps {
		// id: string;
		fullname: string;
		email: string;
		added: string;
		lastlogin: string;
		position: string;
	}
	const [rows, setRows] = useState<UserProps[]>([]);
	const [change, setChange] = useState({ email: '', role: '' });
	const [settlements, setSettlement] = useState<UserProps[]>();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openModal, setOpenModal] = useState(false);
	const [active, setActive] = useState(false);
	const [singleData, setSingleData] = useState<UserProps>({
		// id: '',
		fullname: '',
		email: '',
		added: '',
		lastlogin: '',
		position: '',
	});

	const dispatch = useDispatch();

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setChange((prevState) => ({ ...prevState, [name]: value }));
	};

	const getUsers = () => {
		dispatch(openLoader());
		axios
			.get(`/merchant/users?page=${pageNumber}&perpage=${rowsPerPage}`)
			.then((res: any) => {
				const { users, message, _metadata } = res?.data;
				setTotalRows(_metadata?.totalcount);
				setSettlement(users);
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
		getUsers();
	}, [pageNumber, rowsPerPage]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const changePage = (value: number) => {
		setPageNumber(value);
	};

	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const inviteHandler = (values: { email: string; position: string }) => {
		dispatch(openLoader());
		setActive(true);

		axios
			.post('/merchant/users/invite', {
				user: [values],
			})

			.then((res: any) => {
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: res.data.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
				dispatch(closeModal());
			})

			.catch((err) => {
				dispatch(closeLoader());

				dispatch(
					openToastAndSetContent({
						toastContent: err?.response?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	interface Column {
		id: 'name' | 'email_address' | 'role' | 'last_login' | 'action';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 100 },
		{ id: 'email_address', label: 'Email address', minWidth: 100 },
		{ id: 'role', label: 'Role', minWidth: 200 },
		{ id: 'last_login', label: 'Last login', minWidth: 100 },
		{ id: 'action', label: '', align: 'right', minWidth: 100 },
	];
	const LoanRowTab = useCallback(
		(
			fullname: string,
			email: string,
			position: string,
			lastlogin: string,
			added: string
		) => ({
			name: (
				<div>
					{fullname.split(' ')[0]} {fullname.split(' ')[1]}
				</div>
			),
			email_address: email,
			role: position || 'nil',
			last_login: lastlogin.split(' ')[0],
			action: (
				<div>
					<IconButton
						onClick={() =>
							editHandler(fullname, email, lastlogin, position, added)
						}
						className='action text-success'>
						Change role
					</IconButton>
					<IconButton
						onClick={() => deleteHandler()}
						className='action text-danger'>
						Remove
					</IconButton>
				</div>
			),
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		settlements?.map((each: UserProps) =>
			newRowOptions.push(
				LoanRowTab(
					each.fullname,
					each.email,
					each.position,
					each.lastlogin,
					each.added
				)
			)
		);
		setRows(newRowOptions);
	}, [settlements, LoanRowTab]);

	const editBusinessHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '539px',
					height: '700px',
					width: '100%',
				},
				modalContent: (
					<div className={Styles.modalDiv}>
						<UserModal onclick={inviteHandler} title='Add a new user' />
					</div>
				),
			})
		);
	};

	const editHandler = (
		// id: string,
		fullname: string,
		email: string,
		added: string,
		lastlogin: string,
		position: string
	) => {
		setSingleData({
			// id,
			fullname,
			email,
			added,
			lastlogin,
			position,
		});
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '539px',
					height: '700px',
					width: '100%',
				},
				modalContent: (
					<div className={Styles.modalDiv}>
						<UserModal title='Edit user' />
					</div>
				),
			})
		);
	};

	const deleteHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '653px',
					height: '254px',
					width: '100%',
				},
				modalContent: (
					<div className={Styles.modalDiv}>
						<div className={Styles.account_wrap}>
							<h1 className={Styles.account_h1}>Remove user</h1>
						</div>

						<div className={Styles.buttonModalwrap}>
							<p className={Styles.removeModal_p}>
								Are you sure want to remover this user. This user will no longer
								have access to the platform permissions. Click on ‘Remove’ to
								remove this user.
							</p>

							<div className={Styles.buttonModal}>
								<button
									style={{ background: '#E0E0E0', color: '#333333' }}
									className={Styles.removeModal}>
									Cancel
								</button>
								<button className={Styles.removeModal}>Remove</button>
							</div>
						</div>
					</div>
				),
			})
		);
	};

	return (

			<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{/* <NavBar title='Bank Accounts' /> */}
				<div className={Styles.container}>
					<div className={Styles.formHeader}>
						<div>
							<h2>Users</h2>
						</div>
						<Button onClick={editBusinessHandler} className='success'>
							+ New user
						</Button>
					</div>
					<div className={Styles.tableWrapper}>
						<OperantTable
							columns={columns}
							rows={rows}
							totalRows={totalRows}
							changePage={changePage}
							limit={limit}
						/>
					</div>
				</div>
			</div>
	);
};

export default Users;
