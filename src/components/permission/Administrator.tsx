import { Avatar, Box, Checkbox,  Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import Permission from '../../views/Settings/Permission'
import styles from "./styles.module.scss"

const Administrator = () => {
    return (
        <Permission>
            <Grid container columnSpacing={{ xs: "20px", md: "43px" }}>
                <Grid item xs={12} md={7} >
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
                                <p><Checkbox defaultChecked />Can make transfers</p>
                                <p><Checkbox defaultChecked />Can approve/disapprove pending transfers</p>
                                <p><Checkbox defaultChecked />Can approve/disapprove bulk transfers</p>
                                <p><Checkbox defaultChecked />Can view beneficiaries</p>
                                <p><Checkbox defaultChecked />Can add beneficiaries</p>
                                <p><Checkbox defaultChecked />Can remove beneficiaries</p>
                            </Box>


                            <Box>
                                <h2>
                                    Subaccounts permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view subaccounts</p>
                                <p><Checkbox defaultChecked />Can add subaccounts</p>
                                <p><Checkbox defaultChecked />Can edit subaccounts</p>

                            </Box>
                            <Box>
                                <h2>
                                    Chargebacks permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can view chargebacks</p>
                                <p><Checkbox defaultChecked />Can view chargebacks</p>
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

                            <Box>
                                <h2>
                                    Manage permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can remove existing users</p>
                                <p><Checkbox defaultChecked />Can change team member’s role</p>
                                <p><Checkbox defaultChecked />Can create and edit custom roles</p>
                                <p><Checkbox defaultChecked />Can add, edit and remove users</p>


                            </Box>

                            <Box>
                                <h2>
                                    Settings permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can manage business preferences</p>
                                <p><Checkbox defaultChecked />Can set who absorbs the transaction fees</p>
                                <p><Checkbox defaultChecked />Can add, edit and remove settlement accounts</p>
                                <p><Checkbox defaultChecked />Can view API keys</p>
                                <p><Checkbox defaultChecked />Can generate new API keys</p>
                                <p><Checkbox defaultChecked />Can view webhooks</p>
                                <p><Checkbox defaultChecked />Can update and set webhook preferences</p>
                                <p><Checkbox defaultChecked />Can resend webhooks</p>


                            </Box>
                            <Box>
                                <h2>
                                    Add new business permissions
                                </h2>
                                <p><Checkbox defaultChecked />Can add a new business</p>



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