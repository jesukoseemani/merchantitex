import React, { SyntheticEvent, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./PointOfSale.module.scss";
import { makeStyles } from "@material-ui/styles";
import { Tab, Tabs } from "@mui/material";
import DeployedTab from "./DeployedTab";
import RequestsTab from "./RequestsTab";
import PosModal from './PosModal';
import ParentContainer from "../../components/ParentContainer/ParentContainer";

export type PosTabStateType = 'requests' | 'deployed';

export const useTabBtnStyles = makeStyles({
  root: {
    " .MuiTabs-indicator ": {
      border: "2px solid red"
    },
    '& .Mui-selected': {
      // color: '#27AE60',

      position: "relative",

      "& ::after": {
        border: "2px solid red",
        content: "",
        position: "absolute",
        width: "10px",
        bottom: 0,
        height: "10px",


      }

    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#27AE60',
      height: '1px',
      width: "10px"
    },
    '& .MuiButtonBase-root': {
      fontSize: '1rem',
      fontWeight: '400',


    },
    '& .css-z7wd5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: "#27AE60",
      fontFamily: "Avenir",

    },
    ' .makeStyles-root-339 .MuiTabs-indicator ': {
      height: "3px",
      width: "10px"

    },
    root: { width: '60%', margin: 'auto' },
  }
})

const PointOfSale = () => {
  const tabBtnClasses = useTabBtnStyles();

  const [value, setValue] = useState<PosTabStateType>('requests');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleTabChange = (event: SyntheticEvent, newValue: PosTabStateType) => {
    setValue(newValue);
  };




  return (


    <div className={styles.container}>
      <PosModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      {/* <NavBar title="Point Of Sale"/> */}
      <div className={styles.pageWrapper}>
        <Tabs
          value={value} onChange={handleTabChange} aria-label="pos tabs"
          className={tabBtnClasses.root}
        >
          <Tab label="Requests" value='requests' />
          <Tab label="Deployed" value='deployed' />
        </Tabs>

        <RequestsTab
          value={value}
          index='requests'
          openModal={() => setIsModalOpen(true)}
          closeModal={() => setIsModalOpen(false)}
        />
        <DeployedTab
          value={value}
          index='deployed'
          openModal={() => setIsModalOpen(true)}
          closeModal={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default PointOfSale;