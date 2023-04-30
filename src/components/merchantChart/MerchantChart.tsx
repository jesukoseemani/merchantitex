import { useEffect, useState } from "react";
import Styles from "./merchant.module.scss";
import { Button } from "semantic-ui-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import LineChartComp from "../chart/LineChart";
import { Link } from "react-router-dom";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import getSymbolFromCurrency from "currency-symbol-map";
import { Summary } from "../../types/TrendTypes";
import { createStyles, makeStyles } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import { Box, SxProps } from "@mui/material";
import moment from "moment";
import { getDate } from "../../utils";

const DATA = [{ name: 'Today', value: 'today' }, { name: 'Last 7 days', value: 'last7days' }, { name: '30 days', value: 'last30days' }, { name: '1 year', value: 'oneyear' }]

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
export default function MerchantChart({ summary, total, setEvent }: { summary: Summary[]; total: number; setEvent: (arg: { name: string; key: string }) => void }) {
  const [balance, setBalance] = useState<BalanceTypes>(BalanceDefault);
  const [openMenu, setOpenMenu] = useState(false)
  const [name, setName] = useState('1 year');
  const [form, setForm] = useState({
    fromdate: '',
    todate: ''
  })

  const d = summary.length ? summary[0].data.map((c) => ({ name: c.date, value: c.total })) : [];

  const handleMenuClick = (key: string, name: string) => {

    const { fromdate, todate } = getDate(key)

    setForm({
      fromdate,
      todate
    })

    setEvent({
      name,
      key
    })

    setName(name)
    setOpenMenu(false)
  }

  useEffect(() => {
    handleMenuClick('oneyear', '1 year')
  }, [])

  return (
    <div className={Styles.container}>
      <div className={Styles.chartHeader}>
        <div className={Styles.menuCont}>
          <Button onClick={() => setOpenMenu(!openMenu)}>
            {name} <ArrowDropDownIcon />
          </Button>

          {openMenu && <div className={Styles.menu} style={{ borderRadius: "20px" }}>
            {DATA.map((d) => (
              <Box
                style={{ margin: "5px 0", cursor: "pointer" }}
                key={d.name} onClick={() => handleMenuClick(d.value, d.name)}>
                {d.name}
              </Box>
            ))}
          </div>}
        </div>
        <div className={Styles.btnGroupWrapper}>
          <Button.Group className={Styles.btnGroup}>
            <Button>{form?.fromdate || ''}</Button>
            <Button className={Styles.btnDivider}>
              <RemoveIcon />
            </Button>
            <Button>{form?.todate || ''}</Button>
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
