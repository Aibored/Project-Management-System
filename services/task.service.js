const { v4: uuidv4 } = require('uuid');
const db = require('../configs/database.js');

async function taskCreate(task){
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

async function taskUpdate(id, updates){
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

async function taskSearch(id){
	const idSearch = db('tasks')
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

module.exports ={ taskCreate,
taskUpdate,
taskSearch
};
