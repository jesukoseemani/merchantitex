import { Grid, Stack, InputLabel, FormControl, FormHelperText, FormGroup, FormControlLabel, OutlinedInput } from '@mui/material';
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { State } from '../../../helpers/State';
import { Switch } from '@material-ui/core';
import { styled } from '@mui/system';
import Styles from "../style.module.scss"


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

    const handleOnChange = () => { }


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
            <Grid container columnSpacing={4} justifyContent="space-between">

                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={Styles.label}>Contact's firstname</InputLabel>
                    <OutlinedInput fullWidth placeholder="Contact's firstname" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={Styles.label}>Contact's lastname</InputLabel>
                    <OutlinedInput fullWidth placeholder="Contact's lastname" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={Styles.label}>Contact's address</InputLabel>
                    <OutlinedInput fullWidth placeholder="Contact's address" />

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

                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={Styles.label}>Contact phone number</InputLabel>
                    <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleOnChange} sx={{
                        ".css-x9mhkq-MuiInputBase-root-MuiOutlinedInput-root ": {
                            height: "44px",
                            marginBottom: "22px"
                        }
                    }} />
                    <FormHelperText id="component-helper-text"

                        sx={{
                            color: "#8B8B8B",
                            fontFamily: "Avenir",
                            fontSize: "12px",
                            marginBottom: "10px"
                        }}>


                        <Switch checked={false}  {...label} defaultChecked size="small" />Same as Support phone number
                    </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel>Contact email address</InputLabel>
                    <OutlinedInput fullWidth placeholder='Contact email address' />
                    <FormHelperText id="component-helper-text"

                        sx={{
                            color: "#8B8B8B",
                            fontFamily: "Avenir",
                            fontSize: "12px",
                        }}>


                        <Switch {...label} defaultChecked size="small" checked={false} />Same as Support email
                    </FormHelperText>
                </Grid>


                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel>What is your estimated monthly income </InputLabel>
                    <Select
                        sx={{

                            height: 44,
                            marginBottom: "22px"
                        }}
                        fullWidth
                    >
                        {priceList?.map(({ name, id }) => (
                            <MenuItem key={id} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </Grid>


                <Stack direction="row" gap={"24px"} justifyContent={"flex-end"} alignItems={"flex-end"} sx={{ width: "100%", marginTop: 10 }}>
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
                        margin: "9px 0px ",
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
                            margin: "9px 0px ",
                            fontFamily: 'Avenir',
                        }}

                        onClick={handleNext}>continue</button>
                </Stack>
            </Grid>

        </div>
    )
}

export default ProfileAdditionalInfo