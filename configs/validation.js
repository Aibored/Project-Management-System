const Joi = require('joi');

const PASSWORD_REGEX = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])',
);

const schema = Joi.object().keys({
	name: Joi.string().alphanum().required(),
	surname: Joi.string().alphanum().required(),
	email: Joi.string().email(),
	username: Joi.string().alphanum().required(),
	password: Joi.string().pattern(PASSWORD_REGEX).min(3).required(),
	role_id: Joi.string().required(),
});

const taskSchema = Joi.object().keys({
	title: Joi.string().alphanum().required(),
	status: Joi.string().alphanum(),
	start_date: Joi.string().alphanum(),
	tags: Joi.string().alphanum(),
	project_id: Joi.string().alphanum().required(),
	description: Joi.string().alphanum(),
	due_date: Joi.string().alphanum(),

});

const projectSchema = Joi.object().keys({
	title: Joi.string().alphanum().required(),
	description: Joi.string().alphanum().required(),
});

async function validateRequest(body) {
	const result = schema.validate(body);
	if (result.error) {
		return ({
			status: false,
			error: result.error.details[0].message,
		});
	}
	return {
		status: true,
		message: 'OK',
		data: result,
	};

}

async function validateTask(body) {
	const result = taskSchema.validate(body);
	if (result.error) {
		return ({
			status: false,
			error: result.error.details[0].message,
		});
	}
	return {
		status: true,
		message: 'OK',
		data: result,
	};
}

async function validateProject(body) {
	const result = projectSchema.validate(body);
	if (result.error) {
		return ({
			status: false,
			error: result.error.details[0].message,
		});
	}
	return {
		status: true,
		message: 'OK',
		data: result,
	};
}

module.exports = { validateRequest, validateTask,validateProject };