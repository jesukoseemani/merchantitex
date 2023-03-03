import React from "react";
import Styles from "./airtime.module.scss";
import AirtimeRequestTable from "./AirtimeRequestTable";
import BeneficiaryMenu from "../../views/Payout/BeneficiaryMenu";
import { useDispatch } from "react-redux";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleAirtimePayment from "./SingleAirtimePayment";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";

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
  const handleClose = () => {
    setAnchorEl(null);
  };

  const singleFunc = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          borderRadius: 20,
          boxShadow: "-4px 4px 14px rgba(224, 224, 224, 0.69)",
        },
        modalContent: (
          <div className="modalDiv">
            <SingleAirtimePayment />
          </div>
        ),
      })
    );
  };

  const bulkfunc = () => {
    history.push("/airtime/bulk-payment");
  };

  const data = [
    {
      id: 1,
      name: "Single bill payment",
      func: singleFunc,
    },
    {
      id: 2,
      name: "Bulk bill payment",
      func: bulkfunc,
    },
  ];

  return (
    <Box sx={{ width: "100%", marginTop: "22px" }}>
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
