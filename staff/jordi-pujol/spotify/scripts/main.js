spotifyApi.token = 'BQCsl85neJTaONIQFPCBdLoPriecwLZW-cpJFqMY_qD7WYkKFHysHOJvNee-Cr0Rx2cdVwWY0xfItgiFfQZ_duJNIpffn6p4imWD-pbNLaNGj_KIVSsnwLdG3fvFqjNw3P9eq1CTc-4fjpI'

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
                trackPanel.hide()

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

                // albumPanel.clear()

                artistsPanel.hide();

                albumPanel.albums = albums

                albumPanel.show()
            }

        })

    } catch (err) {
    }
}

artistsPanel.onGoBack = function (){
    artistsPanel.clear()
    artistsPanel.hide()
}

albumPanel.onAlbumSelected = function (albumId) {

    try {
        logic.retrieveTracks(albumId, function (error, tracks) {
            if (error) searchPanel.error = error.message
            else {

                // albumPanel.clear()

                albumPanel.hide();

                trackPanel.tracks = tracks

                trackPanel.show()
            }
            
        })
    } catch (err) {
    }
}

albumPanel.onGoBack = function (){
    albumPanel.clear()
    albumPanel.hide()
    artistsPanel.show()
}

trackPanel.onGoBack = function (){
    trackPanel.clear()
    trackPanel.hide()
    albumPanel.show()
}