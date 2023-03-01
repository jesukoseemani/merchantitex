import { Grid, Stack, TextField, InputLabel, Box, styled } from '@mui/material';
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { State } from '../../../helpers/State';

import styles from "../style.module.scss"

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

    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44,
            marginBottom: "22px",
        }
    });

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
    const handleOnChange = () => { }
    return (



        <Box sx={{ marginTop: "-3rem" }}>
            <Grid container columnSpacing={4} justifyContent="flex-start">

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={styles.label}>Business phone number</InputLabel>
                    <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleOnChange} sx={{
                        ".css-x9mhkq-MuiInputBase-root-MuiOutlinedInput-root ": {
                            height: "44px"
                        }
                    }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={styles.label}>Support Email Address</InputLabel>

                    <StyledTextField variant='outlined' fullWidth placeholder='Support Email Address' />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={styles.label}>Bussiness Address</InputLabel>
                    <StyledTextField variant='outlined' fullWidth placeholder='Bussiness Address' />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={styles.label}>State</InputLabel>
                    <Select
                        sx={{

                            height: 44,
                        }}
                        fullWidth
                    >
                        {State?.map(({ name, code }) => (
                            <MenuItem key={code} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={styles.label}>City</InputLabel>
                    <StyledTextField variant='outlined' fullWidth placeholder='City' />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <InputLabel className={styles.label}>What is your estimated monthly income </InputLabel>
                    <Select
                        sx={{

                            height: 44,
                        }}
                        fullWidth
                    >
                        {priceList?.map(({ name, id }) => (
                            <MenuItem key={id} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </Grid>


                <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: "150px" }}>
                    <button style={{
                        backgroundColor: 'transparent',
                        color: '#333',
                        border: '1px solid green',
                        height: "44px",
                        width: '146px',
                        fontSize: "16px",
                        fontWeight: 800,
                        borderRadius: '20px',
                        cursor: 'pointer',

                        fontFamily: 'Avenir',

                    }} onClick={handleBack}>Previous</button>
                    <button
                        style={{
                            backgroundColor: '#27AE60',
                            height: "44px",
                            width: '146px',
                            color: '#fff',
                            border: 'none',
                            fontSize: "16px",
                            fontWeight: 800,
                            borderRadius: '20px',
                            cursor: 'pointer',

                            fontFamily: 'Avenir',
                        }}

                        onClick={handleNext}>continue</button>
                </Stack>
            </Grid>

        </Box>
    )
}

export default AdditionalInfo