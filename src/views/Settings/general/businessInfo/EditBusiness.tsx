import React from 'react'
import styles from "./businessinfo.module.scss"
import { Button, Grid, TextField, InputLabel, Stack } from '@mui/material';


const EditBusiness = ({ me }: any) => {

    return (
        <div className={styles.editBusinessInfo}>
            <div className={styles.editBusinessHeader}>
                <div className={styles.logo}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt="business logo" width={"60px"} />
                </div>
                <div className={styles.textBox}>
                    <p>Change business logo</p>
                    <span>We recommend using a square shaped image that is atleast 120px by 120px for optimum results.</span>
                    <Button disableElevation variant="contained" component="label" className={styles.button}>
                        Edit Logo
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                </div>

            </div>

            <div className={styles.form}>


                <form>
                    <Grid container columnSpacing={"40px"}>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Business Name</InputLabel>
                            <TextField fullWidth placeholder='Nomba Limited' />
                        </Grid>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Business Email Address</InputLabel>
                            <TextField fullWidth placeholder='nomba@example.com' />
                        </Grid>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Business Phone Number </InputLabel>
                            <TextField fullWidth placeholder='09069003426' />
                        </Grid>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Business Address</InputLabel>
                            <TextField fullWidth placeholder='41 James Lake Street Lekki' />
                        </Grid>

                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Country</InputLabel>
                            <TextField defaultValue={me?.business?.country} fullWidth placeholder='Nomba Limited' />
                        </Grid>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Support Email Address</InputLabel>
                            <TextField fullWidth placeholder='nomba@example.com' />
                        </Grid>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Support Phone Number </InputLabel>
                            <TextField fullWidth placeholder='09069003426' />
                        </Grid>
                        <Grid item xs={12} md={6} mb="18px">
                            <InputLabel>Chargeback Email</InputLabel>
                            <TextField fullWidth placeholder='nomba@example.com' />
                        </Grid>

                        <Stack direction={"row"} gap="24px" justifyContent={"flex-end"} alignItems="center" className={styles.buttonGroup}>
                            <button>Cancel</button>
                            <button>Save Changes </button>
                        </Stack>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

export default EditBusiness