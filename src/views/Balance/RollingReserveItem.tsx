import NavBar from "../../components/navbar/NavBar";
import styles from "./BalanceItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link } from "react-router-dom";
import CustomStatus from '../../components/customs/CustomStatus';
import Navigation from "../../components/navbar/Navigation";



const RollingReserveItem = () => {


  return (

    <Navigation title="Rolling reserve">

      <div className={styles.container}>
        <div className={styles.pageWrapper}>
          <div className={styles.sectionOne}>
            <div>
              <Link to="/balance/rolling_reserve" style={{ textDecoration: "none" }}>
                <div>
                  <ArrowLeftIcon />
                  <p>Back to Rolling reserves</p>
                </div>
              </Link>
            </div>

          </div>

          <div className={styles.rolling__sectionone}>
            <div className={styles.rolling_header}>
              {/* <NavBar name='Rolling reserve' /> */}
              <h2>NGN 300,000.00</h2>
              <CustomStatus text="Withheld" type={"Approved"} />
            </div>

            <div className={styles.rolling_sectionOne_body}>
              <div>
                <span>Date / Time Withheld</span>
                <p>Aug 13 2020 2:21 PM</p>
              </div>

              <div>
                <span>Transaction Amount</span>
                <p>NGN 3,000,000.00</p>
              </div>

              <div>
                <span>Settlement Amount</span>
                <p>NGN 2,700,000.00</p>
              </div>

              <div>
                <p>Transaction Date</p>
                <p>Aug 13 2020 2:21 PM</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </Navigation>




  );
};

export default RollingReserveItem;
