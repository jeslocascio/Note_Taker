// Requiring all the dependancies
const express = require('express');

const notesRouter = require('./notes.js');

// Running express
const app = express();

// Using the router that we created to direct to Notes page
app.use('/notes', notesRouter);

module.exports = app;