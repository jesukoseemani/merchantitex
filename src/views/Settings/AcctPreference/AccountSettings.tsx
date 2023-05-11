import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import styles from "./style.module.scss"
import { Tab, Box } from '@mui/material';
import { AccountsTab } from './AccountsTab';
import PaymentTab from './PaymentTab';

const AccountSettings = () => {
  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <div className={styles.container}>
      <TabContext value={tabValue}>
        <Box>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Account Preferences" value="1" />
            <Tab label="Payment Preferences" value="2" />
          </TabList>
        </Box>
        <Box mt={"34px"}>
          <TabPanel value="1" sx={{ padding: 0 }}><AccountsTab /></TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}><PaymentTab /></TabPanel>
        </Box>
      </TabContext>
    </div>
  )
}

export default AccountSettings