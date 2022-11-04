const initialAuthState = {
  userDetails: {
    id: 0,
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    status: "",
    avatar: null,
    role: "",
    address: "",
    city: null,
    state: null,
    password_tries: 0,
    account_locked_until: null,
    date_account_locked: null,
    date_created: "",
    password_expires_in: null,
    pin_expires_in: null,
    key: [],
  },
};

export const userDetailReducer = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case "USERDETAIL": {
      return {
        ...state,

        userDetails: { ...action.userDetails[0] },
      };
    }

    default: {
      return state;
    }
  }
};

export default userDetailReducer;
