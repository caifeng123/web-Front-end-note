const config = {
	cc: {
		Widget: {
			xxx: {
				x: "10%",
				y: "20%",
			},
		},
	},
};

const SUCCESSCODE = { code: 0, msg: "success" };
const FAILCODE = { code: 1, msg: "FAIL" };
export const getConfigData = (userId) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(config[userId] || (config[userId] = {}));
		}, 100);
	});

export const modifyConfigData = (userId, action, items) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			// config[userId] =
			resolve(SUCCESSCODE);
		}, 100);
	});
