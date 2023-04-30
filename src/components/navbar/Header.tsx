
import { Box, Container, InputAdornment, OutlinedInput, Grid, IconButton, TextField, Typography, Stack, FormControl } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { FetchProfileDetails } from "../../helpers/FetchProfileDetails";



interface Props {
  title: string

}

const Header = ({ title }: Props) => {
  const [alignment, setAlignment] = React.useState("live mode");
  const [search, setSearch] = useState('');
  const history = useHistory()
  const dispatch = useDispatch()

  const handleAlignment = async (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    try {

      const data = await axios.get<any>("/v1/profile/env/toogle")
      if (data.data.env !== null)
        dispatch(FetchProfileDetails())
    } catch (error: any) {
      const { message } = error.response.data;

      dispatch(
        openToastAndSetContent({
          toastContent: message,
          toastStyles: {
            backgroundColor: "red",
          },
        })
      )

    }
  };
  const { pathname } = useLocation();
  const [active, setActive] = React.useState(false);
  const { userDetails } = useSelector((state) => state?.userDetailReducer);
  const [activeLink, setActiveLink] = useState(null);
  const { navbarRoute } = useSelector((state) => state.navbarReducer);



  useEffect(() => {
    setAlignment(userDetails?.islivetoogle);
  }, [alignment]);

  useEffect(() => {
    setSearch('')
  }, [pathname])

  useEffect(() => {
    history.replace({ pathname, search })
  }, [search])


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
      fontSize: 10,
      padding: "10px",
      textTransform: "inherit",
      backgroundColor: !alignment ? "rgba(206, 165, 40, 0.1)" : "rgba(4, 25, 38, 0.1)",
      border: !alignment ? "0.7px solid #CEA528" : "0.7px solid #041926",
      // border: alignment === "test server" ? "0.7px solid #CEA528" : "0.7px solid #041926",


      "&.Mui-disabled": {
        border: 0,
        backgroundColor: "transrrdeparent"
      },
      " &.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
        background: "transparent",
        fontFamily: 'Avenir',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: '10px',
        lineHight: "14px",
        border: "none",
        "&.Mui-selected": {
          color: "#fff",
          backgroundColor: "#041926",
          borderRadius: "20px",
          width: 190,
          height: 30,

          gap: 10,


        },
      },
      " &.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
        background: "transparent",
        border: "none",

        "&.Mui-selected": {
          color: "#fff",
          backgroundColor: "#CEA528",
          borderRadius: "20px",
          width: 190,
          height: 30,
          fontSize: 10,
          gap: 10,
          fontFamily: 'Avenir',
          fontStyle: "normal",
          fontWeight: 500,
          lineHight: "14px",

        },
      },

      "&.css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
        borderTopRightRadius: 'inherit',
        borderBottomRightRadius: 'inherit'


      },
      "&.css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {

        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit',
      },




    },
  }));
  // const title = "ssss";

  return (
    <div className={Styles.header__box}>


      {/* <Container> */}
      <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
        <Grid item xs={7} md={5.5}>

          <Box className={Styles.left__header}>
            <Box sx={{ display: { xs: "none", md: "block" } }}><h2 className={Styles.title}>{title ? title : navbarRoute}</h2></Box>
            {/* </Grid> */}

            <Box className={Styles.input__box}>



              <FormControl fullWidth sx={{ m: 1, }}>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  startAdornment={<InputAdornment position="start"> <SearchOutlinedIcon /></InputAdornment>}
                  sx={{
                    background: " #FBFBFB",
                    border: "0.3px solid #DDDDDD",
                    borderRadius: "10px",
                    height: "35px",
                    outline: "none",
                    paddingLeft: "40px !important"

                  }}
                />
              </FormControl>

            </Box>

          </Box>
          {/* </Grid> */}
          {/* </Stack> */}
        </Grid>
        <Grid item xs={5} md={2}>
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
                  value={false}
                  aria-label="left aligned"
                  onClick={() => setActive(false)}

                >
                  Test Mode
                </ToggleButton>
                <ToggleButton
                  value={true}
                  aria-label="right aligned"

                  onClick={() => setActive(true)}
                >
                  Live Mode
                </ToggleButton>
              </ToggleButtonGroup>
            </StyledToggleButtonGroup>

            <UserMenu />

          </Stack>
        </Grid>
      </Grid>
      {/* </Container> */}
    </div >
  );
};

export default Header
