import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/actions/modal/modalActions";
import Styles from "./addCustomer.module.scss";

const Addtoblacklist = () => {
  const dispatch = useDispatch();
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

        <Stack spacing={2} direction="row" justifyContent={"flex-end"}>
          <button onClick={() => dispatch(closeModal())}>Cancel</button>
          <button>Comfirm</button>
        </Stack>
      </div>
    </div>
  );
};

export default Addtoblacklist;
