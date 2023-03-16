import { Avatar, Box, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import styles from "./styles.module.scss"
import Permission from '../../views/Settings/Permission'

const Developer = () => {
    return (
        <Permission>
            <Grid container columnSpacing={"43px"}>
                <Grid item xs={12} md={8} >
                    <Box className={styles.left__container}>
                        <Box className={styles.firstSection}>
                            <h2>Developer</h2>
                            <p>Users who hold this role have access to the permissions required to provide technical help</p>
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
                                    Settings permissions
                                </h2>

                                <p><Checkbox />Can view API keys</p>
                                <p><Checkbox />Can generate new API keys</p>
                                <p><Checkbox />Can view webhooks</p>
                                <p><Checkbox />Can update and set webhook preferences</p>
                                <p><Checkbox />Can resend webhooks</p>


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
                                            RO
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Raphael Olong" secondary="raphaelolong@email.com" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "#CD06C5", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            MA
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Matthew Alika" secondary="matthewalika@email.com" />
                                </ListItem>

                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Permission>
    )
}

export default Developer