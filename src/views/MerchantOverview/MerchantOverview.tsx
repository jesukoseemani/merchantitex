import React, { useEffect, useState } from "react";
import OverviewCard from "../../components/card/overviewCard/OverviewCard";
import MerchantChart from "../../components/merchantChart/MerchantChart";
import OverviewTable from "../../components/table/OverviewTable";
import Styles from "./merchantOverview.module.scss";
import { Progress } from "semantic-ui-react";
import { PieChart } from "react-minimal-pie-chart";
import HelpCenter from "../../assets/images/helpCenter.svg";
import { ReactSVG } from "react-svg";
import { Box, Modal } from "@mui/material";
import Helpcenter from "../../components/merchantChart/Helpcenter";
import {
  getTopChargeType,
  getTopCustomers,
  getTopFailure,
  getTransactionPerformance,
  getTransactionSummary,
} from "../../services/trend";
import { ChargeType, Failure, Summary, TopCustomer, Performance, ChargeTypeRes } from "../../types/TrendTypes";
import { capitalize } from "lodash";
import FormatToCurrency from "../../helpers/NumberToCurrency";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 290,
  height: 314,
  bgcolor: "background.paper",
  boxShadow: " 0px 3px 20px rgba(8, 15, 52, 0.16)",

  borderRadius: "20px",
};

const getPercent = (data: ChargeTypeRes) => {
  if (!data) return { count: 0, percent: 0 };

  let count = 0;
  let type = '';

  data.data.forEach((c) => {
    if (c.count > count) {
      count = c.count;
      type = c.chargetype!
    }
  })

  return { type, percent: Math.round((count / data.total) * 100) }
}
const MerchantOverview = () => {
  const [selected, setSelected] = useState<number | undefined>(0);

  const [open, setOpen] = React.useState(false);
  const handleHelpCenter = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [{ charge, customer, summary, performance, failure }, setData] =
    useState<{
      charge: ChargeTypeRes | null;
      customer: TopCustomer[];
      summary: Summary[];
      performance: Performance | null;
      failure: Failure[];
    }>({
      charge: null,
      customer: [],
      summary: [],
      performance: null,
      failure: [],
    });

  useEffect(() => {
    (async () => {
      try {
        const [charge, customer, summary, performance, failure] =
          await Promise.all([
            getTopChargeType({ fromdate: "2020-01-01", todate: "2023-04-01" }),
            getTopCustomers({ fromdate: "2020-01-01", todate: "2023-04-01" }),
            getTransactionSummary({
              fromdate: "2020-01-01",
              todate: "2023-04-01",
            }),
            getTransactionPerformance({
              fromdate: "2020-01-01",
              todate: "2023-04-01",
            }),
            getTopFailure({ fromdate: "2020-01-01", todate: "2023-01-01" }),
          ]);

        setData({
          charge,
          customer: customer?.data,
          summary: summary?.data,
          performance: performance?.data!,
          failure: failure?.data,
        });
      } catch (error) { }
    })();
  }, []);

  return (
    <div
      className={Styles.container}
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      {/* <NavBar name="Merchant Overview" /> */}
      <MerchantChart summary={summary} total={performance?.total || 0} />
      <OverviewCard abandoned={performance?.abandoned || 0} />
      <div className={Styles.tableWrapper}>

        <OverviewTable
          title="What payment option do my customers use the most?"
          subTitle={`${getPercent(charge!).percent}% of your customers prefer to pay with ${getPercent(charge!).type}.`}
        >
          <div className={Styles.paymentContainer}>
            {
              charge?.data?.length! > 0 && charge?.data.map((c, i) => (
                <div key={i}>
                  <p>{c.chargetype?.toUpperCase() || '---'} Payments</p>
                  <Progress className={Styles.successBar} percent={Math.round((c?.count / charge?.total!) * 100)} progress />
                </div>
              ))
            }
          </div>
        </OverviewTable>
        <OverviewTable title="Top customers by volume and value">
          <div className={Styles.listWrapper}>
            {
              customer?.length > 0 && customer.map((c, i) => (
                <div className={Styles.listItem} key={i}>
                  <div>
                    <h2>{`${capitalize(c?.firstname || '')} ${capitalize(c?.lastname || '')}`}</h2>
                    <span>{c?.email || ''}</span>
                  </div>
                  <div>
                    <h2>NGN{FormatToCurrency(c?.transaction_amount)}</h2>
                    <span>Amount spent</span>
                  </div>
                </div>
              ))
            }
          </div>
        </OverviewTable>

        <OverviewTable title="Perfomance">
          <div className={Styles.deviceContainer}>
            <div>
              <PieChart
                style={{ height: "140px", width: "140px" }}
                animate={true}
                data={[
                  { title: "Successful", value: performance?.success || 0, color: "#6FCF97" },
                  { title: "Failed", value: performance?.failed || 0, color: "#EB5757" },
                  { title: "Pending", value: performance?.pending || 0, color: "#ff9c72" },
                  { title: "Abandoned", value: performance?.abandoned || 0, color: "#bb6bd9" },
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
            </div>
            <div>
              <h2>{performance?.total || 0}</h2>
              <span>Total customers</span>
              <div className={Styles.listStatus}>
                <div
                  className={`${Styles.status} ${Styles.dangerStatus}`}
                ></div>
                <p>Failed - {performance?.failed || 0} ({Math.round((performance?.failed! / performance?.total!) * 100)}%)</p>
              </div>
              <div className={Styles.listStatus}>
                <div
                  className={`${Styles.status} ${Styles.successsStatus}`}
                ></div>
                <p>Successful - {performance?.success || 0} ({Math.round((performance?.success! / performance?.total!) * 100)}%)</p>
              </div>
              <div className={Styles.listStatus}>
                <div
                  className={`${Styles.status} ${Styles.orangeStatus}`}
                ></div>
                <p>Pending - {performance?.pending || 0} ({Math.round((performance?.pending! / performance?.total!) * 100)}%)</p>
              </div>
              <div className={Styles.listStatus}>
                <div
                  className={`${Styles.status} ${Styles.puppleStatus}`}
                ></div>
                <p>Abandoned - {performance?.abandoned || 0} ({Math.round((performance?.abandoned! / performance?.total!) * 100)}%)</p>
              </div>
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="Top reasons for transactions failure">
          <ol className={Styles.transactionContainer}>
            {
              failure?.length > 0 && failure.map((f, i) => (
                <li key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p style={{ textAlign: "start" }}>
                      {capitalize(f?.responsemessage) || ''}
                    </p>
                    <p>
                      {f?.count || 0} transaction{f?.count > 1 && 's'}
                    </p>

                  </div>
                </li>

              ))
            }
          </ol>
        </OverviewTable>

        <Box
          sx={{
            position: "fixed",
            right: 0,
            bottom: "10%",
            transform: "translate(-50% -50%)",
            cursor: "pointer",
          }}
        >
          <ReactSVG src={HelpCenter} onClick={handleHelpCenter} />
        </Box>
        <Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Helpcenter />
            </Box>
          </Modal>
        </Box>
      </div>
    </div>
  );
};

export default MerchantOverview;
