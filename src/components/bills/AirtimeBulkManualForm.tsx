import React from "react";
import { countryListAllIsoData } from "../../helpers/Countries";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Styles from "./payment.module.scss";
import { Button } from "@material-ui/core";

const BulkManualForm = () => {
  return (
    <div className={Styles.bulk__payment__input__container}>
      <div className={Styles.form__title}>
        <h3>Input Details Manually</h3>
      </div>

      <div className={Styles.airtime_form__body}>
        <form>
          <div className="country">
            <label htmlFor="country">Country</label>
            <select name="country" id="country">
              {countryListAllIsoData?.map((x) => (
                <option key={x?.code} value={x?.name}>
                  {x?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="Phone">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="+2349069003426"
              id="phone"
              name="phone"
            />
          </div>
          <div className="Amount">
            <label htmlFor="amount">Amount</label>
            <input type="number" placeholder="0.01" name="phone" />
          </div>

          <div className="submit">
          </div>
          <Button disableFocusRipple variant="contained" startIcon={<AddOutlinedIcon sx={{ textAlign: "center", position: "absolute", top: "20%", transform: "translate(-50%-50%)", left: "23%" }} />}>Comfirm Purchase</Button>
        </form>
      </div>
    </div>
  );
};

export default BulkManualForm;
