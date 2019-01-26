spotifyApi.token = 'BQBw-22Mn1xubAZsFPVi4_oMIdTt-5L8k57ku79COWNamlS9_bLFTlIq6jZD-y6eA8m9yW1n7ZsUX0HtF1q1OGjim9XvoU46eTmEvGjUTV_UHNX7au7uVIKT0nPvZPnEmKxzwzgxL3OJbBI'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const trackPanel = new TrackPanel

const $root = $('#root')

artistsPanel.hide()
albumPanel.hide()
trackPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
$root.append(trackPanel.$container)

searchPanel.onSearch = function (query) {

    try {
        logic.searchArtists(query, function (error, artists) {
            if (error) searchPanel.error = error.message
            else {

                artistsPanel.clear()
                albumPanel.clear()
                trackPanel.clear()

                albumPanel.hide()
                trackPanel.hide
                    ()

                artistsPanel.artists = artists

                artistsPanel.show()


            }
        })
    } catch (err) {

    }
}

artistsPanel.onArtistSelected = function (artistId) {

    try {
        logic.retrieveAlbums(artistId, function (error, albums) {
            if (error) searchPanel.error = error.message
            else {

                albumPanel.clear()

                artistsPanel.hide();

                albumPanel.albums = albums

                albumPanel.show()
            }

        })

    } catch (err) {
    }
}

albumPanel.onAlbumSelected = function (albumId) {

    try {
        logic.retrieveTracks(albumId, function (error, tracks) {
            if (error) searchPanel.error = error.message
            else {

                albumPanel.clear()

                albumPanel.hide();

                trackPanel.tracks = tracks

                trackPanel.show()
            }
            
        })
    } catch (err) {
    }
}

trackPanel.onPlayTrack = function (trackId) {

    try {
        logic.playTrack(trackId, function (error, track) {
            if (error) searchPanel.error = error.message
            else {

                trackPanel.play = track
            }
        })

    } catch (err) {
    }
}