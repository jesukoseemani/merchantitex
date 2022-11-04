const initialMenuState = {
    menu: "Home",
  };
  
  export const menuReducer = (state = initialMenuState, action:any) => {
    switch (action.type) {
      case "SAVE_MENU": {
        return {
          ...state,
          menu: action.menuDetail,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default menuReducer;
  