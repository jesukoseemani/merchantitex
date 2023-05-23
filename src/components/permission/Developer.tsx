import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions'
import Permission from '../../views/Settings/permission/Permission'
import styles from "./styles.module.scss"
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions'
import { useParams } from 'react-router-dom';

const Developer = () => {

    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>();

    const [roles, setRoles] = useState<any>()
    const [user, setUser] = useState<any>()


    useEffect(() => {
        dispatch(openLoader());
        const fetchPermission = async () => {

            try {

                const { data } = await axios.get<any>(`/v1/setting/roles/${id}/properties`)
                console.log(data)
                setRoles(data?.modules)
                setUser(data?.users)

                dispatch(closeLoader());

            } catch (error: any) {
                dispatch(closeLoader());
                const { message } = error.response.data;
                dispatch(
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            msgType: "error"
                        })
                    )
                );
            } finally {
                dispatch(closeLoader());
            }
        }


        fetchPermission()
    }, [])
    return (
        <Permission>
            <div className={styles.permission__wrapper}>
                <Box className={styles.left__container}>
                    <Box className={styles.firstSection}>
                        <h2>Developer</h2>
                        <p>Users with this role are able to control everything on the dashboard</p>
                    </Box>
                    <Box className={styles.secondSection}>
                        <h2>Role permissions</h2>
                        <p>See the list of permissions that are available for this role</p>
                    </Box>
                    <Box className={styles.thirdSection}>

                        {roles?.map((x: any) => (
                            <Box key={x?.id}>
                                <h2>
                                    {x?.category}
                                </h2>
                                {x?.modules?.map((module: any) => (

                                    <p key={x?.id}><Checkbox defaultChecked />{module?.description}</p>
                                ))}


                            </Box>
                        ))}

                    </Box>
                </Box>
                <div className={styles.right__container}>
                    <div className={styles.firstSection}>
                        <h2>Users with this role</h2>
                        <p>See users with these permissions</p>
                    </div>
                    <div className={styles.secondSection}>
                        <div className={styles.permission__Roles}>
                            {
                                user?.length > 0 ? user?.map(({ firstname, lastname, email }: { firstname: string; lastname: string; email: string }) => (

                                    <div>
                                        <Avatar sx={{ bgcolor: "#2684ED", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {firstname?.substring(0, 1).toUpperCase()}{lastname?.substring(0, 1).toUpperCase()}

                                        </Avatar>
                                        <div>
                                            <p>{firstname} {lastname}</p>
                                            <span>{email}</span>

                                        </div>
                                    </div>


                                )) : <p className={styles.no_user}>No User with this role</p>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Permission >
    )
}

export default Developer
