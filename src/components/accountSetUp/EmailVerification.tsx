import { InputLabel, Typography, Button, TextField } from "@material-ui/core";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styles from "./Login.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Logo from '../../assets/images/white_bg_logo.svg';
import Envelope from '../../assets/images/envelope_circle.svg';

import { ReactSVG } from "react-svg";
const EmailVerification = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/test/account-setup");
  };

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
    </div>
  );
};
export default EmailVerification;
