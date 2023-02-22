import React from "react";
import { countryListAllIsoData } from "../../helpers/Countries";

import Styles from "./payment.module.scss";

const SingleAirtimePayment = () => {
  return (
    <div className={Styles.payment__input__container}>
      <div className={Styles.form__title}>
        <h3>Buy Airtime1</h3>
      </div>

      <div className={Styles.single_bill_form__body}>
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
          <div className="freq">
            <label htmlFor="recharge">How often do you want to recharge?</label>
            <select name="recharge" id="recharge">
              <option value="1days">1 days</option>
              <option value="1days">1 weeks</option>
            </select>
          </div>
          <div className="submit">
            <button type="submit">Comfirm Purchase</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleAirtimePayment;
