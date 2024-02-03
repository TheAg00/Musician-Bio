// Εισάγουμε τις κατάλληλες βιβλιοθήκες.
const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.port || 4000;

app.use(express.static(__dirname + "/public")); // Εξυπηρετούμε τα στατικά αρχεία της ιστοσελίδας μας.

// Δημιουργούμε τα routes.
const discographyRouter = require('./routes/readJSON');
const linksRouter = require('./routes/readDB');
const adminRouter = require('./routes/admin');

app.use('/discography', discographyRouter);
app.use('/links', linksRouter);
app.use('/admin', adminRouter);

app.use(express.json())

// Εκκινούμε το server στο port 4000.
app.listen(PORT, (err) => {
    if(!err) 
        console.log(`Server is running at http://localhost:${PORT}`);
    else 
        console.log(err);
})

// Δημιουργούμε τη σύνδεση με τη βάση δεδομένων μας.
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