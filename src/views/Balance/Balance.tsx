import styles from "./Balance.module.scss";
import { Balance as BalanceType } from "../../types/BalanceTypes";
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
import { getBalance } from "../../services/balance";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import { useHistory } from 'react-router-dom';

const Balance = () => {
  const [balances, setBalances] = useState<BalanceType[]>([])

  const dispatch = useDispatch();
  const history = useHistory()


  useEffect(() => {
    try {
      (async () => {
        dispatch(openLoader());
        const res = await getBalance();
        setBalances(res?.balances || [])
        dispatch(closeLoader());

      })()

    } catch (error: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message || "Failed to get balance",
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
    } finally {
      dispatch(closeLoader());
    }
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
            <SetUsdLimitModal />
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
            <FundAcct />
          </div>
        ),
      })
    );
  }

  return (

    <Box className={styles.balance__container} mt="27px">
      {/* <Box > */}

      {balances?.length > 0 && balances.map((balance, i) => (
        <div key={i}>
          <Box className={styles.balance__header}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems="center" flexWrap={"wrap"}>
              <h2>{balance?.currency} Balance</h2>

              <Stack direction={"row"} alignItems="center" columnGap={"10px"} flexWrap="wrap" >
                <button>See {balance?.currency} Transactions</button>
                <button onClick={() => history.push(`/balance_history/${balance?.id}`)}>View balance history</button>
              </Stack>

            </Stack>

          </Box>
          <Box className={styles.balance__body}>
            <Stack direction={"row"} justifyContent="space-between" flexWrap={"wrap"} alignItems={"center"}>
              <Stack>
                <p>Available Balance</p>
                <p>Ledger Balance</p>
                <p>Rolling Reserve Balance</p>
              </Stack>
              <Stack>
                <p>NGN {FormatToCurrency(balance?.availablebalance) || 0}</p>
                <p>NGN {FormatToCurrency(balance?.ledgerbalance) || 0}</p>
                <p>NGN {FormatToCurrency(balance?.reservebalance) || 0}</p>
              </Stack>
            </Stack>
          </Box>
        </div>
      ))
      }

      {/* </Box> */}

    </Box>


  );
};

export default Balance;
