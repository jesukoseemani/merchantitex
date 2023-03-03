import React from "react";
import { countryListAllIsoData } from "../../helpers/Countries";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Styles from "./payment.module.scss";
import { Button, } from "@material-ui/core";
import { styled } from "@mui/system";
import { Box, TextField, InputLabel, Select, Grid } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { MenuItem } from "semantic-ui-react";
import { ErrorMessage } from "formik";

const BulkManualForm = () => {

  const StyledTextField = styled(TextField, {
    name: "StyledTextField",
  })({

    "& .MuiInputBase-root": {
      height: 44,
      marginBottom: "18px",
      padding: 0,
    }
  });
  const handleOnChange = () => { }
  return (
    <div className={Styles.bulk__payment__input__container}>
      <div className={Styles.form__title}>
        <h3>Input Details Manually</h3>
      </div>

      <div className={Styles.airtime_form__body}>
        <form>

          <Grid container>
            <Grid item xs={12}>
              <InputLabel htmlFor="country" className={Styles.label}>Country</InputLabel>
              <Select
                sx={{ height: 44, marginBottom: "18px", }}
                fullWidth
              >
                {/* <Box> */}
                {countryListAllIsoData?.map(({ name, code }) => (
                  <option style={{ paddingLeft: "10px" }} key={code} value={name}>{name}</option>
                ))}
                {/* </Box> */}
              </Select>

            </Grid>
            <Grid item xs={12}>

              <InputLabel className={Styles.label}>Phone number</InputLabel>
              <MuiPhoneNumber variant='outlined' fullWidth defaultCountry={'us'} onChange={handleOnChange} sx={{
                ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input ": {
                  height: "44px",
                  padding: "0px !important",

                },
                background: "transparent",
                marginBottom: "0px",
              }} />
            </Grid>
          </Grid>
          <div className="country">

          </div>
          <div className="Phone">
          </div>
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

          <div className="submit">
          </div>
          <Button className={Styles.btn_button} disableFocusRipple variant="contained" style={{ textTransform: "inherit" }}>+ Add number</Button>
        </form>
      </div>
    </div>
  );
};

export default BulkManualForm;
