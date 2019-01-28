const root = document.getElementById('root')

class Login extends React.Component {
    state = { email:'', password:'' }

    handleEmailInput = event => this.setState({email: event.target.value })

    handlePasswordInput = event => this.setState({password: event.target.value})

    render() {

        const {handleEmailInput, handlePasswordInput} = this

        return <section>
            <h1>Spotify Music</h1>
            <form action="">
                <input type="text" name="email" onChange={handleEmailInput}/>
                <input type="password" name="password" onChange={handlePasswordInput}/>
                <button>Login</button>
            </form>
        </section>
    }
}

class Register extends React.Component {
    render() {
        return <section>
            <form action="">
                <input type="text" name="name" />
                <input type="text" name="surname" />
                <input type="" name="email" />
                <input type="password" name="password" />
                <input type="password" name="password confirmation" />
            </form>
        </section>
    }
}

class App extends React.Component {
    render() {

        return <section>
            <Login />
            <Register />
        </section>
    }
}

ReactDOM.render(<App />, root)