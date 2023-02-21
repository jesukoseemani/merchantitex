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

// import { ReactSVG } from "react-svg";

interface NavProps {
  id: string | number;
  title: string;
  icon: string;
  link: string;

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
  },
  {
    id: "2",
    title: "Transaction",
    icon: TranIcon,
    link: "/transactions",

    nav: [
      {
        id: " 3",
        title: "Transaction",
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

    nav: [
      {
        id: 6,
        title: "Balance",
        icon: CustomerIcon,
        link: "/customers",
      },
      {
        id: 7,
        title: "Balance History",
        icon: CustomerIcon,
        link: "/balance/balance_history",
      },
      {
        id: 8,
        title: "Settlements",
        icon: CustomerIcon,
        link: "/balance/settlements",
      },
      {
        id: 9,
        title: "Rolling Reserve",
        icon: CustomerIcon,
        link: "/balance/rolling_reserve",
      },
    ],
  },
  {
    id: 10,
    title: "Customer",
    icon: Customer,
    link: "/customers",

    nav: [
      {
        id: 11,
        title: "Customers",
        icon: CustomerIcon,
        link: "/customers",
      },
      {
        id: 12,
        title: "Blacklist",
        icon: BlacklistIcon,
        link: "/customers",
      },
    ],
  },
  {
    id: 13,
    title: "Payout",
    icon: Payout,
    link: "/payout/transfers",

    nav: [
      {
        id: 14,
        title: "Transfers",
        icon: TranIcon,
        link: "/payout/transfers",
      },
      {
        id: 15,
        title: "Pending Aproval",
        icon: PendingIcon,
        link: "/payout/pending_approval",
      },
      {
        id: 16,
        title: "Beneficiaries",
        icon: CalendaIcon,
        link: "/payout/beneficiaries",
      },
    ],
  },
  {
    id: 17,
    title: "Chargebacks",
    icon: Charge,
    link: "/chargebacks",
  },
  {
    id: 18,
    title: "Payment",
    icon: Payment,
    link: "/payment_links",

    nav: [
      {
        id: 19,
        title: "payment link",
        icon: Payment,
        link: "/payment_links",
      },
      {
        id: 20,
        title: "Invoices",
        icon: Payment,
        link: "/bills/invoice",
      },
      {
        id: 21,
        title: "Airtime & Bills",
        icon: Payment,
        link: "/bills",
      },
    ],
  },
  {
    id: 22,
    title: "Subaccounts",
    icon: SubAcct,
    link: "/subaccounts",
  },
  {
    id: 23,
    title: "POS",
    icon: Pos,
    link: "/point_of_sale",
  },

  {
    id: 24,
    title: "Settings",
    icon: Setting,
    link: "/general_setting",

    nav: [
      {
        id: 25,
        title: "General Settings",
        icon: Setting,
        link: "/general_setting",
      },
      {
        id: 26,
        title: "Bank Accounts",
        icon: Payout,
        link: "/general_setting/bank_accounts",
      },
      {
        id: 27,
        title: "Users",
        icon: UserIcon,
        link: "/general_setting/users",
      },
      {
        id: 28,
        title: "API",
        icon: Setting,
        link: "/general_setting/api",
      },
      {
        id: 29,
        title: "Webhooks",
        icon: webhookIcon,
        link: "/general_setting/web_hooks",
      },
      {
        id: 30,
        title: "Accounts Settings",
        icon: AcctSetting,
        link: "/general_setting/account_settings",
      },
    ],
  },
];
