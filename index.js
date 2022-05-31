// use micro framework express
const express = require('express');

const cors=require("cors");
// use axios
const axios = require('axios');

// use a data file
const data = require('./data.json');

// use port 8000 to run server on localhost
const port = 8000;

// initialize express in a variable named app
const app = express();

app.use(cors("*"));

// configure express to use urlencoded
app.use(express.urlencoded({
    extended: true
}));

// default entry point '/' 
app.get('/', (req, res) => {
    res.json({ message : 'Welcome on Express/Node Server'}).status(200);
});

app.get("/api/livres", (req, res) => {
    res.json(data).status(200);
});

app.post('/api/livres', (req, res) => {
    // initialize a new book
    const newBook = {
        // get the id from the data array + 1 to get the next id
        id : data.length + 1,
        // get the title from the body request (data send by the client)
        title : req.body.title,
        auteur : req.body.auteur,
        theme : req.body.theme,
        description : req.body.description,
        note : req.body.note,
        image : req.body.image
    }
    // push the new article to the data array
    data.push(newBook);
    // send the new article to the client
    res.json(newBook).status(201);
});

//app.get("/api/livres", (req, res) => {
//    axios.get()
//})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});