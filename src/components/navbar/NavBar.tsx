import React, { useState, useEffect } from "react";
import SearchBar from "../search/searchBar";
import Styles from "./Navbar.module.scss";
import { Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowDown from "../../assets/images/arrowDown.svg";
import ArrowLeft from "../../assets/images/arrowLeft.svg";
import { navRoutes } from "../../mock/navRoutes";
import { ReactSVG } from "react-svg";
import { useHistory, useLocation } from "react-router-dom";




const NavBar = () => {
  const business = useSelector((state) => state?.meReducer?.me?.business);

  const { pathname } = useLocation();
  const [active, setActive] = React.useState(0);
  const [routes, setRoutes] = useState<any[] | undefined>([])
  const [isNested, setIsNested] = useState(false)

  const history = useHistory()


  useEffect(() => {
    const nestedRoutes = navRoutes?.find((route) => route?.link === pathname)?.nav;
    console.log(nestedRoutes)
    if (pathname === "/") {
      setIsNested(false)
      return setRoutes(navRoutes)
    }
    if (nestedRoutes && nestedRoutes?.length > 0) {
      setIsNested(true)
      return setRoutes(nestedRoutes)
    }
  }, [pathname]);

  // console.log(isNested)
  useEffect(() => {
    // console.log(routes)
  }, [routes])
  return (
    <div className={Styles.container}>
      <div className={Styles.userInfo}>
        <div className={Styles.user__img}>
          <img src="https://loremflickr.com/640/480/cats" alt="user profile" />
        </div>
        <div className={Styles.userProfile__text}>
          <p>James  <ReactSVG src={ArrowDown} /></p>
          <span>thejames@gmail.com</span>
        </div>
      </div>
      <div>
        <div className={Styles.backBtn} >

          {isNested && <Button onClick={() => history.push("/")}><ReactSVG src={ArrowLeft} /> Main menu</Button>
          }


        </div>

        <nav>
          {/* {nextedRoutes?} */}
          {routes?.map(({ id, title, icon, link }) => {
            return (
              <li
                key={id}
                onClick={() => history.push(link)}
                className={link === pathname ? Styles.active : Styles.routes}
              >
                {/* <img src={icon} alt={name} /> */}

                <ReactSVG src={icon} />
                {title}
              </li>
            )
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;