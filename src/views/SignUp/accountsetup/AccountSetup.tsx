import { Button, Grid } from '@mui/material'
import React from 'react'
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
const AccountSetup = () => {
    const dispatch = useDispatch()

    const handleBussinessForm = () => {
        dispatch(
            openModalAndSetContent({
                modalStyles: {
                    padding: 0,
                    minWidth: "1165px",
                    height: "649px",
                    // maxWidth: "100%",
                    marginInline: "auto",
                    borderRadius: 20,
                },

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
                    minWidth: "100px",
                    minHeight: "600px",
                    // minHeight: "97vh",
                    // marginInline: "auto",
                    borderRadius: 20,
                },

                modalContent: (
                    <div className='modalDiv'>
                        <BankAccount />
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
                <h2>Hey James, Let’s setup your account</h2>
                <p>Your business is currently in <span>Test Mode -</span> this means there’re a couple more things to finish up before customers can start paying you online. The guides below will show you how to do this.</p>
                <div className={Styles.box}>

                    <div>
                        <div> <ReactSVG src={CheckIcon} /></div>
                        <div> <p>Personal Profile</p></div>
                        <div onClick={handleProfileForm}> <button>Continue</button></div>

                    </div>

                    <div>
                        <div> <ReactSVG src={ColorcheckIcon} /></div>
                        <div>   <p>Business Information
                            and Documentation</p></div>
                        <div onClick={handleBussinessForm}> <button >Continue</button></div>



                    </div>
                    {/* </Grid> */}
                    {/* <Grid item xs={12} sm={12} md={4}> */}
                    <div>
                        <div> <ReactSVG src={ColorcheckIcon} /></div>
                        <div>  <p>Add Bank Accounts</p></div>
                        <div> <button onClick={handleBankAccount}>Continue</button></div>

                    </div>


                </div>
            </div>
        </div>

    )
}

export default AccountSetup