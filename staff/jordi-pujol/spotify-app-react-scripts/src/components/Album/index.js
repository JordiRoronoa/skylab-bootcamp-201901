import React, { Component } from 'react';

class Album extends React.Component {

    handleAlbumSelected = id => {

        const {props: {onClickAlbum}} = this

        onClickAlbum(id)
    }

    handleGoBacktoArtists = () => {

        const {props: {onClickGoBacktoArtists}} = this

        onClickGoBacktoArtists()
    }

    render() {

        const { handleAlbumSelected , handleGoBacktoArtists, props: {albums}} = this

        return <section className="results container">
            <button type="submit" className="btn btn-info" onClick={handleGoBacktoArtists}>Go back</button>
            <h3>Albums</h3>
            <ul className="row container">
                {albums.map(({ id, name, images, release_date, total_tracks }) => {
                    return <div onClick={()=>handleAlbumSelected(id)} key={id} className="item"><img src={images[0].url} className="receivedImg" />
                        <li key={id} className="title">{name}</li><li>Release date: {release_date}</li>
                        <li>Total tracks: {total_tracks}</li>
                    </div>
                })}
            </ul>
        </section>
    }
}

export default Album;
