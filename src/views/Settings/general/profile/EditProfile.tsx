import { Grid, TextField, InputLabel, Stack } from '@mui/material'
import React from 'react'
import styles from "./profile.module.scss";

const EditProfile = ({ me }: any) => {
    return (
        <div>
            <form>
                <Grid container px={"40px"}>
                    <Grid item xs={12} mb={"18px"}>
                        <InputLabel>Firstname</InputLabel>

                        <TextField fullWidth defaultValue={me?.user?.firstname} placeholder='firstname' />
                    </Grid>
                    <Grid item xs={12} mb={"18px"}>
                        <InputLabel>Lastname</InputLabel>

                        <TextField fullWidth defaultValue={me?.user?.lastname} placeholder='lastname' /></Grid>
                    <Grid item xs={12} mb={"18px"}>
                        <InputLabel>Email address</InputLabel>

                        <TextField fullWidth defaultValue={me?.user?.email} placeholder='Email' /></Grid>
                    <Grid item xs={12} >
                        <InputLabel>Phone Number</InputLabel>

                        <TextField fullWidth defaultValue={me?.user?.phonenumber} placeholder='lastname' />
                    </Grid>
                    <div className={styles.btnGroup}>
                        <button>Cancel</button>
                        <button>Save Changes</button>
                    </div>
                </Grid>
            </form>
        </div>
    )
}

export default EditProfile