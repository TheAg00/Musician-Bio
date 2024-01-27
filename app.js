const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.port || 4000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

let discographyJson = __dirname + './discography.json';

app.get('/api/discography', (req, res) => getDiscography(req, res));
app.post('/api/discography', (req, res) => addDiscography(req, res));
app.put('/api/discography/:id', (req, res) => updateDiscography(req, res));
app.delete('/api/discography/:id', (req, res) => deleteDiscography(req, res));

function getDiscography(req, res) {
    fs.readFile(discographyJson, (err, data) => {
        let albums = [];
        if(!err) albums = JSON.parse(data);
        res.status(200).json(albums);
    });
}

function addDiscography(req, res) {
    const { name, type, release_date, spotify_streams, total_sales} = req.body;
    const newAlbum = { name, type, release_date, spotify_streams, total_sales };

    fs.readFile(discographyJson, (err, data) => {
        let albums = [];
        if(!err) albums = JSON.parse(data);
        albums.push(newAlbum);
        fs.writeFile(discographyJson, JSON.stringify(albums), (err) => {
            if(err) {
                res.status(200).json(`Error adding album: ${name}`);
            } else {
                res.status(200).json(`Album added: ${name}`);
            }
        });
    });
}

function updateDiscography(req, res) {
    const { name, type, release_date, spotify_streams, total_sales} = req.body;
    const anAlbum = { name, type, release_date, spotify_streams, total_sales };
    fs.readFile(discographyJson, (err, data) => {
        let albums = [];
        if(!err) albums = JSON.parse(data);
        const albumIndex = albums.findIndex(album => album.name === anAlbum.name);
        if(albumIndex < 0) {
            res.status(200).json(`Cannot find album: ${name}`);
            return;
        }

        albums[albumIndex] = anAlbum;
        fs.writeFile(discographyJson, JSON.stringify(albums), (err) => {
            if(err) {
                res.status(200).json(`Error updating album: ${name}`);
            } else {
                res.status(200).json(`Album updated: ${name}`);
            }
        });
    });
}


function deleteDiscography(req, res) {
    const name = req.body.name;
    fs.readFile(discographyJson, (err, data) => {
        let albums = [];
        if(!err) albums = JSON.parse(data);
        const albumIndex = albums.findIndex(album => album.name === name);
        if(albumIndex < 0) {
            res.status(200).json(`Cannot album: ${name}`);
            return;
        }
        albums.splice(albumIndex, 1);
        fs.writeFile(discographyJson, JSON.stringify(albums), (err) => {
            if(err) {
                res.status(200).json(`Error deleting album: ${name}`);
            } else {
                res.status(200).json(`Album deleted: ${name}`);
            }
        });
    });
}