import { Box, Grid, Stack } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styles from "./Settings.module.scss"
import AdminTree from "../../assets/images/admin.svg"
import { ReactSVG } from 'react-svg'
import { Link, NavLink } from 'react-router-dom'
import CustomModal from '../../components/customs/CustomModal'
import AddCustomRole from '../../components/permission/AddCustomRole'




interface PermissionProps {
    children: ReactNode
}
const Permission = ({ children }: PermissionProps) => {
    const history = useHistory()
    const [active, setActive] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const handleCustomRole = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    interface Props {
        id: string;
        name: string;
        url: string;

    }

    const permisionData: Props[] = [
        {
            id: "1",
            name: "Administrator",
            url: "/general_setting/permissions/administrator"
        },
        {
            id: "2",
            name: "Operations",
            url: "/general_setting/permissions/operations"
        },
        {
            id: "3",
            name: "Customer support",
            url: "/general_setting/permissions/support"
        },
        {
            id: "4",
            name: "Developer",
            url: "/general_setting/permissions/developer"
        },
        {
            id: "5",
            name: "Viewer",
            url: "/general_setting/permissions/viewers"
        }
    ]



    useEffect(() => {
        setActive(0)
    }, [active])

    return (
        <Box>
            <Stack mt={{ sm: "20px", md: "35px" }} direction={"row"} justifyContent="space-between" alignItems={"center"} className={styles.headerBox}>
                <h2>All roles</h2>
                <button onClick={handleCustomRole}> Create a custom role</button>

            </Stack>

            <Box>

                <Grid container justifyContent={"space-between"} flexWrap="wrap" spacing={{ xs: "10px", md: "10px" }}>
                    <Grid item xs={12} sm={4} md={2.5}>
                        <Box className={styles.sidebar}>
                            <ReactSVG src={AdminTree} />
                            <ul>
                                {permisionData?.map(({ id, name, url }, index) => (
                                    <li onClick={() => setActive(index)}>
                                        <NavLink to={url} key={id} activeClassName={styles.active}>{name}</NavLink>
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
        </Box>
    )
}

export default Permission