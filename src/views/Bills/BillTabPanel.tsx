import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import NavBar from "../../components/navbar/NavBar";
import Airtime from "../../components/bills/Airtime";
import Bills from "../../components/bills/Bills";

export default function BillTabPanel() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginInline: "auto",
      }}
    >
      <NavBar name="Airtime and Bills" />
      <Box sx={{ width: "98%", marginInline: "auto", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="airtime" value="1" />
              <Tab label="bills" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Airtime />
          </TabPanel>
          <TabPanel value="2">
            <Bills />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
