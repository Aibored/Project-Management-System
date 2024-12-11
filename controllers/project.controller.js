const db = require('../configs/database.js');
const {
	readByProjects,
	readAllProjects,
	createProject,
	updateProject,
	searchProject,
	deleteProject,
} = require('../services/project.service.js');


exports.projectCrate = async(req,res)=>{
	const project = {
    name: req.body.title,
		description: req.body.description,
		created_at: db.fn.now(),
		updated_at: db.fn.now(),
	};

	if (!project.title || !project.description) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

	const create = await createProject(project);

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

exports.projectUpdate = async (req,res)=>{
	const {id} = req.params;

	const project = {
		name: req.body.title,
		description: req.body.description,
		updated_at: db.fn.now(),
	};

	const searching = await searchProject(id);

	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const update = await updateProject(id,project);

	const searching2 = await searchProject(id);

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

exports.projectDelete = async (req,res)=>{
	const {id} = req.params;

	const searching = await searchProject(id);

	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const del = await deleteProject(id);

	if (del.affetedRows === 0 ){
		return res.status(400).json({
			status: false,
			message: 'there is no task associated with this id',
			data: null,
		});
	}
	return res.status(200).json({
		status: true,
		message: 'successfully deleted. here is the deleted data:',
		data: searching.data,
	});
};

exports.projectList = async (req,res)=>{
	const taskAll = await readAllProjects();

	if (!req.query.order || !req.query.by) {
		return res.json({
			status: true,
			message: 'OK',
			data: taskAll.data,
		});
	}

	const order = req.query.order;
	const by = req.query.by;

	const orderBy = await readByProjects(order, by);

	res.json({
		status: true,
		message: 'OK',
		data: orderBy.data,
	});
};

exports.projectRead = async (req,res)=>{
	const { id } = req.params;

	const searching = await searchProject(id);


	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	return res.json({
		status: true,
		message: 'OK',
		data: searching.data,
	});
};