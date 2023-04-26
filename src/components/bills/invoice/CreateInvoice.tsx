import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Stack, Table, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Styles from "./style.module.scss"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { closeModal, openModalAndSetContent } from '../../../redux/actions/modal/modalActions';
import Success from './Success';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { invoiceSchema, subscriptionSchema } from '../../validation/payment/paymentValidation';
import axios from 'axios';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import { closeLoader, openLoader } from '../../../redux/actions/loader/loaderActions';
import CustomInputField from '../../customs/CustomInputField';
import useCurrency from '../../hooks/Usecurrency';
import CustomCurrency from '../../formUI/SelectCountry/CustomCurrency';
import UseFetch from '../../hooks/UseFetch';
import CustomerListDropDown from '../../customs/CustomerListDropDown';
import CustomSelect from '../../customs/CustomSelect';
import AddNewCustmerToList from './AddNewCustmerToList';
import { CloseOutlined } from '@material-ui/icons';
import { v4 as uuidv4 } from "uuid";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from "../../../assets/images/editicon.svg"
import DeleteIcon from "../../../assets/images/delete.svg"
import { ReactSVG } from 'react-svg';
import { Divider } from '@material-ui/core';
import useCustomUpload from '../../hooks/CustomUpload';



interface Props {
    code: string;
    message: string;
}


interface ItemArray {
    id?: string;
    itemName: string;
    price: number;
    quantity: number;
    subtotal: number;
}

const CreateInvoice = ({ fetchInvoice }: any) => {
    const { loading, imgUrl, handleUpload } = useCustomUpload()
    const [customer, setCustomer] = useState<any>([])

    const dispatch = useDispatch()



    const [currencyList] = useCurrency()
    useEffect(() => {
        dispatch(openLoader());
        const fetchCustomers = async () => {

            try {

                const { data } = await axios.get<any>("/v1/customer")
                console.log(data)
                setCustomer(data?.customers)

                dispatch(closeLoader());

            } catch (error: any) {
                dispatch(closeLoader());
                const { message } = error.response.data;
                dispatch(
                    dispatch(
                        openToastAndSetContent({
                            toastContent: message,
                            toastStyles: {
                                backgroundColor: "red",
                            },
                        })
                    )
                );
            } finally {
                dispatch(closeLoader());
            }
        }


        fetchCustomers()
    }, [])



    const AddCustomer = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "419px",
                    borderRadius: 20
                },

                modalTitle: "Add a new customer",
                modalContent: (
                    <div className='modalDiv'>
                        <AddNewCustmerToList fetchInvoice={fetchInvoice} />
                    </div>
                ),
            })
        );
    }




    const [invoiceItem, setInvoiceItem] = useState<ItemArray>({

        itemName: "",
        quantity: 0,
        price: 0,
        subtotal: 0,
    })
    const [invoiceList, setInvoiceList] = useState<any>([])
    const [tax, setTax] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [subTotalState, setSubTotalState] = useState<number>(0)
    const [overTotalState, setOverTotalState] = useState<number>(0)





    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInvoiceItem({ ...invoiceItem, [e.target.name]: e.target.value })

    }


    // console.log(invoiceItem);

    let { itemName, price, quantity } = invoiceItem
    const handleAddItem = () => {


        let itemArray = {
            itemName,
            price,
            quantity,
            subtotal: price * quantity,
            id: uuidv4()
        }

        // setInvoiceItem({
        //     id: "",
        //     itemName: "",
        //     quantity: 0,
        //     price: 0,
        //     subtotal: 0,
        // })
        setInvoiceList((prev: any) => [...prev, itemArray])
        setInvoiceItem({
            itemName: "",
            quantity: 0,
            price: 0,
            subtotal: 0,
        })



    }

    console.log(invoiceList, "itemArray")

    const DeleteItem = (id: string) => {

        const filter = invoiceList.filter((item: any) => item?.id !== id)
        setInvoiceList(filter)
    }

    const handleEdit = (id: string) => {
        const edit = invoiceList.find((item: any) => item?.id === id)
        setInvoiceItem(edit)
        DeleteItem(id)


    }

    const disableBtn = () => {
        if (invoiceItem.itemName === "" && invoiceItem.price <= 0 && invoiceItem.quantity <= 0) {
            return true
        } else {
            return false
        }
    }

    const subTotalHandler = () => {
        const reducedSub = invoiceList?.reduce((prev: any, cur: any) => (
            prev + cur.subtotal
        ), 0)

        setSubTotalState(((tax / 100) * reducedSub) + reducedSub)
        return ((tax / 100) * reducedSub) + reducedSub
    }

    const totalHandler = () => {
        const tots = (discount / 100) * subTotalState
        const discountedPrice = subTotalState - tots
        setOverTotalState(discountedPrice)
    }


    useEffect(() => {
        subTotalHandler()
    }, [invoiceList])

    useEffect(() => {
        totalHandler()
    }, [subTotalState])



    return (
        <Formik
            initialValues={{
                invoiceName: '',
                totalAmount: '',
                dueDate: '',
                customerid: '',
                currencyid: '',
                comment: '',
                otp: '',

            }}
            validationSchema={invoiceSchema}
            onSubmit={async (values, { resetForm }) => {
                dispatch(openLoader());
                console.log({ ...values, businesslogo: imgUrl, items: invoiceList, tax, totalAmount: overTotalState, discount });


                try {
                    const { data } = await axios.post<Props>('/v1/payment/create/invoice', { ...values, businesslogo: imgUrl, items: invoiceList, tax, totalAmount: overTotalState, discount })
                    if (data?.code === "success") {
                        dispatch(
                            openToastAndSetContent({
                                toastContent: data?.message,
                                toastStyles: {
                                    backgroundColor: "green",
                                },
                            })
                        )

                        resetForm()
                        dispatch(closeLoader());
                        dispatch(closeModal())
                        fetchInvoice()
                        dispatch(
                            openModalAndSetContent({
                                modalStyles: {
                                    padding: 0,
                                    width: "419px",
                                    borderRadius: 20
                                },

                                modalTitle: "",
                                modalContent: (
                                    <div className='modalDiv'>
                                        <Success />
                                    </div>
                                ),
                            })
                        );

                    }
                } catch (error: any) {
                    dispatch(closeLoader());
                    const { message } = error?.response.data;
                    dispatch(
                        dispatch(
                            openToastAndSetContent({
                                toastContent: message,
                                toastStyles: {
                                    backgroundColor: "red",
                                },
                            })
                        )
                    );
                } finally {
                    dispatch(closeLoader());
                }

            }}>



            {(itemForms) => (
                <Form>
                    <Box>
                        <Box sx={{ width: "753px", maxWidth: "100%", height: "700px", borderRadius: "20px", }}>


                            <Box sx={{ marginTop: "38px" }}>
                                <Grid container spacing={3} paddingX={"50px"} alignItems="center" >
                                    <Grid item xs={12} sm={12} md={6}>

                                        <CustomInputField
                                            as={TextField} label={"Invoice Title"} placeholder='Invoice Title' name='invoiceName' type='text' />

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <InputLabel className={Styles.label}>Business Logo</InputLabel>
                                        <Button variant="outlined" fullWidth component="label"
                                            style={{

                                                fontSize: "14px", color: "#4F4F4F",
                                                height: 44,
                                                border: "1px solid #E0E0E0",
                                                borderRadius: 4,
                                                fontFamily: "Avenir",
                                                textTransform: "inherit",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                paddingLeft: "10px",
                                                gap: "0.8rem"
                                            }}>
                                            <CloudUploadOutlinedIcon className={Styles.downloadIcon} />   choose file to upload
                                            <input hidden accept="image/jpeg,image/jpg,image/png,application/pdf,image/JPEG image/PNG,image/JPG" onChange={handleUpload} type="file" />
                                        </Button>

                                    </Grid>



                                    <Grid item xs={12} sm={12} md={6}>
                                        <InputLabel className={Styles.label}>Customer name</InputLabel>
                                        <Field
                                            as={CustomerListDropDown}
                                            options={customer}
                                            name='customerid'
                                            helperText={
                                                <ErrorMessage name={"customerid"}>
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                            handleClick={AddCustomer}

                                        />

                                    </Grid>



                                    <Grid item xs={12} sm={12} md={6}>

                                        <CustomInputField
                                            as={TextField} label={"Invoice Due Date"} placeholder='Invoice Due Date' name='dueDate' type='date' />
                                    </Grid>


                                    <Grid item xs={12} sm={12} md={6} >
                                        <InputLabel className={Styles.label}>Currency</InputLabel>

                                        <Field
                                            as={CustomCurrency}
                                            options={currencyList}
                                            name='currencyid'
                                            helperText={
                                                <ErrorMessage name={"currencyid"}>
                                                    {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                                                </ErrorMessage>
                                            }

                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} mt={-2}>
                                        <CustomInputField
                                            as={TextField} label={"Comment"} placeholder='Enter comment' name='comment' type='text' />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} >

                                        <InputLabel>Tax</InputLabel>
                                        <TextField
                                            onChange={(e) => setTax(Number(e.target.value))}
                                            name="tax"
                                            value={tax}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <InputLabel>Discount</InputLabel>
                                        <TextField
                                            onChange={(e) => setDiscount(Number(e.target.value))}
                                            name="discount"
                                            value={discount}
                                            fullWidth
                                        />
                                    </Grid>


                                </Grid>

                            </Box>

                            <Stack className={Styles.puchaseHeader} direction={"row"} justifyContent="space-between" alignItems={"center"} borderBottom="1px solid #E0E0E0" paddingX={"50px"} marginTop="1rem" paddingY={0}>
                                <h2 style={{ paddingBottom: "5px" }}>Purchase item</h2>

                            </Stack>




                            {invoiceList?.length > 0 && <Box p={5}>

                                <TableContainer >
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >Item Name</TableCell>
                                                <TableCell >Quantity</TableCell>
                                                <TableCell >Price</TableCell>
                                                <TableCell >Subtotal</TableCell>
                                                <TableCell >Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {invoiceList?.map((row: any, i: any) => (
                                                <TableRow
                                                    key={i}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row?.itemName}
                                                    </TableCell>
                                                    <TableCell >{row?.quantity}</TableCell>
                                                    <TableCell >{row?.price}</TableCell>
                                                    <TableCell >{row?.subtotal}</TableCell>
                                                    <TableCell ><Box>
                                                        <Stack direction={"row"} gap="10px">
                                                            <IconButton><ReactSVG src={EditIcon} onClick={() => handleEdit(row?.id)} /></IconButton>
                                                            <IconButton onClick={() => DeleteItem(row?.id)}><ReactSVG src={DeleteIcon} /></IconButton>
                                                        </Stack>
                                                    </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </Box>}
                            <Grid container spacing={3} px={6}>









                                {/* Add item */}
                                <Grid item xs={12} mt={2}>
                                    <Grid container spacing={3} padding={"1rem"} >







                                        <Grid item xs={12} sm={12} md={6} >


                                            <InputLabel>Item Description</InputLabel>
                                            <TextField
                                                onChange={handleInputChange}
                                                name="itemName"
                                                value={invoiceItem?.itemName}
                                                fullWidth
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <InputLabel>Quantity</InputLabel>

                                            <TextField
                                                onChange={handleInputChange}
                                                name="quantity"
                                                type={"number"}
                                                value={invoiceItem?.quantity}
                                                fullWidth




                                            />
                                        </Grid>


                                        <Grid item xs={12} sm={12} md={6}>
                                            <InputLabel>Unit price</InputLabel>
                                            <TextField
                                                onChange={handleInputChange}
                                                name="price"
                                                value={invoiceItem?.price}
                                                type={"number"}
                                                fullWidth
                                            />

                                        </Grid>

                                    </Grid>
                                    <button style={{ background: 'transparent', color: "blue" }} className={Styles.addanother} disabled={disableBtn()} type="button" onClick={handleAddItem}>
                                        {invoiceList?.length > 0 ? "+Add another item" : "+Add  item"}

                                    </button>

                                </Grid>









                                {/* <Grid item xs={12} sm={12} md={6}>
                                    <CustomInputField as={TextField} label={"Total Amount"} placeholder='0.00' name='totalAmount' type='number' />
                                </Grid> */}

                                <Grid item xs={12} sm={12}>

                                    <CustomInputField
                                        as={TextField} label={"Otp"} placeholder='otp' name='otp' type='number' />
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', }}>
                                        <h2 style={{ color: '#333333', fontSize: '14px', fontFamily: 'Avenir', fontWeight: '400' }}>discount</h2>
                                        <p style={{ color: '#333333', fontSize: '14px', fontFamily: 'Avenir', fontWeight: '400' }}>{discount}%</p>
                                    </div>
                                    <Divider style={{ margin: 0, padding: 0 }} />
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', }}>
                                        <h2 style={{ color: '#333333', fontSize: '14px', fontFamily: 'Avenir', fontWeight: '400' }}>Subtotal</h2>
                                        <p style={{ color: '#333333', fontSize: '14px', fontFamily: 'Avenir', fontWeight: '400' }}>
                                            NGN {subTotalState}
                                        </p>
                                    </div>
                                    <Divider />

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <h2 style={{ color: '#000000', fontSize: '14px', fontFamily: 'Avenir', fontWeight: 'bold' }}>Total</h2>
                                        <p style={{ color: '#333333', fontSize: '14px', fontFamily: 'Avenir', fontWeight: '400' }}>NGN {overTotalState}</p>
                                    </div>


                                </Grid>





                                <Grid item xs={12} sm={12} md={12} justifyContent={"flex-end"}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "20px" }}>
                                        <button onClick={() => dispatch(closeModal())} className={Styles.btnCancel}>Cancel</button>
                                        <button type='submit' className={Styles.btn}>Create Invoice</button>

                                    </Box>
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                </Form>
            )
            }
        </Formik >
    )
}

export default CreateInvoice
