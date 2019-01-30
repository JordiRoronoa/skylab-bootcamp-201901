
class Track extends React.Component {

    handleGoBacktoAlbums = () => {

        const {props:{onClickGoBacktoAlbums}} = this

        onClickGoBacktoAlbums()
    }

    render() {

        const { handleGoBacktoAlbums, props:{tracks}} = this

        return <section className="results container">
        <button type="submit" className="btn btn-info" onClick={handleGoBacktoAlbums}>Go back</button>
        <h3>Tracks</h3>
        <ul>
            {tracks.map(({id, name, preview_url, track_number, duration_ms}) =>{
                return <div className="item"><li key={id} className="title" id="track">{track_number} - {name}</li>
                <li>Duration: {Math.floor((duration_ms/1000/60) << 0)}:{Math.floor((duration_ms/1000) % 60)}</li>
                <li><audio src={preview_url} controls></audio></li>
        </div>})}
        </ul>
    </section>
    }
}