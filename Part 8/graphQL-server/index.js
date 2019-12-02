const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./graphql/index");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { MONGODB_URI, SECRET } = require("./utils/config");

console.log("connecting to mongo.....");
mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to mongo");
	})
	.catch(() => {
		console.log("Can't connect to mongo");
	});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith("bearer ")) {
			const decodedToken = jwt.verify(auth.substring(7), SECRET);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	}
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
