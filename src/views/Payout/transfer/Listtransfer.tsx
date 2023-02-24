import { Box, Stack } from '@mui/material'
import React from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Styles from "./style.module.scss";
import TransfersTable from '../../../components/table/TransfersTable';
import BeneficiaryMenu from '../BeneficiaryMenu';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import SingleTransferBankAcct from './SingleTransferBankAcct';
import SIngleTransferPayvice from './SIngleTransferPayvice';
import SingleTransferItex from './SingleTransferItex';
import BulkTransferAccount from './BulkTransferAccount';
import { makeStyles } from '@material-ui/styles';

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
    const [beneficiary, setBeneficiary] = React.useState<null | HTMLElement>(null);
    const [download, setDownload] = React.useState<null | HTMLElement>(null);
    const [singleTrans, setSingleTrans] = React.useState<any>(null);

    // please explain
    const [bulkTrans, setBulkTrans] = React.useState<any>(null);
    const openBeneficiary = Boolean(beneficiary);
    const openDownloadMenu = Boolean(download);
    const openSingleTransMenu = Boolean(singleTrans);
    const openBulkTransMenu = Boolean(bulkTrans);

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
    const handleCloseBulkTrans = () => {
        setBulkTrans(null);
    };

    const handleSingleTransfer = () => {
        setSingleTrans(beneficiary);

    }
    const handleBulkTrans = () => {
        setBulkTrans(beneficiary)
    }

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
                    minHeight: "700px",
                    // border: "/2px solid red"
                    // overflow: "hidden"
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
                    // overflow: "hidden"
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
                    // overflow: "hidden"
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
            name: "Single Transfer",
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


    const handleBulkBankAcct = () => {
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
    const handleBulkPayviceAcct = () => { }
    const handleBulkItexPayAcct = () => { }

    const bulkData = [
        {
            id: 1,
            name: "Bank Account",
            func: handleBulkBankAcct,
        },
        {
            id: 2,
            name: "Payvice",
            func: handleBulkPayviceAcct,
        },

        {
            id: 3,
            name: "ITEX pay",
            func: handleBulkItexPayAcct,
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

            <Box >
                {/* single transfer menu */}
                <BeneficiaryMenu
                    openBeneficiary={openSingleTransMenu}
                    handleCloseMenu={handleCloseSingleTrans}
                    beneficiary={singleTrans}
                    data={singleData}

                    style={{ width: "9rem", marginTop: "5px", borderRadius: "20px", backgroundColor: "white", }}
                />
                {/* Bulk transfer menu */}
                <BeneficiaryMenu
                    openBeneficiary={openBulkTransMenu}
                    handleCloseMenu={handleCloseBulkTrans}
                    beneficiary={bulkTrans}
                    data={bulkData}
                    style={{ width: "10rem", borderRadius: "20px", backgroundColor: "white", }}

                />

                {/* add new drop down menu */}
                <BeneficiaryMenu
                    openBeneficiary={openBeneficiary}
                    handleCloseMenu={handleCloseMenu}
                    beneficiary={beneficiary}
                    data={data}
                    style={{ width: "9rem", marginTop: "5px", borderRadius: "20px", backgroundColor: "white" }}
                />
            </Box>







            {/* download */}
            <BeneficiaryMenu
                openBeneficiary={openDownloadMenu}
                handleCloseMenu={handleCloseDownloadMenu}
                beneficiary={download}
                data={dataDownload}
                style={{ width: "8.5rem", borderRadius: "20px" }}
            />

            <Box sx={{ width: "95%", marginInline: "auto" }}>
                <TransfersTable />
            </Box>
        </Box>
    )
}

export default Listtransfer