const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));

const users = { 'user1': 'password1', 'user2': 'password2' };


router.post('/', (req, res) => {
    const username = req.body.username;
    const password = users[username];
    if(password == req.body.password) {
        jwt.sign({ username: username}, 'secretkey', (err, token) => {
            res.status(200).json(token);
        })
    } else {
        res.status(401).send("Unauthorised access");
    }
})

function isAuthenticated(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, authData) => {
            if(err) {
                res.status(401).send("Unauthorised access");
            } else if (users[authData?.username]) {
                next();
            } else {
                res.status(403).send("Forbidden");
            }
        });
    } else {
        res.status(403).send("Forbidden");
    }
}


router.get('/data', isAuthenticated, (req, res) => {
    const data = [{ name: 'John', age: 30 }, { name: 'Maria', age: 22 }];
    res.status(200).send(JSON.stringify(data));    
});

module.exports = router;