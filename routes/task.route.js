module.exports = app =>{
	const task = require('../controllers/task.controller.js');
	var router = require("express").Router();

	router.post("/create", task.createTask);

	router.put("/:id", task.updateTask);

	router.delete ("/:id", task.deleteTask);

	router.get("/",task.listTask);

	router.get("/:id",task.ReadTask);

	app.use('/tasks',router);
}