import { Box, Stack, Button } from "@mui/material";
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
  return (
    <div
      className={Styles.single_payment__input__container}

    >
      <div className={Styles.form__title}>
        <h3>Bill Payment</h3>
      </div>

      <div className={Styles.single_bill_bulk_form__body}>
        <form>
          <div className={Styles.category}>
            <label htmlFor="category">Category</label>
            <Stack direction={"row"} spacing={1} justifyContent="space-between" alignItems={"center"}>
              <span id="electricity">Electricity</span>
              <span id={"cable tv"}>Cable Tv</span>
              <span id="internet">internet</span>
              <span id="others">Others</span>
            </Stack>
          </div>
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
          <div className="bill">
            <label htmlFor="Bills">Bills</label>
            <select name="bill" id="bill">
              <option value="">Select bills</option>
              {bills?.map((x) => (
                <option key={x?.id} value={x?.name}>
                  {x?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="paymentId">
            <label htmlFor="paymentId">Bill payment ID</label>
            <input
              type="text"
              placeholder="1336578903"
              id="paymentId"
              name="paymentId"
            />
          </div>
          <div className="package">
            <label htmlFor="packages">Packages</label>
            <select name="package" id="package">
              <option value="">Select packages</option>
              {packages?.map((x) => (
                <option key={x?.id} value={x?.name}>
                  {x?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="Amount">
            <label htmlFor="amount">Amount</label>
            <input type="number" placeholder="0.01" name="phone" />
          </div>

          <div className="submit">
            <button style={{ borderRadius: "20px" }} type="submit">Comfirm Purchase</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleBillPayment;
