const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const PORT = process.env.PORT || 3001
const db = require('./db/db.json');
let app = express();

// Middleware for parsing JSON and url encoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Public router
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/notes.html"))
})

app.get('/api/notes', (req, res)=>{
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})