// use micro framework express
const express = require('express');

const cors=require("cors");
// use axios
const axios = require('axios');

// use a data file
const data = require('./data.json');
const { get } = require('express/lib/response');
const res = require('express/lib/response');

// use port 8000 to run server on localhost
const port = 8000;

// initialize express in a variable named app
const app = express();

app.use(cors("*"));

// configure express to use urlencoded
app.use(express.urlencoded({
    extended: true
}));

// const getBooks = () => {
//    return data;
//}

// const getDataFromApi = async () => {
//    const response = axios.get(api)
//     return response.data
//}

// app.get('api/alldata', (req,res) => {
//    const items =  getBooks();
//    const dataFromApi = getDataFromApi();
//    res.send({
//        books : items,
//        data_from_api : dataFromApi
//    });
//})

// default entry point '/' 
app.get('/', (req, res) => {
    res.json({ message : 'Welcome on Express/Node Server'}).status(200);
    console.log("Working");
});

app.get("/api/livres", (req, res) => {
    const plop = req.query.category ?  req.query.category : '';
    const review = req.query.reviews ? req.query.reviews : '';

    console.log(plop)
    if (plop) {
        if (review) {
            res.send(data.filter(item => item.theme == plop && item.review >= review)).status(200);
        } else {
            res.send(data.filter(item => item.theme == plop)).status(200);
        }
    } else {
        res.json(data).status(200);
    }
});

//get one book
app.get("/api/livres/:id", (req, res) => {
    //res.json(data).status(200);
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const book = data.find(book => book.id === id);
    if(book) res.json(book).status(200);
    res.json({message: "Book is not found"}).status(404);
});

app.post('/api/livres', (req, res) => {
     if (!req.body.title || !req.body.author || !req.body.theme || !req.body.review) {
         res.send("Champs manquants!").status(400);
     } else {
     const newBook = {
         // get the id from the data array + 1 to get the next id
         id : data.length + 1,
         // get the title from the body request (data send by the client)
         title : req.body.title,
         author : req.body.author,
         theme : req.body.theme,
         description : req.body.description,
         review : req.body.review,
         image : req.body.image,
         price: req.body.price,
         price2: req.body.price2
     };
     // push the new article to the data array
     data.push(newBook);
     // send the new article to the client
     res.json({message: "Livre ajouté", newBook : newBook}).status(201);
     }   
 });

 app.patch("/api/livres/:id", (req, res) => {
     const id = parseInt(req.params.id);
     const book = data.find(book => book.id === id);
     if(book) {
         if (req.body.review) book.review = req.body.review;
         res.send("Votre avis a bien été ajouté").status(200);
     } else res.send("Book is not found").status(404);   
 });

 app.delete("/api/livres/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = data.find(book => book.id === id);
    if(book) {
        data.splice(data.indexOf(book), 1);
        res.send("Book has been deleted").status(200);
    } else res.send("Book is not found").status(404);   
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});