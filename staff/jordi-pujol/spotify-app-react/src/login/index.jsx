
class Login extends React.Component {
    state = { email: '', password:''  }

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

        return <section className="login container">
        <h2>Login</h2>
        <form className="login__form" onSubmit={handleFormSubmit}>

        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-7">
        <label for="email">E-mail:</label>
        <div className="input-group flex-nowrap">
        <div className="input-group-prepend">
        <span className="input-group-text" id="addon-wrapping">@</span>
        </div>
        <input type="email" onChange={handleEmailInput} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" required/>
        </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-5">
        <label for="password">Password:</label>
        <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">PSWD</span>
        </div>
        <input type="password" onChange={handlePasswordInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required/>
        </div>
        </div>
        </div>
        <div className="row">
        <div className = "col-12">
        <button type="submit" className="btn btn-outline-primary btn-lg">Login</button>
        </div>
        </div>
        </form>
        <a href="#" onClick={handleRegisterSubmit} className="login__register-link"><span class="badge badge-dark"></span>>Register</a>
        {feedback && <Feedback message={feedback} />}
        </section>
    }
}



