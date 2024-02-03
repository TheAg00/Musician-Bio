const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));

const users = { 'user1': 'password1'}; // Τα username και password του admin.

router.use(cookieParser());

router.post('/login', (req, res) => {
    // Παίρνουμε το username που εισήγαγε ο χρήστης και το σωστό password.
    const username = req.body.username;
    const password = users[username];

    // Αν το password είναι σωστό, τότε δημιουργούμε ένα cookie με το username του admin.
    if (password === req.body.password) {
        res.cookie('username', username);
        res.redirect("/");
        return;
    }

    // Εμφανίζουμε κατάλληλο μήνυμα αν το password ήταν λάθος.
    res.send('Failed to login!')
    return;
})

// Όταν ο χρήστης κάνει αποσύνδεση, διαγράφουμε το cookie με το username.
router.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
    return;
});

module.exports = router;