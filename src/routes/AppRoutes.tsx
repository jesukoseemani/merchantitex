import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParentContainer from "../components/ParentContainer/ParentContainer";
import Drawer from "../components/drawer/Drawer";
import MerchantOverview from "../views/MerchantOverview/MerchantOverview";
import Transactions from "../views/Transactions/Transactions";
import Refund from "../views/Transactions/Refund";
import Balance from "../views/Balance/Balance";
import BalanceHistory from "../views/Balance/BalanceHistory";
import RollingReserve from "../views/Balance/RollingReserve";
import Customers from "../views/Customers/Customers";
import Transfers from "../views/Payout/Transfers";
import FundingHistory from "../views/Payout/FundingHistory";
import TransferBalance from "../views/Payout/TransferBalance";
import ChargeBacks from "../views/ChargeBack/ChargeBacks";
import Pending from "../views/ChargeBack/Pending";
import AwaitingResponse from "../views/ChargeBack/AwaitingResponse";
import Won from "../views/ChargeBack/Won";
import Lost from "../views/ChargeBack/Lost";
import Subaccounts from "../views/Subaccounts/Subaccounts";
import PaymentLinks from "../views/PaymentLinks/PaymentLinks";
import ItexStore from "../views/ItexStore/ItexStore";
import PointOfSale from "../views/PointOfSale/PointOfSale";
import TerminalRequests from "../views/PointOfSale/TerminalRequest";
import Bills from "../views/Bills/BillTabPanel";
import GeneralSettings from "../views/Settings/GeneralSettings";
import AccountSettings from "../views/Settings/AccountSettings";
import Api from "../views/Settings/Api";
import Users from "../views/Settings/Users";
import WebHooks from "../views/Settings/WebHooks";
import BankAccounts from "../views/Settings/BankAccounts";
import SignUp from "../views/SignUp/SignUpPage";
import IndividualSignUp from "../views/SignUp/IndividualSignUp";
import BusinessSignUp from "../views/SignUp/BusinessSignUp";
import { Web } from "@material-ui/icons";
import ProtectedRoute from "../components/ProtectedRoutes";
import SignIn from "../views/SignIn/SignIn";
import AccountType from "../components/accountSetUp/AccountType";
import LoginPasswordReset from "../components/accountSetUp/LoginPasswordReset";
import EmailVerification from "../components/accountSetUp/EmailVerification";
import NewPassword from "../components/accountSetUp/NewPassword";
import QuickUpdate from "../views/QuickUpdate";
import Beneficiaries from "../views/Payout/Beneficiaries";
import PendingApproval from "../views/Payout/PendingApproval";
import Assessments from "../views/ChargeBack/Assessments";
import TransactionsList from "../views/Transactions/List";
import Transaction from "../views/Transactions/Transaction";
import CustomerItem from "../views/Customers/CustomerItem";
import RollingReserveItem from "../views/Balance/RollingReserveItem";
import SettlementItem from "../views/Balance/SettlementItem";
import Settlements from "../views/Balance/Settlements";
import RefundItem from "../views/Transactions/RefundItem";
import PaymentLinksItem from "../views/PaymentLinks/PaymentLinksItem";
import SubaccountsItem from "../views/Subaccounts/SubaccountsItem";
import ChargeBacksItem from "../views/ChargeBack/ChargeBacksItem";
import AssessmentsItem from "../views/ChargeBack/AssessmentsItem";
import DeployedItem from "../views/PointOfSale/DeployedItem";
import RequestsItem from "../views/PointOfSale/RequestsItem";
import TransferTable from "../views/Payout/TransferTable";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openToastAndSetContent } from "../redux/actions/toast/toastActions";
import { logOut } from "../redux/actions/auth/authActions";
// import 'bootstrap/dist/css/bootstrap.min.ema';
import { saveMe } from "../redux/actions/me/meActions";
import BillTabPanel from "../views/Bills/BillTabPanel";
import AirtimeSaleRequest from "../views/Bills/AirtimeSaleRequest";
import BulkAirtimePayment from "../components/bills/BulkAirtimePayment";
import BillSaleRequest from "../views/Bills/BillSaleRequest";
import BulkBillPayment from "../components/bills/BulkBillPayment";
import NavHeader from "../components/navbarMenu/NavHeader";
import ResetPassword from "../views/Reset/password/ResetPassword";
import AccountSetUp from "../components/accountSetUp/AccountSetUp";
import AccountSetup from "../views/SignUp/accountsetup/AccountSetup";
import Invoice from "../components/bills/invoice/Invoice";
import BulkTransferEntry from "../views/Payout/transfer/BulkTransferEntry";
import Pendingdetails from "../views/Payout/Pendingdetails";
import BeneficiaryDetails from "../views/Payout/BeneficiaryDetails";
import CustomersTab from "../views/Customers/CustomersTab";
import BlacklistTab from "../views/Customers/BlacklistTab";
import BlacklistDatatable from "../views/Customers/BlacklistDatatable";
import InvoiceDetails from "../components/bills/invoice/InvoiceDetails";
import TransferHistory from "../views/Payout/transfer/TransferHistory";

export default function AppRoutes() {
  // const { loadingState } = useSelector((state) => state?.loadingStateReducer);
  const { access_token: loadingState } = useSelector(
    (state) => state?.authReducer?.auth
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const { access_token } = useSelector((state) => state?.authReducer?.auth);

  axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  axios.defaults.baseURL = "https://staging.itex-pay.com/ipg/api/v1";
  console.log(process.env.REACT_APP_ROOT_URL);
  console.log(process.env.NODE_ENV);
  axios?.interceptors?.response?.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      const { message } = error.response.data;
      if (error.response) {
        dispatch(
          openToastAndSetContent({
            toastContent: "Failed",
            toastStyles: {
              backgroundColor: "red",
            },
          })
        );
      } else if (error.request) {
        console.log("sorry, there was an error");
      } else {
        dispatch(
          openToastAndSetContent({
            toastContent: "Failed",
            toastStyles: {
              backgroundColor: "red",
            },
          })
        );
      }
      // handle expired token
      //|| error?.response?.status === 400
      if (
        error?.response?.status === 401 ||
        message?.toLowerCase() === "login again"
      ) {
        dispatch(
          openToastAndSetContent({
            toastContent: "Token Expired",
            toastStyles: {
              backgroundColor: "red",
            },
          })
        );
        localStorage.clear();
        dispatch(logOut());
        history.push("/signin");
      } else {
        return Promise.reject(error);
      }
    }
  );
  return (
    <Router>

      <Drawer />
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/account_type"></Route>
        <Route exact path="/business/signup">
          <BusinessSignUp />
        </Route>
        <Route exact path="/ngo/signup">
          <BusinessSignUp />
        </Route>
        <Route exact path="/individual_signup">
          <IndividualSignUp />
        </Route>

        <Route exact path="/forgotpassword">
          <LoginPasswordReset />
        </Route>
        <Route exact path="/newpassword">
          <NewPassword />
        </Route>
        <Route exact path="/email_verification">
          <EmailVerification />
        </Route>
        <Route exact path="/reset/password">
          <ResetPassword />
        </Route>

        <ParentContainer>

          <>
            <ProtectedRoute
              exact
              path="/"
              component={MerchantOverview}
            // AuthUser={loadingState}
            />

            {/* <ProtectedRoute
							exact
							path='/merchant_overview'
							component={MerchantOverview}
							AuthUser={loadingState}
						/> */}

            <ProtectedRoute
              exact
              path="/transactions"
              component={Transactions}
            // AuthUser={loadingState}
            />
            {/* <ProtectedRoute
              exact
              path="/transactions"
              component={Transactions}
              AuthUser={AccountSetUp}
            /> */}
            <ProtectedRoute
              exact
              path="/transactions/list"
              component={TransactionsList}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/transaction/:id"
              component={Transaction}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/transactions/refund"
              component={Refund}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/transactions/refund/:slug"
              component={RefundItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/balance"
              component={Balance}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/balance/balance_history"
              component={BalanceHistory}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/balance/balance_history/:slug"
              component={SettlementItem}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/balance/settlements"
              component={Settlements}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/balance/settlements/:slug"
              component={SettlementItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/balance/rolling_reserve"
              component={RollingReserve}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/balance/rolling_reserve/:slug"
              component={RollingReserveItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/customers"
              component={CustomersTab}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/blacklist"
              component={BlacklistDatatable}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/customers/:slug"
              component={CustomerItem}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/transfers"
              component={Transfers}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/transfer/entries"
              component={BulkTransferEntry}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/transfer/history"
              component={TransferHistory}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/transfers/list"
              component={TransferTable}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/beneficiaries"
              component={Beneficiaries}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/beneficiaries/details/:id"
              component={BeneficiaryDetails}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payout/pending_approval"
              component={PendingApproval}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/payout/pending_approval/details/:id"
              component={Pendingdetails}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/payout/funding_history"
              component={FundingHistory}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              path="/payout/transfer_balance"
              component={TransferBalance}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/chargebacks"
              component={ChargeBacks}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/chargebacks/:slug"
              component={ChargeBacksItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/chargeback/pending"
              component={Pending}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              path="/chargeback/awaiting_response"
              component={AwaitingResponse}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/chargeback/won"
              component={Won}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/chargeback/lost"
              component={Lost}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/chargeback/assessments"
              component={Assessments}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/chargeback/assessments/:slug"
              component={AssessmentsItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/subaccounts"
              component={Subaccounts}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/subaccounts/:slug"
              component={SubaccountsItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/payment_links"
              component={PaymentLinks}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/payment_links/:slug"
              component={PaymentLinksItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/store"
              component={ItexStore}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/point_of_sale"
              component={PointOfSale}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/point_of_sale/requests/:slug"
              component={RequestsItem}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/point_of_sale/deployed/:slug"
              component={DeployedItem}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/point_of_sale/terminal_requests"
              component={TerminalRequests}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/bills"
              component={BillTabPanel}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/airtime/requests/:slug"
              component={AirtimeSaleRequest}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/bills/invoice"
              component={Invoice}

            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/bills/invoice/details/:id"
              component={InvoiceDetails}

            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/bill/requests/:slug"
              component={BillSaleRequest}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/airtime/bulk-payment"
              component={BulkAirtimePayment}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/bill/bulk-payment"
              component={BulkBillPayment}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/general_setting"
              component={GeneralSettings}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/general_setting/bank_accounts"
              component={BankAccounts}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/general_setting/users"
              component={Users}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/general_setting/api"
              component={Api}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/general_setting/web_hooks"
              component={WebHooks}
            // AuthUser={loadingState}
            />

            <ProtectedRoute
              exact
              path="/general_setting/account_settings"
              component={AccountSettings}
            // AuthUser={loadingState}
            />
            <ProtectedRoute
              exact
              path="/quickupdate/:id"
              component={QuickUpdate}
            // AuthUser={loadingState}
            />


          </>
          <Route exact path="/test/home">
            <AccountSetup />
          </Route>
        </ParentContainer>
      </Switch>
    </Router >
  );
}
