const initialMenuState = {
  menu: "Home",
  nestState: false,
  navState: [],
  titleState: ""
  };
  
  export const menuReducer = (state = initialMenuState, action:any) => { 
    switch (action.type) {
      case "SAVE_MENU": {
        return {
          ...state,
          menu: action.menuDetail,
        };
      }
      case "SAVE_NESTED": {
        return {
          ...state,
          nestState: action.nested,
        };
      }
      case "SAVE_NAV": {
        return {
          ...state,
          navState: action.nav,
        };
      }
      case "SAVE_MENU_TITLE": {
        return {
          ...state,
          titleState: action.menuTitle,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default menuReducer;
  