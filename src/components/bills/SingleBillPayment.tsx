import { Box, Stack, Button, styled, Grid, InputLabel, Select, TextField } from "@mui/material";
import React from "react";
import { countryListAllIsoData } from "../../helpers/Countries";

import Styles from "./payment.module.scss";

interface BillProps {
  id: string;
  name: string;
}
interface PackagesProps {
  id: string;
  name: string;
}

const SingleBillPayment = () => {
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

  const handleOnChange = () => { }
  return (
    <div

    >
      <form>
        <Box >
          <label htmlFor="category">Category</label>
          {/* <Stack direction={"row"} spacing={1} justifyContent="space-between" alignItems={"center"}> */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}

            className={Styles.category}>
            <span id="electricity">Electricity</span>
            <span id={"cable tv"}>Cable Tv</span>
            <span id="internet">internet</span>
            <span id="others">Others</span>
          </Box>
          {/* </Stack> */}
        </Box>
        <Grid container>
          <Grid item xs={12}>
            <InputLabel htmlFor="country" className={Styles.label}>Country</InputLabel>
            <Select
              sx={{ height: 44, marginBottom: "18px", }}
              fullWidth
            // value={country}

            >
              {/* <Box> */}
              {countryListAllIsoData?.map(({ name, code }) => (
                <option style={{ paddingLeft: "10px" }} onChange={handleOnChange} key={code} value={name}>{name}</option>
              ))}
              {/* </Box> */}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="country" className={Styles.label}>Bills</InputLabel>
            <Select
              sx={{ height: 44, marginBottom: "18px", }}
              fullWidth
            // value={country}

            >
              {/* <Box> */}
              {bills?.map(({ name, id }) => (
                <option style={{ paddingLeft: "10px" }} onChange={handleOnChange} key={id} value={name}>{name}</option>
              ))}
              {/* </Box> */}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="country" className={Styles.label}>Bill payment ID</InputLabel>
            <StyledTextField type="text"
              placeholder="1336578903"
              id="paymentId"
              fullWidth
              name="paymentId" />


          </Grid>



          <Grid item xs={12}>
            <InputLabel htmlFor="country" className={Styles.label}>Packages</InputLabel>
            <Select
              sx={{ height: 44, marginBottom: "18px", }}
              fullWidth
            // value={country}

            >
              {/* <Box> */}
              <option value="">Select packages</option>
              {packages?.map(({ name, id }) => (
                <option style={{ paddingLeft: "10px" }} onChange={handleOnChange} key={id} value={name}>{name}</option>
              ))}
              {/* </Box> */}
            </Select>
          </Grid>


          <Grid item xs={12}>
            <InputLabel htmlFor="country" className={Styles.label}>Amount</InputLabel>
            <StyledTextField type="number"
              placeholder="0.01"
              id="paymentId"
              fullWidth
              name="phone" />


          </Grid>
          <Grid item xs={12}>

            <button style={{ borderRadius: "20px", width: "100%" }} type="submit">Comfirm Purchase</button>
          </Grid>



        </Grid>




      </form>



    </div>
  );
};

export default SingleBillPayment;
