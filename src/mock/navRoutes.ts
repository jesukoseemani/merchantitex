import HomeIcon from "../assets/images/home.svg";
// import HomeIcon from "../assets/images/home.png";
import TranIcon from "../assets/images/transactions.svg";
import Payout from "../assets/images/payouts.svg";
import Balance from "../assets/images/balances.svg";
import Customer from "../assets/images/customers.svg";
import Payment from "../assets/images/payments.svg";
import Pos from "../assets/images/poss.svg";
import SubAcct from "../assets/images/accounts.svg";
import Charge from "../assets/images/charges.svg";
import UserIcon from "../assets/images/userIcons.svg";
import BackArrow from "../assets/images/backArrow.svg";
import webhookIcon from "../assets/images/webhooks.svg";
import Setting from "../assets/images/settingss.svg";
import AcctSetting from "../assets/images/acctSetting.svg";
import CustomerIcon from "../assets/images/customerIcon.svg";
import BlacklistIcon from "../assets/images/blacklistIcon.svg";
import CalendaIcon from "../assets/images/calendar.svg";
import PendingIcon from "../assets/images/pending.svg";
import InvoiceIcon from "../assets/images/invoice-icon.svg";
import LinkIcon from "../assets/images/paymentlink.svg";
import BillIcon from "../assets/images/bills.svg";
import SettlementIcon from "../assets/images/settlement.svg";
import HistoryIcon from "../assets/images/balanceIcon.svg";
import PermisionIcon from "../assets/images/key.svg";
import CheckIcon from "../assets/images/check.svg";
import RollingIcon from "../assets/images/rolling.svg";


// import { ReactSVG } from "react-svg";

interface NavProps {
  id: string | number;
  title: string;
  icon: string;
  link: string;
  submenu: boolean;

  nav?: {
    id: string | number;
    title: string;
    icon: string;
    link: string;
  }[];
}
export const navRoutes: NavProps[] = [
  {
    id: "1",
    title: "Home",
    icon: HomeIcon,
    link: "/",
    submenu: false,
  },
  {
    id: "2",
    title: "Transactions",
    icon: TranIcon,
    link: "/transactions",
    submenu: true,

    nav: [
      {
        id: " 3",
        title: "Transactions",
        icon: TranIcon,
        link: "/transactions",
      },
      {
        id: "4",
        title: "Refund",
        icon: BackArrow,
        link: "/transactions/refund",
      },
    ],
  },
  {
    id: 5,
    title: "Balance",
    icon: Balance,
    link: "/balance",
    submenu: true,

    nav: [
      {
        id: 6,
        title: "Balance",
        icon: Balance,
        link: "/balance",
      },
      // {
      //   id: 10,
      //   title: "Balance history",
      //   icon: HistoryIcon,
      //   link: "/balance/balance_history",
      // },
      {
        id: 8,
        title: "Settlements",
        icon: SettlementIcon,
        link: "/balance/settlements",
      },
      {
        id: 9,
        title: "Rolling Reserve",
        icon: RollingIcon,
        link: "/balance/rolling_reserve",
      },
    ],
  },
  {
    id: 10,
    title: "Customer",
    icon: Customer,
    link: "/customers",
    submenu: true,
    nav: [
      {
        id: 12,
        title: "Customer",
        icon: Customer,
        link: "/customers",
      },
      {
        id: 13,
        title: "Blacklist",
        icon: BlacklistIcon,
        link: "/blacklist",
      },
    ],
  },
  {
    id: 12,
    title: "Payout",
    icon: Payout,
    link: "/payout",
    submenu: false
  },
  {
    id: 15,
    title: "Chargebacks",
    icon: Charge,
    link: "/chargebacks",
    submenu: false,
  },
  {
    id: 16,
    title: "Payment",
    icon: Payment,
    link: "/payment_links",
    submenu: true,

    nav: [
      {
        id: 17,
        title: "Payment link",
        icon: LinkIcon,
        link: "/payment_links",
      },
      {
        id: 18,
        title: "Invoices",
        icon: InvoiceIcon,
        link: "/bills/invoice",
      },
      {
        id: 19,
        title: "Airtime & Bills",
        icon: BillIcon,
        link: "/bills",
      },
    ],
  },
  // {
  //   id: 20,
  //   title: "Subaccounts",
  //   icon: SubAcct,
  //   link: "/subaccounts",
  //   submenu: false,
  // },
  {
    id: 20,
    title: "POS",
    icon: Pos,
    link: "/point_of_sale",
    submenu: false,
  },

  {
    id: 21,
    title: "Settings",
    icon: Setting,
    link: "/general_setting",
    submenu: true,

    nav: [
      {
        id: 22,
        title: "General Settings",
        icon: Setting,
        link: "/general_setting",
      },
      {
        id: 23,
        title: "Bank Accounts",
        icon: Payout,
        link: "/general_setting/bank_accounts",
      },
      {
        id: 24,
        title: "Users",
        icon: UserIcon,
        link: "/general_setting/users",
      },

      {
        id: 26,
        title: "Permissions",
        icon: PermisionIcon,
        link: "/general_setting/permissions/owner/1",
      },
      {
        id: 27,
        title: "API",
        icon: Setting,
        link: "/general_setting/api",
      },
      {
        id: 28,
        title: "Webhooks",
        icon: webhookIcon,
        link: "/general_setting/web_hooks",
      },
      {
        id: 29,
        title: "Checkout",
        icon: CheckIcon,
        link: "/general_setting/checkout",
      },
      {
        id: 30,
        title: "Account preferences",
        icon: AcctSetting,
        link: "/general_setting/account_settings",
      },
    ],
  },
];
