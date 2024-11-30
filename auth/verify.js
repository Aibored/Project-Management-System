const db = require('../configs/database.js');
const md5 = require('md5');

async function verifyUserAndPassword(identifier, password) {
	const passHash = md5((password));

	const passSearch = await db('users').where(function () {
		this.where('email', identifier).orWhere('username', identifier);
	})
		.andWhere('password', passHash)
		.select();

	if (passSearch.length === 0) {
		return {
			status: false,
			message: 'cannot find',
		};
	}


	return {
		status: true,
		message: 'OK',
		data: passSearch[0],

	};
}

module.exports = {
	verifyUserAndPassword,
};