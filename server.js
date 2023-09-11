//Requiring Dependancies
const express = require('express');
const path = require('path');
const { clog } = require ('./middleware/clog');
const api = require('./routes/index.js');

//Creating the port for Heroku, otherwise, running on 3001 for local device
const PORT = process.env.PORT || 3001;

//Running express
const app = express();

//Using the functions we created for middleware
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//Creating get requests for the pages from the public folder, so they are displayed
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Directing the wildcard route back to the index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Starting the server to listen on PORT
app.listen(PORT, () =>
    //Logging that the local host was started
    console.log(`App listening at http://localhost:${PORT}`)
);