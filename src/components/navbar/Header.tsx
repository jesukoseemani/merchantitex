import { Grid, IconButton, Typography } from "@material-ui/core";

import { Container, Stack } from "@mui/material";
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
import { useLocation } from "react-router-dom";

const Header = () => {
  const [alignment, setAlignment] = React.useState("test server");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const location = useLocation();
  const [active, setActive] = React.useState(0);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    setActive(0);
  }, [active]);

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      // margin: theme.spacing(0.4),
      border: 0,
      boxSizing: "border-box",
      width: 190,
      height: 35,
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      borderRadius: 17.5,
      lineHeight: 13.66,
      borderer: "0.7px solid #041926",
      fontSize: 10,
      padding: 4,

      "&.Mui-disabled": {
        border: 0,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#041926",
        borderRadius: 13.5,
        width: 150,
        height: 27,
        fontSize: 10,
        gap: 5,
      },
    },
  }));

  return (
    <div className={Styles.header__box}>
      <Container>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} md={7}>
            <Grid
              container
              alignItems="center"
              className={Styles.left__container}
            >
              <Grid item xs={2}>
                <Typography variant="h5" component="h2">
                  Pos
                </Typography>
              </Grid>
              <Grid item sm={7} className={Styles.input__box}>
                <input placeholder="Search" />
                
                  <ReactSVG src={SearchIcon} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sm={6}
            md={5}
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"center"}
              spacing={5}
            >
              <StyledToggleButtonGroup
                size="small"
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
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
                   
                    onClick={() => setActive(0)}
                  >
                    Test Server
                  </ToggleButton>
                  <ToggleButton
                    value="live server"
                 
                    onClick={() => setActive(1)}
                  >
                    Live Server
                  </ToggleButton>
                </ToggleButtonGroup>
              </StyledToggleButtonGroup>

              <div className={Styles.usersProfile}>
                {/* <IconButton disableFocusRipple={true} disableRipple={true}> */}
                <ReactSVG src={BellIcon} />
                {/* </IconButton> */}
                {/* <IconButton> */}
                <div className={Styles.userProfileImg__container}>
                  <ReactSVG src={UsersIcon} className={Styles.userProfileImg} />
                  {/* </IconButton> */}
                  {/* <IconButton> */}
                  <ReactSVG src={ArrowDown} className={Styles.arrowDown} />
                </div>
                {/* </IconButton> */}
              </div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
