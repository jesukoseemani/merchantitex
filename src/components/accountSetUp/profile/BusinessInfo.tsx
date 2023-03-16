import { Grid, TextField, InputLabel, Box } from '@mui/material'
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { categoryList } from '../../../helpers/CategoryList';
import { styled } from '@mui/system';
import Styles from "../style.module.scss"

interface Props {
    handleNext: () => void
}
const ProfileBusinessInfo = ({ handleNext }: Props) => {

    const handleOnChange = () => { }


    const StyledTextField = styled(TextField, {
        name: "StyledTextField",
    })({

        "& .MuiInputBase-root": {
            height: 44,
            marginBottom: "22px",
        }
    });


    return (
        <Grid container columnSpacing={4} justifyContent="space-between">

            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Trading Name</InputLabel>
                <StyledTextField variant='outlined' fullWidth placeholder='Trading Name' />
            </Grid>
            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Business name</InputLabel>
                <StyledTextField variant='outlined' fullWidth placeholder='Business name' />
            </Grid>
            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Business Description</InputLabel>
                <StyledTextField variant='outlined' fullWidth placeholder='Business Description' />
            </Grid>
            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>What is your business category</InputLabel>
                <Select
                    sx={{

                        height: 44,
                    }}
                    fullWidth
                >
                    {categoryList?.map(({ name, code }) => (
                        <MenuItem key={code} value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </Grid>

            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Website url</InputLabel>
                <StyledTextField variant='outlined' fullWidth placeholder='www.website.com' />
            </Grid>

            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Support email </InputLabel>
                <StyledTextField variant='outlined' fullWidth placeholder='Support email ' />
            </Grid>


            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Support phone number</InputLabel>
                <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleOnChange} sx={{
                    ".css-x9mhkq-MuiInputBase-root-MuiOutlinedInput-root ": {
                        height: "44px"
                    }
                }} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} mb="22px">
                <InputLabel className={Styles.label}>Chargeback email</InputLabel>
                <StyledTextField variant='outlined' fullWidth placeholder='Chargeback email' />
            </Grid>
            <Grid item xs={12} sm={6} md={6}></Grid>
            <br />
            <div className="continueBtn" style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", width: "100%" }}>
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
                    onClick={handleNext}>Continue</button>
            </div>

        </Grid>
    )
}

export default ProfileBusinessInfo