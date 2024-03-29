import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./transfers.module.scss";
import queryString from "query-string";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import TransfersTable from "../../components/table/TransfersTable";
import ParentContainer from "../../components/ParentContainer/ParentContainer";
import Listtransfer from "./transfer/Listtransfer";
import { getPayoutService } from "../../services/payout";
import Navigation from "../../components/navbar/Navigation";

const Transfers = () => {
  // const { currency } = queryString.parse(location.search);
  const currency = "";
  const currencies = ["NGN", "USD", "EUR", "GBP"];
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    getPayoutService()
  }, [])
  return (

    <Navigation title="Payouts">

      <div className={Styles.container}>

        <div className={Styles.panel}>
          <div>
            <div>
              <span>Payout balance:</span>
              <h2>NGN 2,345,678.00</h2>
            </div>
          </div>
          <div>
            <div>
              <span>Total transfer value:</span>
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
        {isEmpty ? <EmptyTransfers /> : <Listtransfer />}
        {/* <EmptyTransfers /> */}
      </div>
    </Navigation>


  );
};

export default Transfers;
