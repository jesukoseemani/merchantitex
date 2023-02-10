import { Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/actions/modal/modalActions";
import Styles from "./addCustomer.module.scss";
const RemoveBlacklist = () => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.blacklist__input__container}>
      <div className={Styles.form__title}>
        <h3>Remove from blacklist</h3>
      </div>

      <div className={Styles.airtime_form__body}>
        <p>
          Are you sure want to remove this customer from blacklist. They will
          now have access to your platform. Click on ‘Confirm’ to remove this
          customer from blacklist.
        </p>

        <Stack spacing={2} direction="row" justifyContent={"flex-end"}>
          <button onClick={() => dispatch(closeModal())}>Cancel</button>
          <button>Comfirm</button>
        </Stack>
      </div>
    </div>
  );
};

export default RemoveBlacklist;
