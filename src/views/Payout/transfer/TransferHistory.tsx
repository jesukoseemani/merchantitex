import { Box, Stack } from '@mui/material'
import ErrorIcon from "../../../assets/images/errorIcon.svg"
import { ReactSVG } from 'react-svg'


import Styles from "./transferEntries.module.scss"
import TransferHistorytable from './TransferHistorytable'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions'
import BulkTransferAccount from './BulkTransferAccount'

const TransferHistory = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleErrorEntry = () => {
        history.push("/payout/transfer/entries")
    }

    const handleAddNew = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    minWidth: "420px",
                    minHeight: "380px",
                    overflow: "hidden"
                },
                modalContent: (
                    <>
                        <BulkTransferAccount />
                    </>
                ),
            })
        );
    }
    return (

        <Box>
            <Box className={Styles.errorBox} >
                <Stack direction={"row"} justifyContent="space-between" spacing={2} alignItems={"center"} flexWrap="wrap" sx={{ height: { xs: "auto", md: "100%" } }}>
                    <Stack direction={"row"} spacing={1} alignItems="center" className={Styles.errorIcon}><ReactSVG src={ErrorIcon} /><p> 227 entries contain errors</p></Stack>
                    <Box><p className={Styles.totalError}> 227 out of the 2,091 entries could not be verified because they contain some errors</p></Box>
                    <Box>  <button onClick={handleErrorEntry}>Review entries with errors</button></Box>
                </Stack>


            </Box>


            <Box mt="30px" className={Styles.transHeader}>
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                    <p>19 transfer bulk entries</p>
                    <Stack direction={"row"} spacing={2}>
                        <button onClick={handleAddNew}>+ Add another file</button>
                        <button>Confirm transfer</button>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ marginTop: "17px" }}>
                <TransferHistorytable />
            </Box>
        </Box>
    )
}

export default TransferHistory
