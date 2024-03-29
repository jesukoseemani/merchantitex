import { Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import styles from "./transferEntries.module.scss"
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import TransferentryErrorTable from './TransferentryErrorTable'
import Navigation from '../../../components/navbar/Navigation'
const BulkTransferEntry = () => {
    return (
        <Navigation title='Transfer Entries'>
            <Box mt="27px">
                <Box className={styles.sectionOne}>
                    <Link to="/payout/transfer/history">
                        <Stack direction={"row"} alignItems="center" ml={"-10px"}>
                            <ArrowLeftIcon />
                            <p>Back to bulk transfers</p>
                        </Stack>
                    </Link>
                </Box>



                <Box mt="17px">
                    <TransferentryErrorTable />
                </Box>
            </Box>

        </Navigation>
    )
}

export default BulkTransferEntry
