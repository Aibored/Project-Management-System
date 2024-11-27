const db = require('../configs/database.js');
const md5 = require('md5');

async function createUser(user) {
	try {
		const create = await db('users').insert(user);

		if (create.affectedRows === 0) {
			return {
				status: false,
				message: 'couldn\'t create',
			};
		}

		return {
			status: true,
			message: 'succeeded',
		};
	} catch (err) {
		console.error('Hata: Kullanıcı eklenemedi', err);
	}
}

async function getAllUsers() {
	try {
		const users = await db('users').select('*');

		return {
			status: true,
			message: 'there is a list of users that already created',
			data: users,
		};
	} catch (err) {
		return err;
	}
}

async function listByUsers(param1,param2){

	const results = await knex('books').orderBy(param, param2);

	return {
		status: true,
		message: 'sorted by',
		data: results,
	};
}

async function updateUser(id, updates) {
	try {
		const count = await db('users').where({ id }).update(updates);
		return {
			status: true,
			message: 'updated',
			data: null,
		};
	} catch (err) {
		return err;
	}
}

async function deleteUser(id) {
	try {
		const count = await db('users').where({ id }).del();
		return {
			status: true,
			message: 'deleted',
			data: null,
		};
	} catch (error) {
		console.error('Hata: Kullanıcı silinemedi', error);
	}
}

async function searchUser(user) {
//	let sql = 'SELECT `username` FROM users WHERE username = ? ';
	const result2 = await db('users').where(user).select('username');

	if (result2.length > 0) {
		return {
			status: false,
			message: 'user already exist',
		};
	}


	return {
		status: true,
		message: 'OK',
		data: result2,
	};
}

async function searchId(id){
	const idSearch = db('users')
		.select('*')
		.where('id', id);

	if (idSearch.length === 0) {
		return {
			status: false,
			message: 'this id is not exist',
			data: null,
		};
	}
	return {
		status: true,
		message: '1 data found',
		data: idSearch,
	};
}


module.exports = {
	createUser,
	getAllUsers,
	updateUser,
	deleteUser,
	searchUser,
	listByUsers,
	searchId,
};