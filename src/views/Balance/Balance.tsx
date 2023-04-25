import styles from "./Balance.module.scss";
import axios from "axios";
import { GetWalletsRes, WalletItem } from "../../types/BalanceTypes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { Box, Stack } from "@mui/material";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SetlNgnimitModal from "../../components/balance/SetlNgnimitModal";
import SetUsdLimitModal from "../../components/balance/SetUsdLimitModal";
import FundAcct from "../../components/balance/FundAcct";

const Balance = () => {
  const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [acct, setAcct] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");

  const dispatch = useDispatch();

  const getProfile = async () => {
    dispatch(openLoader());
    try {
      const res: any = await axios.get(`/v1/profile/me`);
      setAcct(
        res?.data?.business?.settlement?.account[0]?.accountnumber as string
      );
      setBankName(
        res?.data?.business?.settlement?.account[0]?.bankname as string
      );
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
  };

  const getWallets = async () => {
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
  };

  useEffect(() => {
    getWallets();
    getProfile();
  }, []);

  const handleUsdLimit = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          height: "347px",
          width: "550px",
          maxWidth: "97%",
          borderRadius: '20px',
          boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
        },
        modalContent: (
          <div className='modalDiv'>
            < SetUsdLimitModal />
          </div>
        ),
      })
    );
  }
  const handleSetNGNLimit = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          height: "347px",
          width: "550px",
          maxWidth: "97%",
          borderRadius: '20px',
          boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
        },
        modalContent: (
          <div className='modalDiv'>
            < SetlNgnimitModal />
          </div>
        ),
      })
    );
  }
  const handleFundAcct = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          height: "654px",
          width: "550px",
          maxWidth: "97%",
          borderRadius: '20px',
          boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
        },
        modalContent: (
          <div className='modalDiv'>
            < FundAcct />
          </div>
        ),
      })
    );
  }

  return (

    // <div className={styles.container}>

    //   <div className={styles.pageWrapper}>
    //     {/* <div className={styles.topBoxContainer}>
    //       <div>
    //         <p>Dispute/Chargeback</p>
    //         <p>NGN 400,000.00</p>
    //         <Link to="/chargebacks">View chargebacks</Link>
    //       </div>
    //       <div>
    //         <p>Refunds</p>
    //         <p>NGN 400,000.00</p>
    //         <Link to="/transactions/refund">See all refunds</Link>
    //       </div>

    //       <div>
    //         <p>Non compliance assessment</p>
    //         <p>NGN 400,000.00</p>
    //         <div>
    //           <InfoOutlinedIcon />
    //           <p>
    //             This is how much you’re charged for defaulting on compliance
    //             rules
    //           </p>
    //         </div>
    //       </div>
    //     </div> */}

    //     <div className={styles.balanceContainer}>
    //       {wallets?.map(({ currency, availablebalance, ledgerbalance }) => (
    //         <BalanceBox
    //           currency={currency}
    //           availablebalance={availablebalance}
    //           ledgerbalance={ledgerbalance}
    //         />
    //       ))}
    //     </div>

    //   </div>

    // </div>

    <Box className={styles.balance__container} mt="27px">
      {/* <Box > */}

      <Box className={styles.balance__header}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" flexWrap={"wrap"}>
          <h2>NGN Balance</h2>

          <Stack direction={"row"} alignItems="center" columnGap={"10px"} flexWrap="wrap">
            <button onClick={handleSetNGNLimit}>Set low limits</button>
            <button onClick={handleFundAcct}>Fund balance</button>
          </Stack>

        </Stack>

      </Box>
      <Box className={styles.balance__body}>
        <Stack direction={"row"} justifyContent="space-between" flexWrap={"wrap"} alignItems={"center"}>
          <Stack>
            <p>Collection balance</p>
            <p>Payout balance</p>
          </Stack>
          <Stack>
            <p>NGN 40,000.04</p>
            <p>NGN 40,000.04</p>
          </Stack>
        </Stack>
      </Box>

      {/* </Box> */}






      <Box className={styles.balance__header_two}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" flexWrap={"wrap"}>
          <h2>USD Balance</h2>

          <Stack direction={"row"} spacing={1.3}>
            <button className={styles.outline_btn} onClick={handleUsdLimit}>Set low limits</button>

          </Stack>

        </Stack>

      </Box>
      <Box className={styles.balance__body}>
        <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
          <Stack>
            <p>Collection balance</p>
            <p>Payout balance</p>
          </Stack>
          <Stack>
            <p>USD 200.00</p>
            <p>USD 200.00</p>
          </Stack>
        </Stack>
      </Box>
    </Box>


  );
};

export default Balance;
