const errorHandler = (error, request, response, next) => {
	console.log(error);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		response.status(400).json({ error });
	} else if (error.name === "JsonWebTokenError") {
		response.status(401).json({
			error: "invalid token"
		});
	}

	next(error);
};

const getToken = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.substring(7);
	}
	next();
};

module.exports = { errorHandler, getToken };
