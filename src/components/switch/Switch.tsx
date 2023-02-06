import * as React from "react";
import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Styles from "./switch.module.scss"

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    // margin: theme.spacing(0.4),
    border: 0,
    boxSizing: 'border-box',
    width:91,
    
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
          <ToggleButton value="live server" aria-label="left-aligned">
            Test Server
          </ToggleButton>
          <ToggleButton value="center" aria-label="right-aligned">
            Live Server
          </ToggleButton>
        </StyledToggleButtonGroup>
      
    </div>
  );
}
