const { v4: uuidv4 } = require('uuid');
const {taskCreate,taskUpdate,taskSearch} = require('../services/task.service.js');
const db = require('../configs/database.js');
const { searchId } = require('../services/user.service');



exports.createTask = async (req, res) => {
	const ID = uuidv4();


	const task = {
		uuid: ID,
		title: req.body.title,
		status: req.body.status,
		start_date: req.body.start_date,
		created_at: db.fn.now(),
		updated_at: db.fn.now(),
		tags: req.body.tags,
		project_id: req.body.project_id,
		description: req.body.description,
		due_date: req.body.due_date,
	};

	if (!task.title || !task.project_id) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

	const create = await taskCreate(task);

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

exports.updateTask = async (req, res) =>{
	const { id } = req.params;
	const task = {
		title: req.body.title,
		status: req.body.status,
		start_date: req.body.start_date,
		updated_at: db.fn.now(),
		tags: req.body.tags,
		project_id: req.body.project_id,
		description: req.body.description,
		due_date: req.body.due_date,
	};
	const searching = await taskSearch(id);


	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const update = await taskUpdate(id,task);

	const searching2 = await taskSearch(id);

	if (update.status === true) {
		return res.status(200).json({
			status: true,
			message: update.message,
			data: searching2.data,
		});

	}
	else {
		return res.status(500).json({
			status: false,
			message: update.message,
			data: null,
		});
	}
};

exports.



