const initialAuthState = {
	me: {
		data: {
			access_token: null,
			expires_in: null,
			user: {
				id: "number",
				userRole: {
					id: "",
					roleName: "",
					description: ""
				},
				merchantaccountid: "",
				firstname: "",
				middlename: "",
				lastname: "",
				email: "",
				phonenumber: "",
				role: "",
				country: "",
				verifstatus: false,
				createdat: "",
				status: "",
				lastlogin: "",
				twofaSetup: false,
				islivetoogle: false
			},
			business: {
				merchantaccountid: "",
				merchantcode: "",
				businessemail: "",
				businessphone: "",
				merchantaccounttype: "",
				merchantaccounttsubype: "",
				tradingname: "",
				biztype: "",
				bizindustrycategory: "",
				mcc: "",
				parentmerchantaccountid: null,
				country: "",
				createdat: "",
				status: "",
				isapproved: false,
				islive: false
			},
			permissions: [],

			code: '',
			message: '',
		},
	},
};

export const meReducer = (state = initialAuthState, action: any) => {
	switch (action.type) {
		case 'ME': {
			return {
				...state,

				me: { ...action.meDetails },
			};
		}
		case 'REMOVEME': {
			return {
				...state,
				me: {},
			};
		}

		default: {
			return state;
		}
	}
};

export default meReducer;
