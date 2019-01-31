import React, { Component } from 'react';

class Artist extends React.Component {

    handleArtistSelected = (id) => {

        const { props: { onClickArtist } } = this

        onClickArtist(id)
    }

    handleGoBacktoSearch = () => {

        const {props: {onClickGoBacktoSearch}} = this

        onClickGoBacktoSearch()
    }

    render() {

        const { handleArtistSelected, handleGoBacktoSearch, props: { artists } } = this

        return <section className="results container">
            <button type="submit" className="btn btn-info" onClick={handleGoBacktoSearch}>Go back</button>
            <h3>Artists</h3>
            <ul className="row container">
                {artists.map(({ id, name, images, followers, genres }) => {
                    return <div onClick={() => handleArtistSelected(id)} className="item" key={id}><img className="receivedImg" src={images[0] ? images[0].url : 'https://editorial.upc.edu.pe/wp-content/uploads/2018/08/no-photo.png'} />
                        <li key={id} className="title">{name}</li><li>Followers: {followers.total}</li>
                        <li>Main Genre: {genres[0] ? genres[0] : 'Not available'}</li>
                    </div>

                })}
            </ul>
        </section>
    }
}

export default Artist