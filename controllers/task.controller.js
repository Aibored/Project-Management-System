const { v4: uuidv4 } = require('uuid');
const taskCreate = require('../services/task.service.js');
const db = require('../configs/database.js');

exports.createTask = async (req, res) => {
	const ID = uuidv4();


	const task = {
		title: req.body.title,
		type: req.body.type,
		status: req.body.status,
		start_date: req.body.start_date,
		created_at: db.fn.now(),
		updated_at: db.fn.now(),
		tags: req.body.tags,
		project_id: req.body.project_id,
		description: req.body.description,
		due_date: req.body.due_date,
	};

};