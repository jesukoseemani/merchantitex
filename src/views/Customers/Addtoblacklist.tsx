import { InputLabel } from "@material-ui/core";
import { Grid, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import CustomInputField from "../../components/customs/CustomInputField";
import Button from "../../components/forms/Button";
import { closeModal } from "../../redux/actions/modal/modalActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { blacklistCustomer } from "../../services/customer";
import Styles from "./addCustomer.module.scss";



const Addtoblacklist: FC<{ id: any; callback?: () => void; fn?: () => void }> = ({ id, callback, fn }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('')

  const blacklist = async () => {
    setLoading(true)
    try {
      const data = await blacklistCustomer({ customerid: id?.toString(), reason });
      if (data) {
        dispatch(closeModal());
        dispatch(
          openToastAndSetContent({
            toastContent: data?.message,
            msgType: "success"

          })
        );
        fn?.()
      }
    } catch (err: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: err?.response?.data?.message || 'Failed to blacklist customer',
          msgType: "error"

        })
      );
    } finally {
      setLoading(false)
      dispatch(closeModal());
      fn?.()


    }
  };

  return (
    <div className={Styles.blacklist__input__container}>


      <div className={Styles.airtime_form__body}>
        <p>
          Are you sure want to blacklist this customer. They will no longer have
          access to your platform. Click on ‘Confirm’ to blacklist this customer
          {id}
        </p>

        <div className={Styles.text_area_cover}>


          {/* <textarea className={Styles.text_area} rows={2} value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason" name="reason" id="reason"></textarea> */}
          <TextField fullWidth name="reason" multiline onChange={e => setReason(e.target.value)} rows={2} value={reason} placeholder="Reason for Blacklisting customer" />

        </div>

        <Stack spacing={2} direction="row" justifyContent={"flex-end"} mb={4} className={Styles.blacklistBtn}>
          <button onClick={() => dispatch(closeModal())}>Cancel</button>
          <Button text="Confirm" onClick={blacklist} loading={loading} disabled={!reason || loading} />
        </Stack>
      </div>
    </div>
  );
};

export default Addtoblacklist;
