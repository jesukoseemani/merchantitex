import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Airtime from "../../components/bills/Airtime";
import Bills from "../../components/bills/Bills";
import ComingSoon from "../../components/comingSoon/ComingSoon";

export default function BillTabPanel() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     width: "100%",
    //     marginInline: "auto",
    //     marginTop: "27px"
    //   }}
    // >
    //   {/* <NavBar title="Airtime and Bills" /> */}
    //   <Box sx={{ width: "100%", marginInline: "auto", typography: "body1" }}>
    //     <TabContext value={value} >
    //       <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
    //         <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
    //           ".css-z7wd5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
    //             color: "#27AE60",
    //           },
    //           ".css-1ae12jd-MuiTabs-indicator": {
    //             background: "#27AE60",
    //             width: "10px"
    //           },
    //         }} >
    //           <Tab label="airtime" value="1" />
    //           <Tab label="bills" value="2" />
    //         </TabList>
    //       </Box>
    //       <TabPanel value="1" sx={{ padding: 0, }}>
    //         <Airtime />
    //       </TabPanel>
    //       <TabPanel value="2" sx={{ padding: 0 }}>
    //         <Bills />
    //       </TabPanel>
    //     </TabContext>
    //   </Box>
    // </div>
    <ComingSoon />
  );
}
