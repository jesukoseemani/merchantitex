import { Avatar, Box, Grid, List, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, useMediaQuery } from '@mui/material'
import Styles from "./invoicedetails.module.scss"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import CopyIcon from "../../../assets/images/copyColor.svg"
import LinkIcon from "../../../assets/images/ext-link.svg"
import { ReactSVG } from 'react-svg';
import { BillInvoiceRequestItem } from '../../../types/BiilsTypes';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import SendInvoice from './SendInvoice';
import axios from 'axios';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { useEffect, useState } from 'react';
import DisableInvoice from './DisableInvoice';
import CustomStatus from '../../customs/CustomStatus';


const InvoiceDetails = () => {
    const matches = useMediaQuery("(max-width:600px)");
    const location = useLocation<{ rowData: string }>();
    const history = useHistory();
    const dispatch = useDispatch()

    const [invoiceDetails, setInvoiceDetails] = useState<any>()
    const [itemDetails, setItemDetails] = useState<any>()

    const { id } = useParams<{ id: string }>();




    // send invoice

    const handleSendInvoice = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: 20
                },

                modalTitle: "Send invoice",
                modalContent: (
                    <div className='modalDiv'>
                        <SendInvoice />
                    </div>
                ),
            })
        );
    }




    // if (!location.state.rowData) {
    // 	history.replace('/payment_links');
    // }





    // fetch payment link by id

    const getInvoiceDetails = async () => {
        dispatch(openLoader());
        try {
            const { data } = await axios.get<any>(`/v1/payment/merchantinvoices/${id}`);

            console.log(data?.items, "data");
            if (data) {
                setInvoiceDetails(data);
                setItemDetails(data?.items)

            }

            dispatch(closeLoader());
        } catch (err) {
            console.log(err);
            dispatch(closeLoader());
            dispatch(
                openToastAndSetContent({
                    toastContent: 'Failed to get links',
                    toastStyles: {
                        backgroundColor: 'red',
                    },
                })
            );
        }
    };

    useEffect(() => {
        getInvoiceDetails();

        return () => setInvoiceDetails("")
    }, [id]);



    const handleDisableInvoice = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: 20,
                    height: "250px !important"
                },


                modalTitle: "Disable Invoice",
                modalContent: (
                    <div className='modalDiv'>
                        <DisableInvoice id={id} />
                    </div>
                ),
            })
        );
    }


    return (
        <Box>

            <Box className={Styles.sectionOne}>


                <Link to="/bills/invoice">
                    <Stack direction={"row"} alignItems="center">
                        <ArrowLeftIcon />
                        <p>Back to invoice</p>
                    </Stack>
                </Link>

            </Box>

            <Box className={Styles.sectionTwo}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} flexWrap="wrap" className={Styles.Stack__container}>
                    <Box className={Styles.title}>
                        <h2>{invoiceDetails?.invoice?.currency} {invoiceDetails?.invoice?.totalAmount}</h2>
                        {/* <span className={invoiceDetails?.invoice?.status === "Successful" ? Styles.sucessful : Styles.pending}>{invoiceDetails?.invoice?.status}</span> */}
                        <CustomStatus text={invoiceDetails?.invoice?.status} type={invoiceDetails?.invoice?.status} />
                    </Box>
                    <Box className={Styles.btn_group}>
                        <button onClick={handleDisableInvoice}>Disable</button>
                        <button><InsertDriveFileOutlinedIcon /> Download</button>
                    </Box>
                </Stack>
                <Box className={Styles.listItem} >
                    <Grid container alignItems="center" justifyContent={{ xs: "center", md: "space-between" }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Invoice title</p>
                            <span>{invoiceDetails?.invoice?.invoiceName}</span>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Customer name</p>
                            <span>{invoiceDetails?.invoice?.customer?.firstname} {invoiceDetails?.invoice?.customer?.lastname}</span>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Customer Email</p>
                            <span>{invoiceDetails?.invoice?.customer?.email}</span>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Phone number</p>
                            <span>{invoiceDetails?.invoice?.customer?.phone}</span>
                        </Grid >
                    </Grid>
                </Box>
            </Box>

            <Box className={Styles.sectionThree}>
                <Box className={Styles.title}>
                    <h2>Invoice details</h2>

                </Box>
                <Grid container px={"25px"} mt={"22px"} className={Styles.headerTitle} spacing={1}>
                    <Grid item xs={6} sm={6} md={4} >
                        <h2>Company details</h2>
                        <List sx={{
                            ".css-mchx6o-MuiListItem-root": { padding: 0, }
                        }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={invoiceDetails?.invoice?.businesslogo}>

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${invoiceDetails?.invoice?.user?.firstname} ${invoiceDetails?.invoice?.user?.lastname}`} secondary={invoiceDetails?.invoice?.user?.email} />
                            </ListItem>

                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}><h2>Invoice URL</h2>
                        <Box sx={{
                            display: "flex", alignItems: "center", padding: 0,
                            '& svg': {
                                width: "20px",
                                height: "20px",
                                '& path': {
                                    stroke: "#2F80ED",

                                }
                            }

                        }}>
                            {/* <Link to={`${url}${id}`}>
                                {url + id}
                            </Link> */}
                            <IconButton>
                                <ReactSVG src={CopyIcon} />
                            </IconButton>

                            <IconButton>
                                <ReactSVG src={LinkIcon} />
                            </IconButton>

                        </Box>


                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <h2>Invoice reference</h2>
                        <Box sx={{ padding: "10px" }}> <p>{invoiceDetails?.invoice?.paymentreference}</p></Box>

                    </Grid>
                </Grid>
            </Box>


            <Box className={Styles.sectionFour}>
                <Box className={Styles.title}>
                    <h2>Invoice details</h2>
                </Box>


                <Box className={Styles.invoicetable} >
                    <Stack direction={"row"} flexWrap="wrap" spacing={10}>
                        <Stack className={Styles.invoice__left}>

                            {invoiceDetails?.items?.map((x: any) => (
                                <Box>
                                    <div>
                                        <p>{x?.itemName}</p>
                                        <p>NGN {x?.price} x {x?.quantity}</p>
                                    </div>

                                    <div>
                                        <p>Subtotal</p>
                                        <p>{x?.subtotal}</p>

                                    </div>

                                </Box>

                            ))}

                            <div>
                                <p>Tax</p>
                                <p>{invoiceDetails?.invoice?.tax}</p>

                            </div>

                            <div>
                                <p>Discount</p>
                                <p>{invoiceDetails?.invoice?.discount}</p>

                            </div>



                            <div>

                                <p>Total</p>
                                <p>{invoiceDetails?.invoice?.totalAmount}</p>
                            </div>
                        </Stack>


                        {/* <Stack>
                        </Stack> */}

                        <Stack className={Styles.lastBox}>
                            <p style={{ color: "#828282" }}>Date issued</p>
                            <p>{invoiceDetails?.invoice?.createdAt}</p>
                            <br />
                            <p style={{ color: "#828282" }}>Due date</p>
                            <p>{invoiceDetails?.invoice?.dueDate}</p>

                        </Stack>
                    </Stack>
                </Box>

            </Box>
        </Box>
    )
}

export default InvoiceDetails