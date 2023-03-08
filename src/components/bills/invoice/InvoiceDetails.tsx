import { Avatar, Box, Grid, List, ListItem, IconButton, ListItemAvatar, ListItemText, Stack, useMediaQuery } from '@mui/material'
import Styles from "./invoicedetails.module.scss"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import CopyIcon from "../../../assets/images/copy.svg"
import LinkIcon from "../../../assets/images/ext-link.svg"
import { ReactSVG } from 'react-svg';
import { BillInvoiceRequestItem } from '../../../types/BiilsTypes';
import { useDispatch } from 'react-redux';
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import SendInvoice from './SendInvoice';


const InvoiceDetails = () => {
    const matches = useMediaQuery("(max-width:600px)");
    const location = useLocation<{ rowData: string }>();
    const history = useHistory();
    const dispatch = useDispatch()



    const { id } = useParams<{ id: string }>();

    if (!location.state.rowData) {
        history.replace("/bills/invoice");
    }

    const { rowData } = location.state;

    const formattedRowData: BillInvoiceRequestItem = JSON.parse(rowData);

    const {
        amount, email, name, status, title, phone, added, billId, commission, url, transRef
    } = formattedRowData;


    // send invoice

    const handleSendInvoice = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    borderRadius: 20
                },

                modalContent: (
                    <div className='modalDiv'>
                        <SendInvoice />
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
                        <h2>{amount}</h2>
                        <span className={status === "Successful" ? Styles.sucessful : Styles.pending}>{status}</span>
                    </Box>
                    <Box className={Styles.btn_group}>
                        <button>Delete</button>
                        <button><InsertDriveFileOutlinedIcon /> Download</button>
                        <button onClick={handleSendInvoice}>Send invoice</button>
                    </Box>
                </Stack>
                <Box className={Styles.listItem} >
                    <Grid container alignItems="center" justifyContent={{ xs: "center", md: "space-between" }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Invoice title</p>
                            <span>{title}</span>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Customer name</p>
                            <span>{name}</span>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Customer Email</p>
                            <span>{email}</span>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <p>Phone number</p>
                            <span>{phone}</span>
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
                                    <Avatar>
                                        JH
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={name} secondary={email} />
                            </ListItem>

                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}><h2>Invoice URL</h2>
                        <Box sx={{ display: "flex", alignItems: "center", padding: 0 }}>
                            <Link to={`${url}${id}`}>
                                {url + id}
                            </Link>
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
                        <Box sx={{ padding: "10px" }}> <p>{transRef}</p></Box>

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

                            <div>
                                <p>A new Devop ebook</p>
                                <p>NGN {amount} x 1</p>
                            </div>

                            <div>
                                <p>Tax</p>
                                <p>NGN 0.00</p>

                            </div>

                            <div>
                                <p>Discount</p>
                                <p>NGN 0.00</p>

                            </div>

                            <div>
                                <p>Subtotal</p>
                                <p>NGN 45,000.52</p>

                            </div>
                            <div>

                                <p>Total</p>
                                <p>NGN 45,000.52</p>
                            </div>
                        </Stack>


                        {/* <Stack>
                        </Stack> */}

                        <Stack className={Styles.lastBox}>
                            <p style={{ color: "#828282" }}>Date issued</p>
                            <p>August 13th 2023 12:23:34</p>
                            <br />
                            <p style={{ color: "#828282" }}>Due date</p>
                            <p>August 13th 2023 05:29:05</p>

                        </Stack>
                    </Stack>
                </Box>

            </Box>
        </Box>
    )
}

export default InvoiceDetails