import React from "react";
import Styles from "./transferTable.module.scss";
import NavBar from "../../components/navbar/NavBar";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TransfersTable from "../../components/table/TransfersTable";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

export default function TransferTable() {
  return (

    <div className={Styles.container}>
      {/* <NavBar /> */}
      {/* <div className={Styles.tableContainer}>
          <div className={Styles.tableHeader}>
            <h2>19 transactions</h2>
            <div>
              <Button>
                All Transfers <ArrowDropDownIcon />
              </Button>
              <Button>Download</Button>
              <Button className={Styles.success}>+ New transfer</Button>
            </div>
          </div>
          <TransfersTable />
        </div> */}
    </div>
  );
}
