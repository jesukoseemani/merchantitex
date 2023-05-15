import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Styles from "./style.module.scss";
import TransfersTable from '../../../components/table/TransfersTable';
import BeneficiaryMenu from '../beneficiary/BeneficiaryMenu';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { BASE_URL } from '../../../config';
import useDownload from '../../../hooks/useDownload';
import { PayoutRes } from '../../../types/Payout';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Addpayout from './Addpayout';

const DATA = {
    balance: 0,
    amount: 0,
    account: 0,
    description: ''
}

const Listtransfer = ({ payout, setOpen, changePage }: { payout?: PayoutRes, setOpen?: () => void; changePage?: (p: number) => void }) => {
    const { calDownload } = useDownload({ url: `${BASE_URL}/payout/download`, filename: 'payout' })

    const useStyles = makeStyles({
        mui: {
            ".MuiPaper": {
                border: "2px solid green"
            }
        }
    })

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







    const MakePayout = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "419px",
                    minHeight: "617pxpx",
                    borderRadius: '20px',
                    boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)"
                },
                modalTitle: "Make a payout",
                modalContent: (
                    <div className='modalDiv'>

                        {/* <ItexModalPayout /> */}
                        <Addpayout />
                    </div>
                ),
            })
        );
    }


    return (

        <Box mt={"20px"}>
            <Box>
                <Stack direction={"row"} justifyContent="space-between" gap={"5px"} flexWrap="wrap">
                    <h2 className={Styles.transfertitle}>{payout?._metadata?.totalcount || 0} Payout(s)</h2>
                    <Box className={Styles.headerBox}>
                        <button onClick={setOpen}><FilterAltOutlinedIcon />Filter by:</button>
                        <button onClick={calDownload}> <InsertDriveFileOutlinedIcon />Download</button>
                        <button onClick={MakePayout}>+ New transfer</button>
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
                <TransfersTable payout={payout!} changePage={changePage} />
            </Box>


        </Box>
    )
}

export default Listtransfer