require("dotenv").config();
const { gql } = require("apollo-server");
const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Author {
		name: String!
		born: Int
		id: ID!
		bookCount: Int!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type Query {
		me: User
		bookCount(name: String): Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}

	type Subscription {
		bookAdded: Book!
	}
`;

const resolvers = {
	Query: {
		bookCount: async () => {
			const books = await Book.find({});
			return books.length;
		},
		authorCount: async () => {
			const authors = await Author.find({});
			return authors.length;
		},
		allBooks: async (root, args) => {
			const books = await Book.find({}).populate("author");

			if (args.author && args.genre) {
				return books.filter(
					book =>
						book.author.name === args.author && book.genres.includes(args.genre)
				);
			}
			if (args.author) {
				return books.filter(book => book.author.name === args.author);
			}
			if (args.genre) {
				return books.filter(book => book.genres.includes(args.genre));
			}
			return books;
		},
		allAuthors: async () => await Author.find({}),
		me: async (root, args, { currentUser }) => currentUser
	},
	Author: {
		bookCount: async root => {
			const books = await Book.find({}).populate("author");
			return books.filter(book => book.author.name === root.name).length;
		}
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			//if not logged in,throw err
			if (!currentUser) {
				throw new Error("not logged in");
			}
			const authors = await Author.find({});

			//if author does not exist,create new author
			if (authors.findIndex(author => author.name === args.author) === -1) {
				const author = new Author({ name: args.author });
				await author.save();
			}

			try {
				const book = new Book({ ...args });
				const author = authors.find(author => author.name === args.author);
				book.author = author._id;

				pubsub.publish("BOOK_ADDED", { bookAdded: book });

				await book.save();
			} catch (error) {
				throw new Error(error.message);
			}

			return Book.findOne({ title: args.title }).populate("author");
		},
		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new Error("not logged in");
			}
			const authors = await Author.find({});

			if (authors.findIndex(author => author.name === args.name) === -1) {
				//author non-existent
				return null;
			}
			try {
				const [author] = await Author.find({ name: args.name });
				author.born = args.setBornTo;
			} catch (error) {
				throw new Error(error.message);
			}

			return author.save();
		},
		createUser: (root, args) => {
			const user = new User({ ...args });

			return user.save().catch(error => {
				throw new UserInputError(error.message, {
					invalidArgs: args
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secred") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id
			};

			return { value: jwt.sign(userForToken, SECRET) };
		}
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
		}
	}
};

module.exports = { typeDefs, resolvers };
