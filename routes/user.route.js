module.exports = app => {
	const control = require('../controllers/auth.controller.js');
	const user = require('../controllers/user.controller.js');
	var router = require("express").Router();

//	router.get("/login", control.authUser);

	router.post("/signup", user.userCreate);

	router.get("/list", user.userList);

	router.delete("/:id",user.userDelete);

	router.put("/:id", user.userUpdate);

	router.get("/login", control.authUser);

	app.use('/user/', router);
}