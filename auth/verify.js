const db = require('../configs/database.js');
const md5 = require('md5');

async function verifyUserAndPassword(username, password) {
	const passHash = md5((password));

//	const passSearch = await execSql('SELECT * FROM users WHERE username =? and password = ?', [username, passHash]);
	const passSearch = await db('users').where({
		username: username,
		password: passHash,
	})
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