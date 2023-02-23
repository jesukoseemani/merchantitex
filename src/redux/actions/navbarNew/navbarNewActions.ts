import { CHANGE_NEW_NAVBAR } from "../constants";

export const changeNewNavbar = (navbarRoute: string) => {
  return {
    type: CHANGE_NEW_NAVBAR,
    navbarRoute,
  };
};
