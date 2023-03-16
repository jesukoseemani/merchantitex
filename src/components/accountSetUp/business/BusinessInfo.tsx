import { Grid, TextField, InputLabel, Box } from '@mui/material'
import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import Button from '../Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { categoryList } from '../../../helpers/CategoryList';
import { styled } from '@mui/system'
import styles from "../style.module.scss"


interface Props {
    handleNext: () => void
}
const BusinessInfo = ({ handleNext }: Props) => {
    const [age, setAge] = React.useState('');
    const handleOnChange = () => { }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };



    return (
        <Box sx={{ marginTop: "-10px" }}>
            <Grid container columnSpacing={4} justifyContent="space-between">

                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>Registered business name</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='Registered business name' />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>RC Number</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='RC Number' />
                </Grid>

                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>Trading Name(Optional)</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='Trading Name(Optional)' />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>Business email Address</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='Business email Address' />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>Business phone number</InputLabel>
                    <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleOnChange} sx={{
                        ".css-x9mhkq-MuiInputBase-root-MuiOutlinedInput-root ": {
                            height: "44px"
                        }
                    }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>Business Description</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='Business Description' />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>Website url</InputLabel>
                    <TextField variant='outlined' fullWidth placeholder='www.website.com' />
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px">
                    <InputLabel className={styles.label}>What is your business category</InputLabel>
                    <Select

                        fullWidth
                    >
                        {categoryList?.map(({ name, code }) => (
                            <MenuItem key={code} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={6} mb="22px"></Grid>
                <br />
                <div className="continueBtn" style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", marginBottom: "4rem", width: "100%" }}>
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
        </Box>
    )
}

export default BusinessInfo