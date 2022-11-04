const initialAuthState = {
	me: {
		data: {
			access_token: null,
			expires_in: null,
			business: {
				email: '',
				phonenumber: null,
				account: {
					type: '',
					subtype: '',
				},
				tradingname: null,
				businesstype: null,
				businessindustrycategory: null,
				country: '',
				identification: [],
				meta: [],
				merchantcode: '',
				added: '',
				status: '',
				approved: null,
				live: '',
				address: [],
				settlement: {
					account: [],
				},
				user: [
					{
						email: '',
						password: null,
						firstname: '',
						middlename: '',
						lastname: '',
						phonenumber: null,
						position: null,
						dateofbirth: null,
						country: '',
						timezone: null,
						identification: [],
						key: [
							{
								publickey: '',
								privatekey: '',
							},
						],
						status: '',
						verified: '',
						lasttogglestatus: '',
						added: '',
						nin: null,
						bvn: null,
					},
				],
				feesetup: [],
				actionid: null,
				action: null,
				reason: null,
				config: null,
				limitsetup: [],
				compliance: [
					{
						stage: '',
						suppliedfields: [],
						nullfields: [],
					},
				],
			},
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
