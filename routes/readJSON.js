const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));


const pathJSON = '/home/theag/Documents/Uni/WWW/2023-2024/Project/Musician-Bio/public/discography.json';

async function readDiscography() {
    try {
        const data = await fs.readFile(pathJSON , 'utf8');
        return JSON.parse(data);
    } catch(err) {
        console.error(err);
        return [];
    }
}

router.get('/', async (req, res) => {

    const discography = await readDiscography();
    res.status(200).send(JSON.stringify(discography));
})

module.exports = router;