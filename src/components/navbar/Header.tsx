import { Grid, IconButton, TextField, Typography } from "@material-ui/core";

import { Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import BellIcon from "../../assets/images/bellIcon.svg";
import ArrowDown from "../../assets/images/arrowDown.svg";
import UsersIcon from "../../assets/images/user.svg";
import SearchIcon from "../../assets/images/searchs.svg";
import { ReactSVG } from "react-svg";
import { styled } from "@mui/material/styles";
import Styles from "./Navbar.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import UserMenu from "../menu/userMenu";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSelector } from "react-redux";



interface toggleBtn {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean

}

const Header = ({ toggle, setToggle }: toggleBtn) => {
  const [alignment, setAlignment] = React.useState("test server");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const { pathname } = useLocation();
  const [active, setActive] = React.useState(0);
  const [activeLink, setActiveLink] = useState(null);
  const { navbarRoute } = useSelector((state) => state.navbarReducer);



  useEffect(() => {
    setActive(0);
  }, [active]);


  const title = pathname.split('/').at(-1)
  const handleToggle = () => {
    setToggle((prev) => !prev)
  }


  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      // margin: theme.spacing(0.4),

      boxSizing: "border-box",
      width: 200,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      borderRadius: "20px",
      lineHeight: 13.66,
      border: 0,
      fontSize: 10,
      padding: "10px",


      "&.Mui-disabled": {
        border: 0,
      },

      "&.css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
        borderTopRightRadius: 'inherit',
        borderBottomRightRadius: 'inherit'


      },
      "&.css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {

        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit'
      },

      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#041926",
        borderRadius: "20px",
        width: 190,
        height: 30,
        fontSize: 10,
        gap: 10,
        // border: "2px solid red"
      },
    },
  }));
  // const title = "ssss";

  return (
    <div className={Styles.header__box}>


      {/* <Container> */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={7} md={8}>
            <Stack direction={"row"} spacing={{ xs: 0, md: 5 }}>
              <Box sx={{ display: { xs: "none", md: "block" } }}><h2 className={Styles.title}>{navbarRoute}</h2></Box>
              <Grid item xs={10} md={8} className={Styles.input__box}>
                <input placeholder="Search" />

                <ReactSVG src={SearchIcon} />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={5} md={4}>
            <Stack direction={"row"} justifyContent="flex-end" alignItems={"center"} >
              <StyledToggleButtonGroup
                size="small"
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  aria-label="Platform"
                  className={Styles.toggleButton}
                >
                  <ToggleButton
                    value="test server"
                    aria-label="left aligned"
                    onClick={() => setActive(0)}
                  >
                    Test Server
                  </ToggleButton>
                  <ToggleButton
                    value="live server"
                    aria-label="right aligned"

                    onClick={() => setActive(1)}
                  >
                    Live Server
                  </ToggleButton>
                </ToggleButtonGroup>
              </StyledToggleButtonGroup>

              <UserMenu />
              <Box sx={{ display: { md: "none", }, marginLeft: "2rem" }}>
                <IconButton onClick={() => handleToggle}>
                  <MenuOutlinedIcon sx={{ fontSize: "40px" }} />
                </IconButton>

              </Box>
            </Stack>
          </Grid>
        </Grid>
      {/* </Container> */}
    </div >
  );
};

export default Header
