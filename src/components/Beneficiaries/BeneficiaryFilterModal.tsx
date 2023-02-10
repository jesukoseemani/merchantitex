import * as React from "react";
import Box from "@mui/material/Box";
import { Modal, Stack, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Styles from "./beneficiaryFilter.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #D5DAE1",
  boxShadow: "0px 10px 10px rgba(6, 44, 82, 0.92)",
  p: 3,
  borderRadius: 3,
};

interface openFilterModal {
  filterOpen: Boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}
export default function BeneficiaryFilterModal({
  filterOpen,
  setFilterOpen,
}: openFilterModal) {
  const useStyles = makeStyles({
    button: {
      "&:active": {
        boxShadow: "none",
        background: "green",
        color: "#fff",
      },
    },
  });

  const { button } = useStyles();

  const handleClose = () => setFilterOpen(false);

  const [activeDate, setActiveDate] = React.useState<number>(0);

  //   dropdown

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
     
    </div>
  );
}
