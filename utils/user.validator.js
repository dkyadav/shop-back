import Joi from "joi";

export const LoginValidation = async (req, res, next) => {
	const LoginSchema = Joi.object({
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),

		password: Joi.string().min(3).required().messages({
			"string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
			"string.empty": `Password cannot be empty`,
			"any.required": `Password is required`,
		}),
	});

	try {
		await LoginSchema.validateAsync(req.body);
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
