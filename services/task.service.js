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


module.exports = taskCreate;
