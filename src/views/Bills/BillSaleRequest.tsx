import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import styles from "./airtelRequest.module.scss";
import moment from "moment";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { BillRequestItem } from "../../types/BiilsTypes";
import CopyText from "../../helpers/CopyToClipBoard";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import ParentContainer from "../../components/ParentContainer/ParentContainer";

const BillSaleRequest = () => {
  const location = useLocation<{ rowData: string }>();
  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  if (!location.state.rowData) {
    history.replace("/bills");
  }

  const { rowData } = location.state;

  const formattedRowData: BillRequestItem = JSON.parse(rowData);
  console.log(rowData);
  const {
    amount,
    date,
    country,
    packages,
    bill,
    providerRef,
    billId,
    commission,
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
          flexFlow: "row wrap",
        }}
      >

        <div className={styles.pageWrapper}>
          <div className={styles.sectionOne}>
            <div>
              <Link to="/bills">
                <div>
                  <ArrowLeftIcon />
                  <p>Back to Bill</p>
                </div>
              </Link>
              <h2 style={{ padding: "15px 5px", fontSize: "1.4rem" }}>
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
              <p>Bill</p>
              <p>{bill}</p>
            </div>
            <div>
              <p>Packages</p>
              <p>{packages}</p>
            </div>
            <div>
              <p>Amount</p>

              <p>{FormatToCurrency(amount)}</p>
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
                    style={{ fontSize: 10 }}
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
              <br />
              <div>
                <p>Bill payment ID</p>
                <span>{billId}</span>
              </div>
              <div>
                <p>Bill Name</p>
                <span>{packages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default BillSaleRequest;
