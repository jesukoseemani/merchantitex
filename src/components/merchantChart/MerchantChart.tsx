import React, { PureComponent, useEffect, useState } from "react";
import Styles from "./merchant.module.scss";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import LineChartComp from "../chart/LineChart";
import { PieChart } from "react-minimal-pie-chart";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useDispatch } from "react-redux";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import getSymbolFromCurrency from "currency-symbol-map";
import { CSVLink } from 'react-csv';

interface ChartTrend {
  day: number;
  hour: string;
  month: string;
  value: number;
  volume: number;
  year: string;
}

interface TPVTypes {
  currency: string;
  revenue: number;
  value: number;
  volume: number;
}
interface BalanceTypes {
  currency: string;
  ledgerbalance: string;
  availablebalance: string;
}
const TPVDefault = {
  currency: "",
  revenue: 0,
  value: 0,
  volume: 0,
};
const BalanceDefault = {
  currency: "0",
  ledgerbalance: "0",
  availablebalance: "0",
};
export default function MerchantChart() {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [chartData, setChartData] = useState<ChartTrend[]>();
  const [totalValue, setTotalValue] = useState<TPVTypes>(TPVDefault);
  const [balance, setBalance] = useState<BalanceTypes>(BalanceDefault);
  const history = useHistory();
  const dispatch = useDispatch();

  // const data = [
  //   {
  //     name: "12:00 am",  
  //     uv: 400,
  //     pv: 240,
  //     amt: 2400,
  //   },
  //   {
  //     name: "03:00 AM",
  //     uv: 3000,
  //     pv: 198,
  //     amt: 2210,
  //   },
  //   {
  //     name: "06:00 AM",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "09:00 AM",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "12:00 Noon",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  // ];

  const dayOfWeekAsString = (dayIndex: number) => {
    return (
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayIndex] || ""
    );
  };

  const getTransactions = () => {
    dispatch(openLoader());
    axios
      .get(
        `/merchant/dashboard/trend/transactions?fromdate=2020-01-25&todate=2023-01-25&currency=USD`
      )
      .then((res: any) => {
        const { trend, tpv } = res?.data;
        const data = trend.map((elem: ChartTrend) => ({
          name: Number(elem?.hour),
          value: elem?.value,
          volume: elem?.volume,
        }));
        setTotalValue(tpv[0]);
        setChartData(data);
        dispatch(closeLoader());
      })
      .catch((err) => { });
  };
  const getWalletBalance = () => {
    dispatch(openLoader());
    axios
      .get(`/merchant/account/wallet`)
      .then((res: any) => {
        const { wallets } = res?.data;
        setBalance(wallets?.[0]);
        dispatch(closeLoader());
      })
      .catch((err) => { });
  };
  const nextSettlement = () => {
    dispatch(openLoader());
    axios
      .get(
        `/merchant/settlement?perpage=20&page=1&fromdate=2021-01-21&todate=2021-01-25`
      )
      .then((res: any) => {
        dispatch(closeLoader());
      })
      .catch((err) => { });
  };
  useEffect(() => {
    getTransactions();
  }, []);
  useEffect(() => {
    getWalletBalance();
  }, []);
  // useEffect(() => {
  //   nextSettlement();
  // }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.chartHeader}>
        <div>
          <Button>
            Last 7 days <ArrowDropDownIcon />
          </Button>
        </div>
        <div className={Styles.btnGroupWrapper}>
          <Button.Group className={Styles.btnGroup}>
            <Button>Aug 23, 2017</Button>
            <Button className={Styles.btnDivider}>
              <RemoveIcon />
            </Button>
            <Button>Feb 23, 2018</Button>
          </Button.Group>
          <Button>
            USD <ArrowDropDownIcon />
          </Button>
        </div>
      </div>
      <div className={Styles.chartWrapper}>
        <div className={Styles.header}>
          <div className={Styles.chartCard}>
            <span className={Styles.span}>Total value</span>
            <h2>
              {getSymbolFromCurrency(totalValue?.currency)}
              {FormatToCurrency(totalValue?.value || 0)}
            </h2>
          </div>
        </div>
        <div className={Styles.chart}>
          <LineChartComp data={chartData} />
        </div>
        <div className={Styles.side}>
          <div className={Styles.summary}>
            <div>
              <span className={Styles.span}>Available balance</span>
              <h2>
                {getSymbolFromCurrency(balance?.currency)}
                {FormatToCurrency(+balance?.availablebalance || 0)}
              </h2>
            </div>
            <div>
              <span className={Styles.span}>Ledger balance</span>
              <h2>
                {getSymbolFromCurrency(balance?.currency)}
                {FormatToCurrency(+balance?.ledgerbalance || 0)}
              </h2>
            </div>
            <Link to="/balance">Go to balances</Link>
          </div>
          {/* <div className={Styles.pieChartWrapper}> */}
          {/* <div className={Styles.pieChart}>
              <PieChart
                style={{ height: "80px", width: "80px" }}
                animate={true}
                data={[
                  { title: "Successful", value: 80, color: "#6FCF97" },
                  { title: "Failed", value: 20, color: "#EB5757" },
                ]}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                segmentsShift={(index) => (index === selected ? 2 : 0)}
                onMouseOver={(_, index) => {
                  setSelected(index === selected ? undefined : index);
                }}
                onMouseOut={(_, index) => {
                  setSelected(index === selected ? undefined : index);
                }}
                lineWidth={60}
                paddingAngle={4}
              />
            </div> */}
          {/* <div className={Styles.chartSummary}>
              <div>
                <div className={Styles.status}></div>
                <h2>Failed - 444 (44%)</h2>
              </div>
              <div>
                <div className={Styles.status}></div>
                <h2>Successful - 444 (44%)</h2>
              </div>
            </div> */}
          {/* </div> */}
          <div className={Styles.summary}>
            <div>
              <span className={Styles.span}>
                Next settlement - Oct 29, 2020
              </span>
              <h2>$ 0</h2>
            </div>
            <Link to="/balance/settlements">See all settlements</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
