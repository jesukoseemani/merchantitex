import React from 'react'
import Styles from "./resetpassword.module.scss";
import Logo from "../../../assets/images/white_bg_logo.svg"
import { ReactSVG } from "react-svg";
import CustomInput from '../../../components/customs/CustomInput';
import { Link, useHistory } from 'react-router-dom';


const ResetPassword = () => {
    const handleChange = () => {
        console.log("kkk")
    }
    const history = useHistory()
    return (
        <div className={Styles.container}>
            {/* <div className={Styles.logo}>
                <ReactSVG src={Logo} />
            </div> */}
            <div className={Styles.form_container}>
                <div className={Styles.middle}>
                    <h2>Password reset</h2>
                    <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                    <form>
                        <CustomInput id='email' className={Styles.input} onChange={handleChange} type={"email"} label='Email' placeholder={"Enter email"} />
                        <button onClick={() => history.push("/newpassword")}>Continue</button>
                    </form>
                </div>

            </div>
            <Link to={"/signin"}>
                <p className={Styles.footer}>Remember your password? <span> Back to Login</span></p>
            </Link>
        </div>
    )
}

export default ResetPassword