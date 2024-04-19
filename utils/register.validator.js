import Joi from "joi";

export const RegisterValidation = async (req, res, next) => {
	const RegisterSchema = Joi.object({
		password: Joi.string()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.required()
			.messages({
				"string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
				"string.empty": `Password cannot be empty`,
				"any.required": `Password is required`,
			}),

		cpassword: Joi.ref("password"),

		name: Joi.string().min(3).max(30).required(),

		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
		role:Joi.string().optional()
	});

	try {
		await RegisterSchema.validateAsync(req.body);
		next();
	} catch (error) {
		console.log(error);
		res.status(422).json({
			status: "error",
			message: error.message,
			data_sent: req.body,
		});
	}
};
