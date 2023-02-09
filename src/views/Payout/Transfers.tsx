import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./transfers.module.scss";
import queryString from "query-string";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import TransfersTable from "../../components/table/TransfersTable";

const Transfers = () => {
  // const { currency } = queryString.parse(location.search);
  const currency = "";
  const currencies = ["NGN", "USD", "EUR", "GBP"];
  return (
    <div className={Styles.container}>
      <NavBar />
      <div className={Styles.currencies}>
        <ul>
          {currencies?.map((cur, index) => (
            <Link
              key={index}
              className={cur === currency ? Styles.active : ""}
              to={`/payout/transfers?currency=${cur}`}
            >
              {cur}
            </Link>
          ))}
        </ul>
        <button>Fund balance</button>
      </div>
      <div className={Styles.panel}>
        <div>
          <div>
            <span>Available balance:</span>
            <h2>NGN 2,345,678.00</h2>
          </div>
        </div>
        <div>
          <div>
            <span>Total transfers:</span>
            <h2>NGN 2,345,678.00</h2>
          </div>
        </div>
        <div>
          <div>
            <span>Successful transfers:</span>
            <h2>22</h2>
          </div>
        </div>
      </div>
      <EmptyTransfers />
    </div>
  );
};

export default Transfers;
