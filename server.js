const express = require('express');
const path = require('path');

const routes = require('./controllers');
const PORT = process.env.PORT || 3001
let app = express();

// Middleware for parsing JSON and url encoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Public router
app.use(express.static('public'));

// routes for API interface
app.use(routes);

// simple route for notes file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/html/notes.html"))
})

// app.get('/api/notes', (req, res)=>{
//     console.info(`${req.method} request received for notes`);

//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// })

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})