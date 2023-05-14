import React, { useState, useEffect } from "react";
import SearchBar from "../search/searchBar";
import Styles from "./Navbar.module.scss";
import { Box, Button, ClickAwayListener, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/images/defaultLogo.svg";
import ArrowLeft from "../../assets/images/arrowLeft.svg";
import { ReactSVG } from "react-svg";
import { navRoutes } from "../../mock/navRoutes";
import { useHistory, useLocation } from "react-router-dom";
import { changeNewNavbar } from "../../redux/actions/navbarNew/navbarNewActions";
import useLocalStorage from "../../helpers/useLocalStorage";
import { ReactComponent as ActiveStateImg } from '../../assets/images/activeState.svg'
import BeneficiaryMenu from "../../views/Payout/BeneficiaryMenu";
import { ReactComponent as CopyIcon } from "../../assets/images/copyColor.svg";
import SetupIcon from "../../assets/images/setupIcon.svg";
import CustomModal from "../customs/CustomModal";
import AddBusiness from "./AddBusiness";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useSetup from "../hooks/useSetup";



const style = {

  borderRadius: "20px"
};
const NavBar = () => {
  const business = useSelector((state) => state?.meReducer?.me?.business);
  const { auth } = useSelector((state) => state?.authReducer);
  const { userDetails } = useSelector(state => state?.userDetailReducer)


  const { pathname } = useLocation();
  const [active, setActive] = React.useState<string | number>(0);
  const [routes, setRoutes] = useState<any[]>(navRoutes);
  const [isNested, setIsNested] = useLocalStorage('isNested', false);
  const [nav, setNav] = useLocalStorage('nav', []);
  const [menuTitle, setMenuTitle] = useLocalStorage('menuTitle', "");
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false)
  const [showUserInfo, setShowuserInfo] = useState(false)


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
    setShowuserInfo(false)
  };

  const { setupStatus } = useSetup()

  useEffect(() => {
    console.log("setup", setupStatus?.isSetupComplete)
  }, [setupStatus])


  const openUserMenu = Boolean(userMenu);
  const history = useHistory();
  const dispatch = useDispatch()


  const addNewBusiness = () => {
    setOpenModal(true)
    handleClose()
  };
  const handleCloseModal = () => setOpenModal(false);

  const changeHandler = (item: any) => {
    if (item.submenu) {
      setIsNested(true)
      // dispatch(changeNewNavbar(item.title))
      setMenuTitle(item.title)
      setNav(item.nav)
      // history.push(item.link)
    } else {
      history.push(item.link)
      dispatch(changeNewNavbar(item.title))
    }

  }

  const subChangeHandler = (link: string, title: string) => {
    dispatch(changeNewNavbar(title))
    setActive(link)
    history.push(link)
  }


  // open drop down menu
  const handleClickUserMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setUserMenu(event.currentTarget);
  };

  const handleDocumentation = () => {
    setShowuserInfo(true)

  }
  const copyId = () => {
    setShowuserInfo(true)
  }
  const handleSearch = () => { }





  const handleCloseMenu = () => {
    setUserMenu(null);
  };


  // .MuiButtonBase-root

  return (
    <div className={Styles.container}>

      <Box>
        <CustomModal
          title="Add another business"
          isOpen={openModal}
          handleClose={handleCloseModal}
          close={() => setOpenModal(false)}>

          <AddBusiness />
        </CustomModal >

      </Box>
      {/* onClick={handleClick} */}

      <div className={Styles.userInfo}>
        <div className={Styles.user__img}>
          {!business?.isapproved && <img src={Logo} alt="user profile" />}
        </div>
        <div className={Styles.userProfile__text}>
          <Stack direction={"row"} alignItems="flex-start">
            <p>
              {business?.tradingname}
            </p>

          </Stack>


          <span>Merchant ID:{business?.merchantaccountid}</span>


        </div>

      </div>
      <div>
        <div className={Styles.backBtn}>
          {isNested && (
            <>
              <Button onClick={() => setIsNested(false)}>
                <ReactSVG src={ArrowLeft} /> Main Menu
              </Button>

              <h3 className={Styles.menuTitle}>
                {menuTitle} MENU
              </h3>
            </>
          )}

        </div>

        <nav>
          {/* {nextedRoutes?} */}
          {
            !setupStatus?.isBusinessApproved && <li

              onClick={() => {
                history.push("/setup")
                dispatch(changeNewNavbar("Setup"))
              }}
              className={Styles.setup}
            >

              <ReactSVG src={SetupIcon} className={Styles.linkIcon} />
              Setup

            </li>
          }


          {!isNested && routes?.map((item) => {
            return (
              <>
                <li
                  key={item?.id}
                  onClick={() => changeHandler(item)}
                  className={item?.link === pathname ? Styles.active : Styles.routes}
                >
                  {/* <img src={icon} alt={name} /> */}

                  <ReactSVG src={item?.icon} className={Styles.linkIcon} />
                  {item?.title} {item?.title === "POS" && <div className={Styles.comingsoon}>Coming Soon</div>}
                  <div className={item?.link === pathname ? Styles.replaced_yen : Styles.replaced_not}>
                    <ActiveStateImg />
                  </div>
                </li>
              </>
            );
          })}


          {isNested && nav?.map(({ id, title, icon, link }: any) => {
            return (
              <li
                key={id}
                onClick={() => subChangeHandler(link, title)}
                className={link === pathname ? Styles.active : Styles.routes}
              >

                <ReactSVG src={icon} className={Styles.linkIcon} />
                {title}
                <div className={link === pathname ? Styles.replaced_yen : Styles.replaced_not}>
                  <ActiveStateImg />


                </div>

              </li>
            );
          })}
        </nav>
      </div>

      <Box >

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          // onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}


        >
          <ClickAwayListener onClickAway={handleClose} style={style}>
            <Box className={Styles.menuBox} >

              {showUserInfo &&
                <Box className={showUserInfo && Styles.menuItemSearch}>
                  <MenuItem >
                    <OutlinedInput
                      fullWidth
                      sx={{
                        height: "31px",
                        background: " #FBFBFB",
                        border: showUserInfo && "1px solid #DFE0E0",

                      }}
                      placeholder="Search"


                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="search icon"

                            edge="start"
                          >
                            <SearchOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </MenuItem>
                </Box>
              }



              {showUserInfo &&
                <Box className={showUserInfo && Styles.menuItem}>
                  <MenuItem>
                    <Box sx={{ display: "block" }}>
                      <h2>James</h2>
                      <p>Merchant ID: 123456789</p>
                    </Box>

                  </MenuItem>
                </Box>
              }
              <Box className={Styles.menuItem}>
                <MenuItem onClick={addNewBusiness}>

                  Add new business
                </MenuItem>
              </Box>
              <Box className={Styles.menuItem}>
                <MenuItem onClick={handleDocumentation}>
                  Read documentation
                  <IconButton>
                    <CopyIcon />
                  </IconButton>

                </MenuItem>
              </Box>

              <Box className={Styles.menuItems}>
                <MenuItem> MID: 123456789
                  <IconButton>
                    <CopyIcon />
                  </IconButton>
                </MenuItem>

              </Box>
            </Box>
          </ClickAwayListener>
        </Menu>
      </Box>
    </div>
  );
};

export default NavBar;
