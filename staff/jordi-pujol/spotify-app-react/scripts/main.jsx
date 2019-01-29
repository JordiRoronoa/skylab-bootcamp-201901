spotifyApi.token = 'BQDJtSgFGeeSDCYK_9AQSWHP9Dy5-VtZF0tQYga5CnG8SXOwsKarIlGekqroBYVpEFOuHf8aaZ64-ox0qVBkN2IByR1E4LXwaBLaP_8qIwF0tgx5WI8uzDQJlKR3qHdpVP4GTLP4gn7SH6Q'


const root = document.getElementById('root')

//#region Login

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterSubmit = event => {
        event.preventDefault()
        const { props: { onGoRegister } } = this

        onGoRegister()
    }

    render() {

        const { handleFormSubmit, handleEmailInput, handlePasswordInput, handleRegisterSubmit, props: { feedback } } = this

        return <section className="container">
            <h1>Spotify Music</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button>Login</button>
            </form>
            <a href="#" onClick={handleRegisterSubmit}>Register</a>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

//#endregion

function Feedback({ message }) {
    return <section>{message}</section>
}


//#region Register

class Register extends React.Component {


    state = { name: "", surname: "", email: "", password: "", passwordConfirmation: "" }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handlePasswordConfInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {

        const { handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfInput, handleFormSubmit, props: { feedback } } = this

        return <section className="container">
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" onChange={handleNameInput} />
                <input type="text" name="surname" onChange={handleSurnameInput} />
                <input type="" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <input type="password" name="password confirmation" onChange={handlePasswordConfInput} />
                <button type="submit">Register</button>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

//#endregion

//#region App

class App extends React.Component {

    state = { loginFeedback: '', registerFeedback: '', loginVisible: true, registerVisible: false, searchVisible: false, artistVisible: false }

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
                console.log(artists)
                listArtists.artists = artists
                this.setState({ artistVisible: true })
            })
        } catch ({ message }) {
        }
    }


    render() {

        const { handleSearch, handleLogin, handleRegister, handleGoRegister, state: { loginFeedback, registerFeedback, loginVisible, registerVisible, searchVisible, artistVisible } } = this

        return <main>
            {loginVisible && <Login onLogin={handleLogin} onGoRegister={handleGoRegister} feedback={loginFeedback} />}
            {registerVisible && <Register onRegister={handleRegister} feedback={registerFeedback} />}
            {searchVisible && <Search onSearch={handleSearch} />}
            {artistVisible && <Artist onList={listArtists} />}
        </main>
    }
}

ReactDOM.render(<App />, root)

//#endregion

//#region Search

class Search extends React.Component {

    state = { query: '' }

    handleQueryInput = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {

        const { handleFormSubmit, handleQueryInput } = this

        return <section className="search container">
            <form onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className=" col input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default"><img className="icon" src="https://starrsystems.net/wp-content/uploads/2016/07/Services-Music-Systems-page.png" /></span>
                        </div>
                        <input type="text" className="form-control" onChange={handleQueryInput} name="query" placeholder="Search an artist..." aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Search</button>
                </div>
            </form>
        </section>
    }
}

//#endregion

class Artist extends React.Component {

    listArtists = (artists) => {

    artists.map(({ id, name, images, followers, genres }) => {
        const genre = genres[0] ? genres[0] : 'Not available'
        const image = images[0] ? images[0].url : 'https://editorial.upc.edu.pe/wp-content/uploads/2018/08/no-photo.png'
        return <div className="item" data-id={id}><img src={image} className="receivedImg" />
            <li data-id={id} className="title" >{name}</li><li>Followers: {followers.total}</li>
            <li>Main Genre: {genre}</li>
        </div>
    })
}

render() {

    const { listArtists} = this

    return <section className="results container">
        <button type="submit" className="btn btn-info">Go back</button>
        <h3>Artists</h3>
        <ul className="row container">{listArtists}</ul>
    </section>
}
}

//#region Artists



