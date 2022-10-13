const { readFromFile, readAndAppend, writeToFile, deleteItem } = require('../../helpers/fsUtils');
const router = require('express').Router();
const db = require('../../db/db.json');
const dbfile='./db/db.json';
const uuid = require('../../helpers/uuid');

// route to get notes from our db
router.get('/notes',  async (req, res) => {
    console.info(`${req.method} !!!request received for notes`);
    console.log(db);
    try {
      const currentFile = await readFromFile(dbfile, 'utf8'); 
     res.json(JSON.parse(currentFile));
     console.log(currentFile);
     
    } catch (err) {
        console.log(err);
      res.status(500).json(err.message);
    }
});

// route to post a note to our json db
router.post('/notes',  async (req, res) => {
try {
    console.info(`${req.method} !!!request received for notes`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    
    // If all the required properties are present
    if (title && text) {
        console.log('got title and text!' + title + " " + text);

        // Variable for the object we will save
        const newNote = {
        title,
        text,
        id: uuid()
        };
    
      // put new note in our db.json file.
     readAndAppend(newNote, dbfile );

         
     const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);

    }//end if valid input

} catch (err) {
    res.status(500).json(err);
}
});

// route to delete a note from our json db
router.delete('/notes/:id',  async (req, res) => {
    
    try {
        console.log('delete route');
        
        //authored helper function in fsUtils to follow same design flow.
        deleteItem(req.params.id, dbfile);
        const response = {
            status: 'success',
         };
      
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;