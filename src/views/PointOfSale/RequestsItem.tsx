import React from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import styles from "./RequestsItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch } from "react-redux";
import { PosRequestItem } from "../../types/PosTypes";
import moment from "moment";
import { ReactComponent as PendingBadge } from "../../assets/images/pending-badge.svg";
import { ReactComponent as SuccessBadge } from "../../assets/images/success-badge.svg";

const RequestsItem = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();

  if (!location.state.rowData) {
    history.replace("/point_of_sale");
  }

  const { rowData } = location.state;

  const formattedRowData: PosRequestItem = JSON.parse(rowData);

  const { reqId, status, added, qtyAssigned, qtyRequested, deliveryAddress } =
    formattedRowData;

  return (
    <div className={styles.container}>
      <NavBar name="Point Of Sale" />
      <div className={styles.pageWrapper}>
        <div className={styles.sectionOne}>
          <div>
            <Link to="/point_of_sale">
              <div>
                <ArrowLeftIcon />
                <p>Back to POS</p>
              </div>
            </Link>
          </div>
          <p
            className={
              status === "Approved" ? styles.greenText : styles.yellowText
            }
          >
            {status}
          </p>
        </div>
        <div className={styles.sectionTwo}>
          <div>
            <p>Request status</p>
            <p>{status}</p>
          </div>
          <div>
            <p>Quantity requested</p>
            <p>{qtyRequested}</p>
          </div>
          <div>
            <p>Quantity assigned</p>
            <p>{qtyAssigned}</p>
          </div>
          <div>
            <p>Date requested</p>
            <p>{moment(added).format("MMM D YYYY")}</p>
          </div>
        </div>
        <div className={styles.sectionThree}>
          <h3>Payment information</h3>
          <div>
            <div>
              <p>Delivery address</p>
              <p>{deliveryAddress}</p>
            </div>
            <div>
              <p>Estimated delivery period</p>
              <p>3-5 working days</p>
            </div>
          </div>
        </div>
        <div className={styles.sectionFour}>
          <div>
            <h3>Delivery timeline</h3>
            <p>This is the delivery timeline for your POS device(s)</p>
          </div>
          <div>
            <div>
              {status === "Approved" ? <SuccessBadge /> : <PendingBadge />}
              <p>On its way</p>
            </div>
            <div>
              <PendingBadge />
              <p>Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestsItem;
