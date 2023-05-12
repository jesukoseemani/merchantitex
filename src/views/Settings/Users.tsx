import React, { useState, useCallback, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import Styles from './Settings.module.scss';
import OperantTable from '../../components/table/OperantTable';
import { useDispatch } from 'react-redux';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { IconButton } from '@material-ui/core';
import {
	openModalAndSetContent,
	closeModal,
} from '../../redux/actions/modal/modalActions';
import UserModal from './user/UserModal';
import ParentContainer from '../../components/ParentContainer/ParentContainer';
import EditUserModal from './user/EditUserModal';
import { capitalize, Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import CustomModal from '../../components/customs/CustomModal';



const Users = () => {
	interface UserProps {
		id: number;
		phonenumber: string;
		firstname: string;
		lastname: string;
		email: string;
		added: string;
		lastlogin: string;
		role: string;
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
	const history = useHistory()

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setChange((prevState) => ({ ...prevState, [name]: value }));
	};




	const getUsers = () => {
		dispatch(openLoader());
		axios
			.get(`/v1/users?page=${pageNumber}&perpage=${rowsPerPage}`)
			.then((res: any) => {
				console.log(res)
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
							msgType: "error"
						})
					);
				} else if (error.request) {
					dispatch(
						openToastAndSetContent({
							toastContent: 'Error occured',
							msgType: "error"
						})
					);
				} else {
					dispatch(
						openToastAndSetContent({
							toastContent: error.message,
							msgType: "error"
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


	const [openUserModal, setOpenUserModal] = useState(false)
	const AddNewUser = () => setOpenUserModal(true);
	const handleCloseModal = () => setOpenUserModal(false);
	const [data, setData] = useState<any>()
	const [openEditUserModal, setOpenEditUserModal] = useState(false)
	const editHandler = (data: any) => {
		setOpenEditUserModal(true)
		setData(data)
	};
	const handleCloseUserModal = () => setOpenEditUserModal(false);

	interface Column {
		id: 'name' | 'email_address' | 'phone' | 'role' | 'last_login' | 'action';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}
	const columns: Column[] = [
		{ id: 'name', label: 'Name', minWidth: 160 },
		{ id: 'email_address', label: 'Email address', minWidth: 130 },
		{ id: 'phone', label: 'Phone number', minWidth: 130 },
		{ id: 'role', label: 'Role', minWidth: 140 },
		{ id: 'last_login', label: 'Last login', minWidth: 100 },
		{ id: 'action', label: '', align: 'right', minWidth: 150 },
	];
	const LoanRowTab = useCallback(
		(
			firstname: string,
			email: string,
			role: string,
			phonenumber: string,
			lastlogin: string,
			added: string,
			lastname: string,
			id: number
		) => ({
			name: `${firstname} ${lastname}`,
			email_address: email,
			phone: phonenumber || 'nill',
			role: capitalize(role?.toLowerCase()) || 'nil',
			last_login: lastlogin ? <CustomDateFormat date={lastlogin} time={lastlogin} /> : "nil",
			action: (
				<Stack direction={"row"}>
					<IconButton
						onClick={() =>
							editHandler({ data: { firstname, email, phonenumber, id, lastlogin, lastname, added, role } })
						}
						className='action text-success'>
						Change role
					</IconButton>
					<IconButton
						onClick={() => deleteHandler(id)}
						className='action text-danger'>
						Remove
					</IconButton>

					{/* <IconButton
						onClick={() => history.push({
							pathname: "/user/activity",
							state: { id }
						})}
						className='action text-success'>
						Activities
					</IconButton> */}
				</Stack>
			),
			id
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		settlements?.map((each: UserProps) =>
			newRowOptions.push(
				LoanRowTab(
					each.lastname,
					each.email,
					each.role,
					each.phonenumber,
					each.lastlogin,
					each.added,
					each.firstname,
					each.id

				)
			)
		);
		setRows(newRowOptions);
	}, [settlements, LoanRowTab]);



	const deleteHandler = (id: number) => {
		const handleCancelModa = () => {
			dispatch(closeModal())
		}


		// confirm delete
		const comfirmDelete = async () => {
			dispatch(openLoader());
			try {
				const del = await axios.delete(`/v1/users/${id}/delete`)
				if (del) {
					console.log(del);
					dispatch(closeModal())
					getUsers()


				}
				dispatch(closeLoader());

			} catch (error: any) {
				if (error) {
					const { message } = error.response.data;
					dispatch(closeLoader());
					dispatch(closeModal())


					dispatch(
						openToastAndSetContent({
							toastContent: message,
							msgType: "error"
						})
					);
				}
			}
		}




		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
					maxWidth: '653px',
					height: '254px !important',
					width: '100%',



					borderRadius: "20px"
				},
				modalTitle: "Remove user",
				modalContent: (
					<div className={Styles.modalDiv}>


						<div className={Styles.buttonModalwrap}>
							<p className={Styles.removeModal_p}>
								Are you sure want to remover this user. This user will no longer
								have access to the platform permissions. Click on ‘Remove’ to
								remove this user.
							</p>

							<div className={Styles.buttonModal}>
								<button
									style={{ background: '#E0E0E0', color: '#333333' }}
									className={Styles.removeModal}
									onClick={handleCancelModa}
								>
									Cancel

								</button>
								<button onClick={comfirmDelete} className={Styles.removeModal}>Remove</button>
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
			<div className={Styles.container} style={{ width: "100%" }}>
				<div className={Styles.formHeader}>
					<div>
						<h2>Users</h2>
					</div>
					<button style={{ height: "39px", width: "123.09px", borderRadius: "20px" }} onClick={AddNewUser} className='success'>
						+ New user
					</button>
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

			<Box>
				<CustomModal
					title="Add new user"
					isOpen={openUserModal}
					handleClose={handleCloseModal}
					close={() => setOpenUserModal(false)}>

					<UserModal key={"ii"} getUsers={getUsers} />

				</CustomModal >

			</Box>
			<Box>
				<CustomModal
					title="Edit User"
					isOpen={openEditUserModal}
					handleClose={handleCloseUserModal}
					close={() => setOpenUserModal(false)}>
					<EditUserModal data={data} getUsers={getUsers} />
				</CustomModal >

			</Box>
		</div>
	);
};

export default Users;
