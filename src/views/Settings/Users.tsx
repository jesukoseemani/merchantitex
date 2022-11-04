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

const Users = () => {
	interface UserProps {
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

	const inviteHandler = () => {
		dispatch(openLoader());
		setActive(true);

		axios
			.post('/merchant/users/invite', {
				user: [
					{
						email: change.email,
						position: change.role,
					},
				],
			})

			.then((res: any) => {
				dispatch(closeLoader());
				setActive(false);

				dispatch(
					openToastAndSetContent({
						toastContent: res.data.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
				setOpenModal(false);
			})

			.catch((err) => {
				dispatch(closeLoader());
				setActive(false);

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
		(fullname: string, email: string, position: string, lastlogin: string) => ({
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
					<IconButton className='action text-success'>Change role</IconButton>
					<IconButton className='action text-danger'>Remove</IconButton>
				</div>
			),
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		settlements?.map((each: UserProps) =>
			newRowOptions.push(
				LoanRowTab(each.fullname, each.email, each.position, each.lastlogin)
			)
		);
		setRows(newRowOptions);
	}, [settlements, LoanRowTab]);

	const AccountModal = () => {
		return (
			<Modal
				onClose={() => setOpenModal(false)}
				onOpen={() => setOpenModal(true)}
				open={openModal}
				className={Styles.modalContainer}>
				<div className={Styles.modalHeader}>
					<h2>Add new user</h2>
					<IconButton onClick={() => setOpenModal(false)}>
						<CloseIcon />
					</IconButton>
				</div>
				<Form.Field className={Styles.inputWrapper}>
					<label>Email address</label>
					<input
						placeholder='new@email.com'
						name='email'
						onChange={handleChange}
						value={change.email}
					/>
				</Form.Field>
				<Form.Field className={Styles.inputWrapper}>
					<label>User role</label>

					<select name='role' value={change.role} onChange={handleChange}>
						<option value=''>select role</option>
						<option value='admin'>Administrator</option>
						<option value='customer_support'>Customer Support</option>
						<option value='developer'>Developer/IT Support</option>
						<option value='user'>User</option>
					</select>
				</Form.Field>
				<div className={Styles.modalFooter}>
					<button
						style={{ outline: 'none', border: 'none' }}
						onClick={inviteHandler}>
						{active ? 'Sending...' : 'Send invite'}
					</button>
				</div>
				<div className={Styles.inputDivider}>
					<h2>Permissions</h2>
				</div>
				<div className={Styles.modalList}>
					<h2>Administrator</h2>
					<p>This is best for the business owners and executives.</p>
				</div>
				<div className={Styles.modalList}>
					<h2>Operations</h2>
					<p>For the business owners and executives.</p>
				</div>
				<div className={Styles.modalList}>
					<h2>Customer support</h2>
					<p>
						Best for staff that perform actions like refunds, disputes
						management.
					</p>
				</div>
				<div className={Styles.modalList}>
					<h2>Developer</h2>
					<p>This is best for developers working with the Flutterwave APIs.</p>
				</div>
				<div className={Styles.modalList}>
					<h2>View only</h2>
					<p>This is best for team members without the need to update data.</p>
				</div>
			</Modal>
		);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<AccountModal />
			<NavBar name='Bank Accounts' />
			<div className={Styles.container}>
				<div className={Styles.formHeader}>
					<div>
						<h2>Users</h2>
					</div>
					<Button onClick={() => setOpenModal(true)} className='success'>
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
