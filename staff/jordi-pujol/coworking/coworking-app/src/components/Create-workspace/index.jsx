'use strict'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Workspace extends Component {
    state = { email: '', password: '', name: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleWorkspaceInput = event => this.setState({ name: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password, name }, props: { onNewWorkspace } } = this

        onNewWorkspace(email, password, name)
    }

    render() {

        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleWorkspaceInput } = this

        return <section className="login">
            <section className="login_content">
                <h2>Welcome</h2>
                <form className="login_content-form" onSubmit={handleFormSubmit}>
                    <span>Email</span>
                    <input type="text" autoFocus onChange={handleEmailInput} required />
                    <span>Password</span>
                    <input type="password" onChange={handlePasswordInput} required />
                    <span>Workspace name</span>
                    <input type="text" onChange={handleWorkspaceInput} required />
                    <p className="contentforgot-pass">Forgot password?</p>
                    <button className="submit">Create new Workspace and Log In</button>
                </form>
            </section>
            <section className="login_subcontent">
                <div className="img__text m--up">
                    <h2>New here?</h2>
                    <p>Sign up and discover great amount of new opportunities!</p>
                </div>
                <div className="img__text m--in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
                <div className="img__btn">
                    <span>Sign Up</span>
                </div>
            </section>
        </section>
    }
}

export default withRouter(Workspace)