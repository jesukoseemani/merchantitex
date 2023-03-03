import React from "react";
import NavBar from "../navbar/NavBar";
import BulkManualForm from "./AirtimeBulkManualForm";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import Styles from "./payment.module.scss";
import BillBulkManualForm from "./BillBulkManualForm";
import ParentContainer from "../ParentContainer/ParentContainer";
import { Grid } from "@mui/material";
import { Box } from "@material-ui/core";
import BillPaymentEntry from "./BillPaymentEntry";


const BulkBillPayment = () => {
  return (


    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginInline: "auto",
        }}
      >
        {/* <NavBar /> */}
        <div className={Styles.bulk__bill__payment__container}>
          <h3 style={{ padding: "10px 0", marginTop: "38px", marginBottom: "30px" }}>Bulk airtime purchase</h3>



          <Grid container spacing={{ xs: 2 }} justifyContent={"space-between"} >

            <Grid item xs={12} sm={12} md={7}>
              <Box sx={{ width: "100%", height: "481px", borderRadius: "20px" }} bgcolor="#F8F8F8">
                <div className={Styles.bulk_payment_body}>
                  <div className={Styles.upload__requirement}>
                    <div className={Styles.form__title}>
                      <h3>File upload requirements</h3>
                    </div>

                    <div className={Styles.files_text}>
                      <h4>Files must be CSV</h4>
                      <p>
                        CSV file should contain{" "}
                        <span>Country, Bill, Bill payment ID, Bill package,</span> and{" "}
                        <span>Amount</span> columns.
                      </p>
                      <p>
                        The order of the columns should be the same as the order in
                        which they are listed above with the first row header.
                      </p>
                    </div>
                    <div className={Styles.upload_csv}>
                      <p>Bulk bill payment CSV file</p>
                      {/* <h3>Bulk bill payment CSV file</h3> */}
                      <form>
                        <div>
                          <label>
                            <BackupOutlinedIcon />{" "}
                            <span style={{ padding: "20px" }}>
                              Choose file to upload
                            </span>
                          </label>
                          <input type="file" name="file" id="upload" />
                          <div className="submit">
                            <button type="submit">Continue</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </Box>
            </Grid>

            <Grid item md={1} sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
              <Box sx={{ height: "481px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <div className={Styles.line}>


                </div>

              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box bgcolor="#F8F8F8" width={"100%"}>
                <div className={Styles.bill__form}>
                  <BillBulkManualForm />
                </div>
              </Box>
            </Grid>


            <Grid item xs={12}>
              <div>
                <BillPaymentEntry />
              </div>
            </Grid>
          </Grid>


          {/* bill payment entry */}
        </div>
      </div>




    </>

  );
};

export default BulkBillPayment;
