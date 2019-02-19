require('dotenv').config()

require('isomorphic-fetch')

const spotifyApi = require('./spotify-api')

const express = require('express')
const bodyParser = require('body-parser')

const { register, authenticate, retrieveUser, notFound, searchArtists, retrieveArtist, retrieveAlbums, retrieveAlbum, retrieveTracks, retrieveTrack } = require('./routes')

const { env: { PORT, SPOTIFY_API_TOKEN }, argv: [, , port = PORT || 8080] } = process
spotifyApi.token = SPOTIFY_API_TOKEN

const app = express()

const jsonBodyParser = bodyParser.json()


app.post('/register', jsonBodyParser, register.post)

app.post('/authenticate', jsonBodyParser, authenticate.post)

app.get('/retrieve-user/:userId', retrieveUser.get)

app.get('/artists/:query', searchArtists.get)

app.get('/retrieveartist/:artistId', retrieveArtist.get)

app.get('/retrievealbums/:artistId', retrieveAlbums.get)

app.get('/retrievealbum/:albumId', retrieveAlbum.get)

app.get('/retrievetracks/:albumId', retrieveTracks.get)

app.get('/retrievetrack/:trackId', retrieveTrack.get)

app.get('*', notFound.get)


app.listen(port, () => console.log(`server running on port ${port}`))