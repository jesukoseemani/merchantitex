import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/forms/Button";
import { closeModal } from "../../redux/actions/modal/modalActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { blacklistCustomer } from "../../services/customer";
import Styles from "./addCustomer.module.scss";

const Addtoblacklist: FC<{ id: string; callback?: () => void; fn?: () => void }> = ({ id, callback, fn }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('')

  const blacklist = async () => {
    setLoading(true)
    try {
      await blacklistCustomer({ customerid: id?.toString(), reason });
      dispatch(closeModal());
      fn?.()
    } catch (err: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: err?.response?.data?.message || 'Failed to blacklist customer',
          toastStyles: {
            backgroundColor: 'red',
          },
        })
      );
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className={Styles.blacklist__input__container}>
      <div className={Styles.form__title}>
        <h3>Blacklist customer</h3>
      </div>

      <div className={Styles.airtime_form__body}>
        <p>
          Are you sure want to blacklist this customer. They will no longer have
          access to your platform. Click on ‘Confirm’ to blacklist this customer
        </p>

        <div className={Styles.text_area_cover}>
          <textarea className={Styles.text_area} value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason" name="reason" id="reason"></textarea>
        </div>

        <Stack spacing={2} direction="row" justifyContent={"flex-end"} className={Styles.blacklistBtn}>
          <button onClick={() => dispatch(closeModal())}>Cancel</button>
          <Button text="Confirm" onClick={blacklist} loading={loading} disabled={!reason || loading} />
        </Stack>
      </div>
    </div>
  );
};

export default Addtoblacklist;
