const { verifyUserAndPassword } = require('../auth/verify');
const { newToken } = require('../auth/jwt');

exports.authUser = async (req, res) => {
	if (!req.body.identifier || !req.body.password) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}


	const identifier = req.body.identifier;
	const password = req.body.password;


	const vPass = await verifyUserAndPassword(identifier, password);

	if (vPass.status === false) {
		return res.status(400).json({
			status: false,
			message: vPass.message,
			data: null,
		});
	}

	const role_id = vPass.data.role_id;
	const user_id = vPass.data.user_id;


	const user = {
		identifier,
		password,
		role_id,
		user_id,
	};

	const token = await newToken(user);

	res.json({
		status: true,
		message: 'here is your token',
		data: token,
	});
};