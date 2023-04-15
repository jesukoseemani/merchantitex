import { InputLabel, Typography, Button, TextField } from "@material-ui/core";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styles from "./Login.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Logo from '../../assets/images/white_bg_logo.svg';
import Envelope from '../../assets/images/envelope_circle.svg';

import { ReactSVG } from "react-svg";
import axios from "axios";
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";


interface Props {
  code: string;
  message: string;
  email: string;
  fullname: string
}
const EmailVerification = () => {
  const history = useHistory();
  const { email } = useParams<Props>()
  const dispatch = useDispatch()

  const handleLogin = () => {
    history.push("/test/home");
  };

  console.log(email)
  const handleResend = async () => {
    dispatch(openLoader());
    try {

      const { data } = await axios.post<Props>("/auth/register/resend/activation", {
        "email": email
      })
      console.log(data, "data");

      dispatch(closeLoader());
      if (data.code === "success") {
        dispatch(
          dispatch(
            openToastAndSetContent({
              toastContent: data?.message,
              toastStyles: {
                backgroundColor: "green",
              },
            })
          )
        );
      }
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

  return (
    <div className={styles.signinContainer}>
      <div className={styles.logo}>
        <ReactSVG src={Logo} />
      </div>
      <div className={styles.mt1} />
      <div className={styles.signinDiv}>
        <div className={styles.signinHeader}>
          <div className={styles.emailVerificationDiv}>

            <ReactSVG src={Envelope} />


            <p className={styles.mt1} />
            <h5 className={styles.headerEmail}>Email verification</h5>
            <p className={styles.mt1} />
            <p className={styles.headerP}>
              To complete your account creation process, we’ve sent an email
              to you with a link to confirm your account.
            </p>
          </div>
          <div className={styles.resendText}>
            <p onClick={handleResend}>Didn’t receive the email? Resend</p>
          </div>
        </div>
      </div>

      <div className={styles.sub}>
        <p className={styles.mt2}>
          <span className={styles.subP}>
            <a className={styles.signinAnchor} onClick={handleLogin}>
              <span className={styles.desc}>Already have an account? </span>
              Log in
            </a>
          </span>
        </p>
      </div>
    </div >
  );
};
export default EmailVerification;
