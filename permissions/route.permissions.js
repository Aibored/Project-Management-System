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
	{
		path:'/tasks/create',
		method:'POST',
		permissionId: 5,
	},
	{
		path:'/tasks/:id',
		method:'PUT',
		permissionId: 6,
	},
	{
		path: '/tasks/:id',
		method:'DELETE',
		permissionId: 7,
	},
	{
		path: '/tasks',
		method: 'GET',
		permissionId: 8,
	},
	{
		path:'/tasks/:id',
		method:'GET',
		permissionId: 8,
	},
	{
		path:'/projects/:id',
		method:'GET',
		permissionId: 10,
	},
	{
		path:'/projects/:id',
		method:'PUT',
		permissionId: 12,
	},
	{
		path:'/projects/:id',
		method:'DELETE',
		permissionId: 11,
	},
	{
		path:'/projects',
		method:'POST',
		permissionId: 9,
	},
	{
		path:'/projects',
		method:'GET',
		permissionId: 10,
	},
];

module.exports = routePermissions;