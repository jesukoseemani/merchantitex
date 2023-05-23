import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useEffect, useState } from "react";
import Styles from "./merchant.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import LineChartComp from "../chart/LineChart";
import { Link } from "react-router-dom";
import FormatToCurrency from "../../helpers/NumberToCurrency";
import getSymbolFromCurrency from "currency-symbol-map";
import { Summary } from "../../types/TrendTypes";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import Menu from "@mui/material/Menu";
import { Box, Button, MenuItem, Popover, SxProps } from "@mui/material";
import moment from "moment";
import { getDate } from "../../utils";
import useCurrency from '../hooks/Usecurrency';
import { DateRange } from 'react-date-range';
import { display } from '@material-ui/system';


const DATA = [{ name: 'Custom', value: '' }, { name: 'Today', value: 'today' }, { name: 'Last 7 days', value: 'last7days' }, { name: '30 days', value: 'last30days' }, { name: '1 year', value: 'oneyear' }]

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

type Props = { summary: Summary[]; total: number; setEvent: (arg: { name: string; key: string }) => void; setParentDate: (d: { fromdate: string; todate: string }) => void }
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
export default function MerchantChart({ summary, total, setEvent, setParentDate }: Props) {
  const [balance, setBalance] = useState<BalanceTypes>(BalanceDefault);
  const [openMenu, setOpenMenu] = useState(false)
  const [displayName, setName] = useState('Custom');

  // store custom date
  const [customDate, setCustomDate] = useState({
    fromdate: moment().format('YYYY-MM-DD'), todate: moment().format('YYYY-MM-DD')
  })

  const [form, setForm] = useState({
    fromdate: moment().format('YYYY-MM-DD'),
    todate: moment().format('YYYY-MM-DD')
  })
  const [state, setState] = useState<{
    startDate?: any,
    endDate?: any,
    key?: string
  }[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const d = summary.length ? summary[0].data.map((c) => ({ name: c.date, value: c.total })) : [];


  const handleDateRange = (selection?: { startDate: string; endDate: string }, isExisting?: boolean) => {
    let fromdate = customDate.fromdate;
    let todate = customDate.todate;

    if (!isExisting && selection) {
      setState([
        selection
      ])

      fromdate = moment(selection?.startDate).format('YYYY-MM-DD');
      todate = moment(selection?.endDate).format('YYYY-MM-DD')

    }


    setForm({
      fromdate,
      todate
    })

    setParentDate({
      fromdate,
      todate
    })

    setCustomDate({
      fromdate,
      todate
    })

    setEvent({ name: 'Custom', key: '' })
    setName('Custom')

    setOpenMenu(false)
  }



  const handleMenuClick = (key: string, name: string) => {

    if (name === 'Custom') {
      handleDateRange(undefined, true);
      return
    }

    const { fromdate, todate } = getDate(key)

    setForm({
      fromdate,
      todate
    })

    setParentDate({
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

  const { currencyList, currencyId } = useCurrency()
  return (
    <div className={Styles.container}>
      <div className={Styles.chartHeader}>
        <div className={Styles.menuCont}>
          <button onClick={() => setOpenMenu(!openMenu)}>
            {displayName} <ArrowDropDownIcon />
          </button>

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
          <div className={Styles.btnDiv} onClick={handleClick} >
            <div>
              <p>{form?.fromdate || ''}</p>
              <span>-</span>
              <p>{form?.todate || ''}</p>
            </div>
            <div>
              <select className={Styles.select} defaultValue={"145"}>
                {currencyList?.map((x: any) => (
                  <option key={x?.id} value={x?.id} >{x?.currencyIso}</option>
                ))}
              </select>
            </div>
          </div>


        </div>
      </div>
      <div className={Styles.chartWrapper}>
        <div>
          <div className={Styles.header}>
            <div className={Styles.chartCard}>
              <span className={Styles.span}>Total Transaction Count</span>
              <h2>
                {FormatToCurrency(total || 0)}
              </h2>
            </div>
          </div>
          <div className={Styles.chart}>
            <LineChartComp data={d} />
          </div>

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
            <div>

              <Link to="/balance" className={Styles.link}> Go to balances</Link>
            </div>
          </div>

          {summary?.length > 0 && <div className={Styles.summary}>
            {summary?.map((x: Summary) => (
              <div>
                <span className={Styles.span}>
                  {x?.settlement}
                </span>
                <h2>{`${x?.currency} ${x?.balance}`}</h2>
              </div>
            ))}
            <div >
              <Link to="/balance/settlements" className={Styles.link}>See all settlements</Link>
            </div>
          </div>}

          <div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <DateRange
                editableDateInputs={true}
                onChange={(item:any) => handleDateRange(item.selection)}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </Popover>

          </div>

        </div>
      </div>
    </div>
  );
}
