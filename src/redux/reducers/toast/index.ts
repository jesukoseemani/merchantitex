import {
  CLOSE_TOAST,
  OPEN_AND_SET_TOAST_CONTENT,
} from "../../actions/constants";

const initialToastState = {
  toastContent: "",

  toastOpened: false,
  msgType: ""
};

const toastReducer = (state = initialToastState, action: any) => {
  switch (action.type) {
    case CLOSE_TOAST: {
      return { ...state, toastOpened: false };
    }
    case OPEN_AND_SET_TOAST_CONTENT: {
      return {
        ...state,
        toastOpened: true,
        toastContent: action.toastContent,
        msgType: action.msgType,
        // toastStyles: { ...state.toastStyles, ...action.toastStyles },

      };
    }
    default: {
      return state;
    }
  }
};

export default toastReducer;
