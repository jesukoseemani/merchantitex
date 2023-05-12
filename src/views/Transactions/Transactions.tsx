import React from "react";
import Styles from "./Transactions.module.scss";
import { Button } from "semantic-ui-react";
import NavBar from "../../components/navbar/NavBar";
import { useHistory } from "react-router-dom";
import TransactionsList from "./List";
import ParentContainer from "../../components/ParentContainer/ParentContainer";
import Navigation from "../../components/navbar/Navigation";

const Transaction = () => {
  const history = useHistory();
  return (
    <Navigation title="Transactions">
      <div className={Styles.container}>
        <TransactionsList />
      </div>

    </Navigation>
  );
};

export default Transaction;
