spotifyApi.token = 'BQBySmLGG86CzU0sTGCqRzcM8tUXHcc3ctkTQ8YuViKp3L-xfxC5oBj6366HxhxTCuTM-mDr57A4wP2o-7anNu5OFgBApfc--7e16FMC2tuHiswS9ASYwJK7FhRn81dZls3q37xU8LnSj7k'

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