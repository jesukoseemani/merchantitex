import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoader, openLoader } from '../../redux/actions/loader/loaderActions'
import Permission from '../../views/Settings/Permission'
import styles from "./styles.module.scss"
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions'
import { useParams } from 'react-router-dom';

const Administator = () => {

    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>();

    const [roles, setRoles] = useState<any>()

    useEffect(() => {
        dispatch(openLoader());
        const fetchPermission = async () => {

            try {

                const { data } = await axios.get<any>(`/v1/setting/roles/${id}/properties`)
                console.log(data)
                setRoles(data?.modules)


                dispatch(closeLoader());

            } catch (error: any) {
                dispatch(closeLoader());
                const { message } = error.response.data;
                dispatch(
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            toastStyles: {
                                backgroundColor: "red",
                            },
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
            <Grid container columnSpacing={{ xs: "20px", md: "43px" }}>
                <Grid item xs={12} md={7} >
                    <Box className={styles.left__container}>
                        <Box className={styles.firstSection}>
                            <h2>Administator</h2>
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
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box className={styles.right__container}>
                        <Box className={styles.firstSection}>
                            <h2>Users with this role</h2>
                            <p>See users with these permissions</p>
                        </Box>
                        <Box className={styles.sectionTwo}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "#2684ED", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            RU
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="James Haliday" secondary="jameshaliday@example.com" />
                                </ListItem>


                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Permission >
    )
}

export default Administator