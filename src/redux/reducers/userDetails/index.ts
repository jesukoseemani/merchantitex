const initialAuthState = {
  userDetails: {
    id: 0,
    firstname: "",
    middlename: "",
    mobile_number: "",
    email: "",
    phonenumber: "",
    merchantaccountid: "",
    verifstatus: false,
    avatar: null,
    role: {
      id:0,
      roleName:"",
      description:"",
    },
    address: "",
    status: "",
    country: "",
    city: null,
    state: null,
    password_tries: 0,
    createdat: "",
    timezone: "",
    lastlogin: "",
    twofaSetup: false,
    islivetoogle: false,
    
  },
};

export const userDetailReducer = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case "USERDETAIL": {
      return {
        ...state,

        userDetails: { ...action.userDetails },
      };
    }

    default: {
      return state;
    }
  }
};

export default userDetailReducer;
