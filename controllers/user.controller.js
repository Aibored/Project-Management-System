const { createUser, getAllUsers, updateUser, deleteUser, searchUser, listByUsers, searchId, } = require('../services/user.service');
const md5 = require('md5');


exports.userCreate = async (req, res) => {
	const password = req.body.password;
	const passHash = md5((password));

	const user = {
		name: req.body.name,
		surname:req.body.surname,
		email: req.body.email,
		username: req.body.username,
		password: passHash,
		role_id: req.body.role_id,
	};

	const username = user.username;
	const email = user.email;
	const surname = user.surname;
	const name = user.name;
	const role_id = user.role_id;



console.log(user);


	if (!user.username || !user.password || !user.role_id ||!user.email || !user.name ||!user.surname) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

	const search = await searchUser({name: name,surname: surname,email:email,username:username,password:passHash,role_id: role_id});

	if (search.status === false) {

		return res.status(409).json({
			status: false,
			message: search.message,
			data: null,
		});
	}

	const create = await createUser(user);
	console.log(create);


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

exports.userList = async (req,res) =>{
	const userAll = await getAllUsers();

	if (!req.query.order || !req.query.by) {
		return res.json({
			status: true,
			message: 'OK',
			data: userAll.data,
		});
	}
	const order = req.query.order;
	const by = req.query.by;

	const orderBy = await listByUsers(order, by);

	res.json({
		status: true,
		message: 'OK',
		data: orderBy.data,
	});
}

exports.userDelete = async (req,res)=>{

	const { id } = req.params;


	const searching = await searchId(id);


	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const userDelete = await deleteUser(id);

	if (userDelete.affectedRows === 0) {
		return res.status(400).json({
			status: false,
			message: 'there is no book associated with this id',
			data: null,
		});
	}
	return res.status(200).json({
		status: true,
		message: 'successfully deleted. here is the deleted data:',
		data: searching.data,
	});

}

exports.userUpdate = async (req,res)=>{
	const { id } = req.params;
	const password = req.body.password;
	const passHash = md5((password));
	const user = {
		name: req.body.name,
		surname:req.body.surname,
		email: req.body.email,
		username: req.body.username,
		password: passHash,
		role_id: req.body.role_id,
	};

	if (!user.username || !user.password || !user.role_id ||!user.email || !user.name ||!user.surname) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}


	const searching = await searchId(id);


	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const userUpdate = await updateUser(id,user);

	const searching2 = await searchId(id);

	if (userUpdate.status == true) {
		return res.status(200).json({
			status: true,
			message: userUpdate.message,
			data: searching2.data,
		});

	}
	else {
		return res.status(500).json({
			status: false,
			message: userUpdate.message,
			data: null,
		});
	}

}