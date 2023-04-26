import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Styles from "./style.module.scss";
import TransfersTable from '../../../components/table/TransfersTable';
import BeneficiaryMenu from '../BeneficiaryMenu';
import { useDispatch } from 'react-redux';
import SingleTransferBankAcct from './SingleTransferBankAcct';
import { makeStyles } from '@material-ui/styles';
import CustomModal from '../../../components/customs/CustomModal';

const Listtransfer = () => {

    const useStyles = makeStyles({
        mui: {
            ".MuiPaper": {
                border: "2px solid green"
            }
        }
    })

    const { mui } = useStyles()
    const dispatch = useDispatch()
    // open menu
    const [download, setDownload] = React.useState<null | HTMLElement>(null);



    // please explain
    const openDownloadMenu = Boolean(download);

    const [openModal, setOpenModal] = useState(false)
    const handleCloseModal = () => setOpenModal(false);



    const handleOpenDownloadMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setDownload(event.currentTarget);
    };

    const handleCloseDownloadMenu = () => {
        setDownload(null);
    };


    // download
    const downloadpdfFuc = () => { }
    const downloadexcelFuc = () => { }
    const downloadcsvFuc = () => { }
    // download menu array
    const dataDownload = [
        {
            id: 1,
            name: "PDF",
            func: downloadpdfFuc,
        },
        {
            id: 2,
            name: "Excel",
            func: downloadexcelFuc,
        },

        {
            id: 3,
            name: "CSV",
            func: downloadcsvFuc,
        },
    ];

    return (

        <Box mt={"20px"}>
            <Box>
                <Stack direction={"row"} justifyContent="space-between" gap={"5px"} flexWrap="wrap">
                    <h2 className={Styles.transfertitle}>19 Payout</h2>
                    <Box className={Styles.headerBox}>
                        <button><FilterAltOutlinedIcon />Filter by:</button>
                        <button onClick={handleOpenDownloadMenu}> <InsertDriveFileOutlinedIcon />Download</button>
                        <button onClick={() => setOpenModal(true)}>+ New transfer</button>
                    </Box>
                </Stack>
            </Box>

            {/* download */}
            <BeneficiaryMenu
                openBeneficiary={openDownloadMenu}
                handleCloseMenu={handleCloseDownloadMenu}
                beneficiary={download}
                data={dataDownload}
                style={{ width: "8.5rem", borderRadius: "20px" }}
            />

            <Box sx={{ width: "100%", marginInline: "auto" }}>
                <TransfersTable />
            </Box>

            <Box>
                <CustomModal
                    title="Make a payout"
                    isOpen={openModal}
                    handleClose={handleCloseModal}
                    close={() => setOpenModal(false)}>

                    <SingleTransferBankAcct close={handleCloseModal} />
                </CustomModal >
            </Box>
        </Box>
    )
}

export default Listtransfer