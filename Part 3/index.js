require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const PORT = process.env.PORT;

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
morgan.token("post", function(req, res) {
	if (req.method === "POST") {
		return JSON.stringify(req.body);
	}
});
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :post")
);

const errorHandler = (error, request, response, next) => {
	console.log(error);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error });
	}

	next(error);
};

app.get("/api/persons", (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons.map(person => person.toJSON()));
	});
});

app.get("/info", (req, res) => {
	const getInfo = () => {
		return Person.find({}).then(
			persons => persons.map(person => person.toJSON()).length
		);
	};
	const info = [
		`<p>The phonebook has info of ${getInfo()} people</p>`,
		`<p>${new Date()}</p>`
	];
	res.send(info.join("\n"));
});

app.get("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;
	Person.findById(id)
		.then(person => {
			if (person) {
				res.json(person.toJSON());
			} else {
				res.status(404).end();
			}
		})
		.catch(error => {
			errorHandler(error, req, res, next);
		});
});

app.post("/api/persons/", (req, res, next) => {
	const person = new Person({
		name: req.body.name,
		number: req.body.number
	});
	person
		.save()
		.then(savedPerson => {
			res.status(201).json(savedPerson.toJSON());
		})
		.catch(error => {
			errorHandler(error, req, res, next);
		});
});

app.put("/api/persons/:id", (req, res, next) => {
	const person = {
		name: req.body.name,
		number: req.body.number
	};

	Person.findByIdAndUpdate(req.params.id, person, {
		new: true,
		runValidators: true,
		context: "query"
	})
		.then(updatedPerson => {
			res.json(updatedPerson.toJSON());
		})
		.catch(error => {
			errorHandler(error, req, res, next);
		});
});

app.delete("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;
	Person.findByIdAndRemove(id)
		.then(() => res.json({ message: "Succeccfully deleted" }))
		.catch(err => {
			errorHandler(err, req, res, next);
		});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
