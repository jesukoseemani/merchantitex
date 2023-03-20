import React from 'react'
import Permission from '../../views/Settings/Permission'
import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import styles from "./styles.module.scss"


const Operations = () => {
    return (
        <Permission>
            <Grid container columnSpacing={"43px"}>
                <Grid item xs={12} md={7} >
                    <Box className={styles.left__container}>
                        <Box className={styles.firstSection}>
                            <h2>Operations</h2>
                            <p>Users with this role are allowed to control everything on the dashboard except from moving money out</p>
                        </Box>
                        <Box className={styles.secondSection}>
                            <h2>Role permissions</h2>
                            <p>See the list of permissions that are available for this role</p>
                        </Box>
                        <Box className={styles.thirdSection}>
                            <Box>
                                <h2>
                                    Transactions permissions
                                </h2>
                                <p><Checkbox defaultChecked /> Can view transactions</p>
                                <p><Checkbox defaultChecked /> Can view refunds</p>
                                <p><Checkbox defaultChecked /> Can log refunds</p>
                            </Box>
                            <Box>
                                <h2>
                                    Customers permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view customers</p>
                                <p><Checkbox defaultChecked /> Can add new customers</p>
                                <p><Checkbox defaultChecked />Can edit customers</p>
                                <p><Checkbox defaultChecked />Can blacklist customers</p>
                            </Box>

                            <Box>
                                <h2>
                                    Balances permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view balances</p>
                                <p><Checkbox defaultChecked />Can fund balances</p>
                                <p><Checkbox defaultChecked />Can view settlements</p>
                                <p><Checkbox defaultChecked />Can view balance history</p>
                            </Box>

                            <Box>
                                <h2>
                                    Transfers permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view transfers</p>
                                <p><Checkbox defaultChecked />Can view beneficiaries</p>
                                <p><Checkbox defaultChecked />Can add beneficiaries</p>
                                <p><Checkbox defaultChecked />Can remove beneficiaries</p>
                            </Box>


                            <Box>
                                <h2>
                                    Subaccounts permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view subaccounts</p>

                            </Box>
                            <Box>
                                <h2>
                                    Chargebacks permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view chargebacks</p>

                            </Box>

                            <Box>
                                <h2>
                                    Airtime & Bills permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view airtime</p>
                                <p><Checkbox defaultChecked />Can view bills</p>
                                <p><Checkbox defaultChecked />Can buy airtime and bills</p>
                                <p><Checkbox defaultChecked />Can buy bulk airtime and bills</p>

                            </Box>

                            <Box>
                                <h2>
                                    Payment link permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view payment links</p>
                                <p><Checkbox defaultChecked />Can create and edit payment links</p>
                                <p><Checkbox defaultChecked />Can delete payment links</p>


                            </Box>


                            <Box>
                                <h2>
                                    Invoices permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view invoices</p>
                                <p><Checkbox defaultChecked />Can create, edit and delete invoices</p>
                                <p><Checkbox defaultChecked />Can finalize and send invoices</p>


                            </Box>

                            <Box>
                                <h2>
                                    Payment plan permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view payment plans</p>
                                <p><Checkbox defaultChecked />Can create and edit payment plans</p>
                                <p><Checkbox defaultChecked />Can view recurring payments</p>
                                <p><Checkbox defaultChecked />Can activate or deactivate subscription</p>


                            </Box>

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
                                    <ListItemText primary="Roy Unachukwu" secondary="royunachukwu@email.com" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "#CD06C5", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            PK
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Philip Kachikwu" secondary="philipkachikwu@email.com" />
                                </ListItem>

                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Permission>
    )
}

export default Operations