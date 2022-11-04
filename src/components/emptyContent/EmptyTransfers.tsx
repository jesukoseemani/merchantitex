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

export default function EmptyTransfers() {
  const history = useHistory();

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
  const BankModalPayout = () => {
    return (
      <Modal
        onClose={() => setOpenBankModel(false)}
        onOpen={() => setOpenBankModel(true)}
        open={openBankModel}
        className={Styles.modalContainer}
      >
        <div className={Styles.modalHeader}>
          <h2>Single payout</h2>
          <IconButton onClick={() => setOpenBankModel(false)}>
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
          <label>Bank name</label>
          <Select placeholder="Access bank" options={bankNameOptions} />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Account number</label>
          <input placeholder="1234567890" />
        </Form.Field>
        <div className={Styles.inputDivider}>
          <h2>James Holiday</h2>
          <Link to="#">+ Add a new recipient</Link>
        </div>
        <Form.Field className={Styles.inputWrapper}>
          <label>Payout desciption (optional)</label>
          <input placeholder="Thank you" />
        </Form.Field>
        <p>
          <InfoOutlinedIcon />
          You will be charged <span> NGN45</span> fee for this transaction
        </p>
        <div className={Styles.modalFooter}>
          <Button onClick={transferLink}>Submit</Button>
        </div>
      </Modal>
    );
  };
  const PayviceModalPayout = () => {
    return (
      <Modal
        onClose={() => setOpenPayviceModel(false)}
        onOpen={() => setOpenPayviceModel(true)}
        open={openPayviceModel}
        className={Styles.modalContainer}
      >
        <div className={Styles.modalHeader}>
          <h2>Single payout</h2>
          <IconButton onClick={() => setOpenPayviceModel(false)}>
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
          <label>ITEX Pay email</label>
          <input placeholder="email@email.com" />
        </Form.Field>
        <div className={Styles.inputDivider}>
          <h2>James Holiday</h2>
        </div>
        <Form.Field className={Styles.inputWrapper}>
          <label>Payout desciption (optional)</label>
          <input placeholder="Thank you" />
        </Form.Field>
        <p>
          <InfoOutlinedIcon />
          You will be charged <span> NGN45</span> fee for this transaction
        </p>
        <div className={Styles.modalFooter}>
          <Button onClick={transferLink}>Submit</Button>
        </div>
      </Modal>
    );
  };
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
          <label>ITEX Pay email</label>
          <input placeholder="email@email.com" />
        </Form.Field>
        <div className={Styles.inputDivider}>
          <h2>James Holiday</h2>
        </div>
        <Form.Field className={Styles.inputWrapper}>
          <label>Payout desciption (optional)</label>
          <input placeholder="Thank you" />
        </Form.Field>
        <p>
          <InfoOutlinedIcon />
          You will be charged <span> NGN45</span> fee for this transaction
        </p>
        <div className={Styles.modalFooter}>
          <Button onClick={transferLink}>Submit</Button>
        </div>
      </Modal>
    );
  };
  const BulkModalPayout = () => {
    return (
      <Modal
        onClose={() => setOpenBulkModel(false)}
        onOpen={() => setOpenBulkModel(true)}
        open={openBulkModel}
        className={Styles.modalContainer}
      >
        <div className={Styles.modalHeader}>
          <h2>Bulk transfers</h2>
          <IconButton onClick={() => setOpenBulkModel(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={Styles.inputDivider}>
          <h2>File upload requirements</h2>
        </div>
        <div className={Styles.inputDesc}>
          <p>Files must be CSV</p>
          <p>
            CSV file should contain <span>account number, bank, amount,</span>
            and
            <span>description</span> columns.
          </p>
          <span>
            The order of the columns should be the same as the order in which
            they are listed above with the first row header.
          </span>
        </div>
        <Form.Field className={Styles.inputWrapper}>
          <label>Balance to be debited</label>
          <Select
            placeholder="NGN balance - 123,456.78"
            options={countryOptions}
          />
        </Form.Field>
        <Form.Field className={Styles.inputWrapper}>
          <label>Bulk payout CSV file</label>
          <input type="file" placeholder="NGN 0.0" />
        </Form.Field>
        <div className={Styles.modalFooter}>
          <Button onClick={transferLink}>Continue</Button>
        </div>
        <p className={Styles.modalNote}>
          <CloudDownloadOutlinedIcon />
          Download a sample bulk upload CSV file
        </p>
      </Modal>
    );
  };
  return (
    <>
      <BankModalPayout />
      <PayviceModalPayout />
      <ItexModalPayout />
      <BulkModalPayout />
      <div className={Styles.container}>
        <h2>You have not made any transfers</h2>
        <p>
          But, you can change that. You can start by initiating your first to
          either an ITEX merchant’s email address or to a bank account.
        </p>
        <Button className="success">
          <Dropdown text="Make a transfer" className="link item">
            <Dropdown.Menu className={Styles.menuOptions}>
              <Dropdown.Item>
                <Dropdown text="Single payout">
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setOpenBankModel(true)}>
                      Bank account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setOpenPayviceModel(true)}>
                      Payvice
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setOpenItexModel(true)}>
                      ITEX Pay
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOpenBulkModel(true)}>
                Bulk payouts
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Button>
      </div>
    </>
  );
}
