import { Box, Grid, Stack } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styles from "./styles.module.scss"
import AdminTree from "../../../assets/images/admin.svg"
import { ReactSVG } from 'react-svg'
import { Link, NavLink } from 'react-router-dom'
import CustomModal from '../../../components/customs/CustomModal'
import AddCustomRole from '../../../components/permission/AddCustomRole'
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions'
import axios from 'axios'
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions'




interface Props {
    roles: {
        id: string;
        decription: string;
        roleName: string;
    }[]

}

interface PermissionProps {
    children: ReactNode
}
const Permission = ({ children }: PermissionProps) => {
    const history = useHistory()
    const [active, setActive] = useState(1)
    const [openModal, setOpenModal] = useState(false)
    const handleCustomRole = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [roles, setRoles] = useState<any>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(openLoader());
        const fetchPermission = async () => {

            try {

                const { data } = await axios.get<Props>("/v1/setting/roles")
                console.log(data)
                setRoles(data?.roles)


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




    useEffect(() => {
        setActive(1)
        console.log(active);
        // history.push(`/general_setting/permissions/owner/${active}`)

    }, [active])

    return (
        <div className={styles.permissionContainer}>
            <div className={styles.headerBox}>
                <h2>All roles</h2>
                {/* <button onClick={handleCustomRole}> Create a custom role</button> */}

            </div>

            <Box className={styles.permission__body}>

                <Grid container justifyContent={"space-between"} flexWrap="wrap" spacing={{ xs: "10px", md: "10px" }}>
                    <Grid item xs={12} sm={4} md={2.5}>
                        <Box className={styles.sidebar}>
                            <ReactSVG src={AdminTree} />
                            <ul>
                                {roles?.map((x: any, i: number) => (
                                    <li onClick={() => setActive(x?.id)} key={i}>
                                        <NavLink to={`/general_setting/permissions/${x?.roleName.toLowerCase()}/${x?.id}`} key={x?.id} activeClassName={styles.active}>{x?.roleName.toLowerCase()}</NavLink>
                                    </li>
                                ))}
                            </ul>

                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={8} md={9.5} mt={{ xs: "10rem", md: "0px" }}>{children}</Grid>
                </Grid>
            </Box>

            <Box>
                <CustomModal
                    title="Create a custom role"
                    isOpen={openModal}
                    handleClose={handleCloseModal}
                    close={() => setOpenModal(false)}>

                    <AddCustomRole />
                </CustomModal >

            </Box>
        </div>
    )
}

export default Permission