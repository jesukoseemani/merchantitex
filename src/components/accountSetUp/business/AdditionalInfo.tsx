import { Grid, Stack, TextField, InputLabel } from '@mui/material';
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number-2';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { State } from '../../../helpers/State';


interface Props {
    handleNext: () => void;
    handleBack: () => void;

}


interface priceProps {
    id: number,
    name: string
}
const AdditionalInfo = ({ handleBack, handleNext }: Props) => {
    const [state, setState] = React.useState('');
    const [price, setPrice] = React.useState("");


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };



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
                    <InputLabel>Business phone number</InputLabel>
                    <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={() => console.log("123")} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Support Email Address</InputLabel>

                    <TextField variant='outlined' fullWidth placeholder='Support Email Address' />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>Bussiness Address</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='Bussiness Address' />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>State</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={state}
                            fullWidth
                            onChange={() => console.log("1234")}
                            placeholder="Select state"
                        >
                            <em>select state</em>
                            <MenuItem value="">
                                {/* <em>Select business category?</em> */}
                            </MenuItem>
                            {State?.map(({ name, code }) => (
                                <MenuItem key={code} value={name}>{name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel>City</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='City' />
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

export default AdditionalInfo