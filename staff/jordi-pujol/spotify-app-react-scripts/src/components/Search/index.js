import React, { Component } from 'react';
import './index.sass'

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

export default Search;