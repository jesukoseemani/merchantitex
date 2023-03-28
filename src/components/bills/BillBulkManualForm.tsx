import React, { useState } from "react";
import { countryListAllIsoData } from "../../helpers/Countries";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Styles from "./payment.module.scss";
import { Box, Button, Grid, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";

interface BillProps {
  id: string;
  name: string;
}
interface PackagesProps {
  id: string;
  name: string;
}

const BillBulkManualForm = () => {
  const bills: BillProps[] = [
    {
      id: "1",
      name: "DSTV",
    },
    {
      id: "2",
      name: "GOTV",
    },
    {
      id: "3",
      name: "STARTIME",
    },
  ];

  const packages: PackagesProps[] = [
    {
      id: "1",
      name: "comapact plus",
    },
    {
      id: "2",
      name: "comapact minus",
    },
  ];




  const [country, setCountry] = useState("")
  return (
    <div className={Styles.bulk__payment__input__container} style={{ height: "auto", borderRadius: "20px", background: "#F8F8F8" }}>
      <div className={Styles.form__title}>
        <h3>Input Details Manually</h3>
      </div>

      <div className={Styles.bill_form__body}>





        <form>

          <Grid container>
            <Grid item xs={12}>
              <InputLabel htmlFor="country" className={Styles.label}>Country</InputLabel>
              <TextField
                select
                sx={{ marginBottom: "18px", }}
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {/* <Box> */}
                {countryListAllIsoData?.map(({ name, code }) => (
                  <MenuItem key={code} value={name}>{name}</MenuItem>
                ))}
                {/* </Box> */}
              </TextField>

            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="country" className={Styles.label}

              >Bills</InputLabel>
              <TextField
                select
                sx={{ marginBottom: "18px", }}
                fullWidth
              >
                {/* <Box> */}
                {bills?.map(({ name, id }) => (
                  <MenuItem key={id} value={name}>{name}</MenuItem>
                ))}
                {/* </Box> */}
              </TextField>

            </Grid>



            <Grid item xs={12}>

              <InputLabel htmlFor="amount" className={Styles.label}>Bill payment ID</InputLabel>
              <TextField
                name='billpayment'
                placeholder='1336578903'
                variant='outlined'

                size='small'
                fullWidth
                sx={{ marginBottom: "18px", }}


              />

            </Grid>
            <Grid item xs={12}>
              <Box className="Amount" sx={{ padding: 0 }}>
                <InputLabel htmlFor="amount" className={Styles.label}>Amount</InputLabel>
                <TextField
                  name='accountnumber'
                  placeholder='Account Number'
                  variant='outlined'

                  size='small'
                  fullWidth

                  sx={{ marginBottom: "18px", }} />

              </Box>

            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="country" className={Styles.label}>Packages</InputLabel>
              <TextField
                select
                sx={{ height: 44, marginBottom: "18px", }}
                fullWidth
              >
                <MenuItem value="">Select packages</MenuItem>
                {packages?.map((x) => (
                  <MenuItem key={x?.id} value={x?.name}>
                    {x?.name}
                  </MenuItem>
                ))}

              </TextField>

            </Grid>
          </Grid>



          <div className="submit">
          </div>
          <Button className={Styles.btn_button} disableFocusRipple variant="contained" style={{ textTransform: "inherit" }}>+ Add Bill</Button>
        </form>
      </div>
    </div>
  );
};

export default BillBulkManualForm;
