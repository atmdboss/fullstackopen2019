const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const MONGO_URI = require("./utils/config").MONGODB_URI;

const mongoUrl = MONGO_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.getToken);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/testing", testingRouter);

app.use(middleware.errorHandler);

module.exports = app;
