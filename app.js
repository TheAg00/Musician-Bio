const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const PORT = process.env.port || 4000;

app.use(express.static(__dirname + "/public"));

const discographyRouter = require('./routes/readJSON');
const linksRouter = require('./routes/readDB');

app.use('/discography', discographyRouter);
app.use('/links', linksRouter);

app.use(express.json())


app.listen(PORT, (err) => {
    if(!err) 
        console.log(`Server is running at http://localhost:${PORT}`);
    else 
        console.log(err);
})


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'links'
});

connection.connect((err) => {
    if(err) return console.error(err.message);

    console.log('Connected to MySQL!');
});