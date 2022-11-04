import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import OverviewCard from "../../components/card/overviewCard/OverviewCard";
import MerchantChart from "../../components/merchantChart/MerchantChart";
import NavBar from "../../components/navbar/NavBar";
import OverviewTable from "../../components/table/OverviewTable";
import Styles from "./merchantOverview.module.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Progress } from "semantic-ui-react";
import { PieChart } from "react-minimal-pie-chart";

const MerchantOverview = () => {
  const [selected, setSelected] = useState<number | undefined>(0);

  return (
    <div
      className={Styles.container}
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <NavBar name="Merchant Overview" />
      <MerchantChart /> 
      <OverviewCard />
      <div className={Styles.tableWrapper}>
        <OverviewTable title="What devices do my customers use the most?">
          <div className={Styles.deviceContainer}>
            <div>
              <PieChart
                style={{ height: "100px", width: "100px" }}
                animate={true}
                data={[
                  { title: "Tablets", value: 16, color: "#27AE60" },
                  { title: "Phones", value: 60, color: "#406A99" },
                  { title: "Desktop", value: 24, color: "#56CCF2" },
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
              <h2>1,175</h2>
              <span>Total customers</span>
            </div>
            <div>
              <div>
                <div>
                  <div className={Styles.status}></div>
                  <h2>Tablets</h2>
                </div>
                <span>188 customers - 16%</span>
              </div>
              <div>
                <div>
                  <div className={Styles.status}></div>
                  <h2>Phones</h2>
                </div>
                <span>705 customers - 60%</span>
              </div>
              <div>
                <div>
                  <div className={Styles.status}></div>
                  <h2>Desktop</h2>
                </div>
                <span>282 customers - 24%</span>
              </div>
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="When do I get paid the most?">
          <div className={Styles.weekDaysContainer}>
            <div>
              <p>Monday</p>
              <Progress percent={85} />
            </div>
            <div>
              <p>Tuesday</p>
              <Progress percent={12} />
            </div>
            <div>
              <p>Wednesday</p>
              <Progress percent={40} />
            </div>
            <div>
              <p>Thursday</p>
              <Progress percent={11} />
            </div>
            <div>
              <p>Friday</p>
              <Progress percent={11} />
            </div>
            <div>
              <p>Saturday</p>
              <Progress percent={20} />
            </div>
            <div>
              <p>Sunday</p>
              <Progress percent={34} />
            </div>
          </div>
        </OverviewTable>
        <OverviewTable
          title="What payment option do my customers use the most?"
          subTitle="44% of your customers prefer to pay with their cards."
        >
          <div className={Styles.paymentContainer}>
            <div>
              <p>Card payments</p>
              <Progress className={Styles.successBar} percent={85} progress />
            </div>
            <div>
              <p>Bank Payments</p>
              <Progress className={Styles.primaryBar} percent={12} progress />
            </div>
            <div>
              <p>QR Payments</p>
              <Progress className={Styles.primaryBar} percent={40} progress />
            </div>
            <div>
              <p>USSD Payments</p>
              <Progress className={Styles.primaryBar} percent={11} progress />
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="Top customers by spending">
          <div className={Styles.listWrapper}>
            <div className={Styles.listItem}>
              <div>
                <h2>Nonso Amadi</h2>
                <span>nonsoamadi@gmail.com</span>
              </div>
              <div>
                <h2>NGN520,000</h2>
                <span>Amount spent</span>
              </div>
            </div>
            <div className={Styles.listItem}>
              <div>
                <h2>Veracity Amadi</h2>
                <span>veracityamadi@gmail.com</span>
              </div>
              <div>
                <h2>NGN430,500</h2>
                <span>Amount spent</span>
              </div>
            </div>
            <div className={Styles.listItem}>
              <div>
                <h2>Jonnes Jack</h2>
                <span>nonsoamadi@gmail.com</span>
              </div>
              <div>
                <h2>NGN520,000</h2>
                <span>Amount spent</span>
              </div>
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="What banks do my customers use the most?">
          <div className={Styles.deviceContainer}>
            <div>
              <PieChart
                style={{ height: "100px", width: "100px" }}
                animate={true}
                data={[
                  { title: "GTBank", value: 16, color: "#BB6BD9" },
                  { title: "UBA", value: 60, color: "#FF9C72" },
                  { title: "Kuda", value: 24, color: "#56CCF2" },
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
              <h2>1,175</h2>
              <span>Total customers</span>
            </div>
            <div>
              <div>
                <div>
                  <div
                    className={`${Styles.status} ${Styles.puppleStatus}`}
                  ></div>
                  <h2>GTBank</h2>
                </div>
                <span>188 customers - 16%</span>
              </div>
              <div>
                <div>
                  <div
                    className={`${Styles.status} ${Styles.orangeStatus}`}
                  ></div>
                  <h2>UBA</h2>
                </div>
                <span>705 customers - 60%</span>
              </div>
              <div>
                <div>
                  <div
                    className={`${Styles.status} ${Styles.skyBlueStatus}`}
                  ></div>
                  <h2>Kuda</h2>
                </div>
                <span>282 customers - 24%</span>
              </div>
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="Top customers by number of transactions">
          <div className={Styles.listWrapper}>
            <div className={Styles.listItem}>
              <div>
                <h2>Nonso Amadi</h2>
                <span>nonsoamadi@gmail.com</span>
              </div>
              <div>
                <h2>520</h2>
                <span>Amount spent</span>
              </div>
            </div>
            <div className={Styles.listItem}>
              <div>
                <h2>Veracity Amadi</h2>
                <span>veracityamadi@gmail.com</span>
              </div>
              <div>
                <h2>430</h2>
                <span>Amount spent</span>
              </div>
            </div>
            <div className={Styles.listItem}>
              <div>
                <h2>Jonnes Jack</h2>
                <span>nonsoamadi@gmail.com</span>
              </div>
              <div>
                <h2>520</h2>
                <span>Amount spent</span>
              </div>
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="Success rate">
          <div className={Styles.deviceContainer}>
            <div>
              <PieChart
                style={{ height: "140px", width: "140px" }}
                animate={true}
                data={[
                  { title: "Successful", value: 85, color: "#6FCF97" },
                  { title: "Failed", value: 15, color: "#EB5757" },
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
              <h2>1,175</h2>
              <span>Total customers</span>
              <div className={Styles.listStatus}>
                <div
                  className={`${Styles.status} ${Styles.dangerStatus}`}
                ></div>
                <p>Failed - 444 (44%)</p>
              </div>
              <div className={Styles.listStatus}>
                <div
                  className={`${Styles.status} ${Styles.successsStatus}`}
                ></div>
                <p>Successful - 444 (44%)</p>
              </div>
            </div>
          </div>
        </OverviewTable>
        <OverviewTable title="Reasons for transactions failure">
          <ol className={Styles.transactionContainer}>
            <li>
              Insufficient Funds: Your card cannot be charged due toinsufficient
              funds. Please try another card or fund yourcard and try again.
            </li>
            <li>
              Insufficient Funds: Your card cannot be charged due toinsufficient
              funds. Please try another card or fund yourcard and try again.
            </li>
            <li>
              Insufficient Funds: Your card cannot be charged due toinsufficient
              funds. Please try another card or fund yourcard and try again.
            </li>
          </ol>
        </OverviewTable>
      </div>
    </div>
  );
};

export default MerchantOverview;
