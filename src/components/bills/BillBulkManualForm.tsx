import React, { useState } from "react";
import { countryListAllIsoData } from "../../helpers/Countries";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Styles from "./payment.module.scss";
import { Box, Button, Grid, InputLabel, Select, styled, TextField } from "@mui/material";

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


  const StyledTextField = styled(TextField, {
    name: "StyledTextField",
  })({

    "& .MuiInputBase-root": {
      height: 44,
      marginBottom: "18px",
      padding: 0,
    }
  });

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
              <Select
                sx={{ height: 44, marginBottom: "18px", }}
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)} style={{ paddingLeft: "10px" }}
              >
                {/* <Box> */}
                {countryListAllIsoData?.map(({ name, code }) => (
                  <option key={code} value={name}>{name}</option>
                ))}
                {/* </Box> */}
              </Select>

            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="country" className={Styles.label}>Bills</InputLabel>
              <Select
                sx={{ height: 44, marginBottom: "18px", }}
                fullWidth
              >
                {/* <Box> */}
                {bills?.map(({ name, id }) => (
                  <option style={{ paddingLeft: "10px" }} key={id} value={name}>{name}</option>
                ))}
                {/* </Box> */}
              </Select>

            </Grid>



            <Grid item xs={12}>

              <InputLabel htmlFor="amount" className={Styles.label}>Bill payment ID</InputLabel>
              <StyledTextField
                name='billpayment'
                placeholder='1336578903'
                variant='outlined'

                size='small'
                fullWidth

              // sx={{
              //   ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": { padding: 0 }
              // }}
              />

            </Grid>
            <Grid item xs={12}>
              <Box className="Amount" sx={{ padding: 0 }}>
                <InputLabel htmlFor="amount" className={Styles.label}>Amount</InputLabel>
                <StyledTextField
                  name='accountnumber'
                  placeholder='Account Number'
                  variant='outlined'

                  size='small'
                  fullWidth

                // sx={{
                //   ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": { padding: 0 }
                // }}
                />
              </Box>

            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="country" className={Styles.label}>Packages</InputLabel>
              <Select
                sx={{ height: 44, marginBottom: "18px", }}
                fullWidth
              >
                <option value="">Select packages</option>
                {packages?.map((x) => (
                  <option key={x?.id} value={x?.name}>
                    {x?.name}
                  </option>
                ))}

              </Select>

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
