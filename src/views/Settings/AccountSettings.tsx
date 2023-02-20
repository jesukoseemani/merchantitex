import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Styles from "./Settings.module.scss";
import { Button, Form, Checkbox, Divider, Radio } from "semantic-ui-react";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

const WebHooks = () => {
  const countryList = [
    {
      key: 1,
      value: "nigeria",
      text: "Nigeria",
      flag: "ng",
    },
    {
      key: 2,
      value: "ghana",
      text: "Ghana",
      flag: "gh",
    },
    {
      key: 3,
      value: "us",
      text: "United State of America",
      flag: "us",
    },
  ];
  return (

    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* <NavBar /> */}
      <div className={Styles.container}>
        <div className={Styles.formHeader}>
          <div>
            <h2>Account preferences</h2>
          </div>
          <button style={{ borderRadius: "20px", padding: "10px 20px" }} className="success">Save settings</button>
        </div>
        <div className={Styles.wrapper}>
          <div className={Styles.checkboxGrid}>
            <div>
              <div>
                <div className={Styles.header}>
                  <h2>What methods of payment do you want?</h2>
                </div>
                <Checkbox label="Enable Dashboard Payment Options" />
                <Checkbox label="Enable Card Payments" />
                <Checkbox label="Enable Bank Payment Options" />
                <Checkbox label="Enable PayVice Payments" />
                <Checkbox label="Enable Mobile Money" />
              </div>
              <div>
                <Checkbox label="Enable QR" />
                <Checkbox label="Enable PayAttitude" />
                <Checkbox label="Enable Paga" />
                <Checkbox label="Enable USSD" />
              </div>
            </div>
          </div>
          <Divider className={Styles.divider} />
          <div className={Styles.checkboxGrid}>
            <div>
              <div>
                <div className={Styles.header}>
                  <h2>Who should pay the transaction fees?</h2>
                </div>
                <Radio
                  name="fees"
                  radio
                  label="Enable Dashboard Payment Options"
                />
                <Radio name="fees" radio label="Enable Card Payments" />
                <Radio name="fees" radio label="Enable Bank Payment Options" />
                <Radio name="fees" radio label="Enable PayVice Payments" />
                <Radio name="fees" radio label="Enable Mobile Money" />
              </div>
              <div>
                <div className={Styles.header}>
                  <h2>Transaction Emails</h2>
                </div>
                <Checkbox label="Email me for every transaction" />
              </div>
            </div>
          </div>
          <Divider className={Styles.divider} />
          <div className={Styles.checkboxGrid}>
            <div>
              <div>
                <div className={Styles.header}>
                  <h2>Transaction Emails (Customers)</h2>
                </div>
                <Checkbox label="Email customers for every transaction" />
              </div>
              <div>
                <div className={Styles.header}>
                  <h2>Transfer and payout receipts</h2>
                </div>
                <Checkbox label="Send email receipts for successful transfers." />
              </div>
            </div>
          </div>
          <Divider className={Styles.divider} />
          <div className={Styles.checkboxGrid}>
            <div>
              <div>
                <div className={Styles.header}>
                  <h2>Send notification emails to other users</h2>
                </div>
                <Radio
                  name="users"
                  radio
                  label="Send to the business email address only"
                />
                <Radio name="users" radio label="Send to all dashboard users" />
                <Radio name="users" radio label="Send to specific users only" />
                <div className={Styles.formField}>
                  <Form.Input
                    fluid
                    className={Styles.quarterField}
                    name="slot1"
                    placeholder="Enter a custom hook URL"
                  />
                </div>
              </div>
              <div>
                <div className={Styles.header}>
                  <h2>How do you want to get your earnings?</h2>
                </div>
                <Radio
                  name="earnings"
                  radio
                  label="Settlement to bank account"
                />
                <p>
                  This means your earnings will be transferred to the bank
                  account you added to your Flutterwave profile.
                </p>
                <Radio name="earnings" radio label="Settlement to wallet" />
                <p>
                  Choosing this settlement method means your earnings will be
                  transferred from your ledger to your available balance in your
                  wallet.
                </p>
              </div>
            </div>
          </div>
          <Divider className={Styles.divider} />
          <div className={Styles.checkboxGrid}>
            <div>
              <div>
                <div className={Styles.header}>
                  <h2>Two Factor Authentication</h2>
                </div>
                <Checkbox label="Enable Two Factor Aunthentication for transfers." />
                <p>
                  Two Factor Authentication, also known as 2FA, is an extra
                  layer of security that requires not only a password but also
                  something that only that user has on them. In this case, your
                  phone number and email address.
                </p>
              </div>
              <div>
                <div className={Styles.header}>
                  <h2>Subscription Emails</h2>
                </div>
                <Checkbox label="Allows customer cancel subscriptions" />
                <p>
                  This option allows you to include the 'Cancellation Link' on
                  the subscription emails being sent to your customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebHooks;
