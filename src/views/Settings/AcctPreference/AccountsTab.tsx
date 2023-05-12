import React from 'react'
import styles from "./style.module.scss"
import { Grid, Checkbox, FormControlLabel, RadioGroup, Radio, FormControl, FormHelperText, TextField, MenuItem } from '@mui/material';


export const AccountsTab = () => {
    return (
        <div className={styles.account__container}>
            <div className={styles.account__header}>
                <div className="left">
                    <h2>Account Preferences</h2>
                    <p>Manage your account preferences</p>
                </div>
                <div className="right">
                    <button>Save changes</button>
                </div>
            </div>

            <div className={styles.account__body}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <p>Transaction Emails (Customers)</p>
                        <FormControlLabel className={styles.label} control={<Checkbox defaultChecked />} label="Email customers for every transaction" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <p>Transfer and payout receipts</p>
                        <FormControlLabel className={styles.label} control={<Checkbox defaultChecked />} label="Send email receipts for successful transfers." />
                    </Grid>

                    <Grid item xs={12} md={6} mt={"86px"}>
                        <Grid container>
                            <Grid item xs={12}>
                                <p>Transaction Emails (Customers)</p>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Send to the business email address only"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="Send to the business email address only" control={<Radio />} label="Send to the business email address only" />
                                        <FormControlLabel value="Send to all dashboard users" control={<Radio />} label="Send to all dashboard users" />
                                        <FormControlLabel value="Send to specific users only" control={<Radio />} label="Send to specific users only" />
                                    </RadioGroup>
                                </FormControl>

                            </Grid>

                            <Grid item xs={12} md={8}>
                                <TextField select fullWidth>
                                    <MenuItem value="Emmanuel">Emmanuel</MenuItem>
                                    <MenuItem value="Ayodeji">Emmanuel</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>


                    </Grid>
                    <Grid item xs={12} md={6} mt={"86px"}>
                        <p>How do you want to get your earnings?</p>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Settlement to bank account"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="Settlement to bank account" control={<Radio />} label="Settlement to bank account" />
                                <FormHelperText className={styles.helperText}>This means your earnings will be transferred to the bank account you added to your ITEXPay profile.</FormHelperText>

                                <FormControlLabel value="Settlement to wallet" control={<Radio />} label="Settlement to wallet" />
                                <FormHelperText className={styles.helperText}>Choosing this settlement method means your earnings will be transferred from your ledger to your available balance in your wallet.</FormHelperText>
                            </RadioGroup>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} md={6} mt={"86px"} mb={5}>
                        <p>Two Factor Authentication</p>
                        <FormControlLabel className={styles.label} control={<Checkbox defaultChecked />} label="Enable Two Factor Aunthentication for transfers." />
                        <FormHelperText className={styles.helperText}>Two Factor Authentication, also known as 2FA, is an extra layer of security that requires not only a password but also something that only that user has on them. In this case, your phone number and email address.</FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={6} mt={"86px"} mb={5}>
                        <p>Subscription Emails</p>
                        <FormControlLabel className={styles.label} control={<Checkbox defaultChecked />} label="Allows customer cancel subscriptions" />
                        <FormHelperText className={styles.helperText}>This option allows you to include the 'Cancellation Link' on the subscription emails being sent to your customers.</FormHelperText>
                    </Grid>

                </Grid>
            </div>


        </div>
    )
}
