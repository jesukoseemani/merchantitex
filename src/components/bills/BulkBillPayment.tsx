import React from "react";
import NavBar from "../navbar/NavBar";
import BulkManualForm from "./AirtimeBulkManualForm";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import Styles from "./payment.module.scss";
import BillBulkManualForm from "./BillBulkManualForm";
import ParentContainer from "../ParentContainer/ParentContainer";

const BulkBillPayment = () => {
  return (


    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginInline: "auto",
      }}
    >
      <NavBar />
      <div className={Styles.bulk__bill__payment__container}>
        <h3>Bulk airtime purchase</h3>
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
                  <label htmlFor="upload">
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
          <div className="or"></div>
          <div className="bill__form">
            <BillBulkManualForm />
          </div>
        </div>
      </div>
    </div>

  );
};

export default BulkBillPayment;
