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
import Setting from "../assets/images/settingss.svg";
import UserIcon from "../assets/images/userIcons.svg";
import webhookIcon from "../assets/images/webhooks.svg";
import AcctSetting from "../assets/images/acctSetting.svg";

// import { ReactSVG } from "react-svg";

interface NavProps {
  id?: number;
  title?: string;
  icon?: any;
  link: string;
  nav?: [
    {
      id?: string;
      title?: string;
      icon?: any;
      link: string;
      menu?:string
    }
  ][];
}
export const navRoutes: NavProps[] = [
  {
    id: 1,
    title: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    id: 2,
    title: "Transaction",
    icon: TranIcon,
    link: "/transaction",
    nav: [
      {
        id: 7,
        title: "Transaction",
        icon: Payment,
        link: "/payment",
      },
      {
        id: 72,
        title: "Refund",
        icon: Payment,
        link: "/payment",
      },
    ],
    link: "/transaction",
  },
  {
    id: 3,
    title: "Balance",
    icon: Balance,
    link: "/balance",
    nav: [{}],
  },
  {
    id: 4,
    title: "Customer",
    icon: Customer,
    link: "/customer",
    nav: [{}],
  },
  {
    id: 5,
    title: "Payout",
    icon: Payout,
    link: "/payout",
    nav: [{}],
  },
  {
    id: 6,
    title: "Chargebacks",
    icon: Charge,
    link: "/chargeback",
    nav: [
      {
        id: 34,
        title: "Payment",
        icon: Payment,
        link: "/payment",
      },
      {
        id: 214,
        title: "chelsea",
        icon: Payment,
        link: "/payment",
      },
      {
        id: 221,
        title: "asenal",
        icon: Payment,
        link: "/payment",
      },
    ],
  },
  {
    id: 7,
    title: "Payment",
    icon: Payment,
    link: "/payment",
    nav: [{}],
  },
  {
    id: 8,
    title: "Subaccounts",
    icon: SubAcct,
    link: "/subaccount",
    nav: [{}],
  },
  {
    id: 9,
    title: "POS",
    icon: Pos,
    link: "/pos",
    nav: [{}],
  },

  {
    id: 10,
    title: "Settings",
    icon: Setting,
    link: "/settings",
    nav: [
      {
       
        id: 22,
        title: "General Settings",
        icon: Setting,
        link: "/general_setting",
      
    },
      {
       
        id: 25,
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
       
        id: 29,
        title: "API",
        icon: Setting,
        link: "/general_setting/api",
      
    },
      {
       
        id: 30,
        title: "Webhooks",
        icon: webhookIcon,
        link: "/general_setting/web_hooks",
      
    },
      {
       
        id: 309,
        title: "Accounts Settings",
        icon: AcctSetting,
        link: "/general_setting/account_settings",
      
    },
    
    
    ],
  },
];
