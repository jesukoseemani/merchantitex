import React from 'react'
import styles from "./profile.module.scss"
import { Avatar } from '@mui/material';
import { width } from '@mui/system';
import EditProfile from './EditProfile';
import { openModalAndSetContent } from '../../../../redux/actions/modal/modalActions';
import { useDispatch } from 'react-redux';

const Profile = ({ me }: any) => {
    const dispatch = useDispatch()

    const handleEdit = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "415px",
                    minHeight: "550px !important",
                    borderRadius: '20px',
                    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
                },
                modalTitle: "Edit profile",
                modalContent: (
                    <div className='modalDiv'>

                        <EditProfile me={me} />
                    </div>
                ),
            })
        );
    }
    return (
        <div className={styles.profile__container}>
            <div className={styles.profile__header}>
                <div className={styles.left}>
                    <div>
                        <Avatar src='https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png' alt="profile pix" sx={{ width: '50px', height: "50px" }} />
                    </div>
                    <div>
                        <p>{`${me?.user?.firstname} ${me?.user?.lastname}`}</p>
                        <span>{me?.user?.email}</span>
                    </div>
                </div>
                <div className={styles.right}>
                    <button onClick={handleEdit}>Edit Profile</button>
                </div>
            </div>

            <div className={styles.profile__body}>
                <div>
                    <span>First name</span>
                    <p>{me?.user?.firstname}</p>
                </div>
                <div>
                    <span>Last name</span>
                    <p>{me?.user?.lastname}</p>
                </div>
                <div>
                    <span>Email Address</span>
                    <p>{me?.user?.email}</p>
                </div>
                <div>
                    <span>Phone Number</span>
                    <p>{me?.user?.phonenumber}</p>
                </div>
                <div>
                    <span>Role</span>
                    <p>{me?.user?.role}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile