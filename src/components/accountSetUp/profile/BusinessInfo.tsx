import { Grid, TextField, InputLabel } from '@mui/material'
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { categoryList } from '../../../helpers/CategoryList';

interface Props {
    handleNext: () => void
}
const ProfileBusinessInfo = ({ handleNext }: Props) => {
    const [age, setAge] = React.useState('');
    const handleOnChange = () => { }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <Grid container columnSpacing={6} justifyContent="space-between">

            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Trading Name</InputLabel>
                <TextField variant='outlined' fullWidth placeholder='Trading Name' />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Business name</InputLabel>
                <TextField variant='outlined' fullWidth placeholder='Business name' />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Business Description</InputLabel>
                <TextField variant='outlined' fullWidth placeholder='Business Description' />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>What is your business category</InputLabel>
                <FormControl fullWidth>

                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            {/* <em>Select business category?</em> */}
                        </MenuItem>
                        {categoryList?.map(({ name, code }) => (
                            <MenuItem key={code} value={name}>{name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Website url</InputLabel>
                <TextField variant='outlined' fullWidth placeholder='www.website.com' />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Support email </InputLabel>
                <TextField variant='outlined' fullWidth placeholder='Support email ' />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Support phone number</InputLabel>
                <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleOnChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <InputLabel>Chargeback email</InputLabel>
                <TextField variant='outlined' fullWidth placeholder='Chargeback email' />
            </Grid>
            <Grid item xs={12} sm={6} md={6}></Grid>
            <br />
            <div className="continueBtn" style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", width: "100%" }}>
                <Button onClick={handleNext}>Continue</Button>
            </div>

        </Grid>
    )
}

export default ProfileBusinessInfo