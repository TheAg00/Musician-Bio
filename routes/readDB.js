const express = require('express');
const mysql = require('mysql');

const router = express.Router();

// Δημιουργούμε σύνδεση με τη βάση δεδομένων μας.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'links'
});

// Στέλνουμε τα λινκς που βρικσόντουσαν στη βάση δεδομένων.
router.get('/', async (req, res) => {
    const selectLinks = 'SELECT * FROM websites';

    connection.query(selectLinks, (err, results) => {
        if (err) {
            console.error('Error selecting data:', err.message);
        }
        
        res.status(200).send(JSON.stringify(results));
    });
});

module.exports = router;