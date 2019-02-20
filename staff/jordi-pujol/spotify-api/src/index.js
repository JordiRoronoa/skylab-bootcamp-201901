require('dotenv').config()

require('isomorphic-fetch')

const spotifyApi = require('./spotify-api')

const express = require('express')
const bodyParser = require('body-parser')

const { registerUser, authenticateUser, retrieveUser, notFound, searchArtists, retrieveArtist, retrieveAlbums, retrieveAlbum, retrieveTracks, retrieveTrack } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process
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

app.get('*', notFound)


app.listen(port, () => console.log(`server running on port ${port}`))