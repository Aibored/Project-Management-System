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
console.log(create);
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

module.exports = {
	createUser,
	getAllUsers,
	updateUser,
	deleteUser,
};