import { Box, Grid, Stack } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styles from "./Settings.module.scss"
import AdminTree from "../../assets/images/admin.svg"
import { ReactSVG } from 'react-svg'




interface PermissionProps {
    children: ReactNode
}
const Permission = ({ children }: PermissionProps) => {
    const history = useHistory()
    const [active, setActive] = useState(0)
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

    const handleClick = (url: string, index: number) => {
        history.push(url)
        setActive(index)
        console.log(index)

    }

    useEffect(() => {
        setActive(0)
        // return () => setActive
    }, [])

    return (
        <Box>
            <Stack mt={"35px"} direction={"row"} justifyContent="space-between" alignItems={"center"} className={styles.headerBox}>
                <h2>All roles</h2>
                <button>+ Create a custom role</button>

            </Stack>

            <Box>

                <Grid container justifyContent={"space-between"} flexWrap="wrap" spacing={"43px"}>
                    <Grid item xs={12} sm={4} md={2}>
                        <Box className={styles.sidebar}>
                            <ReactSVG src={AdminTree} />
                            <ul>
                                {permisionData?.map(({ id, name, url }, index) => (
                                    <li key={id} onClick={() => handleClick(url, index)} className={active === index && styles.active}>{name}</li>
                                ))}
                            </ul>

                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={8} md={10} >{children}</Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Permission