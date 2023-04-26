import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./transfers.module.scss";
import queryString from "query-string";
import EmptyTransfers from "../../components/emptyContent/EmptyTransfers";
import TransfersTable from "../../components/table/TransfersTable";
import ParentContainer from "../../components/ParentContainer/ParentContainer";
import Listtransfer from "./transfer/Listtransfer";

const Transfers = () => {
  // const { currency } = queryString.parse(location.search);
  const currency = "";
  const currencies = ["NGN", "USD", "EUR", "GBP"];
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  return (

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

  );
};

export default Transfers;
