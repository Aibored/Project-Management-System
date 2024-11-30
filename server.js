const express = require('express');
const cors = require('cors');
const app = express();
const routePermissions = require('./permissions/route.permissions.js');
const unprotectedPaths = require('./configs/unprotected.paths.js');
const authoratize = require('./middlewares/auth.js');
const roleCheck = require('./middlewares/role.check.js');


const corsOptions = {
	origin: 'http://localhost:8081',
};

function error(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
const method = req.method;
const findRoutesByMethod = routePermissions.filter((routePermission) => routePermission?.method === method);


let findPath = {};
let validation = null;
for (let routePermission of findRoutesByMethod) {
	var routeMatcher = new RegExp(routePermission.path.replace(/:[^\s/]+/g, '([\\w-]+)'));
	const regexFindPath = req.path.match(routeMatcher);
	if (regexFindPath) {
		findPath = routePermission.permissionId;
		validation = routePermission?.validation || null;
		break;
	}
}
console.log(findPath);

const protectCheck = unprotectedPaths.includes(req.path);

if (protectCheck === false) {
	const auth = await authoratize(req, res);

	const result = auth.data;

	const role = await roleCheck(result, findPath);
console.log(role);
	if (role.status === 'error') {
		return;
	}
	if (role.status === false) {
		return res.status(400).json({
			status: false,
			message: 'you have not permission to access',
		});
	}
}
if (validation) {
	const valid = await validation(req.body);
	if (valid.status === false) {
		return res.status(400).json({
			status: false,
			message: valid.error,
		});
	}
}

next();
});

app.get('/', async (req, res) => {

	res.json({
		status: true,
		message: 'welcome to PMS',
		data: null,
	});

});

require('./routes/user.route.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});