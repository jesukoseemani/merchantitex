import { Checkbox, FormControlLabel, FormHelperText, Grid, InputLabel, TextField } from '@mui/material'
import React from 'react'
import styles from "./style.module.scss"

const Security = () => {
    return (
        <div className={styles.security__container}>
            <form>

                <div className={styles.security_header}>
                    <div>
                        <h2>Password</h2>
                        <p>You can change your password here</p>
                    </div>
                    <div>
                        <button>Save Changes</button>
                    </div>
                </div>


                <div className={styles.password_input}>
                    <Grid container columnSpacing={"40px"}>
                        <Grid item xs={12} md={6}>
                            <InputLabel>Password</InputLabel>
                            <TextField fullWidth type={"password"} name="currentPassword" placeholder="currentPassword" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel>New password</InputLabel>
                            <TextField fullWidth type={"password"} name="password" placeholder="Enter new password" />

                        </Grid>
                    </Grid>
                </div>
            </form>


            <div className={styles.twoFa__box}>
                <div>
                    <h2>Two Factor Authentication</h2>
                    <p>Enable two factor authentication</p>
                </div>
                <div>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable Two Factor Authentication for login" />
                    <FormHelperText className={styles.helperText}>  Two Factor Authentication, also known as 2FA, is an extra layer of security that requires not only a password but also something that only that user has on them. In this case, your phone number and email address.</FormHelperText>

                </div>
            </div>

        </div>
    )
}

export default Security