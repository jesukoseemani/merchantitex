import { useState } from "react";
import Styles from "./merchant.module.scss";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import LineChartComp from "../chart/LineChart";
import { Link } from "react-router-dom";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import getSymbolFromCurrency from "currency-symbol-map";
import { Summary } from "../../types/TrendTypes";

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
export default function MerchantChart({ summary, total }: { summary: Summary[]; total: number }) {
  const [balance, setBalance] = useState<BalanceTypes>(BalanceDefault);

  const d = summary.length ? summary[0].data.map((c) => ({ name: c.date, value: c.total })) : [];

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
            NGN <ArrowDropDownIcon />
          </Button>
        </div>
      </div>
      <div className={Styles.chartWrapper}>
        <div className={Styles.header}>
          <div className={Styles.chartCard}>
            <span className={Styles.span}>Total value</span>
            <h2>
              NGN
              {FormatToCurrency(total || 0)}
            </h2>
          </div>
        </div>
        <div className={Styles.chart}>
          <LineChartComp data={d} />
        </div>
        <div className={Styles.side}>
          <div className={Styles.summary}>
            <div>
              <span className={Styles.span}>Available balance</span>
              <h2>
                {getSymbolFromCurrency(balance?.currency)}
                {FormatToCurrency(+summary?.[0]?.balance?.availablebalance || 0)}
              </h2>
            </div>
            <div>
              <span className={Styles.span}>Ledger balance</span>
              <h2>
                {getSymbolFromCurrency(balance?.currency)}
                {FormatToCurrency(+summary?.[0]?.balance?.ledgerbalance || 0)}
              </h2>
            </div>
            <Link to="/balance">Go to balances</Link>
          </div>

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
