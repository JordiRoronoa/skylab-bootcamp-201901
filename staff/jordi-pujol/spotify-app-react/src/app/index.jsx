
class App extends React.Component {

    state = { tracks:[], albums: [], artists: [], loginFeedback: '', registerFeedback: '', loginVisible: true, registerVisible: false, searchVisible: false, artistVisible: false, albumVisible: false, trackVisible: false }

    handleLogin = (email, password) => {

        try {
            logic.login(email, password, user => {

                this.setState({ loginFeedback: '' })
                this.setState({ loginVisible: false })
                this.setState({ searchVisible: true })
            })

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    handleRegister = (name, surname, email, password, passwordConfirmation) => {

        try {
            logic.register(name, surname, email, password, passwordConfirmation, users => {
                this.setState({ registerVisible: false })
                this.setState({ loginVisible: true })
                this.setState({ registerFeedback: '' })

            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleGoRegister = () => {
        this.setState({ loginVisible: false })
        this.setState({ registerVisible: true })
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query, (error, artists) => {
                this.setState({ artists: artists })
                this.setState({ artistVisible: true })
            })
        } catch ({ message }) {
        }
    }

    handleDisplayAlbums = (artistId) => {
        try {
            logic.retrieveAlbums(artistId, (error, albums) => {
                this.setState({ artistVisible: false })
                this.setState({ albums })
                this.setState({ albumVisible: true })
            })
        } catch ({ message }) {
        }
    }

    handleDisplayTracks = (trackId) => {
        try {
            logic.retrieveTracks(trackId, (error, tracks) => {
                this.setState({albumVisible: false})
                this.setState({ tracks })
                this.setState({trackVisible: true})
            })
        } catch ({message}){
        }
    }

    handleGoBacktoArtists = () => {
        this.setState({artistVisible: true})
        this.setState({albumVisible: false})
    }

    handleGoBacktoAlbums = () => {
        this.setState({albumVisible: true})
        this.setState({trackVisible: false})
    }

    handleGoBacktoSearch = () => {
        this.setState({searchVisible: true})
        this.setState({artistVisible: false})
    }

    render() {

        const { handleGoBacktoSearch, handleGoBacktoAlbums, handleGoBacktoArtists, handleDisplayTracks, handleDisplayAlbums, handleSearch, handleLogin, handleRegister, handleGoRegister, state: { loginFeedback, registerFeedback, loginVisible, registerVisible, searchVisible, artistVisible, artists, albums, albumVisible, tracks, trackVisible } } = this

        return <main className="app">
            {loginVisible && <Login onLogin={handleLogin} onGoRegister={handleGoRegister} feedback={loginFeedback} />}
            {registerVisible && <Register onRegister={handleRegister} feedback={registerFeedback} />}
            {searchVisible && <Search onSearch={handleSearch} />}
            {artistVisible && <Artist artists={artists} onClickArtist={handleDisplayAlbums} onClickGoBacktoSearch={handleGoBacktoSearch} />}
            {albumVisible && <Album albums={albums} onClickAlbum={handleDisplayTracks} onClickGoBacktoArtists={handleGoBacktoArtists}/>}
            {trackVisible && <Track tracks={tracks} onClickGoBacktoAlbums={handleGoBacktoAlbums} onClickAddFavorite={}/>}
        </main>
    }
}