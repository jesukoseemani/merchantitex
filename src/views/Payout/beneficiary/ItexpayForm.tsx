import { Box, InputLabel, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react'
import Styles from "./style.module.scss";
import { countryListAllIsoData } from '../../../helpers/Countries';
import { banks } from '../../../helpers/bankslists';

const ItexpayForm = () => {
    const [country, setCountry] = useState("")
    return (
        <Box className={Styles.container}>
            <Box className={Styles.formHeader}>
                <h2>Add ITEX Pay beneficiary</h2>
            </Box>

            <Box className={Styles.formBody}>
                <div>
                    <InputLabel>Country</InputLabel>
                    <TextField fullWidth defaultValue={"Nigeriaa"} value={country} select onChange={(e) => setCountry(e.target.value)}>

                        {countryListAllIsoData?.map(({ code, name }) => (
                            <option value={name} key={code} style={{ padding: '10px' }}>{name}</option>
                        ))}

                    </TextField>
                </div>

                <div>
                    <InputLabel>Merchant ID</InputLabel>
                    <TextField fullWidth placeholder='1234567890' />


                </div>
                <p>Account name: <span>James Holiday</span></p>

                <button>Continue</button>
            </Box>



        </Box>
    )
}



export default ItexpayForm