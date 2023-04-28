import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ParentContainer from '../../../components/ParentContainer/ParentContainer'
import Styles from "./accountsetup.module.scss"
import CheckIcon from "../../../assets/images/circle-check.svg"
import ColorcheckIcon from "../../../assets/images/circle-check-color.svg"
import { ReactSVG } from "react-svg"
import { useDispatch } from 'react-redux'
import { openModalAndSetContent } from '../../../redux/actions/modal/modalActions'
import BusinessSetup from './BusinessSetup'
import AddBusinessSetup from '../../../components/accountSetupModal/AddBusinessSetup'
import BankAccount from '../../../components/accountSetUp/BankAccountModal'
import ProfileSetup from './ProfileSetup'
import axios from 'axios'
import { closeLoader } from '../../../redux/actions/loader/loaderActions'
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions'
import { useSelector } from 'react-redux'

interface Props {
    isBusinessApproved: boolean;
    isSettlementAccountSet: boolean;

}
const AccountSetup = () => {
    const dispatch = useDispatch()
    const [businessSetup, setBusinesSetup] = useState(false)
    const [settlementSetup, setSettlementSetup] = useState(false)

    const { auth } = useSelector(state => state?.authReducer)
    const checkBusinessStatus = async () => {

        try {

            const { data } = await axios.get<Props>("/v1/setup/business/status")
            if (data?.isSettlementAccountSet) {
                setSettlementSetup(true)

            }
            if (data?.isBusinessApproved) {
                setBusinesSetup(true)

            }
            console.log(data, "status")


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
    useEffect(() => {

        checkBusinessStatus()
    }, [])



    const handleBussinessForm = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "1165px",
                    maxWidth: "100%",
                    height: "649px",
                    // maxWidth: "100%",
                    marginInline: "auto",
                    borderRadius: 20,
                },
                modalTitle: "Set up business profile",
                modalContent: (
                    <div className='modalDiv'>
                        <BusinessSetup />
                    </div>
                ),
            })
        );
    }
    const handleBankAccount = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "400px",
                    minHeight: "600px",
                    // minHeight: "97vh",
                    // marginInline: "auto",
                    borderRadius: 20,
                },
                modalTitle: "Add a bank account",

                modalContent: (
                    <div className='modalDiv'>
                        <BankAccount checkBusinessStatus={checkBusinessStatus} />
                    </div>
                ),
            })
        );
    }
    const handleProfileForm = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    width: "1165px",
                    maxWidth: "100%",
                    height: "649px",
                    marginInline: "auto",
                    maxHeight: "90vh",
                    borderRadius: 20,
                },

                modalContent: (
                    <div className='modalDiv'>
                        <ProfileSetup />
                    </div>
                ),
            })
        );
    }



    return (

        <div className={Styles.container}>
            <div className={Styles.middle_container}>
                <h2>Hey {auth?.user?.firstname}, Let’s setup your account(s)</h2>
                <p>Your business is currently in <span>Test Mode -</span> this means there’re a couple more things to finish up before customers can start paying you online. The guides below will show you how to do this.</p>
                <div className={Styles.box}>

                    <div>
                        <div> <ReactSVG src={ColorcheckIcon} /></div>
                        <div> <p>Personal Profile</p></div>
                        <div onClick={handleProfileForm}> <button disabled className={Styles.disable}>Continue</button></div>

                    </div>

                    <div>
                        <div> <ReactSVG src={businessSetup ? ColorcheckIcon : CheckIcon} /></div>
                        <div>   <p>Business Information
                            and Documentation</p></div>
                        <div onClick={handleBussinessForm}> <button className={businessSetup && Styles.disable}>Continue</button></div>



                    </div>
                    {/* </Grid> */}
                    {/* <Grid item xs={12} sm={12} md={4}> */}
                    <div>
                        <div> <ReactSVG src={settlementSetup ? ColorcheckIcon : CheckIcon} /></div>
                        <div>  <p>Add Bank Accounts</p></div>
                        <div> <button onClick={handleBankAccount} disabled={settlementSetup} className={settlementSetup && Styles.disable}>Continue</button></div>

                    </div>


                </div>
            </div>
        </div>

    )
}

export default AccountSetup