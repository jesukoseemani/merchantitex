import { SAVE_MENU, SAVE_NESTED, SAVE_NAV, SAVE_MENU_TITLE } from "../constants";
import { ReactNode } from "react";

export const selectMenu = (menuDetail: string) => {
  return {
    type: SAVE_MENU,
    menuDetail,
  };
};

export const saveNested = (nested: boolean) => {
  return {
    type: SAVE_NESTED,
    nested,
  };
};
export const saveNav = (nav: any) => {
  return {
    type: SAVE_NAV,
    nav,
  };
};
export const saveMenuTitle = (menuTitle: string) => {
  return {
    type: SAVE_MENU_TITLE,
    menuTitle,
  };
};
