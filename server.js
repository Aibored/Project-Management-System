const express = require('express');
const cors = require('cors');
const app = express();

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