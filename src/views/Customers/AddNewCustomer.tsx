import React from "react";
import Styles from "./addCustomer.module.scss";

const AddNewCustomer = () => {
  return (
    <div className={Styles.payment__input__container}>
      <div className={Styles.form__title}>
        <h3>Add a new customer</h3>
      </div>

      <div className={Styles.airtime_form__body}>
        <form>
          <div className="name">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              placeholder="customer name"
              id="name"
              name="name"
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email Address</label>
            <input type="email" placeholder="Email" id="email" name="email" />
          </div>
          <div className="Phone">
            <label htmlFor="Phone">Phone Number</label>
            <input type="number" placeholder="09067656434" name="phone" />
          </div>

          <div className="submit">
            <button type="submit">Add Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCustomer;
