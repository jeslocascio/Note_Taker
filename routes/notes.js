// Requiring Dependancies
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, deleteNote } = require('../helpers/fsUtils');

// Creating a get request to the notes page
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });

// Posting the info given from the user to the page
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const reponse = {
            status: 'success',
            body: newNote,
        }

        res.json(response);
    } else {
        res.error('Error added new Note');
    }
})

// Deleting a note from the page after clicking the trash icon
notes.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteNote(id, "./db/db.json", (err) => {
        if (err) {
          res.status(500).send("Error deleting note");
        } else {
          res.status(200).send("Successfully deleted note");
        }
      });

})
module.exports = notes;