import React, { useState, useEffect } from "react";
import SearchBar from "../search/searchBar";
import Styles from "./Navbar.module.scss";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowDown from "../../assets/images/arrowDown.svg";
import ArrowLeft from "../../assets/images/arrowLeft.svg";
import { navRoutes } from "../../mock/navRoutes";
import { ReactSVG } from "react-svg";
import { useHistory, useLocation } from "react-router-dom";
import { changeNewNavbar } from "../../redux/actions/navbarNew/navbarNewActions";
import useLocalStorage from "../../helpers/useLocalStorage";

const NavBar = () => {
  const business = useSelector((state) => state?.meReducer?.me?.business);

  const { pathname } = useLocation();
  const [active, setActive] = React.useState(0);
  const [routes, setRoutes] = useState<any[]>(navRoutes);
  const [isNested, setIsNested] = useLocalStorage('isNested', false);
  const [nav, setNav] = useLocalStorage('nav', []);
  const [menuTitle, setMenuTitle] = useLocalStorage('menuTitle', "");

  const history = useHistory();
  const dispatch = useDispatch()


  const changeHandler = (item: any) => {
    if (item.submenu) {
      setIsNested(true)
      dispatch(changeNewNavbar(item.title))
      setMenuTitle(item.title)
      setNav(item.nav)
      history.push(item.link)
    } else {
      history.push(item.link)
      dispatch(changeNewNavbar(item.title))
    }

  }

  const subChangeHandler = (link: string, title: string) => {
    dispatch(changeNewNavbar(title))
    history.push(link)
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.userInfo}>
        <div className={Styles.user__img}>
          <img src="https://loremflickr.com/640/480/cats" alt="user profile" />
        </div>
        <div className={Styles.userProfile__text}>
          <p>
            James <ReactSVG src={ArrowDown} />
          </p>
          <span>thejames@gmail.com</span>
        </div>
      </div>
      <div>
        <div className={Styles.backBtn}>
          {isNested && (
            <>
              <Button onClick={() => setIsNested(false)}>
                <ReactSVG src={ArrowLeft} /> Main menu
              </Button>

              <h3 className={Styles.menuTitle}>
                {menuTitle} MENU
              </h3>
            </>
          )}

        </div>

        <nav>
          {/* {nextedRoutes?} */}

          {!isNested && routes?.map((item) => {
            return (
              <li
                key={item?.id}
                onClick={() => changeHandler(item)}
                className={item?.link === pathname ? Styles.active : Styles.routes}
              >
                {/* <img src={icon} alt={name} /> */}

                <ReactSVG src={item?.icon} />
                {item?.title}
              </li>
            );
          })}


          {isNested && nav?.map(({ id, title, icon, link }: any) => {
            return (
              <li
                key={id}
                onClick={() => subChangeHandler(link, title)}
                className={link === pathname ? Styles.active : Styles.routes}
              >
                {/* <img src={icon} alt={name} /> */}

                <ReactSVG src={icon} />
                {title}
              </li>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
