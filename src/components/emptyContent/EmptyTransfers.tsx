import React, { useState, useEffect } from "react";
import Styles from "./transfers.module.scss";
import {
  Dropdown,
  Menu,
  Button,
  Header,
  Image,
  Modal,
  Checkbox,
  Form,
  Select,
} from "semantic-ui-react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import SingleTransferBankAcct from "../../views/Payout/transfer/SingleTransferBankAcct";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import Confirmation from "../../views/Payout/transfer/Confirmation";
import { useDispatch } from "react-redux";

export default function EmptyTransfers() {
  const history = useHistory();
  const dispatch = useDispatch();

  const transferLink = () => {
    history.push("/payout/transfers/list");
  };

  const [openBankModel, setOpenBankModel] = useState(false);
  const [openPayviceModel, setOpenPayviceModel] = useState(false);
  const [openItexModel, setOpenItexModel] = useState(false);
  const [openBulkModel, setOpenBulkModel] = useState(false);
  const countryOptions = [
    { key: 1, value: "NGN", text: "NGN balance - 123,456.78" },
    { key: 2, value: "USD", text: "USD balance - 689,456.78" },
  ];
  const bankNameOptions = [
    { key: 1, value: "NGN", text: "NGN balance - 123,456.78" },
    { key: 2, value: "USD", text: "USD balance - 689,456.78" },
  ];

  const ItexModalPayout = () => {
    return (
      <Modal
        onClose={() => setOpenItexModel(false)}
        onOpen={() => setOpenItexModel(true)}
        open={openItexModel}
        className={Styles.modalContainer}
      >
        <div className={Styles.modalHeader}>
          <h2>Single payout</h2>
          <IconButton onClick={() => setOpenItexModel(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Form.Field className={Styles.inputWrapper}>
          <label>Balance to be debited</label>
          <Select
            placeholder="NGN balance - 123,456.78"
            options={countryOptions}
          />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Payout amount</label>
          <input placeholder="NGN 0.0" />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Select beneficiary amount</label>
          <Select
            placeholder="123,456.78"
            options={bankNameOptions}
          />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Payout desciption (optional)</label>
          <input placeholder="Thank you" />
        </Form.Field>
        <p>
          <InfoOutlinedIcon />
          You will be charged <span> NGN45</span> fee for this transaction
        </p>
        <div className={Styles.modalFooter}>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Modal>
    );
  };

  const handleSubmit = () => {
    setOpenItexModel(false)
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: "20px",
          width: "560.66px",
          height: "442px",
          overflow: "hidden"
        },
        modalContent: (
          <>
            <Confirmation />
          </>
        ),
      })
    );
  }

  return (
    <>
      <ItexModalPayout />
      <div className={Styles.container}>
        <h2>You have not made any payouts</h2>
        <p>
          But, you can change that. You can start by initiating your first to a bank account.
        </p>
        <Button className="success">
          <Dropdown.Item onClick={() => setOpenItexModel(true)}>
            Make a payout
          </Dropdown.Item>
        </Button>
      </div>
    </>
  );
}
