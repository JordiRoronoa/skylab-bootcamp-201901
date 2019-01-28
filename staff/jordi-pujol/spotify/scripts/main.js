spotifyApi.token = 'BQDEfriF8bqZP2LvOtKiGil0R3fNNbUwkWFS7FfMu5GwupC63W2CCnUiVBu7Weu_5MJm95gU61eVA6rpDhaR3NicJLIWTpcMAD1n11DTub6qCrcDV7rTAT4FzEeGCGkEc1D35ujS28HLyq4'

const searchPanel = new SearchPanel
const artistsPanel = new ArtistsPanel
const albumPanel = new AlbumPanel
const trackPanel = new TrackPanel
const loginPanel = new LoginPanel
const registerPanel = new RegisterPanel

const $root = $('#root')

searchPanel.hide()
registerPanel.hide()
artistsPanel.hide()
albumPanel.hide()
trackPanel.hide()

$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)
$root.append(albumPanel.$container)
$root.append(trackPanel.$container)
$root.append(loginPanel.$container)
$root.append(registerPanel.$container)

loginPanel.onLogin = function (email, password) {
    try {
        logic.login(email, password, function (user) {
            loginPanel.hide();
            loginPanel.clear();

            // homePanel.user = user;
            searchPanel.show();            

        });
    } catch (err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onGoToRegister = function () {
    loginPanel.hide();
    loginPanel.clear();

    registerPanel.show();
};

registerPanel.onRegister = function (name, surname, email, password, passwordConfirmation) {
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function () {
            registerPanel.hide();
            registerPanel.clear();

            loginPanel.show();
        });
    } catch (err) {
        registerPanel.error = err.message;
    }
};

registerPanel.onGoToLogin = function () {
    registerPanel.hide();
    registerPanel.clear();

    loginPanel.show();
};

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