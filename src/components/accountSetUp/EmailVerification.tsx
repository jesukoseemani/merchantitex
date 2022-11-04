import { InputLabel, Typography, Button, TextField } from "@material-ui/core";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import styles from "./Login.module.scss";
import Logo from "../../assets/images/NavLogo.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const EmailVerification = () => {  
  const history = useHistory();

  const handleLogin = () => {
    history.push("/signin");
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.logo}>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.mt2} />
      <div className={styles.signinDiv}>
          <div className={styles.signinHeader}>
            <div className={styles.emailVerificationDiv}>
              <EmailOutlinedIcon style={{ color: "#27AE60", fontSize: 40 }} />
              <p className={styles.mt2} />
              <h5 className={styles.headerEmail}>Email verification</h5>
              <p className={styles.mt2} />
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
