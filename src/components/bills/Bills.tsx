import React, { useState } from "react";
import Styles from "./airtime.module.scss";
import AirtimeRequestTable from "./AirtimeRequestTable";
import BeneficiaryMenu from "../../views/Payout/BeneficiaryMenu";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleAirtimePayment from "./SingleAirtimePayment";
import { useHistory } from "react-router-dom";
import BillsRequestTable from "./BillsRequestTable";
import SingleBillPayment from "./SingleBillPayment";
import { Box } from "@mui/material";
import CustomModal from "../customs/CustomModal";

const Bills = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();

  // open menu

  const [bill, setBill] = React.useState<null | HTMLElement>(null);
  const openBill = Boolean(bill);
  const [openModal, setOpenModal] = useState(false)
  const handleOpenBill = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const handleClickBill = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBill(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setBill(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const singleFunc = () => {
  //   dispatch(
  //     openModalAndSetContent({
  //       modalStyles: {
  //         padding: 0,
  //         borderRadius: "0.5rem",
  //         boxShadow: "-4px 4px 14px rgba(224, 224, 224, 0.69)",
  //       },
  //       modalContent: (
  //         <div className="modalDiv">
  //           <SingleBillPayment />
  //         </div>
  //       ),
  //     })
  //   );
  // };

  const bulkfunc = () => {
    history.push("/bill/bulk-payment");
  };

  const data = [
    {
      id: 1,
      name: "Single bill payment",
      func: handleOpenBill,
    },
    {
      id: 2,
      name: "Bulk bill payment",
      func: bulkfunc,
    },
  ];

  return (
    <div>
      <div className={Styles.airtime_header}>
        <div>
          {" "}
          <h3> 4 Bill Payment</h3>
        </div>
        <div>
          <button onClick={handleClickBill}>Make Bill payment</button>
        </div>
      </div>

      <Box>
        <CustomModal
          title="Bill Payment"
          isOpen={openModal}
          handleClose={handleCloseModal}
          close={() => setOpenModal(false)}>

          <SingleBillPayment />
        </CustomModal >

      </Box>
      <div>
        <BillsRequestTable />
      </div>

      <BeneficiaryMenu
        openBeneficiary={openBill}
        handleCloseMenu={handleCloseMenu}
        beneficiary={bill}
        data={data}
      />
    </div>
  );
};

export default Bills;
