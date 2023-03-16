import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import Permission from '../../views/Settings/Permission'
import styles from "./styles.module.scss"

const Administrator = () => {
    return (
        <Permission>
            <Grid container columnSpacing={"43px"}>
                <Grid item xs={12} md={8} >
                    <Box className={styles.left__container}>
                        <Box className={styles.firstSection}>
                            <h2>Administrator</h2>
                            <p>Users with this role are able to control everything on the dashboard</p>
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
                                <p><Checkbox /> Can log refunds</p>
                            </Box>
                            <Box>
                                <h2>
                                    Customers permissions
                                </h2>
                                <p><Checkbox />Can view customers</p>
                                <p><Checkbox /> Can add new customers</p>
                                <p><Checkbox />Can edit customers</p>
                                <p><Checkbox />Can blacklist customers</p>
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
                                <p><Checkbox />Can make transfers</p>
                                <p><Checkbox />Can approve/disapprove pending transfers</p>
                                <p><Checkbox />Can approve/disapprove bulk transfers</p>
                                <p><Checkbox />Can view beneficiaries</p>
                                <p><Checkbox />Can add beneficiaries</p>
                                <p><Checkbox />Can remove beneficiaries</p>
                            </Box>


                            <Box>
                                <h2>
                                    Subaccounts permissions
                                </h2>
                                <p><Checkbox />Can view subaccounts</p>
                                <p><Checkbox />Can add subaccounts</p>
                                <p><Checkbox />Can edit subaccounts</p>

                            </Box>
                            <Box>
                                <h2>
                                    Chargebacks permissions
                                </h2>
                                <p><Checkbox />Can view chargebacks</p>
                                <p><Checkbox />Can view chargebacks</p>
                                <p><Checkbox />Can view chargebacks</p>

                            </Box>

                            <Box>
                                <h2>
                                    Airtime & Bills permissions
                                </h2>
                                <p><Checkbox />Can view airtime</p>
                                <p><Checkbox />Can view bills</p>
                                <p><Checkbox />Can buy airtime and bills</p>
                                <p><Checkbox />Can buy bulk airtime and bills</p>

                            </Box>

                            <Box>
                                <h2>
                                    Payment link permissions
                                </h2>
                                <p><Checkbox />Can view payment links</p>
                                <p><Checkbox />Can create and edit payment links</p>
                                <p><Checkbox />Can delete payment links</p>


                            </Box>


                            <Box>
                                <h2>
                                    Invoices permissions
                                </h2>
                                <p><Checkbox />Can view invoices</p>
                                <p><Checkbox />Can create, edit and delete invoices</p>
                                <p><Checkbox />Can finalize and send invoices</p>


                            </Box>

                            <Box>
                                <h2>
                                    Payment plan permissions
                                </h2>
                                <p><Checkbox />Can view payment plans</p>
                                <p><Checkbox />Can create and edit payment plans</p>
                                <p><Checkbox />Can view recurring payments</p>
                                <p><Checkbox />Can activate or deactivate subscription</p>


                            </Box>

                            <Box>
                                <h2>
                                    Manage permissions
                                </h2>
                                <p><Checkbox />Can remove existing users</p>
                                <p><Checkbox />Can change team member’s role</p>
                                <p><Checkbox />Can create and edit custom roles</p>
                                <p><Checkbox />Can add, edit and remove users</p>


                            </Box>

                            <Box>
                                <h2>
                                    Settings permissions
                                </h2>
                                <p><Checkbox />Can manage business preferences</p>
                                <p><Checkbox />Can set who absorbs the transaction fees</p>
                                <p><Checkbox />Can add, edit and remove settlement accounts</p>
                                <p><Checkbox />Can view API keys</p>
                                <p><Checkbox />Can generate new API keys</p>
                                <p><Checkbox />Can view webhooks</p>
                                <p><Checkbox />Can update and set webhook preferences</p>
                                <p><Checkbox />Can resend webhooks</p>


                            </Box>
                            <Box>
                                <h2>
                                    Add new business permissions
                                </h2>
                                <p><Checkbox />Can add a new business</p>



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

export default Administrator