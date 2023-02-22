import { Box, Stack } from '@mui/material'
import React from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Styles from "./style.module.scss";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import TransfersTable from '../../../components/table/TransfersTable';
import BeneficiaryMenu from '../BeneficiaryMenu';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import SingleTransferBankAcct from './SingleTransferBankAcct';
import SIngleTransferPayvice from './SIngleTransferPayvice';
import SingleTransferItex from './SingleTransferItex';

const Listtransfer = () => {
    const dispatch = useDispatch()
    // open menu
    const [beneficiary, setBeneficiary] = React.useState<null | HTMLElement>(null);
    const [download, setDownload] = React.useState<null | HTMLElement>(null);
    const [singleTrans, setSingleTrans] = React.useState<null | HTMLElement>(null);
    const openBeneficiary = Boolean(beneficiary);
    const openDownloadMenu = Boolean(download);
    const openSingleTransMenu = Boolean(singleTrans);

    const handleClickBeneficiary = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setBeneficiary(event.currentTarget);
    };
    const handleOpenDownloadMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setDownload(event.currentTarget);
    };
    // const handleOpenSingle = () => {
    //     setSingleTrans(22);
    // };

    const handleCloseMenu = () => {
        setBeneficiary(null);
    };
    const handleCloseSingleTrans = () => {
        setSingleTrans(null);
    };






    const handleSingleTransfer = () => {
        setSingleTrans(!null);

    }
    const handleBulkTrans = () => { }

    const handleCloseDownloadMenu = () => {
        setDownload(null);
    };



    // single transfer dropdown

    const handleBankAcct = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "420px",
                    minHeight: "380px",
                    overflow: "hidden"
                },
                modalContent: (
                    <>
                        <SingleTransferBankAcct />
                    </>
                ),
            })
        );
    }
    const handlePayviceAcct = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "420px",
                    minHeight: "340px",
                    overflow: "hidden"
                },
                modalContent: (
                    <>
                        <SIngleTransferPayvice />
                    </>
                ),
            })
        );
    }
    const handleItexPayAcct = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: "20px",
                    width: "420px",
                    minHeight: "380px",
                    overflow: "hidden"
                },
                modalContent: (
                    <>
                        <SingleTransferItex />
                    </>
                ),
            })
        );
    }


    const singleData = [
        {
            id: 1,
            name: "Bank Account",
            func: handleBankAcct,
        },
        {
            id: 2,
            name: "Payvice",
            func: handlePayviceAcct,
        },

        {
            id: 3,
            name: "ITEX pay",
            func: handleItexPayAcct,
        },
    ];

    const data = [
        {
            id: 1,
            name: "Single Transfet",
            func: handleSingleTransfer,
        },
        {
            id: 2,
            name: "Bulk Transfer",
            func: handleBulkTrans,
        },


    ];




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

        <Box>
            <Box px={3} py={5}>
                <Stack direction={"row"} justifyContent="space-between" gap={3}>
                    <h2>19 transfers</h2>
                    <Box className={Styles.headerBox}>
                        <button><FilterAltOutlinedIcon />Filter by:</button>
                        <button onClick={handleOpenDownloadMenu}> <InsertDriveFileOutlinedIcon />Download</button>
                        <button onClick={handleClickBeneficiary}>+ New transfer</button>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ width: "95%", marginInline: "auto" }}>
                <TransfersTable />
            </Box>

            <Box>
                {/* single transfer menu */}
                <BeneficiaryMenu
                    openBeneficiary={openSingleTransMenu}
                    handleCloseMenu={handleCloseSingleTrans}
                    beneficiary={singleTrans}
                    data={singleData}
                    style={{ width: "10rem", borderRadius: "20px", backgroundColor: "white", textAlign: "center", }}
                />
                {/* add new drop down menu */}
                <BeneficiaryMenu
                    openBeneficiary={openBeneficiary}
                    handleCloseMenu={handleCloseMenu}
                    beneficiary={beneficiary}
                    data={data}
                    style={{ width: "10rem", borderRadius: "20px", backgroundColor: "white", textAlign: "center" }}
                />

            </Box>



            {/* download */}
            <BeneficiaryMenu
                openBeneficiary={openDownloadMenu}
                handleCloseMenu={handleCloseDownloadMenu}
                beneficiary={download}
                data={dataDownload}
                style={{ width: "8.5rem", borderRadius: "20px", textAlign: "center" }}
            />
        </Box>
    )
}

export default Listtransfer