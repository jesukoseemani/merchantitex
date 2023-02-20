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
import { useHistory, useLocation } from "react-router-dom";
import UserMenu from "../menu/userMenu";

const Header = () => {
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

  useEffect(() => {
    setActive(0);
  }, [active]);


  const title = pathname.split('/').at(-1)?.replace(/_ -/g, ' ')



  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      // margin: theme.spacing(0.4),

      boxSizing: "border-box",
      width: 190,
      height: 35,
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      borderRadius: 13.5,
      lineHeight: 13.66,
      border: 0,
      fontSize: 10,
      padding: 4,


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
        borderRadius: 13.5,
        width: 190,
        height: 27,
        fontSize: 10,
        gap: 10,
        // border: "2px solid red"
      },
    },
  }));
  // const title = "ssss";

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
              spacing={2}
            >
              <Grid item xs={3} >
                <Typography variant="h5" component="h2" style={{ fontSize: 16 }}>
                  {title}
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
            </Stack>
          </Grid>
        </Grid>

      </Container>
    </div>
  );
};

export default Header;
