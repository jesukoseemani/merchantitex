import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Balance.module.scss";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { GetWalletsRes, WalletItem } from "../../types/BalanceTypes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import BalanceBox from "./BalanceBox";

const Balance = () => {
  const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [acct, setAcct] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');

  const dispatch = useDispatch();

  const getProfile = async() => {
    dispatch(openLoader());
    try {
      const res: any = await axios.get(`/merchant/account/me`);
      setAcct(res?.data?.business?.settlement?.account[0]?.accountnumber as string)
      setBankName(res?.data?.business?.settlement?.account[0]?.bankname as string)
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to get account",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  }

  const getWallets = async() => {
    dispatch(openLoader());
    try {
      const res = await axios.get<GetWalletsRes>(`/merchant/account/wallet`);
      const { wallets } = res?.data;
      if (wallets.length) {
        setWallets(wallets);
      }
      dispatch(closeLoader());
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to get wallets",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    }
  }

  useEffect(() => {
    getWallets();
    getProfile();
  }, [])

  return (
    <div className={styles.container}>
      <NavBar name="Balance"/>
      <hr />
      <div className={styles.pageWrapper}>
        <div className={styles.topBoxContainer}>
          <div>
            <p>Dispute/Chargeback</p>
            <p>NGN 400,000.00</p>
            <Link to='/chargebacks'>View chargebacks</Link>
          </div>
          <div>
            <p>Refunds</p>
            <p>NGN 400,000.00</p>
            <Link to='/transactions/refund'>See all refunds</Link>
          </div>
          <div>
            <p>Non compliance assessment</p>
            <p>NGN 400,000.00</p>
            <div>
              <InfoOutlinedIcon />
              <p>This is how much you’re charged for defaulting on compliance rules</p>
            </div>
          </div>
        </div>

        <div className={styles.balanceContainer}>
          { wallets?.map(({ currency, availablebalance, ledgerbalance }) => (
            <BalanceBox 
              currency={currency} 
              availablebalance={availablebalance}
              ledgerbalance={ledgerbalance}
              acct={acct}
              bankName={bankName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Balance;
