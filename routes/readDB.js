const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'links'
});


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