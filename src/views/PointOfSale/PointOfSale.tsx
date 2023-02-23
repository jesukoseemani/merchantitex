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
    '& .Mui-selected': {
      color: '#27AE60',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#27AE60',
      height: '3px'
    },
    '& .MuiButtonBase-root': {
      fontSize: '1rem',
      fontWeight: '400',
    }
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