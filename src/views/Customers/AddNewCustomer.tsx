import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../services/customer";
import Styles from "./addCustomer.module.scss";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import Button from "../../components/forms/Button";

const DATA = {
  firstname: '',
  lastname: '',
  email: '',
  msisdn: ''
}

const AddNewCustomer: FC<{ callback: () => void; fn: () => void }> = ({ callback, fn }) => {
  const [form, setForm] = useState(DATA);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value })
  }

  const isValid = Object.values(form).every((v) => v)

  const add = async () => {
    setLoading(true)
    try {
      await addCustomer({ ...form, countryid: 3 })
      fn()
      callback();
      dispatch(
        openToastAndSetContent({
          toastContent: "Customer added successfully",
          msgType: "success"

        })
      );
    } catch (error: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message || "Failed to add customer",
          msgType: "error"

        })
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={Styles.add_customer}>
      <form>
        <div className="name">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            placeholder="first name"
            id="firstname"
            name="firstname"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="name">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            placeholder="last name"
            id="lastname"
            name="lastname"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="email">
          <label htmlFor="email" >Email Address</label>
          <input type="email" placeholder="Email" id="email" name="email" onChange={e => handleChange(e)} />
        </div>
        <div className="MSISDN">
          <label htmlFor="msisdn">Phone Number</label>
          <input placeholder="Phone Number" name="msisdn" onChange={e => handleChange(e)} />
        </div>

        <div className="submit">
          <Button type="submit" disabled={loading || !isValid} onClick={add} text="Add Customer" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default AddNewCustomer;
