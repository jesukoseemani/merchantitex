import { Box, Checkbox, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material'
import React from 'react'
import OutlineInput from '../formUI/OutlineInput'
import Styles from "./styles.module.scss"


const AddBusiness = () => {
    return (
        <div>
            <form>
                <Grid container>
                    <Grid item xs={12}>
                        <InputLabel className={Styles.label}>Business name</InputLabel>
                        <OutlinedInput placeholder='Enter business name' fullWidth sx={{ height: "44px", marginBottom: "22px" }} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel className={Styles.label}> Business email address</InputLabel>
                        <OutlinedInput placeholder='name@email.com' fullWidth sx={{ height: "44px", marginBottom: "22px" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel htmlFor="country" className={Styles.label}>Choose a business type</InputLabel>
                        <Select
                            sx={{ height: 44, marginBottom: "20px", }}
                            fullWidth
                        >
                            <MenuItem value="individual">Induvidual</MenuItem>
                            <MenuItem value="company">Company</MenuItem>
                        </Select>



                    </Grid>

                    <Grid item xs={12}>
                        <Stack sx={{ marginBottom: "21px" }} alignItems="flex-start" spacing="10px" direction="row">
                            <Checkbox />
                            <p className={Styles.checkBoxText}>Use my primary account's settings for this account</p>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <button className={Styles.businessBtn}>Add business</button>
                    </Grid>
                </Grid>
            </form>

        </div>
    )
}

export default AddBusiness
