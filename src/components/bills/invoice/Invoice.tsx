import { Box, Button, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions'
import CreateInvoice from './CreateInvoice'
import InvoiceRequesttable from './InvoiceRequesttable'
import Styles from "./style.module.scss"

const Invoice = () => {
    const dispatch = useDispatch()
    const handleCreateInvoice = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "0.5rem",
                    boxShadow: "-4px 4px 14px rgba(224, 224, 224, 0.69)",
                },
                modalContent: (
                    <div className="modalDiv">
                        <CreateInvoice />
                    </div>
                ),
            })
        );
    }
    return (
        <Box px={5}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className={Styles.headerTitle}>30 Invoices Created</h2>

            </Box>
            <Stack direction={"row"} justifyContent="flex-end" alignItems={"center"} spacing={2}>
                <button className={Styles.outlinedBtn}>All invoice</button>
                <button className={Styles.containedBtn} onClick={handleCreateInvoice}>+ Create invoice</button>
            </Stack>

            <Box sx={{ marginTop: 2 }}>
                <InvoiceRequesttable />
            </Box>
        </Box>
    )
}

export default Invoice
