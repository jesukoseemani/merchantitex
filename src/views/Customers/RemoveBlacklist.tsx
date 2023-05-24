import { Stack, TextField } from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/actions/modal/modalActions";
import Styles from "./addCustomer.module.scss";
import * as Yup from 'yup';
import axios from "axios";
import { closeLoader } from '../../redux/actions/loader/loaderActions';
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";


const RemoveBlacklist = ({ id, getCustomers }: any) => {
  const dispatch = useDispatch();
  const validate = Yup.object({
    reason: Yup.string().required("Reason is required")
  })
  const { handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      reason: ""
    },
    validationSchema: validate,
    onSubmit: (async ({ reason }) => {

      try {
        dispatch(closeLoader());
        const { data } = await axios.post<any>(`/v1/customer/blacklist`, {
          customerid: id,
          action: "remove",
          reason
        })

        if (data?.code === "success") {
          console.log(data)
          dispatch(
            openToastAndSetContent({
              toastContent: "Customer successfully removed from blacklist",
              msgType: "success"
            })
          );

          dispatch(closeModal())
          // dispatch(saveMe({ ...me, }))
        }
        console.log(data, "data");

      } catch (error: any) {
        dispatch(closeLoader());

        dispatch(
          openToastAndSetContent({
            toastContent: error?.response?.data?.message,
            msgType: "error"
          })
        );
      }
      finally {
        dispatch(closeLoader());
        dispatch(closeModal())
        getCustomers()

      }
    }),
  })


  return (
    <div className={Styles.blacklist__input__container}>

      <div className={Styles.airtime_form__body}>
        <p>
          Are you sure want to remove this customer from blacklist. They will
          now have access to your platform. Click on ‘Confirm’ to remove this
          customer from blacklist.
        </p>

        <form onSubmit={handleSubmit} >

          <TextField name="reason" fullWidth placeholder="Reason" onChange={handleChange} helperText={<span style={{ color: "red", fontSize: "10px", marginTop: "-10px" }}>{touched?.reason && errors?.reason}</span>}
          />

          <Stack spacing={2} direction="row" mb={4} justifyContent={"flex-end"}>
            <button onClick={() => dispatch(closeModal())}>Cancel</button>
            <button type="submit">Confirm</button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default RemoveBlacklist;
