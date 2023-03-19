import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import styles from "./styles.module.scss"
import Permission from '../../views/Settings/Permission'

const Support = () => {
    return (
        <Permission>
            <Grid container columnSpacing={"43px"}>
                <Grid item xs={12} md={7} >
                    <Box className={styles.left__container}>
                        <Box className={styles.firstSection}>
                            <h2>Customer support</h2>
                            <p>Users who hold this role have access to the permissions required to provide customer assistance</p>
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
                                <p><Checkbox />Can view beneficiaries</p>
                                <p><Checkbox />Can add beneficiaries</p>
                                <p><Checkbox />Can remove beneficiaries</p>
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
                                            PG
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Peace The Ginger" secondary="peacetheginger@email.com" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "#CD06C5", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            SE
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Success Emejuobi" secondary="successemejuobi@email.com" />
                                </ListItem>

                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Permission>
    )
}

export default Support