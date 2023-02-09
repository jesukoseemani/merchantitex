import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Customers.module.scss";
import { makeStyles } from "@material-ui/styles";
import BlacklistTab from "./BlacklistTab";
import CustomersTab from "./CustomersTab";

export type TabStateType = "customers" | "blacklist";

export const useTabBtnStyles = makeStyles({
  root: {
    "& .Mui-selected": {
      color: "#27AE60",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#27AE60",
      height: "3px",
    },
    "& .MuiButtonBase-root": {
      fontSize: "1rem",
      fontWeight: "400",
    },
  },
});

export const useTableStyles = makeStyles({
  root: {
    marginTop: "1rem",
    "& .MuiTableRow-head": {
      fontSize: ".875rem",
      padding: "1rem",
      backgroundColor: "#F4F6F8",
    },
    "& .MuiTableCell-head": {
      fontSize: ".875rem",
      color: "#333",
      fontWeight: "500",
      textTransform: "capitalize",
    },
    "& .MuiTableCell-root": {
      borderBottom: "none",
    },
    "& .MuiTableCell-body": {
      fontFamily: `'Roboto', san-serif`,
      fontWeight: "400",
      fontSize: ".875rem",
      color: "#333",
      borderBottom: "1px solid #E0E0E0",
      cursor: "pointer",
    },
    "& .darkText": {
      color: "#333",
      fontSize: ".875rem",
      fontWeight: "700",
    },
    "& .redText": {
      color: "#EB5757",
      fontSize: ".875rem",
      fontWeight: "700",
    },
    "& .greenText": {
      color: "#219653",
      fontSize: ".875rem",
      fontWeight: "700",
    },
    "& .lightText": {
      color: "#828282",
      fontSize: ".875rem",
    },
  },
});

const Customers = () => {
  const tabBtnClasses = useTabBtnStyles();

  const [value, setValue] = useState<TabStateType>("customers");
  const [listView, setListView] = useState(false);

  const handleTabChange = (event: SyntheticEvent, newValue: TabStateType) => {
    setListView(false);
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <NavBar name="Customers" />
      <hr />
      <div className={styles.pageWrapper}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="customer tabs"
          className={tabBtnClasses.root}
        >
          <Tab label="Customers" value="customers" />
          <Tab label="Blacklist" value="blacklist" />
        </Tabs>

        <CustomersTab value={value} index="customers" />
        <BlacklistTab />
      </div>
    </div>
  );
};

export default Customers;
