const { createUser, getAllUsers, updateUser, deleteUser } = require('../services/user.service');
const md5 = require('md5');


exports.userCreate = async (req, res) => {
	const password = req.body.password;
	const passHash = md5((password));

	const user = {
		name: req.body.name,
		surname:req.body.surname,
		email: req.body.email,
		username: req.body.username,
		password: passHash,
		role_id: req.body.role_id,
	};

	const username = user.username;

console.log(user);


	if (!user.username || !user.password || !user.role_id ||!user.email || !user.name ||!user.surname) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

//	const search = await searchUser(username);
//
//	if (search.status === false) {
//
//		return res.status(409).json({
//			status: false,
//			message: search.message,
//			data: null,
//		});
//	}
	const create = await createUser(user);
	console.log(create);


	if (create.status === true) {
		return res.status(200).json({
			status: true,
			message: create.message,
			data: create.body,
		});
	}

	if (create.status === false) {
		return res.status(400).json({
			status: false,
			message: create.message,
			data: null,
		});
	}
};

