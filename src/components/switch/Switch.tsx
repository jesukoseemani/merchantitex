import * as React from "react";
import { styled } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Styles from "./switch.module.scss";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    // margin: theme.spacing(0.4),
    border: 0,
    boxSizing: "border-box",
    width: 91,

    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected": {
      color: "white",
      backgroundColor: "#7C7C7C",
      borderRadius: 5,
      width: 91,
      height: 23,
    },
  },
}));

export default function CustomizedDividers() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState(() => ["italic"]);
  const [active, setActive] = React.useState(0);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div className={Styles.switch__container}>
      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          value="live server"
          aria-label="left-aligned"
          style={{ background: active === 0 ? "#E3E3E3" : "" }}
          onClick={() => setActive(0)}
        >
          Test Server
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="right-aligned"
          style={{ background: active === 1 ? "#E3E3E3" : "" }}
          onClick={() => setActive(1)}
        >
          Live Server
        </ToggleButton>
      </StyledToggleButtonGroup>
    </div>
  );
}
