require('dotenv').config()

require('isomorphic-fetch')

const spotifyApi = require('./spotify-api')
const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const users = require('../src/data/users')

const { addCommentToArtist, registerUser, authenticateUser, retrieveUser, notFound, searchArtists, retrieveArtist, retrieveAlbums, retrieveAlbum, retrieveTracks, retrieveTrack } = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process



MongoClient.connect(DB_URL, { useNewUrlParser: true })
    .then(client => {

        users.collection = client.db().collection('users')

        spotifyApi.token = SPOTIFY_API_TOKEN
        const app = express()
        const jsonBodyParser = bodyParser.json()


        app.post('/register', jsonBodyParser, registerUser)

        app.post('/authenticate', jsonBodyParser, authenticateUser)

        app.get('/retrieve-user/:id', retrieveUser)

        app.get('/artists?q=:query', searchArtists)

        app.get('/retrieveartist/:id', retrieveArtist)

        app.get('/retrievealbums/:id', retrieveAlbums)

        app.get('/retrievealbum/:id', retrieveAlbum)

        app.get('/retrievetracks/:id', retrieveTracks)

        app.get('/retrievetrack/:id', retrieveTrack)


        app.post('/artist/:artistId/comment', addCommentToArtist)

        app.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))

    })
    .catch(console.error)