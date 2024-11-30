const db = require('../configs/database.js');

async function roleCheck(verify, number) {
	try {
		const roleCheck = await db('role_permissions')
			.select('permission_id')
			.where('role_id', verify.role_id);

		const roleResult = JSON.parse(JSON.stringify(roleCheck));

		const check = roleResult.filter((rolePermissions) => rolePermissions.permission_id === number);

		console.log(check);


		if (check.length === 0) {
			return {
				status: false,
				message: 'access denied',
				data: null,
			};
		}
		return {
			status: true,
			message: 'access granted',
			data: null,
		};

	} catch (err) {
		return {
			status: 'error',
		};

	}
}

module.exports = roleCheck;