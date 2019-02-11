import React, { Component } from 'react'
import Feedback from '../Feedback'

import './index.sass'

class Search extends Component {
    state = { query: null, type: null }

    handleQueryInput = event => this.setState({ query: event.target.value })

    handleSearchSubmit = event => {
        event.preventDefault()
        const { state: { query }, props: { onSearch } } = this
        onSearch(query)
    }

    handleFilterClick = event => {
        'is-active'
    }

    render() {
        const { handleQueryInput, handleSearchSubmit, handleFilterClick, movieSelected, serieSelected, episodeSelected } = this
        const { feedback } = this.props

        return (
            <section className="search">
                <form className="field is-grouped" onSubmit={handleSearchSubmit} >
                    <p className="control is-expanded">
                        <input
                            name="query"
                            placeholder="Search Movies and Series"
                            onChange={handleQueryInput}
                            className="input"
                            required
                            autoComplete="off"
                        />
                    </p>
                        <p className="control">
                            <button className="button is-info" type="submit">Search</button>
                        </p>
                </form>
                <div onClick={handleFilterClick} class="dropdown is-active">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span>Filter per Type</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a onClick={movieSelected} href="#" class=`dropdown-item ${setActive}`>Movies</a>
                                <a onClick={serieSelected} href="#" class="dropdown-item ">Series</a>
                                <a onClick={episodeSelected} href="#" class="dropdown-item">Episodes</a>
                                <hr class="dropdown-divider"/>
                                    <a href="#" class="dropdown-item">All</a>
                            </div>
                        </div>
                    </div>
                    {feedback && <Feedback message={feedback} level="warn" />}
            </section>
                )
            }
        }
export default Search