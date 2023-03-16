import React from 'react'
import Permission from '../../views/Settings/Permission'
import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import styles from "./styles.module.scss"

const Viewers = () => {
    return (
        <Permission><Grid container columnSpacing={"43px"}>
            <Grid item xs={12} md={8} >
                <Box className={styles.left__container}>
                    <Box className={styles.firstSection}>
                        <h2>Viewer</h2>
                        <p>Users with this role have view only permissions</p>
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
                            <p><Checkbox /> Can view transactions</p>
                            <p><Checkbox /> Can view refunds</p>
                        </Box>
                        <Box>
                            <h2>
                                Customers permissions
                            </h2>
                            <p><Checkbox />Can view customers</p>

                        </Box>

                        <Box>
                            <h2>
                                Balances permissions
                            </h2>
                            <p><Checkbox />Can view balances</p>
                            <p><Checkbox />Can fund balances</p>
                            <p><Checkbox />Can view settlements</p>
                            <p><Checkbox />Can view balance history</p>
                        </Box>

                        <Box>
                            <h2>
                                Transfers permissions
                            </h2>
                            <p><Checkbox />Can view transfers</p>
                            <p><Checkbox />Can view beneficiaries</p>

                        </Box>


                        <Box>
                            <h2>
                                Subaccounts permissions
                            </h2>
                            <p><Checkbox />Can view subaccounts</p>

                        </Box>
                        <Box>
                            <h2>
                                Chargebacks permissions
                            </h2>
                            <p><Checkbox />Can view chargebacks</p>

                        </Box>

                        <Box>
                            <h2>
                                Airtime & Bills permissions
                            </h2>
                            <p><Checkbox />Can view airtime</p>
                            <p><Checkbox />Can view bills</p>


                        </Box>

                        <Box>
                            <h2>
                                Payment link permissions
                            </h2>
                            <p><Checkbox />Can view payment links</p>


                        </Box>


                        <Box>
                            <h2>
                                Invoices permissions
                            </h2>
                            <p><Checkbox />Can view invoices</p>


                        </Box>

                        <Box>
                            <h2>
                                Payment plan permissions
                            </h2>
                            <p><Checkbox />Can view payment plans</p>
                            <p><Checkbox />Can view recurring payments</p>


                        </Box>

                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
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
                                        PG
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Peter Griffin" secondary="petergriffin@email.com" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "#CD06C5", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        RM
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Rick Morty" secondary="rickmorty@email.com" />
                            </ListItem>

                        </List>
                    </Box>
                </Box>
            </Grid>
        </Grid></Permission>
    )
}

export default Viewers