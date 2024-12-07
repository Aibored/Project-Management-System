const { v4: uuidv4 } = require('uuid');
const db = require('../configs/database.js');

async function taskCreate(task) {
	try {
		const create = await db('tasks').insert(task);

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

async function taskUpdate(id, updates) {
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

async function taskSearch(id) {
	const idSearch = await db('tasks')
		.select('*')
		.where('id', id);

	if (idSearch.length === 0) {
		return {
			status: false,
			message: 'this id is not exist',
			data: idSearch,
		};
	}
	return {
		status: true,
		message: '1 data found',
		data: idSearch,
	};
}

async function taskDelete(id) {
	try {
		const count = await db('tasks').where({ id }).del();
		return {
			status: true,
			message: 'deleted',
			data: null,
		};
	} catch (error) {
		console.error('Hata: Kullanıcı silinemedi', error);
	}
}

async function taskReadAll() {
	try {
		const users = await db('tasks').select('*');

		return {
			status: true,
			message: 'there is a list of tasks that already created',
			data: users,
		};
	} catch (err) {
		return err;
	}
}

async function taskReadBy(param1, param2) {
	const results = await db('tasks').orderBy(param1, param2);

	return {
		status: true,
		message: 'sorted by',
		data: results,
	};
}

module.exports = {
	taskCreate,
	taskUpdate,
	taskSearch,
	taskDelete,
	taskReadBy,
	taskReadAll,
};
