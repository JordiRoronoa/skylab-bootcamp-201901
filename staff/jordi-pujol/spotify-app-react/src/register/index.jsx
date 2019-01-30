
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

        return <section className="register container">
            <form className="register__form" onSubmmit={handleFormSubmit}>
                <h2>Register</h2>
                <div className="row">
                    <div className="input-group mb-3 col-md-7">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" name="name" onChange={handleNameInput} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="input-group mb-3 col-md-5">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Surname</span>
                        </div>
                        <input type="text" name="surname" onChange={handleSurnameInput} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                    </div>
                    <input type="email" name="email" onChange={handleEmailInput} className="form-control" id="basic-url" placeholder="E-mail" aria-describedby="basic-addon3" required />
                </div>
                <div className="row">
                    <div className="input-group mb-3 col-md-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Password</span>
                        </div>
                        <input type="password" onChange={handlePasswordInput} name="password" placeholder="password" className="form-control" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                    <div className="input-group mb-3 col-md-6">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Password confirmation</span>
                        </div>
                        <input type="password" onChange={handlePasswordConfInput} name="password-confirmation" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" required />
                    </div>
                </div>
                <button className="btn btn-outline-primary btn-lg" type="submit">Register</button>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

