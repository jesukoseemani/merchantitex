import { InputLabel, Typography, Button, TextField } from "@material-ui/core";
import styles from "./Login.module.scss";
import Logo from "../../assets/images/white_bg_logo.svg"
import { ReactSVG } from "react-svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material";

const LoginPasswordReset = () => {
  const history = useHistory();

  const validate = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),

    confirm_password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Please enter password again")
  });

  const StyledTextField = styled(TextField, {
    name: "StyledTextField",
  })({

    "& .MuiInputBase-root": {
      height: 44,
      marginBottom: "17px",
    }
  });

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        history.push("signin");
      }}
    >
      {(props) => (
        <div className={styles.newpassword}>
          <div className={styles.logo}>
            <ReactSVG src={Logo} />
          </div>

          <div className={styles.newPasswordDiv}>
            <div className={styles.signinHeader}>
              <h2 className={styles.headers}>New Password</h2>

              <p className={styles.headerText}>
                Hello Felix, let’s set up a new password for your account
              </p>
            </div>
            <div className={styles.mt2}>
              <Form>
                <InputLabel>
                  <span className={styles.formlabel}>New Password</span>
                </InputLabel>
                <StyledTextField
                  helperText={
                    <ErrorMessage name="password">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="password"
                  placeholder="1234567890"
                  variant="outlined"

                  type="password"
                  size="small"
                  fullWidth
                />

                <InputLabel>
                  <span className={styles.formlabel}>Re-enter Password</span>
                </InputLabel>
                <StyledTextField
                  helperText={
                    <ErrorMessage name="confirm_password">
                      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
                    </ErrorMessage>
                  }
                  name="confirm_password"
                  placeholder="1234567890"
                  variant="outlined"

                  type="password"
                  size="small"
                  fullWidth
                />

                <button
                  style={{
                    backgroundColor: "#27AE60",
                    height: "44px",
                    width: "100%",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    fontFamily: 'Avenir',
                  }}
                  type="submit"
                  color="primary"

                >
                  Continue
                </button>
              </Form>
            </div>
          </div>

          <div className={styles.sub}>
            <p>
              <span className={styles.subP}>
                <a className={styles.signinAnchor}>
                  <span className={styles.desc}>Remember your password? </span>
                  Back to Login
                </a>
              </span>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPasswordReset;
