import React, { useState } from "react";
import Styles from "./airtime.module.scss";
import AirtimeRequestTable from "./AirtimeRequestTable";
import BeneficiaryMenu from "../../views/Payout/beneficiary/BeneficiaryMenu";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleAirtimePayment from "./SingleAirtimePayment";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import CustomModal from "../customs/CustomModal";

const Airtime = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();

  // open menu

  const [airtime, setAirtime] = React.useState<null | HTMLElement>(null);
  const openAirtime = Boolean(airtime);

  const handleClickAirtime = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAirtime(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAirtime(null);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);



  const bulkfunc = () => {
    history.push("/airtime/bulk-payment");
  };

  const data = [
    {
      id: 1,
      name: "Single bill payment",
      func: handleOpen,
    },
    {
      id: 2,
      name: "Bulk bill payment",
      func: bulkfunc,
    },
  ];

  return (
    <Box sx={{ width: "100%", marginTop: "22px" }}>

      <Box>
        <CustomModal
          title="Buy Airtime"
          isOpen={openModal}
          handleClose={handleCloseModal}
          close={() => setOpenModal(false)}>

          <SingleAirtimePayment />
        </CustomModal >

      </Box>

      <div className={Styles.airtime_header}>
        <div>
          {" "}
          <h3> 5 Airtime Purchase</h3>
        </div>
        <div>
          <button onClick={handleClickAirtime}>Buy Airtime</button>
        </div>
      </div>

      <div>
        <AirtimeRequestTable />
      </div>

      <BeneficiaryMenu
        openBeneficiary={openAirtime}
        handleCloseMenu={handleCloseMenu}
        beneficiary={airtime}
        data={data}
      />
    </Box>
  );
};

export default Airtime;
