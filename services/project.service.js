const db = require('../configs/database.js');

async function createProject(project){
	try {
		const create = await db('projects').insert(project);

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

async function updateProject(id,updates){
	try {
		const count = await db('projects').where({ id }).update(updates);

		return {
			status: true,
			message: 'updated',
			data: null,
		};
	} catch (err) {
		return err;
	}
}

async function searchProject(id){
	const idSearch = await db('projects')
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

async function deleteProject(id){
	try {
		const count = await db('projects').where({ id }).del();
		return {
			status: true,
			message: 'deleted',
			data: null,
		};
	} catch (error) {
		return{
			status: false,
			message: 'cannot be deleted',
			data:null,
		};
	}
}

async function readAllProjects(){
	try {
		const users = await db('projects').select('*');

		return {
			status: true,
			message: 'there is a list of tasks that already created',
			data: users,
		};
	} catch (err) {
		return err;
	}
}

async function readByProjects (param1,param2){
	const results = await db('projects').orderBy(param1, param2);

	return {
		status: true,
		message: 'sorted by',
		data: results,
	};
}

module.exports = {
	readByProjects,
	readAllProjects,
	createProject,
	updateProject,
	searchProject,
	deleteProject
};