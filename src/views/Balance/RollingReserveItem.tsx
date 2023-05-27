import NavBar from "../../components/navbar/NavBar";
import styles from "./BalanceItem.module.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Link, useParams } from "react-router-dom";
import CustomStatus from '../../components/customs/CustomStatus';
import Navigation from "../../components/navbar/Navigation";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { RollingRes, Rollingreserve } from "../../types/rollingItemTypes";
import CustomDateFormat from '../../components/customs/CustomDateFormat';
import FormatToCurrency from '../../helpers/NumberToCurrency';
import CustomCurrencyFormat from "../../components/customs/CustomCurrencyFormat";



const RollingReserveItem = () => {
  const { id } = useParams<{ id: string }>();
  const [rollingItem, setRollingItem] = useState<Rollingreserve>()
  const dispatch = useDispatch()

  const getRollinReseve = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get<RollingRes>(`/v1/rollingreserve/${id}`);
      console.log(data);

      if (data?.code === "success") {
        setRollingItem(data?.rollingreserve);
      }
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: 'Failed to get links',
          msgType: "error"
        })
      );
    }
  };

  useEffect(() => {
    getRollinReseve();

    return () => setRollingItem({})
  }, [id]);

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
              <h2>{`${rollingItem?.currency} ${FormatToCurrency(Number(rollingItem?.amount))}`}</h2>
              <CustomStatus text={rollingItem?.status} type={rollingItem?.status} />
            </div>

            <div className={styles.rolling_sectionOne_body}>
              <div>
                <span>Date / Time Withheld</span>
                <CustomDateFormat date={String(rollingItem?.duedate)} time={rollingItem?.duedate} />
              </div>

              <div>
                <span>Transaction Amount</span>
                {/* <p>{`${rollingItem?.currency} ${FormatToCurrency(Number(rollingItem?.amount))}`}</p> */}
                <CustomCurrencyFormat currency={String(rollingItem?.currency)} amount={Number(rollingItem?.amount)} />
              </div>

              <div>
                <span>Settlement Amount</span>

                <p><CustomCurrencyFormat currency={String(rollingItem?.currency)} amount={Number(rollingItem?.balanceAfter)} /></p>
              </div>

              <div>
                <p>Transaction Date</p>
                <CustomDateFormat date={String(rollingItem?.createdat)} time={rollingItem?.createdat} />
              </div>
            </div>


          </div>
        </div>
      </div>
    </Navigation>




  );
};

export default RollingReserveItem;
