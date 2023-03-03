// import React from "react";
// import { Link, useHistory, useLocation, useParams } from "react-router-dom";

// import { useDispatch } from "react-redux";

// import moment from "moment";
// import { PosRequestItem } from "../../types/PosTypes";
// import NavBar from "../../components/navbar/NavBar";
// import styles from "../../views/PointOfSale/PointOfSale.module.scss";

// const AirtimeSaleRequest = () => {

//   );
// };

// export default AirtimeSaleRequest;

import React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { PosRequestItem } from "../../types/PosTypes";
import styles from "./airtelRequest.module.scss";
import moment from "moment";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { AirtimeRequestItem } from "../../types/BiilsTypes";
import CopyText from "../../helpers/CopyToClipBoard";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

const AirtimeSaleRequest = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  if (!location.state.rowData) {
    history.replace("/bills");
  }

  const { rowData } = location.state;

  const formattedRowData: AirtimeRequestItem = JSON.parse(rowData);
  console.log(rowData);
  const {
    amount,
    date,
    country,
    recipient,
    network,
    commission,
    providerRef,
    transactionRef,
  } = formattedRowData;

  return (


    <div
      className={styles.contained}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginInline: "auto",
      }}
    >

      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to="/bills">
              <div>
                <ArrowLeftIcon /><p>Back to Airtime</p>
              </div>
            </Link>
            <h2 >
              NGN {FormatToCurrency(amount)}
            </h2>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div>
            <p>Country</p>
            <p>{country}</p>
          </div>
          <div>
            <p>Recepient</p>
            <p>{recipient}</p>
          </div>
          <div>
            <p>Provider</p>
            <p>{network}</p>
          </div>
          <div>
            <p>Amount</p>

            <p>{amount}</p>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <h3>Payment information</h3>
          <div>
            <div>
              <p>Transaction Reference</p>
              <span onClick={() => CopyText(transactionRef)}>
                {transactionRef}{" "}
                <ContentCopyOutlinedIcon
                  fontSize="medium"
                  style={{ fontSize: 10, cursor: "pointer" }}
                />
              </span>
            </div>
            <div>
              <p>Commission</p>
              <span>{commission}</span>
            </div>
            <div>
              <p>Provider Reference</p>
              <span>{providerRef}</span>
            </div>
            <div>
              <p>Date/time</p>
              <span>{moment(date).format("MMM D YYYY")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AirtimeSaleRequest;
