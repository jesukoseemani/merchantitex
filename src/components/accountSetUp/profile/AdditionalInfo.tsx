import { Grid, Stack, TextField, InputLabel, FormControl, FormHelperText, FormGroup, FormControlLabel } from '@mui/material';
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number-2';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { State } from '../../../helpers/State';
import { Switch } from '@material-ui/core';


interface Props {
    handleNext: () => void;
    handleBack: () => void;

}


interface priceProps {
    id: number,
    name: string
}
const ProfileAdditionalInfo = ({ handleBack, handleNext }: Props) => {
    const [price, setPrice] = React.useState("");


    const handleChange = (e: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setState(e.target.value);
    };



    const label = { inputProps: { 'aria-label': 'Size switch demo' } };
    const priceList: priceProps[] = [
        {
            id: 1,
            name: "NGN0 - NGN50,000"

        },
        {
            id: 2,
            name: "NGN51,000 - NGN100,000"

        },
        {
            id: 3,
            name: "NGN110,000 - NGN150,000"

        },
        {
            id: 4,
            name: "NGN151,000 - NGN200,000"

        },

    ]

    return (
        <div>
            <Grid container columnSpacing={6} justifyContent="space-between">

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Contact's firstname</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Contact's firstname" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Contact's lastname</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Contact's lastname" />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Contact's address</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder="Contact's address" />

                    <FormHelperText id="component-helper-text"

                        sx={{
                            color: "#8B8B8B",
                            fontFamily: "Avenir",
                            fontSize: "12px",
                        }}>

                        {/* <Switch /> */}
                        <Switch checked={false}  {...label} defaultChecked size="small" />Same as business address
                    </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Contact phone number</InputLabel>
                    <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleChange} />

                    <FormHelperText id="component-helper-text"

                        sx={{
                            color: "#8B8B8B",
                            fontFamily: "Avenir",
                            fontSize: "12px",
                        }}>


                        <Switch checked={false}  {...label} defaultChecked size="small" />Same as Support phone number
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Contact email address</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='Contact email address' />
                    <FormHelperText id="component-helper-text"

                        sx={{
                            color: "#8B8B8B",
                            fontFamily: "Avenir",
                            fontSize: "12px",
                        }}>


                        <Switch {...label} defaultChecked size="small" checked={false} />Same as Support email
                    </FormHelperText>
                </Grid>


                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>What is your estimated monthly income </InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={price}
                            fullWidth

                            placeholder="Select state"
                        >
                            <em>select state</em>
                            <MenuItem value="">
                                {/* <em>Select business category?</em> */}
                            </MenuItem>
                            {priceList?.map(({ name, id }) => (
                                <MenuItem key={id} value={name} onChange={() => setPrice(name)}>{name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>


                <Stack direction="row" spacing={3} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 10 }}>
                    <Button backgroundColor='transparent' color='#333' border='1px solid green' onClick={handleBack}>Previous</Button>
                    <Button onClick={handleNext}>continue</Button>
                </Stack>
            </Grid>

        </div>
    )
}

export default ProfileAdditionalInfo