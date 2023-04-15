import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./Settings.module.scss";
// import { Button, Form, Checkbox, Divider, Radio } from "semantic-ui-react";
import ParentContainer from "../../components/ParentContainer/ParentContainer";
import { Checkbox, Radio, Box, FormGroup, FormControlLabel, FormControl, FormLabel, RadioGroup, Grid, TextField, MenuItem } from '@mui/material';

const WebHooks = () => {

  const [user, setUser] = useState("")
  const [generate, setgenerate] = useState("")
  const countryList = [
    {
      key: 1,
      value: "nigeria",
      text: "Nigeria",
      flag: "ng",
    },
    {
      key: 2,
      value: "ghana",
      text: "Ghana",
      flag: "gh",
    },
    {
      key: 3,
      value: "us",
      text: "United State of America",
      flag: "us",
    },
  ];




  // handle qrcode

  const handleQrCOde = () => {

  }
  return (

    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* <NavBar /> */}
      <div className={Styles.container} style={{ width: "100%" }}>
        <div className={Styles.formHeader}>
          <div>
            <h2>Account preferences</h2>
          </div>
          <button style={{ borderRadius: "20px", height: "39px", width: "131px" }} className="success">Save settings</button>
        </div>
        <div className={Styles.wrapper}>
          <div style={{ marginBottom: "100px" }}>
            <FormControl sx={{
              width: "100%"
            }}>


              <FormLabel component="legend">What methods of payment do you want?</FormLabel>
              <Grid container columnSpacing={1}>

                <Grid item xs={12} sm={6} md={6} >
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable Dashboard Payment Options" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable Card Payment" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable PayVice Payments" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable Bank Payment Options" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable Mobile Money" />
                  </FormGroup>

                </Grid>
                <Grid item xs={12} sm={6} md={6} >
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleQrCOde} />} label="Enable QR" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable PayAttitude" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable Paga " />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Enable USSD" />
                  </FormGroup>

                </Grid>
              </Grid>
            </FormControl>
          </div>

          <div>


            <Grid container columnSpacing={1} mb={"100px"}>

              <Grid item xs={12} sm={6} md={6}>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Who should pay the transaction fees?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="Make customers pay the transaction fees" control={<Radio defaultChecked />} label="Make customers pay the transaction fees" />
                    <FormControlLabel value="Charge me for the transaction fees" control={<Radio />} label="Charge me for the transaction fees" />
                  </RadioGroup>
                </FormControl>

              </Grid>

              <Grid item xs={12} sm={6} md={6}>


                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Transaction Emails</FormLabel>

                  <FormControlLabel control={<Checkbox defaultChecked />} label="Email me for every transaction" />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div>


            <Grid container columnSpacing={1} mb={"100px"}>

              <Grid item xs={12} sm={6} md={6}>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Send notification emails to other users</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="Send to the business email address only" control={<Radio defaultChecked />} label="Send to the business email address only" />
                    <FormControlLabel value="Send to all dashboard users" control={<Radio />} label="Send to all dashboard users" />
                    <FormControlLabel value="Send to specific users only" control={<Radio />} label="Send to specific users only" />
                  </RadioGroup>
                  <Box>
                    <TextField
                      select
                      // className={Styles.quarterField}
                      fullWidth
                      name="slot1"
                      placeholder="select user"
                      defaultValue={"select user"}
                      sx={{ background: "#fff", border: "none", color: "#000" }}
                      value={user}
                      onChange={(e) => setUser(e.target.value)}

                    >
                      <MenuItem>User</MenuItem>
                    </TextField>
                  </Box>
                </FormControl>

              </Grid>

              <Grid item xs={12} sm={6} md={6}>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">How do you want to get your earnings?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >

                    <FormControlLabel value="Settlement to bank account" control={<Radio />} label="Send to all dashboard users"

                    />
                    <Box sx={{ marginTop: "-0.9rem", marginLeft: "2rem" }}>
                      <p className={Styles.helperText}>This means your earnings will be transferred to the bank account you added to your Flutterwave profile.</p>
                    </Box>


                    <FormControlLabel value="Settlement to bank account" control={<Radio />} label="Send to all dashboard users"

                    />
                    <Box sx={{ marginTop: "-0.9rem", marginLeft: "2rem" }}>
                      <p className={Styles.helperText}>Choosing this settlement method means your earnings will be transferred from your ledger to your available balance in your wallet.</p>
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>


          <Box>

            <Grid container spacing={10} mb={4}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl>


                  <FormLabel id="demo-radio-buttons-group-label">Two Factor Authentication</FormLabel>

                  <FormControlLabel control={<Checkbox />} label="Enable Two Factor Aunthentication for transfers." />
                  <Box sx={{ marginTop: "-0.7rem", marginLeft: "2rem" }}>
                    <p className={Styles.helperText}>Two Factor Authentication, also known as 2FA, is an extra
                      layer of security that requires not only a password but also
                      something that only that user has on them. In this case, your
                      phone number and email address.</p>
                  </Box>



                </FormControl>


              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl>



                  <FormLabel id="demo-radio-buttons-group-label">Subscription Emails</FormLabel>

                  <FormControlLabel control={<Checkbox />} label="Allows customer cancel subscriptions" />
                  <Box sx={{ marginTop: "-0.7rem", marginLeft: "2rem" }}>
                    <p className={Styles.helperText}>
                      This option allows you to include the 'Cancellation Link' on
                      the subscription emails being sent to your customers.
                    </p>
                  </Box>

                </FormControl>

              </Grid>
            </Grid>



          </Box>
        </div>
      </div>
    </div >
  );
};

export default WebHooks;
