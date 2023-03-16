import { Box, Grid, InputLabel, OutlinedInput, Checkbox, Stack, Switch } from '@mui/material'
import React from 'react'

import styles from "./styles.module.scss"

const AddCustomRole = () => {
    return (
        <form>
            <Box>
                <Grid container mt={"33px"} mb={"24px"}>
                    <Grid item xs={12}>
                        <InputLabel>Role name</InputLabel>
                        <OutlinedInput fullWidth placeholder="Finance Officer" sx={{ marginBottom: "17px" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Role description</InputLabel>
                        <OutlinedInput multiline rows={3} fullWidth placeholder="Description..." />
                    </Grid>
                </Grid>
                <Box>
                    <Stack direction={"row"} justifyContent="space-between" className={styles.stack}>
                        <h2>Permissions</h2>
                        <Stack direction={"row"}>
                            <Switch size='small' />
                            <span>Allow all permissions</span>
                        </Stack>
                    </Stack>
                </Box>
                <Grid container columnSpacing={"43px"}>
                    <Grid item xs={12}  >

                        <Box mt={"22px"} className={styles.addPermission}>
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
                                <p><Checkbox />Can log refunds</p>
                                <p><Checkbox /> Can edit customerss</p>
                                <p><Checkbox /> Can blacklist customers</p>

                            </Box>
                            <Box>
                                <h2>
                                    Balances permissions
                                </h2>
                                <p><Checkbox />Can view balances</p>
                                <p><Checkbox />Can fund balances</p>
                                <p><Checkbox /> Can view settlements</p>

                            </Box>







                        </Box>

                    </Grid>

                </Grid>
            </Box>
        </form>
    )
}

export default AddCustomRole