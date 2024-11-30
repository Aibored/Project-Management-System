const validateRequest = require('../configs/validation.js');
const routePermissions = [
	{
		path: '/user',
		method: 'GET',
		permissionId: 2,
	},
	{
		path: '/user/:id',
		method : 'POST',
		permissionId: 1,
		validation: validateRequest(),
	},
	{
		path: '/user/:id',
		method: 'GET',
		permissionId: 2,
	},
	{
		path: '/user/:id',
		method: 'PUT',
		permissionId: 3,
		validation: validateRequest(),
	},
	{
		path: '/user/:id',
		method: 'DELETE',
		permissionId: 4,
	},
];

module.exports = routePermissions;