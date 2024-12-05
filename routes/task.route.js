module.exports = app =>{
	const task = require('../controllers/task.controller.js');
	var router = require("express").Router();

	router.post("/create", task.createTask);

	router.put("/:id", task.updateTask);

	app.use('/tasks',router);
}