const mongoose = require('mongoose');
require('./models/users.model')
const express = require('express');
const bodyParser = require('body-parser')
const port = process.env.PORT || "8000";
const usersRoute = require('./routes/index.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbURI = 'mongodb://localhost:27017';

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/', usersRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

module.exports = app;

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });