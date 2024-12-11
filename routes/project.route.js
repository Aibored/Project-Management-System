module.exports = app =>{
	const project = require('../controllers/project.controller.js');
	var router = require("express").Router();

	router.post("/create",project.projectCrate);

	router.put("/:id",project.projectUpdate);

	router.delete("/:id",project.projectDelete);

	router.get("/",project.projectList);

	router.get("/:id",project.projectRead);

	app.use('/projects',router);
}